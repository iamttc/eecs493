import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Reducer from './redux/reducer';
import Splash from './components/Splash';
import Map from './components/Map';


class App extends React.Component {
  constructor() {
    super();
    this.store = createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)));
  }

  render() {
    return (
      <Provider store={this.store}>
        <div className="app">
          <Splash />
          <Map />
        </div>
      </Provider>
    );
  }
}

export default App;
