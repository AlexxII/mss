import React, { useState } from 'react'
import { Handle } from 'react-flow-renderer';

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';

const BoxOut = ({ data }) => {

  return (
    <div className="out-box-event">
      <Typography variant="h6" gutterBottom>
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

export default BoxOut