const axios = require ('axios');
const URL = 'http://localhost:8080';

export const getUser = async user => {
  try {
    const url = `${URL}/getUser`;
    return axios.post (url, {user}).then (res => {
      return res;
    });
  } catch (error) {
    console.error (error);
  }
};
export const insertUser = async user => {
  try {
    const url = `${URL}/insertUser`;
    return axios.post (url, {user}).then (res => {
      return res;
    });
  } catch (error) {
    console.error (error);
  }
};

export const getProjects = async user_email => {
  try {
    const url = `${URL}/getProjects`;
    return axios.post (url, {user_email}).then (res => {
      return res;
    });
  } catch (error) {
    console.error (error);
  }
};
export const insertProject = async (title, description, user_email) => {
  try {
    const url = `${URL}/insertProject`;
    return axios.post (url, {title, description, user_email}).then (res => {
      return res;
    });
  } catch (error) {
    console.error (error);
  }
};
export const updateProject = async (id, title) => {
  try {
    const url = `${URL}/updateProject`;
    return axios.post (url, {id, title}).then (res => {
      return res;
    });
  } catch (error) {
    console.error (error);
  }
};

export const getTasks = async (email, password, projectId) => {
  try {
    const url = `${URL}/getTasks`;
    return axios.post (url, {email, password, projectId}).then (res => {
      return res;
    });
  } catch (error) {
    console.error (error);
  }
};
export const insertTask = async task => {
  try {
    const url = `${URL}/insertTask`;
    return axios.post (url, task).then (res => {
      return res;
    });
  } catch (error) {
    console.error (error);
  }
};

export const deleteTask = async id => {
  try {
    const url = `${URL}/deleteTask`;
    return axios.post (url, {id}).then (res => {
      return res;
    });
  } catch (error) {
    console.error (error);
  }
};

export const updateTask = async task => {
  try {
    const url = `${URL}/updateTask`;
    return axios.post (url, task).then (res => {
      return res;
    });
  } catch (error) {
    console.error (error);
  }
};
