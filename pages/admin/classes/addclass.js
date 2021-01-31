import React, { useState, useEffect, useRef }  from 'react'
import { connect } from 'react-redux';
import AdminLayout from '../../../components/Admin/AdminLayout';
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { Button, FormControl, Grid, InputLabel, 
  MenuItem, Select, TextField, Typography } from '@material-ui/core';

import validators from '../../../middlewares/validators';
import api from '../../../middlewares/axiosConfig';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: '100%',
  }
}));

export const addclass = (props) => {
  const classes = useStyles();
  const editorRef = useRef();
  const router = useRouter();
  let editClassId = 0;

  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [ CKEData, setCKEData ] = useState("");

  const [titleErrorMsg, settitleErrorMsg] = useState("");
  const [titleError, settitleError] = useState(false);

  const [tutorErrorMsg, settutorErrorMsg] = useState("");
  const [tutorError, settutorError] = useState(false);

  const [saveClassText, setSaveClassText] = useState("save class");
  const [saveButtonState, setSaveButtonState] = useState(false);

  const [updateClassText, setUpdateClassText] = useState("update class");
  const [updateButtonState, setUpdateButtonState] = useState(false);
  
  const [typeValue, settypeValue] = useState(1);
  
  const [buttonState, setButtonState] = useState(true);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    }
    setEditorLoaded(true);
    checkIfEdit();
  }, []);

  const checkIfEdit = async () => {
    let classId = getClassIdFromRoute();
    let detailedClass = [...props.detailedClasses];

    if (classId && detailedClass.length < 1) {
      setButtonState(false);

      let userClass = await api.get(`/classes/getClass/${classId}`).
        then(res => res)
        .catch(err => {
          Swal.fire({
            title: 'error',
            text: err ? err.data.msg : 'An error occured',
            icon: 'error',
            timer: 1500
          });

          return router.push('/admin/classes');
        });

      let data = userClass.data.data;
      setData(data);

    } else if (detailedClass.length > 0) {
      let data = detailedClass.find(value => value.id == classId);
      if (data != undefined){
        setButtonState(false);
        setData(data);
      }
        
    }
  }

  function setData(data) {
    setCKEData(data.classBody);
    settypeValue(data.ClassTypeId);
    document.getElementById('class_title').value = data.classTitle;
    document.getElementById('class_tutor').value = data.tutor;
    editClassId = data.id;
  }

  const getClassIdFromRoute = () => {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("edit")) {
      let search = location.search;
      let classId = search.replace("?edit=", '');
      
      return classId
    }
    return false;
  }

  const checkClassTitle = (e) => {
    e ? e.preventDefault() : '';
    
    let id = 'class_title';
    let hasContent = validators.isRequired(id);

    if (hasContent) {
      settitleError(hasContent);
      settitleErrorMsg('field is required');
      return false;
    }

    settitleError(false);
    settitleErrorMsg('');
    
    return true;
  }

  const checkTutor = (e) => {
    e ? e.preventDefault() : '';
    
    let id = 'class_tutor';
    let hasContent = validators.isRequired(id);

    if (hasContent) {
      settutorError(hasContent);
      settutorErrorMsg('field is required');
      return false;
    }

    settutorError(hasContent);
    settutorErrorMsg('');
    return true;
  }

  const typeChangeHandle = (event) => {
    settypeValue(event.target.value);
  }

  const saveClass = () => {
    if (!checkClassTitle() || !checkTutor()) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all required fields',
        icon: 'error',
        confirmButtonText: 'Ok'
      });

      return;
    }

    setSaveClassText("loading...");
    setSaveButtonState(true);

    let data = {
      classBody: CKEData,
      ClassTypeId: typeValue,
      classTitle: document.getElementById('class_title').value,
      tutor: document.getElementById('class_tutor').value
    }

    api.post("/classes/addClass", data)
      .then(() => {
        Swal.fire({
          title: 'success',
          text: 'Successfully added a class',
          icon: 'success',
          timer: 1500
        });

        router.push("/admin/classes");
      }).catch (err => {
        Swal.fire({
          title: 'error',
          text: err ? err.data.msg : 'an error occured',
          icon: 'error',
          timer: 1500
        });

        setSaveClassText("save class");
        setSaveButtonState(false);
      });
  }

  const updateClass = () => {
    if (!checkClassTitle() || !checkTutor() || CKEData.length < 1) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all required fields',
        icon: 'error',
        confirmButtonText: 'Ok'
      });

      return;
    }

    setUpdateClassText("loading...");
    setUpdateButtonState(true);

    let data = {
      classBody: CKEData,
      ClassTypeId: typeValue,
      ClassId: editClassId
    }

    api.post("/classes/editClass", data)
      .then(() => {
        Swal.fire({
          title: 'success',
          text: 'Successfully edited a class',
          icon: 'success',
          timer: 1500
        });

        router.push("/admin/classes");
      }).catch (err => {
        Swal.fire({
          title: 'error',
          text: err ? err.data.msg : 'an error occured',
          icon: 'error',
          timer: 1500
        });

        setUpdateClassText("update class");
        setUpdateButtonState(false);
      });
  }

  return (
    <AdminLayout>
      <Typography variant="h5" style={{marginBottom:'1rem', fontWeight: '500'}}> Add Classes</Typography>
      <Grid container>
        <Grid item xs={12} sm={5} style={{paddingRight: '1rem'}}>
          <TextField 
            fullWidth 
            id="class_title"
            label="Class Title" 
            variant="outlined" 
            required 
            autoFocus
            error={titleError}
            helperText={titleErrorMsg}
            onBlur={checkClassTitle}
            onKeyUp={checkClassTitle}
          />
        </Grid>
        <Grid item xs={12} sm={5} style={{paddingLeft: '1rem'}}>
          <TextField 
            fullWidth 
            id="class_tutor" 
            label="Tutor" 
            variant="outlined"
            error={tutorError}
            helperText={tutorErrorMsg}
            onBlur={checkTutor}
            onKeyUp={checkTutor}
            required
          />
        </Grid>
        <Grid item xs={12} sm={2} style={{paddingLeft: '1rem'}}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={typeValue}
              onChange={typeChangeHandle}
              label="Age"
              fullWidth
            >
              <MenuItem value={1}>Basic</MenuItem>
              <MenuItem value={2}>Advanced</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} style={{marginTop: '2rem'}}>
          {editorLoaded ? 
            <CKEditor
              editor={ ClassicEditor }
              data={CKEData}
              onChange={ ( event, editor ) => {
                  const data = editor.getData();
                  setCKEData(data);
              } }
            /> : 
            <div>Editor loading...</div> 
          }
          
        </Grid>
      </Grid>

      <div style={{textAlign: 'right'}}>
        {buttonState ? 
          <Button variant="contained" color="primary" 
            style={{marginTop:'1rem'}} onClick={saveClass} 
            disabled={saveButtonState}
          >
            {saveClassText}
          </Button> : 

          <Button variant="contained" color="primary" 
            style={{marginTop:'1rem'}} onClick={updateClass} 
            disabled={updateButtonState}
          >
            {updateClassText}
          </Button>
        }
        
      </div>
      
    </AdminLayout>
  )
}

const mapStateToProps = (state) => ({
  detailedClasses: state.adminReducer.detailedClasses
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(addclass)