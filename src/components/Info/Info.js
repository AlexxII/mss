import React, { Fragment, memo } from 'react'


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';

import eventsTypes from '../../constants/inarray'

const Info = () => {
  return (
    <Fragment>
      <Typography variant="h5" gutterBottom>
        Информация
      </Typography>
      {eventsTypes &&
        <List>
          {eventsTypes.map(item => (
            <Fragment key={item.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar className="info-title">
                  {item.title}
                </ListItemAvatar>
                <ListItemText
                  primary={item.comments}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                        className="info-person"
                      >
                        Отв. <strong>{item.responsible.person}</strong>
                      </Typography>
                      <br />
                      {item.responsible.telephone}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </Fragment>
          ))}
        </List>
      }
    </Fragment>
  )
}

export default memo(Info)