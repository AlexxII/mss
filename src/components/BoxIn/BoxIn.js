import React, { Fragment, useState, memo } from 'react'
import moment from 'moment';
import { Handle } from 'react-flow-renderer';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import ConfirmDialog from '../../components/ConfirmDialog'
import UpdateInDialog from '../../components/UpdateInDialog'
import AddChainDialog from '../../components/AddChainDialog'

const BoxIn = ({ data }) => {
  const [open, setOpen] = useState(false)
  const [delOpen, setDelOpen] = useState(false)
  const [updateOpen, setUpdateOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)

  const pointEnterP = () => {
    setOpen(true)
  }
  const pointerLeaveP = () => {
    setOpen(false)
  }

  const handleAdd = () => {
    setAddOpen(true)
    setOpen(false)
  }

  const handleAddSave = (subEvents) => {
    data.handleAddChain(subEvents)
    setAddOpen(false)
  }

  const handleUpdate = () => {
    setUpdateOpen(true)
    setOpen(false)
  }

  const handleUpdateSave = (inData) => {
    setUpdateOpen(false)
    data.handleInUpdate(inData)
  }

  const handleDel = () => {
    setDelOpen(true)
    setTimeout(() => {
      setOpen(false)
    }, 150)
  }

  const handleConfirm = () => {
    setOpen(false)
    setDelOpen(false)
    data.handleMainDel(data)
  }

  const handleInfoClick = () => {

  }
  
  return (
    <div className="input-box-event" onPointerEnter={pointEnterP} onPointerLeave={pointerLeaveP}>
      <ConfirmDialog
        open={delOpen}
        close={() => setDelOpen(false)}
        confirm={handleConfirm}
        header="Подтвердить удаление"
        message="Вы уверены, что хотите удалить ВСЮ вводную? Внимание! Эта операция не может быть отменена. Будьте внимательны."
      />
      <UpdateInDialog
        open={updateOpen}
        close={() => setUpdateOpen(false)}
        save={handleUpdateSave}
        data={data}
      />
      <AddChainDialog
        open={addOpen}
        inId={data.id}
        close={() => setAddOpen(false)}
        save={handleAddSave}
      />
      <span className="date">{moment(new Date(data.date)).format("DD.MM.YYYY HH:mm")}</span>
      <Typography variant="h6">
        {data.label.length > 10 ?
          <Fragment>
            {data.label.slice(0, 9) + '...'}
          </Fragment>
          :
          data.label
        }
      </Typography>
      {open &&
        <Fragment>
          <Tooltip title="Добавить" arrow placement="top">
            <IconButton aria-label="info" onClick={handleAdd} className="add-btn">
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Обновить" arrow placement="top">
            <IconButton aria-label="info" onClick={handleUpdate} className="update-btn">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Удалить вводную" arrow placement="top">
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

export default memo(BoxIn)