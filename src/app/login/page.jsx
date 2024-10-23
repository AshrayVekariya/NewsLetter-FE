'use client'
import React, { useEffect, useState } from "react";

// Antd
import { Button, Checkbox, Form, Input, message } from 'antd';

// axios
import axios from "../../axios/interceptor";

// Next JS Hooks and Components
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { setCookie } from 'cookies-next';

const LoginPage = () => {
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = (values) => {
        axios.post(`company/login`, { ...values })
            .then(response => {

                if (response.data.isSuccess) {
                    setCookie('accessToken', response.data.token);
                    const menuAccess = JSON.stringify(response.data.menuAccess)
                    setCookie('accessRoute', menuAccess);
                    router.push('/');
                    const success = () => {
                        messageApi.open({
                            type: 'success',
                            content: response.data.message,
                        });
                    };
                    success()
                } else {
                    const success = () => {
                        messageApi.open({
                            type: 'error',
                            content: response.data.message,
                        });
                    };
                    success()
                }
            })
            .catch(err => console.log(err))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="h-screen flex items-center">
            {contextHolder}
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center shadow-[0_0px_6px_-3px_rgb(0,0,0)] py-16 rounded-md">
                    <div className="flex justify-center xl:px-20 hidden lg:block">
                        <Image
                            src="/assets/images/login/login.svg"
                            alt="sign-in"
                            width={600}
                            height={600}
                            unoptimized
                        />
                    </div>
                    <div className="px-5 md:px-20">
                        <h1 className="text-4xl font-bold py-10">Sign In</h1>
                        <div>
                            <Form
                                name="basic"
                                layout="vertical"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Email"
                                    name="email"
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

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <div className="flex justify-between">
                                    <Form.Item
                                        name="remember"
                                        valuePropName="checked"
                                    >
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>
                                    <div>
                                        <Link href={'/forgotPassword'}><span>Forgot Password?</span></Link>
                                    </div>
                                </div>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" block>
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;