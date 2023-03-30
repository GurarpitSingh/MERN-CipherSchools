import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./css/Weblinks.css";

const Followers = () => {
  // State Variables
  const [followers, setFollowers] = useState([]);

    // Fetch the followers
  useEffect(() => {
    document.title = "Followers";
    const token = window.localStorage.getItem("token");

    fetch("http://localhost:3001/api/getAllFollowers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data);
          setFollowers(data.followers);
        }
      });
  }, []);

  
  return (
    <div className="container p-5">
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-between w-100">
          <h5 className="fontBlue fw-bold">Followers</h5>
          <Link to="/" className=" myOrange rounded btn ">
            Profile
          </Link>
        </div>
        <div className="ms-2 row w-100">
          {followers.map((follower, i) => {
            return (
              <Card
                className="border-0 shadow-sm mx-2 my-2"
                key={i}
                style={{ width: "18rem", "max-height": "389px" }}
              >
                <Card.Img
                  variant="top"
                  className="px-5 py-2 rounded-circle"
                  style={{ height: "200px" }}
                  src={follower.Image}
                />
                <Card.Body>
                  <Card.Title className="mb-0">{follower.Name}</Card.Title>
                  <Card.Text>
                    <p className="text-muted mb-0">{follower.Job}</p>
                    <p className="text-muted">{follower.Followers} Followers</p>
                  </Card.Text>
                  <div className="d-flex justify-content-center ">
                    <Button
                      variant=" myOrange "
                      style={{ width: "-webkit-fill-available" }}
                    >
                      Follow
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Followers;
