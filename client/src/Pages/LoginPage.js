import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setCounter, getCounter} from '../Redux/StoreData';
import Button from '@material-ui/core/Button';

export default function LoginPage () {
  const dispatch = useDispatch ();
  const counter = useSelector(getCounter);

  const onClick = () => {
    dispatch(setCounter(counter - 1))
  };

  return (
    <div>
      LoginPage {counter}
      <Button variant="outlined" color="primary" onClick={onClick}>
        Decrease
      </Button>
    </div>
  );
}
