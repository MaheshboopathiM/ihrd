import './App.css';
import { Login } from './components/login/login.js';
import  Home  from './pages/home/home.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Forget from './components/others/Forget';

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path='/' element={< Login />}></Route>
      <Route exact  path='/forget' element={<Forget />}></Route>
      <Route exact  path='/home/:usertype' element={< Home />}></Route>
      </Routes>
      {/* <Route exact path='/contact' element={< Contact />}></Route> */}
    </Router>

  );
}

export default App;
