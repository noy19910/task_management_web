import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getProjects, getUser} from '../Redux/StoreData';
import Task from '../components/Task';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';
import {SnackbarProvider, useSnackbar} from 'notistack';
import {withRouter} from 'react-router';
import {deleteTask, getTasks, insertTask, updateTask} from '../serverAPI';
function ProjectPage({match}) {
  const projectId = match.params.id;
  const projectTitle = match.params.title;
  const user = useSelector (getUser);
  const [tasks, setTasks] = useState ([]);
  const {enqueueSnackbar} = useSnackbar ();

  useEffect (
    () => {
      getTasks (user.email, user.password, projectId).then (res => {
        setTasks (res.data.rows);
      });
    },
    [projectId]
  );

  const onAlert = (message, variant) => {
    enqueueSnackbar (message, variant);
  };

  const onAddTask = () => {
    const task = {
      id: Math.floor (Math.random () * 10000000000),
      project_id: projectId,
      title: 'New Task',
      status: 'In progress',
      deadline: new Date ().toISOString (),
      priority: 'Low',
    };
    insertTask (task).then (res => {
      const newTask = res.data.newTask;
      setTasks ([...tasks, newTask]);
      onAlert ('A new task has been added', {variant: 'success'});
    });
  };

  const onDeleteTask = taskId => {
    deleteTask (taskId).then (res => {
      if (res.data.rowCount === 0) {
        onAlert (
          'Something went wrong, please check your internet connection and try again',
          {variant: 'error'}
        );
      } else {
        setTasks (tasks.filter (x => x.id !== taskId));
        onAlert ('Task has been deleted', {variant: 'success'});
      }
    });
  };

  const onTaskUpdate = (task, onDone) => {
    updateTask (task).then (res => {
      onDone ();
      if (res.data.task.rowCount === 0) {
        onAlert (
          'Something went wrong, please check your internet connection and try again',
          {variant: 'error'}
        );
      } else {
        const updatedTask = res.data.newTask;
        setTasks (tasks.map (x => {
          if(x.id == updatedTask.id){
            x = updatedTask
          }
          return x
        }));
        onAlert ('Task has been updated', {variant: 'success'});
      }
    });
  };

  return (
    <div>
      <div>
        <div className="title mb-5">{projectTitle} </div>
        <div>
          <Tooltip placement="right" title="Add task" className="float-left">
            <IconButton onClick={onAddTask} aria-label="delete">
              <AddCircleIcon color="primary" fontSize="large" />
            </IconButton>
          </Tooltip>
        </div>
        {tasks.map (t => {
          return (
            <Task
              key={t.id}
              onDeleteTask={onDeleteTask}
              onTaskUpdate={onTaskUpdate}
              task={t}
              className="m-1"
            />
          );
        })}
      </div>

    </div>
  );
}
export default withRouter (ProjectPage);
