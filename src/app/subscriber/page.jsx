'use client';
import React, { useEffect, useState } from "react";

// Antd
import { Table } from "antd";

// Components
import ProtectedRoute from "../components/ProtectedRoutes";
import { getAllSubscriber } from "../../services/subscriber/subscriberService";
import { getAllProducts } from "../../services/products/productsServices";

const NewsLetter = () => {
    const [subscriberList, setSubscriberList] = useState([])
    const [productList, setProductList] = useState([])
    const [productId, setProductId] = useState('')

    useEffect(() => {
        getSubscriber();
        getProduct();
    }, [])

    useEffect(() => {
        if (typeof window !== "undefined") {
            setProductId(localStorage.getItem('productId'))
        }
    }, [])

    const getSubscriber = async () => {
        const response = await getAllSubscriber(productId);
        setSubscriberList([response])
    }

    const getProduct = async () => {
        const response = await getAllProducts();
        setProductList(response)
    }

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'product',
            key: 'product',
            render: (text) => <div>
                {
                    productList.find((productData) => productData._id === text)?.name
                }
            </div>,
        },
        {
            title: 'Emails',
            dataIndex: 'emails',
            key: 'emails',
            render: (text) => <div>{
                text.map((emails, index) => {
                    return (
                        <p key={index}>{emails}</p>
                    )
                })
            }</div>
        },
    ];

    return (
        <ProtectedRoute>
            <div className="flex sm:justify-between sm:items-center flex-col sm:flex-row gap-5">
                <div>
                    <h1 className="text-2xl font-bold text-start">Subscriber</h1>
                </div>
            </div>

            <div className="my-10 max-h-[600px] overflow-hidden overflow-y-auto sm:max-h-full">
                <Table
                    columns={columns}
                    dataSource={subscriberList}
                    scroll={{ x: 'max-content' }}
                />
            </div>
        </ProtectedRoute>

    )
}

export default NewsLetter;