import React, { Fragment, useState, memo } from 'react'
import moment from 'moment';

import { Handle } from 'react-flow-renderer';

import Typography from '@material-ui/core/Typography';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const BoxIn = ({ data }) => {
  const handleInfoClick = () => {
    
  }

  return (
    <div className="input-box-event">
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