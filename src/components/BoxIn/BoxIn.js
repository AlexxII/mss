import React, { useState } from 'react'
import { Handle } from 'react-flow-renderer';

import Typography from '@material-ui/core/Typography';

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