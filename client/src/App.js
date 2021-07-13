import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import MiniDrawer from './components/MiniDrawer';
import ProjectsPage from './Pages/ProjectsPage';
import LoginPage from './Pages/LoginPage';
import ProjectPage from './Pages/ProjectPage';
import TestPage from './Pages/TestPage';
import SignUp from './Pages/SignUp';
import SignInPage from './Pages/SignInPage';
import {getUser} from './Redux/StoreData';
import {useSelector} from 'react-redux';
import {Error404} from './Animations/Lottie';

function App () {
  const user = useSelector (getUser);
  return (
    <Router>
      <MiniDrawer>

        <div className="App  d-flex flex-column h-100">

          <Switch>

            <Route path="/projects" exact>
              <UnauthorizedWrapper user={user}>
                <ProjectsPage />
              </UnauthorizedWrapper>
            </Route>

            <Route path="/" exact>
              <SignInPage />
            </Route>

            <Route path="/test" exact>
              <UnauthorizedWrapper user={user}>
                <TestPage />
              </UnauthorizedWrapper>
            </Route>

            <Route path="/signUp" exact>
              <SignUp />
            </Route>

            <Route path="/signIn" exact>
              <SignInPage />
            </Route>

            <Route path="/project/:id/:title" exact>
              <UnauthorizedWrapper user={user}>
                <ProjectPage />
              </UnauthorizedWrapper>
            </Route>

          </Switch>

        </div>
      </MiniDrawer>

    </Router>
  );
}

export default App;

const UnauthorizedWrapper = ({user, children}) => {
  if (!user) {
    return <div>
      <div>You are not authorized to access this page, make sure to log in.</div>
      <Error404 />
    </div>;
  }
  return <div>{children}</div>;
};
