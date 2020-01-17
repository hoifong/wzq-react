import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PageIndex from 'views/index';
import PageHall from 'views/hall';
import PageRoom from 'views/room';

const App: React.FC = () => {
  return (
    <Router>
      <Route path='/' exact component={PageIndex} />
      <Route path='/hall' exact component={PageHall} />
      <Route path='/room' exact component={PageRoom} />
    </Router>
  );
}

export default App;
