import React, { useState } from 'react'
import InfoIcon from '@material-ui/icons/Info';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

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
    backgroundColor: 'grey',
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
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className={classes.root}>
          <IconButton aria-label="info" onClick={handleClick} size="small" className="info-btn">
            <InfoOutlinedIcon fontSize="inherit" />
          </IconButton>
          {open ? (
            <div className={classes.dropdown}>
              {data.comments ?? 'Нет комментария'}
            </div>
          ) : null}
        </div>
      </ClickAwayListener>
    </div>
  )
}

export default BoxMain