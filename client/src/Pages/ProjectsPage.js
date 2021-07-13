import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setCounter, getUser, getProjects} from '../Redux/StoreData';
import ProjectCard from '../components/ProjectCard';
import {useHistory} from 'react-router-dom';
import {getProjects as getProjectsServer, insertProject, updateProject} from '../serverAPI';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';
import {SnackbarProvider, useSnackbar} from 'notistack';

export default function ProjectsPage () {
  const dispatch = useDispatch ();
  // const projects = useSelector (getProjects);
  const user = useSelector (getUser);
  const history = useHistory ();
  const [projects, setProjects] = useState ([]);
  const {enqueueSnackbar} = useSnackbar ();

  const onAlert = (message, variant) => {
    enqueueSnackbar (message, variant);
  };
  const onAddProject = () => {
    insertProject ('New project', '', user.email).then (res => {
      const rowCount = res.data.project.rowCount;
      if (rowCount === 0) {
        onAlert ('Something went wrong, check your internet connection', {
          variant: 'error',
        });
      } else {
        const projectData = res.data.projectData;
        const arr = [...projects, projectData];
        setProjects (arr);
        onAlert ('A new project has been added', {variant: 'success'});
      }
    });
  };

  useEffect (
    () => {
      getProjectsServer (user.email).then (res => {
        const projs = res.data.rows;
        setProjects (projs);
      });
    },
    [user]
  );

  const onProjectNameChange = (p, newName) => {
    const newProject = {...p, title: newName};
    console.log ('new project', newProject);
    setProjects (
      projects.map (x => {
        if ((x.id == p.id)) x.title = newName;
        return x;
      })
    );
    updateProject (p.id, newName);
  };
  return (
    <div>
      <div className="title">Projects</div>
      <div className="container ">
        <div>
          <Tooltip placement="right" title="Add proect" className="float-left">
            <IconButton onClick={onAddProject} aria-label="delete">
              <AddCircleIcon color="primary" fontSize="large" />
            </IconButton>
          </Tooltip>
        </div>
        {projects.length > 0
          ? <div className="container ">
              {projects.map (p => {
                return (
                  <ProjectCard
                    id={p.id}
                    key={p.id}
                    title={p.title}
                    className="m-3"
                    onProjectNameChange={newName =>
                      onProjectNameChange (p, newName)}
                    onOpenProject={() => {
                      history.push ('/project/' + p.id + '/' + p.title, {id: p.id, title: p.title});
                    }}
                  />
                );
              })}
            </div>
          : <div
              className="w-100 mt-5"
              style={{textAlign: 'center', fontSize: 20}}
            >
              Add your first project :)
            </div>}

      </div>
    </div>
  );
}
