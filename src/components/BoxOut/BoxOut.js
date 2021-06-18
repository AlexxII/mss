import React, { memo } from 'react'
import { Handle } from 'react-flow-renderer';

import Typography from '@material-ui/core/Typography';

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

export default memo(BoxOut)