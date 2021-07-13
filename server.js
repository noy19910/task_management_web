const express = require ('express');
const app = express ();
const cors = require ('cors');
const {v4: uuidv4} = require ('uuid');
app.use (cors ());
app.use (express.json ());
const pool = require ('./config');

app.post ('/updateTask', async (req, res) => {
  try {
    const {title, status, deadline, priority, id, project_id} = req.body;
    const query = `UPDATE public.task
    SET title='${title}', deadline='${deadline}', priority='${priority}', status='${status}'
    WHERE id='${id}';`;

    const task = await pool.query (query);
    res.json ({task, newTask: req.body});
  } catch (error) {
    console.log (error);
  }
});

app.post ('/deleteTask', async (req, res) => {
  try {
    const {id} = req.body;
    const query = `DELETE FROM public.task
    WHERE id = '${id}';`;

    const task = await pool.query (query);
    res.json (task);
  } catch (error) {
    console.log (error);
  }
});


app.post ('/insertTask', async (req, res) => {
  try {
    const {project_id, title, deadline, priority, status} = req.body;
    const id = uuidv4 ();
    const newTask = {id, project_id, title, deadline, priority, status};
    const query = `INSERT INTO public.task(
      id, project_id, title, deadline, priority, status)
      VALUES ('${id}', '${project_id}', '${title}', '${deadline}', '${priority}', '${status}');`;

    const task = await pool.query (query);
    res.json ({task, newTask});
  } catch (error) {
    console.log (error);
  }
});
app.post ('/getTasks', async (req, res) => {
  try {
    const {email, password, projectId} = req.body;
    const query = `SELECT t.*
    FROM public.task as t
    INNER JOIN public.project as p
    ON p.id = t.project_id
    INNER JOIN public."user" as u
    ON u.email = p.user_email
    WHERE u.email = '${email}'
    AND u.password = '${password}'
    AND p.id = '${projectId}'
    ORDER BY t.id
    ;`;

    const tasks = await pool.query (query);
    res.json (tasks);
  } catch (error) {
    console.log (error);
  }
});
app.post ('/updateProject', async (req, res) => {
  try {
    const {id, title} = req.body;
    const query = `UPDATE public.project
    SET title='${title}'
    WHERE id='${id}';`;
    const project = await pool.query (query);
    res.json (project.rowCount);
  } catch (error) {
    console.log (error);
  }
});

app.post ('/insertProject', async (req, res) => {
  try {
    const {title, description, user_email} = req.body;
    const id = uuidv4 ();
    const projectData = {id, title, description, user_email};
    const query = `INSERT INTO public.project(
      id, title, description, user_email)
      VALUES ('${id}', '${title}', '${description}', '${user_email}');`;

    const project = await pool.query (query);
    res.json ({project, projectData});
  } catch (error) {
    console.log (error);
  }
});

app.post ('/getProjects', async (req, res) => {
  try {
    const {user_email} = req.body;
    const query = `SELECT id, title, description
    FROM public.project
    WHERE user_email = '${user_email}'
    ORDER BY id
    ;`;

    const project = await pool.query (query);
    res.json (project);
  } catch (error) {
    console.log (error);
  }
});

app.post ('/insertUser', async (req, res) => {
  try {
    const {email, password, username} = req.body.user;
    const query = `INSERT INTO public."user"(
        email, password, username)
        VALUES ('${email}', '${password}', '${username}');`;

    const user = await pool.query (query);
    res.json (user.rowCount);
  } catch (error) {
    console.log (error);
  }
});

app.post ('/getUser', async (req, res) => {
  try {
    const {email, password, username} = req.body.user;
    const query = `SELECT *
    FROM public."user"
    WHERE email = '${email}' and password = '${password}';`;

    const user = await pool.query (query);
    res.json (user);
  } catch (error) {
    console.log (error);
  }
});
app.get ('/health', async (req, res) => {
  try {
    res.send ('ok');
  } catch (error) {
    console.log (error);
  }
});
const PORT = 8080;
app.listen (process.env.PORT||PORT, () => {
  console.log (`Server has started on port ${PORT}`);
});
