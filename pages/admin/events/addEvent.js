import React, { useState, useEffect, useRef }  from 'react'
import { useSelector, useDispatch } from 'react-redux';
import AdminLayout from '../../../components/Admin/AdminLayout';
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { Button, Grid,FormControl, InputLabel,MenuItem, Select, TextField, Typography } from '@material-ui/core';
import {KeyboardDatePicker, MuiPickersUtilsProvider, DateTimePicker  } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

import validators from '../../../middlewares/validators';
import api from '../../../middlewares/axiosConfig';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: '100%',
  }
}));

export const addEvent = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const fileRef = useRef();
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const detailedEvents = useSelector(state => state.eventReducer.detailedEvents);

  useEffect(() => {
    checkIfEdit();
  }, []);


  const [formValues, setFormValues] = useState({
    file: "",
    imageSrc: "",
    id: 0,
    eventTitle: '',
    eventPreacher: '',
    eventDesc: '',
    eventFileName: '',
    eventVenue: '',
    eventType: '1',
    eventDate: new Date(),
    fileName: '',
    isNewFileUpload: false,
    category: ''
  });

  const [formStates, setFormStates] = useState({
    buttonState: true,
    saveEventText: "Add event",
    saveEventState: false,
    editEventState: false,
    editEventText: 'update event',
    titleError: false,
    titleErrorMsg: '',
    tutorError: false,
    tutorErrorMsg: '',
    descError: false,
    descErrorMsg: '',
    venueError: false,
    venueErrorMsg: '',
    typeError: false,
    typeErrorMsg: '',
    dateError: false,
    dateErrorMsg: '',
    formHeader: 'Add Event'
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

    if (extention == "png" || extention == "jpeg" || extention == "jpg" || extension == 'webp') {
      var reader = new FileReader();
      reader.onload = function (e) {
        setFormValues({ ...formValues, imageSrc: e.target.result,
          file: files[0], fileName: files[0].name, 
          isNewFileUpload : getEventIdFromRoute() ? true : false });
        
      }
      reader.readAsDataURL(files[0]);

    } else {
      Swal.fire({
        title: 'error',
        text: 'please select only image files with extentions of png, jpeg, jpg, and webp',
        icon: 'error',
        showCloseButton: true
      });

      return;
    }
    
  }

  const checkIfEdit = async () => {
    let eventId = getEventIdFromRoute();
    let localDetailedEvents = [...detailedEvents];

    if (eventId && localDetailedEvents.length < 1) {
      setFormStates({ ...formStates, buttonState: false, formHeader: 'Update Event' });

      let eventFromDb = await api.get(`/events/getEvent/${eventId}`).
        then(res => res)
        .catch(err => {
          Swal.fire({
            title: 'error',
            text: err ? err.data.msg : 'An error occured',
            icon: 'error',
            timer: 1500
          });

          return router.push('/admin/events');
        });

      let data = eventFromDb.data.data;
      setData(data);

    } else if (localDetailedEvents.length > 0) {
      let data = localDetailedEvents.find(value => value.id == eventId);
      if (data != undefined){
        setFormStates({ ...formStates, buttonState: false, formHeader: 'Update Event' });
        setFormValues({})
        setData(data);
      }
        
    }
  }

  function setData(data) {
    let formValuesCopy = { ...formValues };
    let fileName = data.eventFileName.split("uploads")[1];
    let copiedData = Object.assign(formValuesCopy, data);

    let domain = location.hostname.toLowerCase().includes('localhost') ? 
      'http://localhost:5000': 'https://api.daca.org.ng';

    copiedData.fileName = fileName;
    copiedData.imageSrc = `${domain}/${data.eventFileName}`;

    setFormValues(copiedData);
  }

  const getEventIdFromRoute = () => {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("edit")) {
      let search = location.search;
      let eventId = search.replace("?edit=", '');
      
      return eventId;
    }
    return false;
  }

  function checkEventTitle(e) {
    e ? e.preventDefault() : '';

    let id = 'event_title';
    let hasContent = validators.isRequired(id);
    setFormValues({ ...formValues, eventTitle: document.getElementById(id).value });

    if (hasContent) {
      setFormStates({ ...formStates, titleError: hasContent, titleErrorMsg: 'field is required' });

      return false;
    }

    setFormStates({ ...formStates, titleError: false, titleErrorMsg: '' });

    return true;
  }

  function checkFile() {

    if (formValues.file == "")
      return false;

    return true;
  }

  function checkTutor(e) {
    e ? e.preventDefault() : '';

    let id = 'event_tutor';
    let hasContent = validators.isRequired(id);
    setFormValues({ ...formValues, eventPreacher: document.getElementById(id).value });

    if (hasContent) {
      setFormStates({ ...formStates, tutorError: hasContent, tutorErrorMsg: 'field is required' });
      return false;
    }

    setFormStates({ ...formStates, tutorError: false, tutorErrorMsg: '' });
    return true;
  }

  function checkEventVenue(e) {
    e ? e.preventDefault() : '';

    let id = 'event_venue';
    let hasContent = validators.isRequired(id);
    setFormValues({ ...formValues, eventVenue: document.getElementById(id).value });

    if (hasContent) {
      setFormStates({ ...formStates, venueError: hasContent, venueErrorMsg: 'field is required' });
      return false;
    }

    setFormStates({ ...formStates, venueError: false, venueErrorMsg: '' });
    return true;
  }
  
  function setOtherForm(e) {
    e.preventDefault();

    switch (e.target.id) {
      case "category":
        setFormValues({ ...formValues, category: e.target.value });
        break;

      case "event_desc":
        setFormValues({ ...formValues, eventDesc: e.target.value });
        break;
    
      default:
        break;
    }
  }
  const saveEvent = () => {
    if (!checkEventTitle() || !checkTutor() || !checkEventVenue()) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all required fields',
        icon: 'error',
        confirmButtonText: 'Ok'
      });

      return;
    }

    setFormStates({ ...formStates, saveEventState: true, saveEventText: 'loading...' });

    const formData = new FormData();
    formData.append('image', formValues.file);
    formData.append('eventTitle', formValues.eventTitle);
    formData.append('eventPreacher', formValues.eventPreacher);
    formData.append('eventDesc', formValues.eventDesc);
    formData.append('eventVenue', formValues.eventVenue);
    formData.append('eventType', formValues.eventType);
    formData.append('eventDate', formValues.eventDate);

    api.post("/events/addEvent", formData)
      .then(() => {
        Swal.fire({
          title: 'success',
          text: 'Successfully added an event',
          icon: 'success',
          timer: 2500,
          confirmButtonText: 'ok'
        });

        router.push("/admin/events");

      }).catch (err => {
        Swal.fire({
          title: 'error',
          text: err ? err.data.msg : 'an error occured',
          icon: 'error',
          timer: 3000,
          confirmButtonText: 'ok'
        });

        setFormStates({ ...formStates, saveEventState: false, saveEventText: 'Add Event' });
      });
  }

  const updateEvent = () => {
    if (!checkEventTitle() || !checkTutor() || !checkEventVenue()) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all required fields',
        icon: 'error',
        confirmButtonText: 'Ok'
      });

      return;
    }

    setFormStates({ ...formStates, editEventState: true, editEventText: 'loading...' });

    const formData = new FormData();
    formData.append('image', formValues.file);
    formData.append('eventTitle', formValues.eventTitle);
    formData.append('eventPreacher', formValues.eventPreacher);
    formData.append('eventDesc', formValues.eventDesc);
    formData.append('eventVenue', formValues.eventVenue);
    formData.append('eventType', formValues.eventType);
    formData.append('eventDate', formValues.eventDate);
    formData.append('isNewFileUpload', formValues.isNewFileUpload);
    formData.append('id', getEventIdFromRoute());
    
    api.post("/events/editEvent", formData)
      .then(() => {
        Swal.fire({
          title: 'success',
          text: 'Successfully edited a event',
          icon: 'success',
          timer: 2500,
          confirmButtonText: 'ok'
        });

        router.push("/admin/events");
      }).catch (err => {
        Swal.fire({
          title: 'error',
          text: err ? err.data.msg : 'an error occured',
          icon: 'error',
          timer: 3000,
          confirmButtonText: 'ok'
        });

        setFormStates({ ...formStates, editSermonState: false, editSermonText: 'update event' });
      });
  }

  return (
    <AdminLayout>
      <Typography variant="h5" style={{marginBottom:'1rem', fontWeight: '500'}}>
         {formStates.formHeader}
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={4}>
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
                component="span" >
                Choose Files
              </Button>
            </label>

            {formValues.imageSrc ? (
              <div style={{width: '100%', marginTop: '1rem'}}>
                <img src={formValues.imageSrc} alt='preview' style={{width: 'inherit'}} />
              </div>
            ) : (
              <span>No file selected</span>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <TextField 
                fullWidth 
                id="event_title"
                label="Event Title" 
                variant="outlined" 
                required 
                autoFocus
                error={formStates.titleError}
                helperText={formStates.titleErrorMsg}
                onChange={checkEventTitle}
                value={formValues.eventTitle}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField 
                fullWidth 
                id="event_tutor" 
                label="Preacher" 
                variant="outlined"
                error={formStates.tutorError}
                helperText={formStates.tutorErrorMsg}
                onChange={checkTutor}
                required
                value={formValues.eventPreacher}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                id="event_type"
                value={formValues.eventType}
                onChange={e => setFormValues({ ...formValues, eventType: e.target.value }) }
                fullWidth
                variant="outlined"
                error={formStates.typeError}
                helperText={formStates.typeErrorMsg}
                required
                inputRef={inputRef}
                label="Type"
              >
                <MenuItem value={1}>Others</MenuItem>
                <MenuItem value={2}>Crusade</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                id="event_venue"
                label="Event Venue" 
                variant="outlined" 
                required 
                autoFocus
                error={formStates.venueError}
                helperText={formStates.venueErrorMsg}
                onChange={checkEventVenue}
                value={formValues.eventVenue}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  variant="inline"
                  clearable="true"
                  placeholder="10/10/2018"
                  autoOk={true}
                  id="date"
                  label="* Date and time"
                  inputVariant="outlined"
                  minDate={new Date()}
                  fullWidth={true}
                  value={formValues.eventDate}
                  onChange={date => setFormValues({ ...formValues, eventDate:date })}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} style={{marginTop: '1rem'}}>
              <TextField
                placeholder="Description"
                multiline
                id="event_desc"
                rows={2}
                rowsMax={4}
                fullWidth
                variant="outlined"
                onChange={setOtherForm}
                value={formValues.eventDesc}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <div style={{textAlign: 'right'}}>
        {formStates.buttonState ? 
          <Button variant="contained" color="primary" 
            style={{marginTop:'1rem'}} onClick={saveEvent} 
            disabled={formStates.saveEventState}
          >
            {formStates.saveEventText}
          </Button> : 

          <Button variant="contained" color="primary" 
            style={{marginTop:'1rem'}} onClick={updateEvent} 
            disabled={formStates.editEventState}
          >
            {formStates.editEventText}
          </Button>
        }
        
      </div>
      
    </AdminLayout>
  )
}

export default addEvent;
