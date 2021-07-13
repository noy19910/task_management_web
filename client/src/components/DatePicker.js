import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function DatePicker({initialDate, onDateChange}) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date(initialDate));

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date.toISOString())
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          format="dd/MM/yyyy"
          id="date-picker-inline"
          size="small"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </MuiPickersUtilsProvider>
  );
}