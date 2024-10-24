'use client';
import React, { Fragment, useEffect, useState } from "react";

// Antd
import {
    BellOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Badge, Button, message, Select, } from "antd";
import { useRouter } from "next/navigation";
import { getAllProducts } from "../../services/products/productsServices";
import { jwtDecode } from "jwt-decode";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

const Navbar = ({ collapsed, setCollapsed }) => {
    const router = useRouter();
    const [product, setProduct] = useState([]);
    const [isActiveProduct, setIsActiveProduct] = useState("");
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const toast = (type, toastMessage) => {
        messageApi.open({
            type: type,
            content: toastMessage,
        });
    };

    useEffect(() => {
        productList();
    }, [])

    useEffect(() => {
        const token = getCookie('accessToken')
        const decoded = jwtDecode(token);
        if (decoded) {
            setIsSuperAdmin(decoded.isSuperAdmin)
        }
    }, [])

    const productList = async () => {
        const res = await getAllProducts();
        setIsActiveProduct(res[0]?._id)
        setProduct(res)
    }

    useEffect(() => {
        setCookie('productId', isActiveProduct)
    }, [isActiveProduct, product])

    const handleLogout = () => {
        deleteCookie('accessToken');
        deleteCookie('accessRoute');
        router.push('/login')
    }

    const handleChange = (e) => {
        setIsActiveProduct(e)
    }

    const copyProduct = async () => {
        try {
            await navigator.clipboard.writeText(isActiveProduct);
            toast('success',"Product Id Successfully Copied")
            console.log('Content copied to clipboard');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }

    return (
        <Fragment>
            {contextHolder}
            <div className='flex justify-between px-5 overflow-hidden overflow-x-auto'>
                <div className='lg:hidden'>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </div>
                <div className='flex ml-auto'>
                    {
                        !isSuperAdmin && (
                            <div className="px-5 border-r-2 border-gray-200">
                                <div className="px-5">
                                    <Button type="primary" onClick={copyProduct}>Copy Product Id</Button>
                                </div>
                            </div>
                        )
                    }
                    <div className="border-r-2 border-gray-200 px-5">
                        <Badge count={0} size="small" showZero>
                            <BellOutlined className="text-xl" />
                        </Badge>
                    </div>
                    {
                        !isSuperAdmin && (
                            <div className="px-5 w-60 border-r-2 border-gray-200">
                                <Select style={{ width: "100%" }} onChange={handleChange} value={isActiveProduct} >
                                    {
                                        product?.map((productData, index) => {
                                            return <Select.Option key={index} value={productData._id}>{productData.name}</Select.Option>
                                        })
                                    }
                                </Select>
                            </div>
                        )
                    }
                    <div className="px-5">
                        <Button type="primary" onClick={handleLogout}>Logout</Button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Navbar;