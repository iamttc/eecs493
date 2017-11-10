import React from 'react';
import Content from './components/Content';
import Chat from './components/Chat';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Content />
        {/* <Chat /> */}
      </div>
    );
  }
}

export default App;
