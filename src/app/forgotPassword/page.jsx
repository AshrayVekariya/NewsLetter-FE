'use client'
import React, { useState } from "react";

// Antd
import { Button, Form, Input, message } from 'antd';

// axios
import axios from "../../axios/interceptor";

// Next JS Hooks and Components
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Link from "next/link";

const LoginPage = () => {
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const [isOtp, setIsOtp] = useState(false);

    const onChange = (text) => {
        console.log('onChange:', text);
    };

    const sharedProps = {
        onChange,
    };

    const onFinish = (values) => {
        axios.post(`company/forgetPassword`, { ...values })
            .then(response => {
                if (response.data.isSuccess) {
                    const success = () => {
                        messageApi.open({
                            type: 'success',
                            content: response.data.message,
                        });
                    };
                    success();
                    setIsOtp(true)
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

    const onResetPasswordFinish = (values) => {
        axios.post(`company/verifyOtpCode`, { ...values })
            .then(response => {
                if (response.data.isSuccess) {
                    const success = () => {
                        messageApi.open({
                            type: 'success',
                            content: response.data.message,
                        });
                    };
                    success();
                    router.push('/login')
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
                        {
                            isOtp ? <>
                                <div className="py-10">
                                    <h2 className="text-4xl font-bold">Reset Your Password here.</h2>
                                </div>
                                <Form
                                    name="basic"
                                    layout="vertical"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={onResetPasswordFinish}
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
                                        name="otpCode"
                                        label="OTP"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your OTP!',
                                            },
                                            {
                                                len: 6,
                                                message: 'OTP must be exactly 6 digits.',
                                            },
                                            {
                                                pattern: /^\d{6}$/,
                                                message: 'OTP must be numeric.',
                                            },
                                        ]}
                                    >
                                        <Input.OTP {...sharedProps} />
                                    </Form.Item>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <Form.Item
                                                name="newPassword"
                                                label="New Password"
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
                                        </div>
                                        <div>
                                            <Form.Item
                                                name="confirmPassword"
                                                label="Confirm Password"
                                                dependencies={['newPassword']}
                                                hasFeedback
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please confirm your password!',
                                                    },
                                                    ({ getFieldValue }) => ({
                                                        validator(_, value) {
                                                            if (!value || getFieldValue('newPassword') === value) {
                                                                return Promise.resolve();
                                                            }
                                                            return Promise.reject(new Error('The new password that you entered do not match!'));
                                                        },
                                                    }),
                                                ]}
                                            >
                                                <Input.Password />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="text-end">
                                        <Link href={'/login'}>Back to Sign in</Link>
                                    </div>
                                    <div className="mt-5">
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" block>
                                                Reset Password
                                            </Button>
                                        </Form.Item>
                                    </div>

                                </Form>
                            </> : <>
                                <div className="py-10">
                                    <h1 className="text-4xl font-bold">Forgot Your Password ?</h1>
                                </div>
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

                                        <div className="text-end">
                                            <Link href={'/login'}>Back to Sign in</Link>
                                        </div>
                                        <div className="mt-5">
                                            <Form.Item>
                                                <Button type="primary" htmlType="submit" block>
                                                    Send OTP
                                                </Button>
                                            </Form.Item>
                                        </div>

                                    </Form>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;