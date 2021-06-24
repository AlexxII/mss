import React, { Fragment, useState, memo, useEffect } from 'react'
import { Handle } from 'react-flow-renderer';
import moment from 'moment';

import Typography from '@material-ui/core/Typography';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';

import UpdateMainboxDialog from '../../components/UpdateMainboxDialog';
import ConfirmDialog from '../../components/ConfirmDialog'
import AddEventsDialog from '../../components/AddEventsDialog'

import eventsTypes from '../../constants/inarray'

const BoxMain = ({ data }) => {
  const [eTypes] = useState(eventsTypes.reduce((acum, item) => {
    acum[item.id] = item
    return acum
  }, {}))
  const [open, setOpen] = useState(false);
  const [doneOpen, setDoneOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const [updateOpen, setUpdateOpen] = useState(false)
  const [timer, setTimer] = useState(false)
  const [timeAlert, setTimeAlert] = useState(false)

  const pointEnterP = () => {
    setOpen(true)
  }
  const pointerLeaveP = () => {
    setOpen(false)
  }

  useEffect(() => {
    setTimer(countDiffDuration(data.deadline))
    setTimeout(() => {
      setTimer(countDiffDuration(data.deadline))
    }, 1000 * 60)
  })

  if (!eTypes || !data) return null

  const countDiffDuration = (end) => {
    const till = moment(new Date(end))
    const curTime = new moment()
    const duration = moment.duration(till.diff(curTime))
    const milSec = duration.asMilliseconds()
    if (milSec < 660000) {
      setTimeAlert(true)
    } else {
      setTimeAlert(false)
    }
    const hours = parseInt(duration.asHours())
    const minutes = parseInt(duration.asMinutes()) % 60
    return hours ? `${hours} ч ${minutes} мин` : `${minutes} мин`
  }

  const handleInfoClick = () => {

  }

  const handleAdd = () => {
    setAddOpen(true)
  }

  const handleAddConfirm = (events) => {
    setAddOpen(false)
    data.handleEventAdd({
      parent: {
        source: data.id,
        inId: data.inId,
        outId: data.outId
      },
      events
    })
  }

  const handleUpdate = () => {
    setUpdateOpen(true)
  }

  const handleUpdateConfirm = (upData) => {
    setUpdateOpen(false)
    data.handleMainUpdate(upData)
  }

  const handleDone = () => {
    setDoneOpen(true)
  }

  const handleConfirm = () => {
    setDoneOpen(false)
    data.handleDone(data)
  }

  return (
    <Fragment>
      <AddEventsDialog
        open={addOpen}
        save={handleAddConfirm}
        close={() => setAddOpen(false)}
      />
      <ConfirmDialog
        open={doneOpen}
        close={() => setDoneOpen(false)}
        confirm={handleConfirm}
        header="Подтвердить"
        message="Отметить как исполненное?"
      />
      <UpdateMainboxDialog
        open={updateOpen}
        close={() => setUpdateOpen(false)}
        save={handleUpdateConfirm}
        data={data}
      />
      <div className={data.complete ? "main-box-wrap done" : "main-box-wrap"} onPointerEnter={pointEnterP} onPointerLeave={pointerLeaveP}>
        <Handle
          type="target"
          position="left"
        />
        {data.complete !== true &&
          <span className="date">{moment(new Date(data.deadline)).format("DD.MM.YYYY HH:mm")}</span>
        }
        {data.complete &&
          <Tooltip title="Время завершения" arrow placement="bottom">
            <span className="date-complete">{data.completeTime.slice(0, -3)}</span>
          </Tooltip>
        }
        {open &&
          <Fragment>
            <Tooltip title="Добавить" arrow placement="top">
              <IconButton aria-label="info" onClick={handleAdd} className="add-btn">
                <AddCircleOutlineIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Редактировать" arrow placement="top">
              <IconButton aria-label="info" onClick={handleUpdate} className="update-btn">
                <EditIcon />
              </IconButton>
            </Tooltip>
            {data.complete !== true &&
              <Tooltip title="Отметить о выполнении" arrow placement="top">
                <IconButton aria-label="info" onClick={handleConfirm} className="done-btn">
                  <CheckCircleOutlineIcon />
                </IconButton>
              </Tooltip>
            }
          </Fragment>
        }
        {(open || timeAlert) && data.complete !== true &&
          <div className={timeAlert ? "timer alert" : "timer"}>{timer}</div>
        }
        <Typography variant="h6">
          {eTypes[data.type].title}
        </Typography>
        <span className="service-wrap">
          {data.inTime &&
            <Tooltip title={`Получен - ${data.inTime}`} arrow>
              <IconButton aria-label="info" onClick={() => { }} size="small" className="time-btn">
                <QueryBuilderIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          }
          {data.comments &&
            <Tooltip title={data.comments} arrow>
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
    </Fragment>
  )
}

export default memo(BoxMain)