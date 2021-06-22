import React, { memo, useState } from 'react'
import { Handle } from 'react-flow-renderer';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Tooltip from '@material-ui/core/Tooltip';

import ConfirmDialog from '../../components/ConfirmDialog'

const BoxOut = ({ data }) => {
  const [open, setOpen] = useState(false)
  const [delOpen, setDelOpen] = useState(false)

  const handleDel = () => {
    setDelOpen(true)
    setOpen(false)
  }
  const pointEnterP = () => {
    setOpen(true)
  }
  const pointerLeaveP = () => {
    setOpen(false)
  }

  const handleConfirm = () => {
    setDelOpen(false)
    data.handleChainDel(data)
  }

  return (
    <div className="out-box-event" onPointerEnter={pointEnterP} onPointerLeave={pointerLeaveP}>
      <ConfirmDialog
        open={delOpen}
        close={() => setDelOpen(false)}
        confirm={handleConfirm}
        header="Подтвердить удаление"
        message="Вы уверены, что хотите удалить цепочку событий? Внимание! Эта операция не может быть отменена. Будьте внимательный."
      />
      {open &&
        <Tooltip title="Удалить цепочку" arrow placement="right">
          <IconButton aria-label="info" onClick={handleDel} className="del-btn">
            <HighlightOffIcon />
          </IconButton>
        </Tooltip>
      }
      <Typography variant="h6" className="animate__shakeX">
        {data.label}
      </Typography>
      <Handle
        type="target"
        position="left"
        style={{ background: '#555' }}
      />
    </div>
  )
}

export default memo(BoxOut)