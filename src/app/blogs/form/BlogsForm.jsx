'use client';
import React from "react";

// Antd
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';

import dynamic from "next/dynamic";

// ckedior
const { CKEditor }  = dynamic(() => import('@ckeditor/ckeditor5-react') , {ssr : false})
const ClassicEditor = dynamic(() => import('@ckeditor/ckeditor5-build-classic') , {ssr : false})

const BlogsForm = ({ isModalOpen, handleOk, handleCancel, onFinishFailed, normFile, form, fileProps, editId, productList, textEditor, setTextEditor }) => {
    return (
        <Modal title={editId ? "Update Blog" : "Add Blog"} maskClosable={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                        label="Image"
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
                        <Select>
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
                        <Input />
                    </Form.Item>

                    <div>
                        <span className="block">Description</span>
                        <CKEditor
                            editor={ClassicEditor}
                            data={textEditor}
                            onChange={(event, editor) => {
                                setTextEditor(editor.getData())
                            }}
                        />
                    </div>

                </Form>
            </div>
        </Modal>
    )
}

export default BlogsForm;