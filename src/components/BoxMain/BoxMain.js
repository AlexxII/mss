import React from 'react'
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';


const BoxMain = ({ data }) => {

  const handleClick = () => {
    console.log(data.comments);
  }

  return (
    <div className="main-box-wrap">
      <Typography variant="h6" gutterBottom>
        {data.title}
      </Typography>
      <Typography variant="overline" display="block" gutterBottom>
        {data.comments}
      </Typography>
      <InfoIcon onClick={handleClick} className="info-btn"/>
    </div>
  )
}

export default BoxMain