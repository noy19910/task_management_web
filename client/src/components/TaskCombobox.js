import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function TaskCombobox({
  onChange,
  value,
  options,
  style = {width: 200},
}) {
  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={value}
      onChange={onChange}
    >
      {options.map (o => {
        return <MenuItem key={o} value={o}>{o}</MenuItem>;
      })}
    </Select>
  );
}
