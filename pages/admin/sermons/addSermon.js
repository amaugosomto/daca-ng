import React, { useState, useEffect, useRef }  from 'react'
import { useSelector } from 'react-redux';
import AdminLayout from '../../../components/Admin/AdminLayout';
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import ReactPlayer from 'react-player';

import validators from '../../../middlewares/validators';
import api from '../../../middlewares/axiosConfig';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: '100%',
  },
  sermonAudioPlayer: {
    '& div': {
      width: '100% !important',
      height: '100px !important'
    }
  },
  sermonVideoPlayer: {
    '& div': {
      width: '100% !important',
    }
  }
}));

export const addSermon = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const fileRef = useRef();

  const audioExtensions = ["wav", "mp3", "m3u"];
  const videoExtensions = ["mp4", "webm", "ogv"];
  const detailedSermons = useSelector(state => state.sermonReducer.detailedSermons);

  useEffect(() => {
    checkIfEdit();
  }, []);


  const [formValues, setFormValues] = useState({
    file: "",
    imageSrc: "",
    // imageSrc: "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3",
    id: 0,
    sermonDesc: '',
    sermonTitle: '',
    sermonPreacher: '',
    duration: 0,
    fileName: '',
    isNewFileUpload: false,
    category: ''
  });

  const [formStates, setFormStates] = useState({
    buttonState: true,
    saveSermonText: "Add sermon",
    saveSermonState: false,
    editSermonState: false,
    editSermonText: 'update sermon',
    titleError: false,
    titleErrorMsg: '',
    tutorError: false,
    tutorErrorMsg: '',
    formHeader: 'Add Sermon',
    isAudio: true
  });

  const fileOnChange = (e) => {
    e ? e.preventDefault() : '';
    let files = fileRef.current.files;
    let extention = '';

    if (files.length < 1)
      return;

    let fileName = files[0].name;
    let lastDot = fileName.lastIndexOf('.');

    extention = fileName.substring(lastDot + 1).toLowerCase();

    let isValidAudioExtension = audioExtensions.find(audio => audio == extention);
    let isValidVideoExtension = videoExtensions.find(video => video == extention);

    if (isValidAudioExtension != undefined || isValidVideoExtension != undefined) {
      var reader = new FileReader();
      reader.onload = function (e) {
        setFormValues({ ...formValues, imageSrc: e.target.result,
          file: files[0], fileName: files[0].name, 
          isNewFileUpload : getSermonIdFromRoute() ? true : false });

        setFormStates({ ...formStates, isAudio: isValidAudioExtension ? true: false });
      }
      reader.readAsDataURL(files[0]);

    } else {
      Swal.fire({
        title: 'error',
        text: 'please select only audio files with extentions of wav, mp3, and m3u or video files with mp4, webm, ogv',
        icon: 'error',
        showCloseButton: true
      });

      return;
    }
  }

  const checkIfEdit = async () => {
    let sermonId = getSermonIdFromRoute();
    let localDetailedSermons = [...detailedSermons];

    if (sermonId && localDetailedSermons.length < 1) {

      let userClass = await api.get(`/sermons/getSermon/${sermonId}`).
        then(res => res)
        .catch(err => {
          Swal.fire({
            title: 'error',
            text: err ? err.data.msg : 'An error occured',
            icon: 'error',
            timer: 1500
          });

          return router.push('/admin/sermons');
        });

      let data = userClass.data.data;
      let lastDot = data.sermonFileName.split("uploads")[1].lastIndexOf('.');
      let extention = data.sermonFileName.split("uploads")[1].substring(lastDot + 1).toLowerCase();
  
      let isValidAudioExtension = audioExtensions.find(audio => audio == extention);
      
      setFormStates({ ...formStates, isAudio: isValidAudioExtension ? true: false, buttonState: false, formHeader: 'Update Sermon' });
      setData(data);

    } else if (localDetailedSermons.length > 0) {
      let data = localDetailedSermons.find(value => value.id == sermonId);
      if (data != undefined){
        setFormStates({ ...formStates, buttonState: false, formHeader: 'Update Sermon' });
        setFormValues({})
        setData(data);
      }
        
    }
  }

  function setData(data) {
    let formValuesCopy = { ...formValues };
    let audioName = data.sermonFileName.split("uploads")[1];
    let copiedData = Object.assign(formValuesCopy, data);

    let domain = location.hostname.toLowerCase().includes('localhost') ? 
      'http://localhost:5000': 'https://api.daca.org.ng';

    copiedData.fileName = audioName;
    copiedData.imageSrc = `${domain}/${data.sermonFileName}`;
    
    setFormValues(copiedData);
  }

  const getSermonIdFromRoute = () => {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("edit")) {
      let search = location.search;
      let sermonId = search.replace("?edit=", '');
      
      return sermonId
    }
    return false;
  }

  const checkSermonTitle = (e) => {
    e ? e.preventDefault() : '';
    
    let id = 'sermon_title';
    let hasContent = validators.isRequired(id);
    setFormValues({ ...formValues, sermonTitle: document.getElementById(id).value });

    if (hasContent) {
      setFormStates({ ...formStates, titleError: hasContent, titleErrorMsg: 'field is required' });
      
      return false;
    }

    setFormStates({ ...formStates, titleError: false, titleErrorMsg: '' });
    
    return true;
  }

  const checkFile = () => {

    if (formValues.file == "")
      return false;
    
    return true;
  }

  const checkTutor = (e) => {
    e ? e.preventDefault() : '';
    
    let id = 'sermon_tutor';
    let hasContent = validators.isRequired(id);
    setFormValues({ ...formValues, sermonPreacher: document.getElementById(id).value });

    if (hasContent) {
      setFormStates({ ...formStates, tutorError: hasContent, tutorErrorMsg: 'field is required' });
      return false;
    }

    setFormStates({ ...formStates, tutorError: false, tutorErrorMsg: '' });
    return true;
  }

  function setOtherForm(e) {
    e.preventDefault();

    switch (e.target.id) {
      case "category":
        setFormValues({ ...formValues, category: e.target.value });
        break;

      case "class_desc":
        setFormValues({ ...formValues, sermonDesc: e.target.value });
        break;
    
      default:
        break;
    }
  }

  const saveSermon = () => {
    if (!checkSermonTitle() || !checkTutor() || !checkFile()) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all required fields and select a file',
        icon: 'error',
        confirmButtonText: 'Ok'
      });

      return;
    }

    setFormStates({ ...formStates, saveSermonState: true, saveSermonText: 'loading...' });

    const formData = new FormData();
    formData.append('audio', formValues.file);
    formData.append('sermonDesc', formValues.sermonDesc);
    formData.append('sermonTitle', formValues.sermonTitle);
    formData.append('sermonDuration', formValues.duration);
    formData.append('sermonPreacher', formValues.sermonPreacher);
    formData.append('category', formValues.category);

    api.post("/sermons/addSermon", formData)
      .then(() => {
        Swal.fire({
          title: 'success',
          text: 'Successfully added a sermon',
          icon: 'success',
          timer: 2500,
          confirmButtonText: 'ok'
        });

        router.push("/admin/sermons");

      }).catch (err => {
        Swal.fire({
          title: 'error',
          text: err ? err.data.msg : 'an error occured',
          icon: 'error',
          timer: 3000,
          confirmButtonText: 'ok'
        });

        setFormStates({ ...formStates, saveSermonState: false, saveSermonText: 'Add Sermon' });
      });
  }

  const updateSermon = () => {
    if (!checkSermonTitle() || !checkTutor()) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all required fields',
        icon: 'error',
        confirmButtonText: 'Ok'
      });

      return;
    }

    setFormStates({ ...formStates, editSermonState: true, editSermonText: 'loading...' });

    const formData = new FormData();
    formData.append('audio', formValues.file);
    formData.append('sermonDesc', formValues.sermonDesc);
    formData.append('sermonTitle', formValues.sermonTitle);
    formData.append('sermonDuration', formValues.duration);
    formData.append('sermonPreacher', formValues.sermonPreacher);
    formData.append('category', formValues.category);
    formData.append('isNewFileUpload', formValues.isNewFileUpload);
    formData.append('id', getSermonIdFromRoute());
    
    api.post("/sermons/editSermon", formData)
      .then(() => {
        Swal.fire({
          title: 'success',
          text: 'Successfully edited a sermon',
          icon: 'success',
          timer: 2500,
          confirmButtonText: 'ok'
        });

        router.push("/admin/sermons");
      }).catch (err => {
        Swal.fire({
          title: 'error',
          text: err ? err.data.msg : 'an error occured',
          icon: 'error',
          timer: 3000,
          confirmButtonText: 'ok'
        });

        setFormStates({ ...formStates, editSermonState: false, editSermonText: 'update sermon' });
      });
  }

  return (
    <AdminLayout>
      <Typography variant="h5" style={{marginBottom:'1rem', fontWeight: '500'}}>
         {formStates.formHeader}
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={5}>
          <div style={{paddingRight: '1rem'}}>
            <label htmlFor="btn-upload">
              <input
                id="btn-upload"
                name="btn-upload"
                style={{ display: 'none' }}
                type="file" 
                ref={fileRef} 
                onChange={fileOnChange}
              />
              <Button
                className="btn-choose"
                variant="outlined"
                size="small"
                component="span" >
                Choose Files
              </Button>
            </label>

            {formValues.imageSrc ? (
              
              <div className={formStates.isAudio ? classes.sermonAudioPlayer : classes.sermonVideoPlayer} style={{marginTop: '2rem'}}>
                <p>{formValues.fileName}</p>
                <ReactPlayer 
                  url={formValues.imageSrc}
                  className={classes.audio}
                  controls={true}
                  // elevation={0}
                  // rounded={true}
                  // download={true}
                />
              </div>
            ) : (
              <span>No file selected</span>
            )}

          </div>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                id="sermon_title"
                label="Sermon Title" 
                variant="outlined" 
                required 
                autoFocus
                error={formStates.titleError}
                helperText={formStates.titleErrorMsg}
                onChange={checkSermonTitle}
                value={formValues.sermonTitle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                id="sermon_tutor" 
                label="Preacher" 
                variant="outlined"
                error={formStates.tutorError}
                helperText={formStates.tutorErrorMsg}
                onChange={checkTutor}
                required
                value={formValues.sermonPreacher}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                id="category"
                label="Category" 
                variant="outlined"
                onChange={setOtherForm}
                value={formValues.category}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                placeholder="Description"
                multiline
                id="class_desc"
                rows={2}
                rowsMax={4}
                fullWidth
                variant="outlined"
                onChange={setOtherForm}
                value={formValues.sermonDesc}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <div style={{textAlign: 'right'}}>
        {formStates.buttonState ? 
          <Button variant="contained" color="primary" 
            style={{marginTop:'1rem'}} onClick={saveSermon} 
            disabled={formStates.saveSermonState}
          >
            {formStates.saveSermonText}
          </Button> : 

          <Button variant="contained" color="primary" 
            style={{marginTop:'1rem'}} onClick={updateSermon} 
            disabled={formStates.editSermonState}
          >
            {formStates.editSermonText}
          </Button>
        }
        
      </div>
      
    </AdminLayout>
  )
}

export default addSermon;
