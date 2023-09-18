import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
const Dashboard = () => {
  const navigate = useNavigate();
  chrome.storage.session.get(["accesstoken"]).then((result) => {
    if (!result.accesstoken) {
      return navigate("/login");
    }
    console.log(result.accesstoken);
  });

  return <div className="dashboard"></div>;
};

export default Dashboard;
