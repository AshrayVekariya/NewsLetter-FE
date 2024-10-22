'use client'
import React, { Fragment, useEffect, useState } from "react";

// Antd
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ProductOutlined,
    VideoCameraOutlined,
    ProjectFilled,
} from '@ant-design/icons';
import { Button, Menu } from "antd";

// Next JS and Component 
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
    {
        key: '1',
        icon: <ProjectFilled />,
        label: 'Companies',
        accessKey: "company",
        path: '/companies'
    },
    {
        key: '2',
        icon: <ProductOutlined />,
        label: 'Products',
        accessKey: "products",
        path: '/products'
    },
    {
        key: '3',
        icon: <VideoCameraOutlined />,
        label: 'News Letter',
        accessKey: "newsletter",
        path: '/news-letter'
    },
    {
        key: '4',
        icon: <VideoCameraOutlined />,
        label: 'Blog',
        accessKey: "blogs",
        path: '/blogs'
    },
    {
        key: '5',
        icon: <VideoCameraOutlined />,
        label: 'Subscriber',
        accessKey: "subscriber",
        path: '/subscriber'
    }
]

const Sidebar = ({ collapsed, setCollapsed }) => {
    const pathname = usePathname();
    const [navMenu, setNavMenu] = useState([]);
    const [selectedKey, setSelectedKey] = useState('1');

    useEffect(() => {
        const menu = window.localstorage.getItem('accessRoute');
        const filterMenu = items.filter((i) => menu?.includes(i.accessKey));
        setNavMenu(filterMenu);

        const currentItem = filterMenu.find(item => item.path === pathname);
        if (currentItem) {
            setSelectedKey(currentItem.key);
        }
    }, [pathname]);

    return (
        <Fragment>
            <div className="demo-logo-vertical" />
            <div>
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                        color: 'white'
                    }}
                />
            </div>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[selectedKey]}
            >
                {navMenu.map(item => (
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link href={item.path} onClick={() => setSelectedKey(item.key)}>
                            {item.label}
                        </Link>
                    </Menu.Item>
                ))}
            </Menu>
        </Fragment>
    )
}

export default Sidebar;
