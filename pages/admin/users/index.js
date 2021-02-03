import React, { useEffect, useState }  from 'react'
import { connect } from 'react-redux'
import AdminLayout from '../../../components/Admin/AdminLayout';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import { Button, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import CircularProgress from '@material-ui/core/CircularProgress';

import api from '../../../middlewares/axiosConfig';
import UserDialog from '../../../components/Admin/addUserDialog';

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

export const index = (props) => {
  const router = useRouter();
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [detailedUsers, setDetailedUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(0);
 
  useEffect(() => {
    getAdminUsers();
  }, []);

  const getAdminUsers = async () => {
    setLoading(true);

    const usersFromDb = await api.get('/adminuser/getAllAdminUsers')
      .then(res => res)
      .catch(err => {
        Swal.fire({
          title: 'error',
          text: err ? err.data.msg : 'An error occured',
          icon: 'error',
          timer: 1500
        });
      });

    if (usersFromDb) {
      let users = usersFromDb.data.data;
      let tableData = [];

      users.map((val) => {
        let cell = ['', `${val.firstName + " " + val.lastName}`, val.email, `${val.isActive}`, `${val.isAdmin}`, val.id];
        tableData.push(cell);
      });

      setUsers(tableData);
      setDetailedUsers(users);
      setLoading(false);
    }
  }

  const handleClose = () => {
    setOpen(false);
    setUserId(0);
  };

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
    "Name", "Email",  "isActive", "isAdmin",
    {
      name: "Actions",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => {
          
          return (
            <>
              <Button variant="contained" color="primary" size="small" onClick={() => viewUser(value)}> 
                view user
              </Button>
              {props.user.isAdmin == true ?
                tableMeta.rowData[4] == "false" ? 
                  <Button variant="contained" size="small" style={{margin: '0 1rem'}} onClick={() => toggleAdmin(value, 2)}> 
                    make admin
                  </Button>
                  :
                  <Button variant="contained" size="small" style={{margin: '0 1rem'}} onClick={() => toggleAdmin(value, 1)}> 
                    remove admin
                  </Button>
                : ""
              }
              {props.user.isAdmin == true ?
                tableMeta.rowData[3] == "true" ? 
                  <Button variant="contained" color="secondary" size="small" onClick={() => toggleActive(value, 1)}> 
                    deactivate user
                  </Button> 
                  :
                  <Button variant="contained" color="secondary" size="small" className={classes.approveButton} onClick={() => toggleActive(value, 2)}> 
                    activate user
                  </Button>
                : ""
              }
              
            </>
          )
        }
      }
    }
  ];

  const addUser = () => {
    setUserId(0);
    setOpen(true);
  }

  const viewUser = (id) => {
    setUserId(id);
    setOpen(true);
  }

  const toggleAdmin = (id, state) => {
    
    Swal.fire({
      title: 'info',
      text: state == 1 ? "Are you sure you want to remove user as admin?" : "Are you sure you want to make user admin?",
      icon: 'info',
      confirmButtonText: 'Ok',
      showCancelButton: true
    }).then(async (res) => {
      if (res.isConfirmed) {
        await api.get('/adminuser/toggleIsAdmin/' + id)
          .then(getAdminUsers)
          .catch(err => {
            Swal.fire({
              title: 'error',
              text: err ? err.data.msg : "An error occured while updating users, contact admin",
              icon: 'error',
              confirmButtonText: 'Ok',
              timer: 2000
            });
          })
      }
    });
    
  }

  const toggleActive = (id, state) => {
    
    Swal.fire({
      title: 'info',
      text: state == 1 ? "Are you sure you want to deactivate user, user will not be able to login?" : "Are you sure you want to activate user?",
      icon: 'info',
      confirmButtonText: 'Ok',
      showCancelButton: true
    }).then(async (res) => {
      if (res.isConfirmed) {
        await api.get('/adminuser/toggleIsActive/' + id)
          .then(getAdminUsers)
          .catch(err => {
            Swal.fire({
              title: 'error',
              text: err ? err.data.msg : "An error occured while updating users, contact admin",
              icon: 'error',
              confirmButtonText: 'Ok',
              timer: 2000
            });
          })
      }
    });
    
  }

  return (
    <AdminLayout>
      {props.user.isAdmin ? 
        <div style={{textAlign: 'right', marginBottom: '1rem'}}>
          <Button variant="contained" color="primary" onClick={addUser}>Add User</Button>
        </div>
        : ""
      }

      <MUIDataTable
        title={"Admin Users"}
        data={users}
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

    <UserDialog open={open} isAdmin={props.user.isAdmin} handleClose={handleClose} userId={userId} getAdminUsers={getAdminUsers} />
    </AdminLayout>
  )
}

const mapStateToProps = (state) => ({
  user: state.adminReducer.user
});

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
