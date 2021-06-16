import React, { useState, useEffect } from "react";
// import { history } from "umi";
import { Row, Col } from "antd";
import styles from "./index.less";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
interface LayoutProps {}
const pathToKey: any = {
  "/": "1",
  "/summary": "1",
  "/nodes": "2",
};
const keyToPath: any = {
  "1": "/summary",
  "2": "/nodes",
};

interface LayoutProps {
  children: any;
  location: any;
  route: any;
  history: any;
  match: any;
}
const whiteList = ["/", "/login", "/summary", "/nodes"];
export default function (props: LayoutProps) {
  const { children, location, route, history, match } = props;

  useEffect(() => {
    if (!whiteList.includes(location.pathname)) {
      history.push("/404");
      return;
    } else if (location.pathname === "" || location.pathname === "/") {
      history.push("summary");
    }
  }, [location.pathname]);
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  const onChangeMenu = (params: any) => {
    const { item, key, keyPath, selectedKeys, domEvent } = params;
    if (keyToPath[key]) {
      history.push(keyToPath[key]);
    }
  };
  if (location.pathname === "/login" || location.pathname === "/404") {
    return <>{children}</>;
  }
  return (
    <>
      <Layout className={styles.layout}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          {/* <div className={styles.logo}>此处需要补充Logo</div> */}
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            onSelect={onChangeMenu}
            selectedKeys={[pathToKey[location.pathname]]}
          >
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              概览
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              节点监控
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className={`${styles.layoutContent} "site-layout"`}>
          {/* <Header className={styles.pageHeader}>补充页面头部说明</Header> */}
          <Content className={styles.content}>
            {/* <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
            {/* <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              Bill is a cat.
            </div> */}
            <Row>
              <Col span={24}>
                <div className={styles.children}>{children}</div>
              </Col>
            </Row>
          </Content>
          {/* 看需求 */}
          {/* <Footer style={{ textAlign: "center" }}></Footer> */}
        </Layout>
      </Layout>
    </>
  );
}
// Layout.defaultProps = {};
// export default Layout;
