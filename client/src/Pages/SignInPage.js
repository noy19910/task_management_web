import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {SnackbarProvider, useSnackbar} from 'notistack';
import {getUser} from '../serverAPI';
import {setUser} from '../Redux/StoreData';
import {useDispatch} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useHistory} from 'react-router-dom';

function Copyright () {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        Task Manager
      </Link>{' '}
      {new Date ().getFullYear ()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles (theme => ({
  paper: {
    marginTop: theme.spacing (8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing (1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing (3),
  },
  submit: {
    margin: theme.spacing (3, 0, 2),
  },
}));

export default function SignUp () {
  const history = useHistory ();

  const dispatch = useDispatch ();
  const classes = useStyles ();
  const {enqueueSnackbar} = useSnackbar ();
  const [email, setEmail] = useState ();
  const [password, setPassword] = useState ();
  const [username, setUsername] = useState ();
  const [isCheckingUser, setIsCheckingUser] = useState (false);
  const onAlert = (message, variant) => {
    enqueueSnackbar (message, {variant});
  };

  useEffect(() => {
    dispatch (setUser (undefined));
  }, [])
  const onSignUp = () => {
    if (!email) {
      onAlert ('Please enter an email', 'error');
      return;
    }
    if (!password) {
      onAlert ('Please enter a password', 'error');
      return;
    }
    setIsCheckingUser (true);
    setTimeout (() => {
      getUser ({email, password}).then (res => {
        setIsCheckingUser (false);

        if (res.data.rowCount === 0) {
          onAlert ('Password or email are invalid, please try again.', 'error');
        } else {
          const u = res.data.rows[0];
          dispatch (setUser (u));
          history.push('/projects')
        }
      });
    }, 500);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography className="mb-3" component="h1" variant="h5">
          Sign in
        </Typography>
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={e => setEmail (e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword (e.target.value)}
            />
          </Grid>

        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={onSignUp}
        >
          <div className="d-flex">
            {isCheckingUser &&
              <CircularProgress
                size={23}
                color="white"
               className="mr-2"
              />}
            <div>Sign In</div>
          </div>
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/signUp" variant="body2">
              Don't have an account? Sign up
            </Link>
          </Grid>
        </Grid>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
