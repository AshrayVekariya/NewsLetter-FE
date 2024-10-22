import React from "react";

// Antd
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';

const ProductForm = ({ isModalOpen, handleOk, handleCancel, onFinishFailed, normFile, form, fileProps, editId, companyList }) => {
    return (
        <Modal title={editId ? "Update Product" : "Add Product"} maskClosable={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                        label="Logo"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={editId ? [] : [
                            {
                                required: true,
                                message: 'Logo is required!',
                            },
                        ]}
                    >
                        <Upload {...fileProps} name="logo" action="/upload.do" listType="picture" maxCount={1}>
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="Company"
                        name="company"
                        rules={[{ required: true, message: 'Company is required!' }]}>
                        <Select>
                            {
                                companyList?.map((company, index) => {
                                    return <Select.Option key={index} value={company._id}>{company.name}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Product Name"
                        rules={[
                            {
                                required: true,
                                message: 'Product name is required!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

export default ProductForm;