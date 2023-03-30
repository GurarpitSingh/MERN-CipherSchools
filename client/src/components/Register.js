import React from "react";
import { useState, useEffect } from "react";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    // State variables 
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [username, setUsername] = useState("");

//   Setting title of the page
  useEffect(() => {
    document.title = "Register";
  }, []);

//   Post to register user
  const registerUser = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, name, email, password, dob }),
    });
    if (res.status === 200) {
      var resp = await res.json();
      console.log(resp);
      alert("User registered successfully");
      navigate("/login");
    } else {
      var data = await res.json();
      alert(data.message);
    }
    console.log(data);
  };

  return (
    <div className="container-fluid pt-5 mt-3">
      <div className="col-md-4 mx-auto mt-5">
        <div className="bg-trans p-5 rounded">
          <h2 className="mb-4 text-center">Register</h2>
          <form onSubmit={registerUser}>
            <div className="d-flex form-group my-2 border-bottom border-dark">
              <i className="fa-sharp fa-regular fa-15x fa-user pt-2 pe-4 text-muted "></i>{" "}
              <input
                type="text"
                name="name"
                className="my-form-control border-0 bg-trans  "
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                placeholder="Enter Name"
                required
              />
            </div>
            <div className="d-flex form-group my-2 border-bottom border-dark">
              <i className="fa-regular fa-id-card pt-2 fa-15x pe-3 text-muted"></i>
              <input
                type="text"
                name="username"
                className="my-form-control border-0 bg-trans "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="name"
                placeholder="Enter Username"
                required
              />
            </div>
            <div className="d-flex form-group my-2 border-bottom border-dark">
              <i className="fa-regular fa-envelope pt-2 fa-15x pe-3 text-muted"></i>
              <input
                type="email"
                name="email"
                className="my-form-control border-0 bg-trans "
                id="regEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter E-mail"
                required
              />
            </div>
            <div className="d-flex form-group my-2 border-bottom border-dark">
              <i className="fa-solid fa-key pt-2 fa-15x pe-3 text-muted"></i>
              <input
                type="password"
                name="password"
                className="my-form-control border-0 bg-trans"
                id="regPass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
              />
            </div>
            <div className="d-flex form-group my-2 border-bottom border-dark">
              <i className="fa-regular fa-calendar-days pt-2 fa-15x pe-3 text-muted"></i>
              <input
                type="date"
                name="date"
                className="my-form-control border-0 bg-transx"
                id="regDate"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeholder="Date of Birth"
                required
              />
            </div>
            <div className="d-flex justify-content-center form-group my-4 ">
              <button type="submit" className="btn btn-primary  w-100 ">
                Register
              </button>
            </div>
            <Link className="float-end text-muted text-decoration-none" to="/">
              Joined us before?{" "}
              <span className=" ml-2 text-primary fw-bold">Login</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
