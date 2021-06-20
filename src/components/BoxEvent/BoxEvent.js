import React, { useState, memo, useEffect } from 'react'
import { Handle } from 'react-flow-renderer';
import moment from 'moment';

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';

const BoxEvent = ({ data }) => {
  const handleInfoClick = () => {

  }

  const handleDone = () => {
    console.log(data);
  }

  return (
    <div className="main-box-wrap">
      <Handle
        type="target"
        position="left"
      />
      <Typography variant="h6">
        {data.label}
      </Typography>
      <span className="service-wrap">
        {data.comments &&
          <Tooltip title={data.comments}>
            <IconButton aria-label="info" onClick={handleInfoClick} size="small" className="info-btn">
              <InfoOutlinedIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        }
        <IconButton aria-label="info" onClick={handleDone} size="small" className="done-btn">
          <CheckCircleOutlineIcon fontSize="inherit" />
        </IconButton>
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