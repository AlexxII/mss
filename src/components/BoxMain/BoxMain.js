import React, { Fragment, useState, memo, useEffect } from 'react'
import { Handle } from 'react-flow-renderer';
import moment from 'moment';

import Typography from '@material-ui/core/Typography';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import ConfirmDialog from '../../components/ConfirmDialog'

const BoxMain = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [doneOpen, setDoneOpen] = useState(false)

  const pointEnterP = () => {
    setOpen(true)
  }
  const pointerLeaveP = () => {
    setOpen(false)
  }

  useEffect(() => {
    const till = moment(new Date(data.deadline))
    const noww = new moment()
    const dif = till.diff(noww, 'minutes')
  }, [])

  const handleDel = () => {
    // setDelOpen(true)
    setTimeout(() => {
      setOpen(false)
    }, 150)
  }

  const handleInfoClick = () => {

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
      <ConfirmDialog
        open={doneOpen}
        close={() => setDoneOpen(false)}
        confirm={handleConfirm}
        header="Подтвердить"
        message="Отметить как исполненное?"
      />
      <div className="main-box-wrap" onPointerEnter={pointEnterP} onPointerLeave={pointerLeaveP}>
        <Handle
          type="target"
          position="left"
        />
        {data.complete !== true &&
          <span className="date">{moment(new Date(data.deadline)).format("DD.MM.YYYY HH:mm")}</span>
        }
        {data.complete &&
          <Tooltip title="Время завершения" arrow placement="bottom">
            <span className="date-complete">{data.completeTime}</span>
          </Tooltip>
        }
        {open &&
          <Fragment>
            <Tooltip title="Добавить" arrow placement="top">
              <IconButton aria-label="info" onClick={() => { }} className="add-btn">
                <AddCircleOutlineIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Редактировать" arrow placement="top">
              <IconButton aria-label="info" onClick={() => { }} className="update-btn">
                <EditIcon />
              </IconButton>
            </Tooltip>
            {data.complete !== true &&
              <Tooltip title="Отметить о выполнении" arrow placement="top">
                <IconButton aria-label="info" onClick={handleDone} className="done-btn">
                  <CheckCircleOutlineIcon />
                </IconButton>
              </Tooltip>
            }
          </Fragment>
        }
        <Typography variant="h6">
          {data.label}
        </Typography>
        <span className="service-wrap">
          {data.comments &&
            <Tooltip title="Просмотр" arrow>
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

export default BoxMain