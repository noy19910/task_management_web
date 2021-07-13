import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TaskCombobox from './TaskCombobox';
import {Statuses, Prio} from '../Redux/StoreData';
import {toDateString} from '../Utilities/DateUtility';
import DatePicker from './DatePicker';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';

var fx = null;

export default function Task({onTaskUpdate, onDeleteTask, task, className}) {
  const {title, status, deadline, priority, id, project_id} = task;

  const [taskName, setTaskName] = useState (title);
  const [isTaskNameUpdating, setIsTaskNameUpdating] = useState (false);
  const [currStatus, setCurrStatus] = useState (status);
  const [currPriority, setCurrPriority] = useState (priority);
  const onTaskNameChange = e => {
    const val = e.target.value;
    setTaskName (val);
    clearTimeout (fx);
    fx = setTimeout (() => {
      setIsTaskNameUpdating (true);
      onTaskUpdate ({...task, title: val}, () => {
        setIsTaskNameUpdating (false);
      });
    }, 1000);
  };

  const onTaskStatusChange = (name, value) => {
    const val = value.props.value;
    setCurrStatus (val);
    clearTimeout (fx);
    fx = setTimeout (() => {
      onTaskUpdate ({...task, status: val}, () => {});
    }, 1000);
  };
  const onTaskPriorityChange = (name, value) => {
    const val = value.props.value;
    setCurrPriority (val);
    clearTimeout (fx);
    fx = setTimeout (() => {
      onTaskUpdate ({...task, priority: val}, () => {});
    }, 1000);
  };

  const onDateChange = (date) => {
    onTaskUpdate ({...task, deadline: date}, () => {});
  }
  return (
    <div className={'w-100 p-3 mt-1 card m-5' + className}>
      <div className="task">
        <div style={{width: '30%'}}>
          {isTaskNameUpdating &&
            <CircularProgress size={22} className="mt-2 mr-2" />}
          <TextField
            id="standard-basic"
            onChange={onTaskNameChange}
            value={taskName}
          />
        </div>
        <div style={{width: '20%'}}>
          <div className="task-inner">
            <TaskCombobox
              onChange={onTaskStatusChange}
              value={currStatus}
              options={Statuses}
            />
          </div>
        </div>
        <div style={{width: '30%'}}>
          {/* <div className="task-inner">{toDateString (deadline)}</div> */}
          <div className="task-inner">
            <DatePicker onDateChange={onDateChange} initialDate={deadline} />
          </div>
        </div>
        <div style={{width: '10%'}}>
          <div className="task-inner d-flex">
            <TaskCombobox
              onChange={onTaskPriorityChange}
              value={currPriority}
              options={Prio}
            />
          </div>
        </div>

        <Tooltip title="Delete task" className="ml-3">
          <DeleteIcon
            onClick={() => onDeleteTask (id)}
            size={20}
            style={{cursor: 'pointer'}}
            color="secondary"
            fontSize="large"
          />
        </Tooltip>

      </div>
    </div>
  );
}
