import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import the necessary components
import store from "./store";
import Form from "./components/Form";
import DataList from "./components/DataList";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
         
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/datalist" element={<DataList />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;