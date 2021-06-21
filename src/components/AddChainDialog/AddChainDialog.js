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

import SubEventForm from '../SubEventForm'

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

const AddChainDialog = ({ open, save, mainId, close }) => {
  const classes = useStyles();
  const [subEvents, setSubEvents] = useState(null)

  const handleSave = (e) => {
    e.preventDefault()
    // обнуляем стейт
    setSubEvents([{
      id: uuidv4(),
      type: 0,
      tlfReport: false,
      shtReport: false,
      comments: '',
      deadline: ''
    }])
    save({
      mainId,
      subEvents
    })
  }

  useEffect(() => {
    setSubEvents([{
      id: uuidv4(),
      type: 0,
      tlfReport: false,
      shtReport: false,
      comments: '',
      deadline: ''
    }])
  }, [])

  const handleClose = () => {
    setSubEvents([{
      id: uuidv4(),
      type: 0,
      tlfReport: false,
      shtReport: false,
      comments: '',
      deadline: ''
    }])
    close()
  }

  useEffect(() => {
  }, [])

  if (!subEvents) return null

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
            {subEvents.map((item, index) => (
              <SubEventForm key={item.id} eventData={item} setSubEvents={setSubEvents} first={index === 0} index={index} />
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

export default AddChainDialog