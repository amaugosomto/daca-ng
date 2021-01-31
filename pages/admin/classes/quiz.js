import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/Admin/AdminLayout';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';

import api from '../../../middlewares/axiosConfig';
import QuizDialog from '../../../components/Admin/classes/addQuiz';

function quiz() {
  const router = useRouter();
  
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Quizzes");
  const [quizOptionTitle, setQuizOptionTitle] = useState("Add Quiz");
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState([]);
  const [quizId, setQuizId] = useState(0);
  const [classId, setClassId] = useState(0);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    let classId = getClassIdFromRoute();

    if (classId == false)
      router.push('/admin/classes');

    setClassId(classId);
    
    let quizzesResponse = await api.get('/classes/getAllQuizByClassId/' + classId)
      .then(res => res)
      .catch(err => {
        Swal.fire({
          title: 'error',
          text: err ? err.data.msg : 'An error occured',
          icon: 'error',
          timer: 1500
        });

        router.push('/admin/classes');
      });
      
    let quizzes = quizzesResponse.data.data.Quizzes;
    let tableData = [];

    quizzes.map((val) => {
      let cell = ['',val.quizBody, moment(val.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a"), val.id];
      tableData.push(cell);
    });

    setQuizzes(tableData);
    setTitle(`Quizzes for ${quizzesResponse.data.data.classTitle}`);
    setLoading(false);
  }

  const getClassIdFromRoute = () => {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("classId")) {
      let search = location.search;
      let classId = search.replace("?classId=", '');
      
      return classId
    }
    return false;
  }

  const handleClose = () => {
    setOpen(false);
    setQuizId(0);
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
    "Quiz Title", "Date Created",
    {
      name: "Action",
      options: {
        filter: false,
        customBodyRender: (value) => {
          
          return (
            <>
              <Button variant="contained" color="primary" size="small" style={{marginRight: '1rem'}} onClick={() => viewQuiz(value)}> 
                edit quiz
              </Button>
              <Button variant="contained" color="secondary" size="small" onClick={() => deleteQuiz(value)}> 
                delete quiz
              </Button>
            </>
          )
        }
      }
    }
  ];

  const viewQuiz = (id) => {
    setQuizId(id);
    setOpen(true);
  }

  const addNewQuiz = () => {
    setQuizId(0);
    setOpen(true);
  }

  return (
    <AdminLayout>
      <div style={{textAlign: 'right', marginBottom: '1rem'}}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={addNewQuiz}
        >
          Add Quiz
        </Button>
      </div>

      <MUIDataTable
          title={title}
          data={quizzes}
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

      <QuizDialog open={open} handleClose={handleClose} title={quizOptionTitle} 
        api={api} quizId={quizId} classId={classId}/>
    </AdminLayout>
  )
}

export default quiz
