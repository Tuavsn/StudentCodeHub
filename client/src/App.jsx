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
import OTPConfirm from './components/common/otp/otp-confirmation'
import UserProfileDetail from './pages/UserProfileDetail'
import PostDetail from './pages/PostDetail'
import ResetPass from './pages/reset-pass'
import PrivateRouter from './router/PrivateRouter'
import { getUserInfo } from './redux/action/authAction'
import { getCodeExerCises, getQueueCodeExercises } from './redux/action/codeExerciseAction'

function App() {
  const { auth, userType } = useSelector((state) => state)
  const [isRefreshed, setIsRefreshed] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserInfo()).then(() => {
      setIsRefreshed(true)
    })
  }, [dispatch])

  useEffect(() => {
    if (auth.token) {
      dispatch(getCodeExerCises(auth.token))
      dispatch(getQueueCodeExercises(auth.token))
    }
  }, [dispatch, auth.token])

  if (!isRefreshed) {
    return <Loading />;
  }

  return (
    <Router>
      <SocketClient>
        <Alert />
          <div className='main'>

              <Routes>
                <Route exact path='/regist' Component={Regist} />
                <Route exact path='/reset-pass' Component={ResetPass} />
                <Route exact path='/otp-confirmation' Component={OTPConfirm} />
                <Route exact path='/' Component={userType === "ADMIN" ?
                  auth.token ? AdminHome : Login
                  : auth.token ? UserHome : Login} />
                {(userType === "ADMIN" || userType === "USER") && auth.user.status === 0 && (
                  <>
                    <Route exact path='/user/:id' Component={UserProfileDetail} />
                    <Route exact path='/post/:id' Component={PostDetail}/>
                    <Route exact path="/:page" Component={<PrivateRouter />} />
                    <Route exact path="/:page/:id" Component={() => <PrivateRouter path="/:page/:id" />} />
                    <Route exact path="/:page/:id/:action" Component={() => <PrivateRouter path="/:page/:id/:action" />} />
                  </>
                )}
              </Routes>

          </div>
      </SocketClient>
   </Router>
  );
}

export default App;
