import React from 'react'

import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 160,
    margin: '10px 0 5px 0'
  },
  textField: {
    width: '200px'
  }
}));

const EventForm = ({ first, setEvents, eventData, index }) => {
  const classes = useStyles();
  const addEvent = () => {
    setEvents((prevState) => ([
      ...prevState,
      {
        id: uuidv4(),
        type: 0,
        tlfReport: false,
        shtReport: false,
        comments: '',
        deadline: ''
      }
    ]))
  }
  const subEvent = () => {
    setEvents((prevState) => {
      return prevState.filter(item => (item.id !== eventData.id))
    })
  }

  const handleTitleChange = (e) => {
    const value = e.target.value
    setEvents(prevState => prevState.map(item => {
      if (item.id === eventData.id) {
        return {
          ...item,
          title: value
        }
      }
      return item
    }))
  }

  const handleDateChange = (e) => {
    const value = e.currentTarget.value
    setEvents(prevState => prevState.map(item => {
      if (item.id === eventData.id) {
        return {
          ...item,
          deadline: value
        }
      }
      return item
    }))
  }

  const handleTlfChange = (e) => {
    const state = e.target.checked
    setEvents(prevState => prevState.map(item => {
      if (item.id === eventData.id) {
        return {
          ...item,
          tlfReport: state
        }
      }
      return item
    }))
  }

  const handleShtChange = (e) => {
    const state = e.target.checked
    setEvents(prevState => prevState.map(item => {
      if (item.id === eventData.id) {
        return {
          ...item,
          shtReport: state
        }
      }
      return item
    }))
  }

  const handleCommentsChange = (e) => {
    const value = e.target.value
    setEvents(prevState => prevState.map(item => {
      if (item.id === eventData.id) {
        return {
          ...item,
          comments: value
        }
      }
      return item
    }))
  }

  return (
    <div className="event-type-details">
      {index + 1}
      <IconButton
        className="add-subevent-button"
        color="primary"
        aria-label="upload picture"
        component="span"
        onClick={first ? addEvent : subEvent}
      >
        {
          first ?
            <AddCircleOutlineIcon />
            :
            <HighlightOffIcon />
        }
      </IconButton>
      <FormControl className={classes.formControl} fullWidth>
        <TextField
          required
          fullWidth
          id="standard-basic"
          label="Наименование"
          defaultValue={eventData.title}
          onChange={handleTitleChange}
        />
      </FormControl>
      <div style={{ paddingTop: '10px' }}>
        <span style={{ paddingRight: '20px' }}>
          <TextField
            id="datetime-local"
            label="Deadline"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleDateChange}
          />
        </span>
        <FormControl component="fieldset">
          <FormLabel component="legend">Доклад</FormLabel>
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="top"
              control={
                <Checkbox
                  color="secondary"
                  checked={eventData.tlfReport}
                  onChange={handleTlfChange}
                />
              }
              label="ПТС"
              labelPlacement="end"
            />
            <FormControlLabel
              value="start"
              control={
                <Checkbox
                  color="secondary"
                  checked={eventData.shtReport}
                  onChange={handleShtChange}
                />
              }
              label="ШТ"
              labelPlacement="end"
            />
          </FormGroup>
        </FormControl>
        <FormControl className={classes.formControl} fullWidth>
          <TextField
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
            id="outlined-multiline-static"
            label="Комментарий"
            multiline
            rows={1}
            variant="outlined"
            onChange={handleCommentsChange}
          />
        </FormControl>
      </div>
    </div>
  )
}

export default EventForm