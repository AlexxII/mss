import React, { memo } from 'react'
import { Handle } from 'react-flow-renderer';

import Typography from '@material-ui/core/Typography';

const BoxEvent = ({ data }) => {
  return (
    <div className="event-box-wrap">
      <Handle
        type="target"
        position="left"
        style={{ background: '#555' }}
      />
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

export default memo(BoxEvent)