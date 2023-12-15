// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import FlashCardList from './components/FlashCards/FlashCardList';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/flashcards" component={FlashCardList} />
      </Switch>
    </Router>
  );
}

export default App;
