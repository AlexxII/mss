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
import NativeSelect from '@material-ui/core/NativeSelect';
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
                <option aria-label="None" value=""/>
                <option value={10}>Вводная 1</option>
                <option value={20}>Вводная 2</option>
                <option value={30}>Вводная 3</option>
                <option value={40}>Вводная 4</option>
                <option value={50}>Вводная 5</option>
                <option value={60}>Вводная 6</option>
                <option value={70}>Вводная 7</option>
                <option value={80}>Вводная 8</option>
                <option value={90}>Вводная 9</option>
              </NativeSelect>
              <FormHelperText>Выберите тип вводной</FormHelperText>
            </FormControl>
            <Grid container justify="space-around" spacing={2} className={classes.timeforms}>
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
            </Grid>
            <FormControl className={classes.formControl}>
              <FormControlLabel
                control={<Checkbox
                  checked={eventData.tlfReport}
                  onChange={(e) => {
                    setEventData(
                      {
                        ...eventData,
                        tlfReport: e.currentTarget.checked
                      }
                    )
                  }}
                  name="tlg" />
                }
                label="Доклад по телефону"
              />
              <FormControlLabel
                control={<Checkbox
                  checked={eventData.shtReport}
                  onChange={(e) => {
                    setEventData(
                      {
                        ...eventData,
                        shtReport: e.currentTarget.checked
                      }
                    )
                  }}
                  name="sht" />}
                label="Шифротелеграмма"
              />
            </FormControl>
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