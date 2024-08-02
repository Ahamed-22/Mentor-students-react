import { Routes, Route, Link } from "react-router-dom";
import React from "react";
import { UsergroupAddOutlined, TeamOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Students from "./screens/Students/Students";
import Mentors from "./screens/Mentors/Mentors";


const items = [
  {
    key: "sub1",
    icon: <TeamOutlined />,
    label: (
      <Link to="/" rel="students" style={{ textDecoration : 'none' }}>
        students
      </Link>
    ),
  },
  {
    key: "sub2",
    icon: <UsergroupAddOutlined />,
    label: (
      <Link to="/mentors" rel="Mentors" style={{ textDecoration : 'none' }}>
        Mentors
      </Link>
    ),
  }
];

function App() {
  return (
    <>
      <div className="container-fluid">
        <div className="row" style={{ height: "100vh" }}>
          <div className="col-md-3 py-5">
            <Menu
              style={{
                width: 256,
              }}
              defaultSelectedKeys={["sub1"]}
              defaultOpenKeys={["sub1"]}
              items={items}
            />
          </div>
          <div className="col-md-9 py-4 px-3">
            <Routes>
              <Route path="/" Component={Students} />
              <Route path="/mentors" Component={Mentors} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
