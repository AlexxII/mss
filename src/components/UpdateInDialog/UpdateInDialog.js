import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

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

const AddDialog = ({ open, save, data, close }) => {
  const classes = useStyles();
  const [eventData, setEventData] = useState(null)

  useEffect(() => {
    if (open) {
      setEventData({
        id: data.id,
        inputTime: data.date,
        title: data.label,
        comments: data.comments
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
              <TextField
                required
                fullWidth
                id="standard-basic"
                label="Наименование"
                defaultValue={eventData?.title}
                onChange={(e) => {
                  setEventData(prevState => ({
                    ...prevState,
                    title: e.target.value
                  }))
                }}
              />
            </FormControl>
            <p></p>
            <TextField
              required
              id="datetime-local"
              label="Время получения"
              type="datetime-local"
              defaultValue={eventData.inputTime}
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

export default AddDialog