import {createSlice} from '@reduxjs/toolkit';
import {getDaysBefore} from '../Utilities/DateUtility';
export const Statuses = ['Done', 'In progress', 'Stuck'];
export const Prio = ['High', 'Medium', 'Low'];
const makeTask = x => {
  return {
    id: x,
    title: 'Task ' + x,
    status: Statuses[x % Statuses.length],
    deadline: getDaysBefore (x),
    priority: Prio[x % Prio.length],
  };
};
const makeProject = id => {
  return {
    title: 'Project ' + id,
    id: id,
    tasks: [1, 2, 3, 4, 5].map (x => makeTask (x)),
  };
};

const projects = [1, 2, 3, 4, 5].map (x => makeProject (x));

export const storeData = createSlice ({
  name: 'storeData',
  initialState: {
    user: undefined,
    counter: 0,
    projects: projects,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCounter: (state, action) => {
      state.counter = action.payload;
    },
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
  },
});

export const {setUser, setCounter, setProjects} = storeData.actions;

export const getUser = state => state.user;
export const getCounter = state => state.counter;
export const getProjects = state => state.projects;

export default storeData.reducer;
