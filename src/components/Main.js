import React, { useEffect, useState } from "react";
import { Layout, Drawer, Button } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPlaceMent, handleSidebar } from "Redux/features/MainSlice";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import SideNav from "./SideNav/SideNav";
import AntdHeaderRight from "./Header/AntdHeader";
import AntdFooter from "./Footer/AntdFooter";

const { Sider, Header: AntHeader, Content } = Layout;

export default function Main() {
  let { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isSmallScreen = windowWidth < 992;
  const { sideNavType, sideNavColor, placement, openSidebar } = useSelector((state) => state.mainSlice);
  const dispatch = useDispatch();
  pathname = pathname.replace("/", "");

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (pathname === "rtl") {
      dispatch(setPlaceMent("left"));
    } else {
      dispatch(setPlaceMent("right"));
    }
  }, [pathname]);

  return (
    <Layout
      className={`layout-dashboard ${pathname === "profile" ? "layout-profile" : ""} ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}
    >
      <Drawer
        title={false}
        placement={placement === "right" ? "left" : "right"}
        closable={false}
        onClose={() => dispatch(handleSidebar(false))}
        visible={openSidebar}
        key={placement === "right" ? "left" : "right"}
        width={250}
        className={`drawer-sidebar ${pathname === "rtl" ? "drawer-sidebar-rtl" : ""}`}
      >
        <Layout
          className={`layout-dashboard ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}
        >
          <Sider
            trigger={null}
            width={250}
            theme="light"
            className={`sider-primary ant-layout-sider-primary ${sideNavType === "#fff" ? "active-route" : ""}`}
            style={{ background: sideNavType }}
          >
            <SideNav color={sideNavColor} />
          </Sider>
        </Layout>
      </Drawer>
      <Sider
        collapsible
        collapsed={collapsed}
        collapsedWidth={isSmallScreen ? "0" : "80"}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        width={250}
        theme="light"
        className={`sider-primary ant-layout-sider-primary ${sideNavType === "#fff" ? "active-route" : ""}`}
        style={{ background: sideNavType }}
      >
        <SideNav color={sideNavColor} />
      </Sider>
      <Layout>
        <AntHeader>
          {!isSmallScreen && (
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          )}
          <AntdHeaderRight name={pathname} />
        </AntHeader>
        <Content className="content-ant">
          <Outlet />
        </Content>
        <AntdFooter />
      </Layout>
    </Layout>
  );
}
