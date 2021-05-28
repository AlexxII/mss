import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

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

const AddSubeventForm = ({ setEventData, eventData }) => {
  const classes = useStyles();

  return (
    <div className="event-type-details">
      <IconButton
        className="add-subevent-button"
        color="primary"
        aria-label="upload picture"
        component="span"
      >
        <AddCircleOutlineIcon />
      </IconButton>
      <FormControl className={classes.formControl} fullWidth>
        <InputLabel htmlFor="age-native-helper">Тип вводной</InputLabel>
        <NativeSelect
          value={null}
          required
          inputProps={{
            name: 'age',
            id: 'age-native-helper',
          }}
          onChange={(e) => {
            setEventData(
              {
                ...eventData,
                eventType: e.currentTarget.value
              }
            )
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>ОСС</option>
          <option value={20}>СИО</option>
          <option value={30}>ИБ</option>
        </NativeSelect>
      </FormControl>
      <div style={{ paddingTop: '10px' }}>
        <span style={{ paddingRight: '20px' }}>
          <TextField
            required
            id="datetime-local"
            label="Deadline"
            type="datetime-local"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setEventData(
                {
                  ...eventData,
                  endDate: e.currentTarget.value
                }
              )
            }}
          />
        </span>
        <FormControl component="fieldset">
          <FormLabel component="legend">Доклад</FormLabel>
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="top"
              control={<Checkbox color="secondary" />}
              label="ПТС"
              labelPlacement="right"
            />
            <FormControlLabel
              value="start"
              control={<Checkbox color="secondary" />}
              label="ШТ"
              labelPlacement="right"
            />
          </FormGroup>
        </FormControl>
      </div>
    </div>
  )
}


const AddDialog = ({ open, setOpen, save }) => {
  const classes = useStyles();
  const [eventData, setEventData] = useState(null)

  const handleSave = (e) => {
    e.preventDefault()
    save(eventData)
  }

  useEffect(() => {
    var dateTime = new Date()
    dateTime.setTime(dateTime.getTime() - dateTime.getTimezoneOffset() * 60 * 1000)
    const date = dateTime.toISOString().slice(0, 16)
    setEventData({
      startDate: date,
      tlfReport: true,
      shtReport: true
    })
  }, [])

  if (!eventData) return null

  return (
    <div>
      <Dialog
        open={open}
        // onClose={() => setOpen(false)}
        maxWidth={"md"}
      >
        <form onSubmit={handleSave}>
          <DialogTitle style={{ padding: '16px 24px 0 24px' }} id="form-dialog-title">Добавить вводную</DialogTitle>
          <DialogContent>
            <FormControl className={classes.formControl} fullWidth>
              <TextField
                fullWidth
                id="standard-basic"
                label="Наименование"
              />
              <FormHelperText>Укажите наименование вводной</FormHelperText>
            </FormControl>
            <TextField
              required
              id="datetime-local"
              label="Время получения"
              type="datetime-local"
              defaultValue={eventData.startDate}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setEventData(
                  {
                    ...eventData,
                    inputTime: e.currentTarget.value
                  }
                )
              }}
            />
            <AddSubeventForm />
            <FormControl className={classes.formControl} fullWidth>
              <TextField
                InputLabelProps={{
                  shrink: true
                }}
                fullWidth
                id="outlined-multiline-static"
                label="Комментарии"
                multiline
                rows={2}
                variant="outlined"
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
            <Button onClick={() => setOpen(false)} color="primary">
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

export default AddDialog