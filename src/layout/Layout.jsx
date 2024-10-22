'use client'
import React, { useState } from 'react';

// Antd
import { Layout, theme } from 'antd';

// Components
import Sidebar from './sidebar/Sidebar';
import Navbar from './navbar/Navbar';
const { Header, Sider, Content } = Layout;

const LayoutComponent = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [isResponsive, setIsResponsive] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout className="h-screen">
            <Sider
                breakpoint="lg"
                collapsedWidth={isResponsive ? "0" : 80}
                onBreakpoint={(broken) => {
                    setIsResponsive(broken)
                }}
                onCollapse={(collapsed, type) => {
                    setCollapsed(collapsed)
                }}
                trigger={null} collapsible collapsed={collapsed}
                className={`${isResponsive ? 'fixed' : 'relative'}`}
                style={{ position: isResponsive ? "fixed" : "relative", zIndex: 5, height: "100%" }}
            >
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutComponent;