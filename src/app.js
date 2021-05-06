import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Dashboard from './pages/dashboard';
import Quiz from './pages/quiz';

function App() {
  return (
    <>
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/quiz/:quizId/question/:questionId" exact component={Quiz} />
      <Redirect to="/dashboard" />
    </>
    );
}

export default App;
