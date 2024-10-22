import React from "react";

// Antd
import { Button, Form, Input, Modal, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';

const CompanyForm = ({ isModalOpen, handleOk, handleCancel, onFinishFailed, normFile, form, fileProps, editId }) => {
    return (
        <Modal title={editId ? "Update Company" : "Add Comapny"} maskClosable={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                        name="name"
                        label="Company Name"
                        rules={[
                            {
                                required: true,
                                message: 'Comapny name is required!',
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

                    {
                        !editId && (
                            <>
                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your new password!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The new password that you entered do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                            </>
                        )
                    }
                </Form>
            </div>
        </Modal>
    )
}

export default CompanyForm;