import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [userDetails, setUserDetails] = useState([]);
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const getUserDetails = () => {
    setLoader(true);
    axios
      .get(
        ` https://randomuser.me/api
`
      )
      .then((response) => {
        setUserDetails(response.data.results);
        setLoader(false);
      })
      .catch((error) => {
        console.log("Error in get user details api");
        setLoader(false);
      });
  };

  useEffect(() => {
    console.log("page refresh");
    getUserDetails();
  }, []);

  const refreshDetails = useCallback(() => {
    console.log("refresh component");
    setRefresh(!refresh);
    getUserDetails();
  }, [refresh]);

  return (
    <div className="App">
      {/* Header */}
      <div className="Appbar">
        <div className="logo">
          <h3>
            <span style={{ border: "3px solid #fff", padding: "0.4rem" }}>
              React Js
            </span>{" "}
            Assignment
          </h3>
        </div>
        <div>
          <h3 style={{ color: "#fff", marginRight: "1rem" }}>Hi,Welcome</h3>
        </div>
      </div>
      {/* Body */}
      <div className="card">
        <div className="card-header">
          <h3>User Details</h3>
          <button onClick={refreshDetails}>Refresh</button>
        </div>
        <div className="card-body">
          <table>
            <thead>
              <th>Title</th>
              <th>Name</th>
              <th>Email</th>
            </thead>
            <tbody>
              {userDetails.length > 0 &&
                userDetails.map((item) => {
                  return (
                    <tr>
                      <td>{item["name"]["title"]}</td>
                      <td>{`${item["name"]["first"]} ${item["name"]["last"]}`}</td>
                      <td>{item["email"]}</td>
                    </tr>
                  );
                })}

              {userDetails.length == 0 && loader == false && (
                <tr>
                  <td colSpan={3} style={{ color: "red", textAlign: "center" }}>
                    No Data Found!
                  </td>
                </tr>
              )}

              {loader && userDetails.length == 0 && (
                <tr>
                  <td colSpan={3} style={{ textAlign: "center" }}>
                    Please wait,loading...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
