import React, { useState, memo, useEffect, Fragment } from 'react'
import { Handle } from 'react-flow-renderer';
import moment from 'moment';

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import ConfirmDialog from '../../components/ConfirmDialog'

const BoxEvent = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [doneOpen, setDoneOpen] = useState(false)
  const pointEnterP = () => {
    setOpen(true)
  }
  const pointerLeaveP = () => {
    setOpen(false)
  }

  const handleDoneConfirn = () => {
    setDoneOpen(false)
    console.log(data);
  }

  const handleInfoClick = () => {

  }

  const handleDel = () => {

  }

  const handleDone = () => {
    setDoneOpen(true)
    setOpen(false)
    console.log(data);
  }

  return (
    <div className="event-box-wrap" onPointerEnter={pointEnterP} onPointerLeave={pointerLeaveP}>
      <ConfirmDialog
        open={doneOpen}
        close={() => setDoneOpen(false)}
        confirm={handleDoneConfirn}
        header="Подтвердить"
        message="Отметить как исполненное?"
      />
      <Handle
        type="target"
        position="left"
      />
      <Typography variant="h6">
        {data.label}
      </Typography>
      {open &&
        <Fragment>
          {data.complete !== true &&
            <Tooltip title="Отметить о выполнении" arrow placement="right">
              <IconButton aria-label="info" onClick={handleDone} className="done-btn">
                <CheckCircleOutlineIcon />
              </IconButton>
            </Tooltip>
          }
          <Tooltip title="Удалить" arrow placement="left">
            <IconButton aria-label="info" onClick={handleDel} className="del-btn">
              <HighlightOffIcon />
            </IconButton>
          </Tooltip>
        </Fragment>
      }
      <span className="service-wrap">
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