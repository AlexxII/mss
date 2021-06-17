import React, { useState } from 'react'
import { Handle } from 'react-flow-renderer';

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';

const BoxMain = ({ data }) => {

  return (
    <div className="input-box-event">
      <Typography variant="h6" gutterBottom>
        {data.label}
      </Typography>
      <Handle
        type="source"
        position="right"
        id="a"
        style={{ background: '#555' }}
      />
    </div>
  )
}

export default BoxMain