'use client'
import React, { useEffect, useState } from "react";

// Antd
import { Button, Form, message, Table } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

// Components
import ProtectedRoute from "../components/ProtectedRoutes";
import BlogsForm from "./form/BlogsForm";
import { getAllProducts } from "../../services/products/productsServices";
import { createBlogs, deleteBlogs, getAllBlogs, getBlogsById, updateBlogs } from "../../services/blogs/blogService";
import { getCookie } from "cookies-next";
import ViewBlog from "./view-blog/ViewBlog";

const Blogs = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productList, setProductList] = useState([])
    const [newsLetterList, setNewsLetter] = useState([])
    const [messageApi, contextHolder] = message.useMessage();
    const [editId, setEditId] = useState(null);
    const [textEditor, setTextEditor] = useState('');
    const [blogOpen, setBlogOpen] = useState(false);
    const [blogDetail, setBlogDetail] = useState({})
    const productId = getCookie('productId')

    const toast = (type, toastMessage) => {
        messageApi.open({
            type: type,
            content: toastMessage,
        });
    };

    useEffect(() => {
        getProducts();
        getBlogs();
    }, [])

    const getProducts = async () => {
        const response = await getAllProducts();
        setProductList(response)
    }

    const getBlogs = async () => {
        const response = await getAllBlogs(productId);
        setNewsLetter(response)
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const showBlogModal = (record) => {
        setBlogOpen(true);
        setBlogDetail(record)
    };
    const handleBlogCancel = () => {
        setBlogOpen(false);
        setBlogDetail({})
    };

    const [form] = Form.useForm();

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('description', textEditor);
            formData.append('product', values.product);
            if (values.upload) {
                formData.append('thumbnail', values.upload[0].originFileObj);
            }

            if (editId !== null) {
                formData.append('_id', editId);
                const response = await updateBlogs(formData);
                if (response.isSuccess) {
                    toast('success', response.message);
                    getBlogs();
                    setEditId(null)
                } else {
                    toast('error', response.message);
                }
            } else {
                const response = await createBlogs(formData);
                if (response.isSuccess) {
                    toast('success', response.message);
                    getBlogs();
                } else {
                    toast('error', response.message);
                }
            }
            handleCancel();
        } catch (error) {
            console.error('Failed to submit:', error);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
        setEditId(null);
        setTextEditor("");
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const fileProps = {
        name: "file",
        multiple: false,
        beforeUpload: () => {
            return false;
        },
        onChange(info) {
            if (info.file.status !== "uploading") {
                if (info.file.originFileObj instanceof File) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        console.log(e.target.result);
                    };
                    reader.readAsDataURL(info.file.originFileObj);
                } else {
                    console.error("The uploaded item is not a valid file.");
                }
            }
        }
    };

    const handleEdit = async (id, product) => {
        setEditId(id)
        const response = await getBlogsById(id, product);
        form.setFieldsValue(response.data);
        setTextEditor(response.data.description);
        setIsModalOpen(true);
    }

    const handleDelete = async (id) => {
        const response = await deleteBlogs(id);
        if (response.isSuccess) {
            toast('success', response.message);
            getBlogs();
        } else {
            toast('error', response.message);
        }
    }

    const columns = [
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (text) => <img src={text} alt="Profile" style={{ width: 50, height: 50 }} className="rounded-full border-2 border-black-900" />,
        },
        {
            title: 'Product Name',
            dataIndex: 'product',
            key: 'product',
            render: (text) => <div>
                {
                    productList.find((companyData) => companyData._id === text)?.name
                }
            </div>,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div className="flex gap-3">
                    <span className="text-xl text-[#1677ff] cursor-pointer" onClick={() => showBlogModal(record)}>
                        <EyeOutlined />
                    </span>
                    <span className="text-xl text-green-500 cursor-pointer" onClick={() => handleEdit(record._id, record.product)}>
                        <EditOutlined />
                    </span>
                    <span className="text-xl text-red-500 cursor-pointer" onClick={() => handleDelete(record._id)}>
                        <DeleteOutlined />
                    </span>
                </div>
            ),
        },
    ];

    return (
        <ProtectedRoute>
            {contextHolder}
            <div className="flex sm:justify-between sm:items-center flex-col sm:flex-row gap-5">
                <div>
                    <h1 className="text-2xl font-bold text-start">Blogs</h1>
                </div>
                <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>Add Blogs</Button>
            </div>

            <div className="my-10 max-h-[600px] overflow-hidden overflow-y-auto sm:max-h-full">
                <Table
                    columns={columns}
                    dataSource={newsLetterList}
                    scroll={{ x: 'max-content' }}
                />
            </div>

            <BlogsForm
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                onFinishFailed={onFinishFailed}
                normFile={normFile}
                form={form}
                fileProps={fileProps}
                editId={editId}
                productList={productList}
                textEditor={textEditor}
                setTextEditor={setTextEditor}
            />

            <ViewBlog
                blogOpen={blogOpen}
                handleBlogCancel={handleBlogCancel}
                blogDetail={blogDetail}
            />

        </ProtectedRoute>

    )
}

export default Blogs;