import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Link,
  Outlet,
  NavLink,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import { ProfileBanner } from "./components/ProfileBanner";
import Followers from "./components/Followers";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<ProfileBanner />} />
        <Route path="/login" element={<Login />} />
        <Route path="/followers" element={<Followers />} />
        <Route path="/register" element={<Register />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

const Root = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-white position-relative ">
        <div className="container-fluid">
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
            <div className="navbar-nav" style={{ minWidth: "100%" }}>
              <div className="d-flex w-100 justify-content-between mx-1">
                <div className="d-flex align-items-center">
                  <img
                    src={require("./components/logo.png")}
                    style={{ height: "35px" }}
                    alt=""
                  />
                  <h1
                    className="nav-title ms-2 fs-bold mt-2"
                    style={{ fontSize: "20px" }}
                  >
                    CipherSchools
                  </h1>
                </div>
                <div className="d-flex align-items-center">
                  <div
                    className="d-flex align-items-center px-2 rounded-pill mx-2"
                    style={{ backgroundColor: "#F2F5FA" }}
                  >
                    <box-icon name="search-alt-2"></box-icon>
                    <input
                      type="email"
                      className="form-control rounded-pill border-0 noFocusBorder"
                      style={{ backgroundColor: "#F2F5FA" }}
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                    <box-icon name="cog"></box-icon>
                  </div>
                  <box-icon
                    type="solid"
                    className="mx-2"
                    color="grey"
                    name="bell"
                  ></box-icon>
                  <div className="dropstart me-3 dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
                    <img
                      type="button"
                      src={require("./components/logo.png")}
                      className="ms-3 p-0 "
                      style={{ height: "20px", margin: "5px" }}
                      alt=""
                    />
                    
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to={"./"}>
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to={"./followers"}>
                          Followers
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to={"./login"}>
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};
export default App;
