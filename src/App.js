import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Form from './components/Form';
import DataList from './components/DataList';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>CRUD Operations with Redux Toolkit</h1>
        <Form />
        <DataList />
      </div>
    </Provider>
  );
}

export default App;