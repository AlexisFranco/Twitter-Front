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

export default function SignUp({ history }) {
  const classes = useStyles();

  async function submit(e) {
    e.preventDefault();
    const { name, username, email, password } = e.target.elements;
    try {
      await API.signup({
        name: name.value,
        username: username.value,
        email: email.value,
        password: password.value,
        passwordConfirmation: password.value,
      });
      history.push('/login');
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
        SignUp
      </Typography>
      <form onSubmit={submit}>
        <TextField
          label="Name:"
          variant="outlined"
          name="name"
          fullWidth
          className={classes.input}
        />
        <TextField
          label="Username:"
          variant="outlined"
          name="username"
          fullWidth
          className={classes.input}
        />
        <TextField
          label="Email:"
          variant="outlined"
          name="email"
          type="email"
          fullWidth
          className={classes.input}
        />
        <TextField
          label="Password:"
          variant="outlined"
          name="password"
          type="password"
          fullWidth
          className={classes.input}
        />
        <TextField
          label="Password:"
          variant="outlined"
          name="passwordConfirmation"
          type="password"
          fullWidth
          className={classes.input}
        />
        <Button variant="contained" color="primary" type="submit">
          SignUp
        </Button>
      </form>
    </React.Fragment>
  );
}
