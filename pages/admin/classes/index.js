import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import AdminLayout from '../../../components/Admin/AdminLayout';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import { Button, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import CircularProgress from '@material-ui/core/CircularProgress';

import api from '../../../middlewares/axiosConfig';
import { setClasses, setDetailedClasses } from "../../../redux/actions/adminActions";
import QuizDialog from '../../../components/Admin/classes/addQuiz';

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
  }
}));

export const classes = (props) => {
  const classes = useStyles();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = async () => {
    const dataFromDb = await api.get('/classes/getAllClasses')
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
      let classes = dataFromDb.data.data;
      let tableData = [];

      classes.map((val) => {
        let cell = ['',val.classTitle, val.tutor, `
          ${val.isApproved}`,`${val.ClassTypeId}`, val.id];
        tableData.push(cell);
      });
      
      props.setClasses(tableData);
      props.setDetailedClasses(classes);
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
    "Class Title", "Tutor",  "isApproved",
    {
      name: "Class Type",
      options: {
        customBodyRender: (value) => {
          return (<span>{value == 1 ? "Basic" : "Advanced"}</span>)
        }
      }
    },
    {
      name: "Action",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => {
          
          return (
            <>
              <Button variant="contained" color="primary" size="small" onClick={() => viewClass(value)}> 
                view class
              </Button>
              <Button variant="contained" size="small" style={{margin: '0 1rem'}} onClick={() => viewQuiz(value)}> 
                view quiz
              </Button>
              {tableMeta.rowData[3] == "true" ? 
                <Button variant="contained" color="secondary" size="small" onClick={() => disapproveClass(value)}> 
                  disaprove class
                </Button> 
                :
                <Button variant="contained" color="secondary" size="small" className={classes.approveButton} onClick={() => approveClass(value)}> 
                  approve class
                </Button>
              }
              
            </>
          )
        }
      }
    }
  ];

  const viewClass = (id) => {
    router.push(`/admin/classes/addclass?edit=${id}`);
  }

  const viewQuiz = (id) => {
    router.push(`/admin/classes/quiz?classId=${id}`);
  }

  const disapproveClass = (id) => {
    Swal.fire({
      title: 'info',
      text: 'are you sure you want disapprove class ?',
      icon: 'info',
      confirmButtonText: 'yes',
      allowOutsideClick: false,
      cancelButtonText: 'cancel',
      showCancelButton: true
    }).then(async (res) => {
      if (res.isConfirmed){
        setLoading(true);

        await api.get('/classes/disapproveClass/' + id)
          .then(() => {
            Swal.fire({
              title: 'success',
              text: 'successfully disapproved class',
              icon: 'success',
              timer: 2000
            });

            getClasses();
          })
          .catch(err => {
            Swal.fire({
              title: 'error',
              text: err ? err.data.msg : 'error trying to disapproved class',
              icon: 'error',
              timer: 2000
            });

            setLoading(false);
          });
      }
    });
  }

  const approveClass = (id) => {
    Swal.fire({
      title: 'info',
      text: 'are you sure you want approve class ?',
      icon: 'info',
      confirmButtonText: 'yes',
      cancelButtonText: 'cancel',
      allowOutsideClick: false,
      showCancelButton: true
    }).then(async (res) => {
      if (res.isConfirmed){
        setLoading(true);

        await api.get('/classes/approveClass/' + id)
          .then(() => {
            Swal.fire({
              title: 'success',
              text: 'successfully approved class',
              icon: 'success',
              timer: 2000
            });

            getClasses();
          })
          .catch(err => {
            Swal.fire({
              title: 'error',
              text: err ? err.data.msg : 'error trying to approve class',
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
          <Button variant="contained" color="primary" onClick={() => router.push('/admin/classes/addclass')}>Add class</Button>
        </div>
        {/* <Typography variant="h5" className={classes.header} >Classes</Typography> */}

        <MUIDataTable
          title={"Classes"}
          data={props.data}
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

const mapStateToProps = (state) => ({
  data: state.adminReducer.classes
});

const mapDispatchToProps = {
  setClasses,
  setDetailedClasses
}

export default connect(mapStateToProps, mapDispatchToProps)(classes)
