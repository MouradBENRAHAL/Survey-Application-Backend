import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SignInOutContainer from './Components/authentification';
import ErrorPage from './Components/ErrorPage';
import Header from './Components/header';
import Survey from './Components/Survey/index';
import Home from './Components/home/home';
import Answer from './Components/Survey/Answer';
import Profile from './Components/Profile/editProfile'
import ViewStats from './Components/Statistics/ViewStats'
let accessToken = localStorage.getItem('token');
function App() {
  return (
    <div className="App">
      <Header></Header>
      <Router>
        <Switch>
          <Route path="/user" component={accessToken ? Home : SignInOutContainer} />
          <Route path="/survey" component={Survey} />
          <Route path="/answer/:idPreview" component={Answer} />
          <Route path="/viewStat/:idSurvey" component={ViewStats} />
          <Route path="/home" component={Home} />
          <Route path="/editProfile" component={Profile} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
