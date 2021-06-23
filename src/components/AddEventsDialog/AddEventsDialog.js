import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';

import EventForm from '../EventForm'

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

const AddEventsDialog = ({ open, save, close }) => {
  const classes = useStyles();
  const [events, setEvents] = useState(null)

  const handleSave = (e) => {
    e.preventDefault()
    // обнуляем стейт
    setEvents([{
      id: uuidv4(),
      title: '',
      tlfReport: false,
      shtReport: false,
      comments: '',
      deadline: ''
    }])
    save(events)
    close()
  }

  useEffect(() => {
    setEvents([{
      id: uuidv4(),
      title: '',
      tlfReport: false,
      shtReport: false,
      comments: '',
      deadline: ''
    }])
  }, [])

  const handleClose = () => {
    setEvents([{
      id: uuidv4(),
      title: '',
      tlfReport: false,
      shtReport: false,
      comments: '',
      deadline: ''
    }])
    close()
  }

  useEffect(() => {
  }, [])

  if (!events) return null

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
          <DialogTitle style={{ padding: '16px 24px 0 24px' }} id="form-dialog-title">Добавить события</DialogTitle>
          <DialogContent>
            {events.map((item, index) => (
              <EventForm key={item.id} eventData={item} setEvents={setEvents} first={index === 0} index={index} />
            ))}
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

export default AddEventsDialog