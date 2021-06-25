import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { v4 as uuidv4 } from 'uuid';

import EventForm from '../EventForm'

const AddEventsDialog = ({ open, save, close }) => {
  const [events, setEvents] = useState(null)
  const [direction, setDirection] = useState(true)

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
    save({
      events,
      direction
    })
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
          <DialogTitle style={{ padding: '16px 24px 0 24px' }} id="form-dialog-title">Добавить события
            <FormControlLabel
              value="start"
              control={
                <Switch
                  color="primary"
                  checked={direction}
                  onChange={() => setDirection(prevState => !prevState)}
                />}
              label="Вставить: до"
              labelPlacement="start"
            />
            <span style={{
              paddingLeft: '10px',
              fontSize: '16px'
            }}>после</span>
          </DialogTitle>
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
    </div >
  );
}

export default AddEventsDialog