import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import AdminLayout from '../../../components/Admin/AdminLayout';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import { Button, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';

import api from '../../../middlewares/axiosConfig';
import { setEvents, setDetailedEvents } from "../../../redux/actions/eventActions";

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 650,
  },
  header: {
    fontSize: '1.7rem',
    marginBottom: '1rem'
  },
  approveButton: {
    backgroundColor: 'green',
    color: '#fff'
  },
  actionButtons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly'
  }
}));

function index() {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const events = useSelector(state => state.eventReducer.events);
  
  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    const dataFromDb = await api.get('/events/getAllEvents')
      .then(res => res)
      .catch(err => {
        Swal.fire({
          title: 'error',
          text: err ? err.data.msg : 'An error occured',
          icon: 'error',
          timer: 1500
        });
      });
    
    if (dataFromDb){
      let events = dataFromDb.data.data;
      let tableData = [];

      events.map((val) => {
        let cell = ['',val.eventTitle, val.eventPreacher, val.eventVenue,
          val.eventDesc, 
          `${val.eventType == 1 ? "Others" : "Crusade" }`,
          moment(val.eventDate).format("dddd, MMMM Do YYYY"),
          val.id];
        tableData.push(cell);
      });
      
      dispatch(setEvents(tableData));
      dispatch(setDetailedEvents(events));

      setLoading(false);
    }
  }

  const columns = [
    {
      name:"S/N",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => {
          return (<span>{tableMeta.rowIndex + 1}</span>)
        }
      }
    }, 
    "Event Title", "Preacher", "Venue", "Description", "Type", "Date",
    {
      name: "Action",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return (
            <div className={classes.actionButtons}>
              <Button variant="contained" color="primary" size="small" 
                onClick={() => viewEvent(value)}> 
                view event
              </Button>
              <Button variant="contained" color="secondary" size="small" 
                onClick={() => deleteEvent(value)}> 
                delete event
              </Button>
            </div>
          )
        }
      }
    }
  ];

  const viewEvent = (id) => {
    router.push(`/admin/events/addEvent?edit=${id}`);
  }

  const deleteEvent = (id) => {
    Swal.fire({
      title: 'info',
      text: 'are you sure you want remove this event?',
      icon: 'info',
      confirmButtonText: 'yes',
      cancelButtonText: 'cancel',
      allowOutsideClick: false,
      showCancelButton: true
    }).then(async (res) => {
      if (res.isConfirmed){
        setLoading(true);

        await api.delete('/events/deleteEvent/' + id)
          .then(() => {
            Swal.fire({
              title: 'success',
              text: 'successfully deleted event',
              icon: 'success',
              timer: 2000
            });

            getEvents();
          })
          .catch(err => {
            Swal.fire({
              title: 'error',
              text: err ? err.data.msg : 'error trying to delete event',
              icon: 'error',
              timer: 2000
            });

            setLoading(false);
          });
      }
    });
  }

  return (
    <>
      <AdminLayout>
        <div style={{textAlign: 'right', marginBottom: '1rem'}}>
          <Button variant="contained" color="primary" onClick={() => router.push('/admin/events/addEvent')}>Add Events</Button>
        </div>
        {/* <Typography variant="h5" className={classes.header} >Classes</Typography> */}

        <MUIDataTable
          title={"Events"}
          data={events}
          columns={columns}
          options={{
            selectableRows: 'none',
            selectableRowsHeader: false,
            elevation: 3,
            textLabels: {
              body: {
                  noMatch: loading ?
                    <CircularProgress /> :
                    'Sorry, there is no matching data to display',
              },
            }
          }}
        />

      </AdminLayout>
    </>
  )
}

export default index
