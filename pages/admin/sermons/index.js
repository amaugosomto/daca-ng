import React, { useEffect, useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';
import AdminLayout from '../../../components/Admin/AdminLayout';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import { Button, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import CircularProgress from '@material-ui/core/CircularProgress';

import api from '../../../middlewares/axiosConfig';
import { setSermons, setDetailedSermons } from "../../../redux/actions/sermonActions";

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

  const sermons = useSelector(state => state.sermonReducer.sermons);
  
  useEffect(() => {
    getSermons();
  }, []);

  const getSermons = async () => {
    const dataFromDb = await api.get('/sermons/getAllSermons')
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
      let sermons = dataFromDb.data.data;
      let tableData = [];

      sermons.map((val) => {
        let cell = ['',val.sermonTitle, val.sermonPreacher, `${val.sermonDesc}`, `${val.category}`, val.id];
        tableData.push(cell);
      });
      
      dispatch(setSermons(tableData));
      dispatch(setDetailedSermons(sermons));

      setLoading(false);
    }
  }

  const columns = [
    {
      name:"ID",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => {
          return (<span>{tableMeta.rowIndex + 1}</span>)
        }
      }
    }, 
    "Sermon Title", "Preacher",  "Description",  "Category",
    {
      name: "Action",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return (
            <div className={classes.actionButtons}>
              <Button variant="contained" color="primary" size="small" 
                onClick={() => viewSermon(value)}> 
                view sermon
              </Button>
              <Button variant="contained" color="secondary" size="small" 
                onClick={() => deleteSermon(value)}> 
                delete sermon
              </Button>
            </div>
          )
        }
      }
    }
  ];

  const viewSermon = (id) => {
    router.push(`/admin/sermons/addSermon?edit=${id}`);
  }

  const deleteSermon = (id) => {
    Swal.fire({
      title: 'info',
      text: 'are you sure you want remove this sermon?',
      icon: 'info',
      confirmButtonText: 'yes',
      cancelButtonText: 'cancel',
      allowOutsideClick: false,
      showCancelButton: true
    }).then(async (res) => {
      if (res.isConfirmed){
        setLoading(true);

        await api.get('/sermons/deleteSermon/' + id)
          .then(() => {
            Swal.fire({
              title: 'success',
              text: 'successfully deleted sermon',
              icon: 'success',
              timer: 2000
            });

            getSermons();
          })
          .catch(err => {
            Swal.fire({
              title: 'error',
              text: err ? err.data.msg : 'error trying to delete sermon',
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
          <Button variant="contained" color="primary" onClick={() => router.push('/admin/sermons/addSermon')}>Add Sermon</Button>
        </div>
        {/* <Typography variant="h5" className={classes.header} >Classes</Typography> */}

        <MUIDataTable
          title={"Sermons"}
          data={sermons}
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
