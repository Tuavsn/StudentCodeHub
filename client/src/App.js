import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import UserHome from './pages/UserHome';
import AdminHome from './pages/AdminHome';
import Login from './pages/Login';
import Regist from './pages/Regist';
import Alert from './components/common/alert/Alert';
import SocketClient from './SocketClient'
import Loading from './components/common/alert/Loading'
import UserProfileDetail from './pages/UserProfileDetail'
import PostDetail from './pages/PostDetail'
import { getUserInfo } from './redux/action/authAction'

function App() {
  const { auth, userType } = useSelector((state) => state)
  const [isRefreshed, setIsRefreshed] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserInfo()).then(() => {
      setIsRefreshed(true)
    })
  }, [dispatch])

  if (!isRefreshed) {
    return <Loading />;
  }

  return (
    <Router>
      <SocketClient>
        <Alert />
          <div className='main'>

              <Routes>
                <Route exact path='/' Component={userType === "ADMIN" ?
                  auth.token ? AdminHome : Login
                  : auth.token ? UserHome : Login} />
                <Route exact path='/regist' Component={Regist} />
                <Route exact path='/user/:id' Component={UserProfileDetail} />
                <Route exact path='/post/:id' Component={PostDetail}/>
              </Routes>

          </div>
      </SocketClient>
   </Router>
  );
}

export default App;
