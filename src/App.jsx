import React from 'react';

import Login from './pages/Login';
import Navbar from './Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import QuestionForm from './components/QuestionForm';
import CreatedSurvey from './components/CreatedSurvey';
import Survey from './components/Survey';
import CreatedSurveys from './pages/CreatedSurveys';
import SurveyStatistics from './pages/SurveyStatistics';
import Statistics from './components/Statistics';
import { QuestionsProvider } from './hooks/useQuestions';

export default function App() {
  return (
    <QuestionsProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Login" exact component={Login} />
          <Route path="/oauth/kakao/callback" component={Auth} />
          <Route path="/QuestionForm/:id" exact component={QuestionForm} />
          <Route path="/CreatedSurveys" exact component={CreatedSurveys} />
          <Route path="/CreatedSurvey/:id" exact component={CreatedSurvey} />
          <Route path="/SurveyStatistics" exact component={SurveyStatistics} />
          <Route path="/Statistics/:id" exact component={Statistics} />
          <Route path="/CreatedSurvey/:id/survey" exact component={Survey} />
        </Switch>
      </Router>
    </QuestionsProvider>
  );
}


