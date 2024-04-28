import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserHome from './pages/UserHome';
import AdminHome from './pages/AdminHome';
import Login from './pages/Login';
import Regist from './pages/Regist';
import logo from './logo.svg';

function App() {
  return (
    <Router>
      <div className='main'>

          <Routes>
            <Route exact path='/login' Component={Login} />
            <Route exact path='/regist' Component={Regist} />
            {/* <Route exact path='/' Component={ userType === "ADMIN" ?
                                              auth.token ? AdminHome : Login
                                              : auth.token ? UserHome : Login } />
            <Route exact path='/regist' Component={Regist} />
            { userType === "USER" && (
              <>
                <Route exact path="/:page" Component={PrivateRouter} />
                <Route exact path="/:page/:id" Component={PrivateRouter} />
              </>
            )} */}
          </Routes>

      </div>
   </Router>
  );
}

export default App;
