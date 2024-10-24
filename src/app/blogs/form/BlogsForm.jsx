'use client';
import React, { useEffect, useRef } from "react";

// Antd
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        matchVisual: false,
    }
};

const BlogsForm = ({ isModalOpen, handleOk, handleCancel, onFinishFailed, normFile, form, fileProps, editId, productList, textEditor, setTextEditor }) => {
    const editorRef = useRef();
    const { ReactQuill } = editorRef.current || {};
    useEffect(() => {
        editorRef.current = {
            ReactQuill: require("react-quill")
        };
    }, []);
    return (
        <Modal title={editId ? "Update Blog" : "Add Blog"} width={1000} maskClosable={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div className="py-5">
                <Form
                    name="basic"
                    layout="vertical"
                    form={form}
                    initialValues={{
                        remember: true,
                    }}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="upload"
                        label="Thumbnail"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={editId ? [] : [
                            {
                                required: true,
                                message: 'Image is required!',
                            },
                        ]}
                    >
                        <Upload {...fileProps} name="logo" action="/upload.do" listType="picture" maxCount={1}>
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="Product"
                        name="product"
                        rules={[{ required: true, message: 'Product is required!' }]}>
                        <Select placeholder="Select your product">
                            {
                                productList?.map((product, index) => {
                                    return <Select.Option key={index} value={product._id}>{product.name}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[
                            {
                                required: true,
                                message: 'Title is required!',
                            },
                        ]}
                    >
                        <Input placeholder="Enter your Blog title" />
                    </Form.Item>

                    <div>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Description is required!',
                                },
                            ]}
                        >
                            <ReactQuill
                                theme="snow"
                                modules={modules}
                                formats={['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'video']} />
                        </Form.Item>
                    </div>

                </Form>
            </div>
        </Modal>
    )
}

export default BlogsForm;