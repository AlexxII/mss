import React, { useState, memo, useEffect, Fragment } from 'react'
import { Handle } from 'react-flow-renderer';
import moment from 'moment';

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import UndoIcon from '@material-ui/icons/Undo';
import ConfirmDialog from '../../components/ConfirmDialog'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';

const BoxEvent = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [doneOpen, setDoneOpen] = useState(false)
  const [delOpen, setDelOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const pointEnterP = () => {
    setOpen(true)
  }
  const pointerLeaveP = () => {
    setOpen(false)
  }

  const handleDoneConfirn = () => {
    setDoneOpen(false)
    data.handleSimpleEventDone(data.id)
  }

  const handleInfoClick = () => {

  }

  const handleDel = () => {
    setDelOpen(true)
    setOpen(false)
  }

  const handleDelConfirn = () => {
    setDelOpen(false)
    data.handleSimpleEventDel(data.id)
  }

  const handleDone = () => {
    setDoneOpen(true)
    setOpen(false)
  }

  const handleAdd = () => {

  }

  const handleUndoDone = () => {
    data.handleUndoDone(data.id)
  }

  return (
    <div className={data.complete ? "event-box-wrap done" : "event-box-wrap"} onPointerEnter={pointEnterP} onPointerLeave={pointerLeaveP}>
      <ConfirmDialog
        open={doneOpen}
        close={() => setDoneOpen(false)}
        confirm={handleDoneConfirn}
        header="Подтвердить"
        message="Отметить как исполненное?"
      />
      <ConfirmDialog
        open={delOpen}
        close={() => setDelOpen(false)}
        confirm={handleDelConfirn}
        header="Подтвердить удаление"
        message="Вы уверены, что хотите удалить данное событие? Внимание! Эта операция не может быть отменена. Будьте внимательны."
      />
      <Handle
        type="target"
        position="left"
      />
      {data.complete &&
        <Tooltip title="Время доклада" arrow placement="bottom">
          <span className="date-complete">{data.completeTime.slice(0, -3)}</span>
        </Tooltip>
      }
      <Typography variant="h6">
        {data.label}
      </Typography>
      {open &&
        <Fragment>
          {data.complete !== true &&
            <Tooltip title="Отметить о выполнении" arrow placement="left">
              <IconButton aria-label="info" onClick={handleDoneConfirn} className="done-btn">
                <CheckCircleOutlineIcon />
              </IconButton>
            </Tooltip>
          }
          {data.complete &&
            <Tooltip title="Отменить исполнение" arrow placement="left">
              <IconButton aria-label="info" onClick={handleUndoDone} className="done-btn">
                <UndoIcon />
              </IconButton>
            </Tooltip>
          }
          <Tooltip title="Удалить" arrow placement="right">
            <IconButton aria-label="info" onClick={handleDel} className="del-btn">
              <HighlightOffIcon />
            </IconButton>
          </Tooltip>
        </Fragment>
      }
      <span className="service-wrap">
        {data.inTime &&
          <Tooltip title={`Получен - ${data.inTime}`} arrow>
            <IconButton aria-label="info" onClick={() => { }} size="small" className="time-btn">
              <QueryBuilderIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        }
        {data.comments &&
          <Tooltip title={data.comments}>
            <IconButton aria-label="info" onClick={handleInfoClick} size="small" className="info-btn">
              <InfoOutlinedIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        }
      </span>
      <Handle
        type="source"
        position="right"
        id="a"
        style={{ background: '#555' }}
      />
    </div>
  )
}

export default memo(BoxEvent)