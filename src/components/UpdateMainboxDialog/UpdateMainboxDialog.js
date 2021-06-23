import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import eventsTypes from '../../constants/inarray'

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 160,
    margin: '10px 0 5px 0'
  },
  timeforms: {
    margin: '10px 5px 0 -5px'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    width: '200px'
  }
}));

const UpdateMainboxDialog = ({ open, save, data, close }) => {
  const classes = useStyles();
  const [eventData, setEventData] = useState(null)

  useEffect(() => {
    if (open) {
      setEventData({
        id: data.id,
        type: data.type,
        deadline: data.deadline,
        comments: data.comments,
        complete: data.complete
      })
    }
  }, [open])

  if (!eventData || !open) return null

  const handleSave = (e) => {
    e.preventDefault()
    setEventData(null)
    save(eventData)
  }

  const handleClose = () => {
    close()
  }

  const handleTypeChange = (e) => {
    const value = e.target.value
    setEventData(prevState => ({
      ...prevState,
      type: value
    }))
  }

  const handleSwitcher = (e) => {
    setEventData(prevState => ({
      ...prevState,
      complete: !prevState.complete
    }))
  }

  const handleData = (e) => {
    setEventData(
      {
        ...eventData,
        deadline: e.currentTarget.value
      }
    )
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"sm"}
        fullWidth
        disableBackdropClick
        disableEscapeKeyDown
      >
        <form onSubmit={handleSave}>
          <DialogTitle style={{ padding: '16px 24px 0 24px' }} id="form-dialog-title">Обновить вводную</DialogTitle>
          <DialogContent>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel htmlFor="age-native-helper">Тип вводной</InputLabel>
              <NativeSelect
                value={eventData.type}
                required
                onChange={handleTypeChange}
              >
                <option aria-label="None" value="" />
                {eventsTypes.map(option => (
                  <option key={option.id} value={option.id}>{option.title}</option>
                ))}
              </NativeSelect>
            </FormControl>
            <p></p>
            <span style={{ paddingRight: '20px' }}>
              <TextField
                required
                id="datetime-local"
                label="Deadline"
                type="datetime-local"
                defaultValue={eventData.deadline}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleData}
              />
            </span>
            <FormControl component="fieldset">
              <FormLabel component="legend">Отработано</FormLabel>
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="top"
                  control={
                    <Switch
                      checked={eventData.complete}
                      onChange={handleSwitcher}
                    />
                  }
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
                rows={2}
                variant="outlined"
                defaultValue={eventData.comments}
                onChange={(e) => {
                  setEventData(
                    {
                      ...eventData,
                      comments: e.currentTarget.value
                    }
                  )
                }}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Отмена
            </Button>
            <Button type="submit" color="primary">
              Сохранить
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default UpdateMainboxDialog