import React from 'react';
import {Form} from "./components";
import {MatrixProvider} from "./MatrixContext/MatrixContext";
import './App.css'

function App() {
  return (
      <div className="container">
          <h1>Matrix MEMCRAB</h1>
          <MatrixProvider>
              <Form />
          </MatrixProvider>
      </div>
  );
}

export default App;
