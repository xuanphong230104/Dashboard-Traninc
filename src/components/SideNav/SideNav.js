import React from "react";
import { useLocation } from "react-router-dom";
// import logo from "../../assets/images/logo.png";
import { dashboard } from "utils/SideNavData";
import MenuItem from "utils/SideNavData";
import { Button,Mn } from "antd";
const logo = "https://traninc.vn/wp-content/uploads/2020/02/Logo.svg"
export default function  SideNav({ color }) {
  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");
  return (
    <>
      <div className="brand">
        <img src={logo} alt="" href="#" />
      </div>
      <hr />
      {/* Menu items in sideNav */}
      <MenuItem pathname={pathname} color={color} />
          {/* Side Nav button */}
         
      
    </>
  );
}


{/* <div className="aside-footer">
        <div className="footer-box" style={{ backgroundColor: color }}>
          <span className="icon" style={{ color: "red" }}>
            {dashboard(color)}
          </span>
          <h6>Need Help ?</h6>
          <p>please check our docs</p>
          <Button type="primary" className="ant-btn-sm ant-btn-block">
            DOCUMENTATION
          </Button>
        </div>
      </div> */}