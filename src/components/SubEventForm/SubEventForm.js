import React from 'react'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';

import eventsTypes from '../../constants/inarray'

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 160,
    margin: '10px 0 5px 0'
  },
  textField: {
    width: '200px'
  }
}));

const SubEventForm = ({ first, setSubEvents, eventData, index }) => {
  const classes = useStyles();
  const addEvent = () => {
    setSubEvents((prevState) => ([
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
    setSubEvents((prevState) => {
      return prevState.filter(item => (item.id !== eventData.id))
    })
  }

  const handleTypeChange = (e) => {
    const value = e.target.value
    setSubEvents(prevState => prevState.map(item => {
      if (item.id === eventData.id) {
        return {
          ...item,
          type: value
        }
      }
      return item
    }))
  }

  const handleDateChange = (e) => {
    const value = e.currentTarget.value
    setSubEvents(prevState => prevState.map(item => {
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
    setSubEvents(prevState => prevState.map(item => {
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
    setSubEvents(prevState => prevState.map(item => {
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
    setSubEvents(prevState => prevState.map(item => {
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
        <InputLabel htmlFor="age-native-helper">Тип вводной</InputLabel>
        <NativeSelect
          value={null}
          required
          onChange={handleTypeChange}
        >
          <option aria-label="None" value="" />
          {eventsTypes.map(option => (
            <option key={option.id} value={option.id}>{option.title}</option>
          ))}
        </NativeSelect>
      </FormControl>
      <div style={{ paddingTop: '10px' }}>
        <span style={{ paddingRight: '20px' }}>
          <TextField
            required
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

export default SubEventForm