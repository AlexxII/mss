import React, { useState } from 'react'
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: 28,
    right: 0,
    left: 0,
    zIndex: 1,
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

const BoxMain = ({ data }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  }

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <div className="main-box-wrap">
      <Typography variant="h6" gutterBottom>
        {data.title}
      </Typography>
      <Typography variant="overline" display="block" gutterBottom>
        {data.comments}
      </Typography>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className={classes.root}>
          <InfoIcon onClick={handleClick} className="info-btn" />
          {open ? (
            <div className={classes.dropdown}>
              Click me, I will stay visible until you click outside.
            </div>
          ) : null}
        </div>
      </ClickAwayListener>
    </div>
  )
}

export default BoxMain