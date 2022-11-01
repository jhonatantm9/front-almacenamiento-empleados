import './App.css';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import List from './components/List';
import Home from './components/Home';
import { Fragment } from 'react';
import DataForm from './components/Data';
import Add from './components/Add';

function App() {
  return (
    <Fragment>
      <BrowserRouter>
      <Home />
        <Routes>
          <Route path='/list' element={<List></List>} />
          <Route path='/data/:id' element={<DataForm></DataForm>}/>
          <Route path='/add' element={<Add></Add>}/>
          <Route path='/' element={<Navigate to='/list'/>}/>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
