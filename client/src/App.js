import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Link,
  Outlet,
  NavLink
} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import { ProfileBanner } from './components/ProfileBanner';



const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route  path='/'element={<Root />} >
      <Route index   element={<ProfileBanner />} />
      <Route path='/login' element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />

      </Route>
    ),
  );



  return (
    <RouterProvider  router={router}/>
  )
}

const Root = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-white" style={{'height': "60px"}}>
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav ">
            <div className="d-flex">
            <div className="d-flex align-items-center">
            <img src={require('./components/logo.png')} style={{"height": "35px"}} alt="" srcset="" />
            <h1 className="nav-title ms-2 fs-bold mt-2" style={{"font-size": "20px"}}>CipherSchools</h1>  
            </div>
            {/* <div className="d-flex ms-4 align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-compass" viewBox="0 0 16 16">
                <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z"/>
                            </svg>
                            <p className='mt-3 ms-2'>Browse</p>
                            <svg className='ms-2' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-compact-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"/>
              </svg>
            </div> */}
            
            </div>
            </div>
          </div>
        </div>
      </nav>
<Outlet />

    </div>

  )}
export default App;

// <div class="navbar-nav mx-auto">
//             <Link id='loginbtn' className='nav-link'  to='/'>Login</Link>
//             <Link id='regbtn' className='nav-link'  to='/register'>Register</Link>
//             <Link id='logoutbtn' className='nav-link' onClick={e => window.localStorage.clear()}  to='/'>Logout</Link>
