import React from 'react';
import Splash from './components/Splash';
import Map from './components/Map';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        {/*<Splash />*/}
        <Map />
      </div>
    );
  }
}

export default App;
