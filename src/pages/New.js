import React from 'react';
import API from '../api';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(2),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
}));

export default function Login({ history }) {
  const classes = useStyles();

  async function submit(e) {
    e.preventDefault();
    const { content } = e.target.elements;
    try {
      await API.newTweet({
        content: content.value,
      });
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <React.Fragment>
      <Typography
        variant="h5"
        component="h2"
        className={classes.title}
        gutterBottom
      >
        New
      </Typography>
      <form onSubmit={submit}>
        <TextField
          label="Content:"
          variant="outlined"
          name="content"
          type="textarea"
          fullWidth
          className={classes.input}
        />
        <Button variant="contained" color="primary" type="submit">
          Create
        </Button>
      </form>
    </React.Fragment>
  );
}
