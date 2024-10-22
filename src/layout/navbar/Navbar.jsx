'use client';
import React, { Fragment, useEffect, useState } from "react";

// Antd
import {
    BellOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Badge, Button, Select, } from "antd";
import { useRouter } from "next/navigation";
import { getAllProducts } from "../../services/products/productsServices";
import { jwtDecode } from "jwt-decode";

const Navbar = ({ collapsed, setCollapsed }) => {
    const router = useRouter();
    const [product, setProduct] = useState([])
    const [isActiveProduct, setIsActiveProduct] = useState("")
    const [isSuperAdmin, setIsSuperAdmin] = useState(false)

    useEffect(() => {
        productList();
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
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
        localStorage.setItem('productId', isActiveProduct)
    }, [isActiveProduct, product])

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('accessRoute');
        router.push('/login')
    }

    const handleChange = (e) => {
        setIsActiveProduct(e)
    }

    return (
        <Fragment>
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