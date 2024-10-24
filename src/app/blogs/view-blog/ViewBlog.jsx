'use client';
import React from 'react';
import { Button, Modal } from 'antd';

const ViewBlog = ({ blogOpen, handleBlogCancel, blogDetail }) => {
    return (
        <>
            <Modal
                open={blogOpen}
                title="Blog Detail"
                width={700}
                onCancel={handleBlogCancel}
                footer={[
                    <Button key="back" type="primary" onClick={handleBlogCancel}>
                        Close
                    </Button>
                ]}
            >
                <div dangerouslySetInnerHTML={{ __html: blogDetail.description }}></div>
            </Modal>
        </>
    );
};
export default ViewBlog;