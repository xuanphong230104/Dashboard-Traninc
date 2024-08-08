import React, { useEffect, useState } from "react";
import { Layout, Drawer, Affix, theme,Button } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  openDrawer,
  handleSideNavColor,
  setPlaceMent,
  handleSidenavType,
  handleFixedNavbar,
  handleSidebar,
  
} from "Redux/features/MainSlice";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import SideNav from "./SideNav/SideNav";
import AntdHeaderRight from "./Header/AntdHeader";
import AntdFooter from "./Footer/AntdFooter";
const { Sider, Header: AntHeader, Content } = Layout;
export default function Main() {
  let { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();
  const { navFixed, sideNavType, sideNavColor, placement, openSidebar } =
    useSelector((state) => state.mainSlice);
  const dispatch = useDispatch();
  pathname = pathname.replace("/", "");
  useEffect(() => {
    if (pathname === "rtl") {
      dispatch(setPlaceMent("left"));
    } else {
      dispatch(setPlaceMent("right"));
    }
  }, [pathname]);
  // console.log(pathname);
  // dispatch(openDrawer())
  return (
    <Layout
      className={`layout-dashboard ${
        pathname === "profile" ? "layout-profile" : ""
      } ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}
    >
      <Drawer
        title={false}
        placement={placement === "right" ? "left" : "right"}
        closable={false}
        onClose={() => dispatch(handleSidebar(false))}
        visible={openSidebar}
        key={placement === "right" ? "left" : "right"}
        width={250}
        className={`drawer-sidebar ${
          pathname === "rtl" ? "drawer-sidebar-rtl" : ""
        } `}
      >
        <Layout
          className={`layout-dashboard ${
            pathname === "rtl" ? "layout-dashboard-rtl" : ""
          }`}
        >
          <Sider
            trigger={null}
            width={250}
            theme="light"
            className={`sider-primary ant-layout-sider-primary ${
              sideNavType === "#fff" ? "active-route" : ""
            }`}
            style={{ background: sideNavType }}
          >
            <SideNav color={sideNavColor} />
          </Sider>
        </Layout>
      </Drawer>
      <Sider
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        width={250}
        theme="light"
        className={`sider-primary ant-layout-sider-primary ${
          sideNavType === "#fff" ? "active-route" : ""
        }`}
        style={{ background: sideNavType }}
      >
        <SideNav color={sideNavColor} />
      </Sider>
      <Layout>
        {navFixed ? (
          <Affix>
            {/* <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            /> */}
            <AntHeader>
              <AntdHeaderRight name={pathname} />
            </AntHeader>
          </Affix>
        ) : (
          <AntHeader>
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
            <AntdHeaderRight name={pathname} />
          </AntHeader>
        )}
        <Content className="content-ant">
          <Outlet />
        </Content>
        <AntdFooter />
      </Layout>
    </Layout>
  );
}
