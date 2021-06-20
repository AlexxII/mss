import React, { Fragment, useState, memo, useEffect } from 'react'
import { Handle } from 'react-flow-renderer';
import moment from 'moment';

import Typography from '@material-ui/core/Typography';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';

import ConfirmDialog from '../../components/ConfirmDialog'

const BoxMain = ({ data }) => {
  const [open, setOpen] = useState(false);

  console.log(data.complete);
  useEffect(() => {
    const till = moment(new Date(data.deadline))
    const noww = new moment()
    const dif = till.diff(noww, 'minutes')
    console.log(dif);
  }, [])

  const handleInfoClick = () => {

  }

  const handleDone = () => {
    setOpen(true)
  }

  const handleConfirm = () => {
    setOpen(false)
    data.handleDone(data)
  }

  return (
    <Fragment>
      <ConfirmDialog
        open={open}
        close={() => setOpen(false)}
        confirm={handleConfirm}
        header="Подтвердить"
        message="Отметить как исполненное?"
      />
      <div className="main-box-wrap">
        <Handle
          type="target"
          position="left"
        />
        {data.complete !== true &&
          <Tooltip title="Время доклада" arrow placement="top">
            <span className="date">{moment(new Date(data.deadline)).format("DD.MM.YYYY HH:mm")}</span>
          </Tooltip>
        }
        {data.complete &&
          <Tooltip title="Время завершения" arrow placement="bottom">
            <span className="date-complete">{data.completeTime}</span>
          </Tooltip>
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
          {data.complete !== true &&
            <Tooltip title="Выполнить" arrow>
              <IconButton aria-label="info" onClick={handleDone} size="small" className="done-btn">
                <CheckCircleOutlineIcon fontSize="inherit" />
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