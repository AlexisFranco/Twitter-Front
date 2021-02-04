import React from 'react';
import { Link } from 'react-router-dom';
import TweetList from '../containers/TweetList';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <>
      <TweetList />
      <Fab color="primary" aria-label="add" className={classes.fab}>
        <Link to="/new">
          <AddIcon style={{ color: 'white' }} />
        </Link>
      </Fab>
    </>
  );
}
