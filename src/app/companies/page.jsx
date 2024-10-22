'use client';
import React, { useEffect, useState } from "react";

// Antd
import { Button, Form, message, Table } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

// Components
import ProtectedRoute from "../components/ProtectedRoutes";
import { createCompany, deleteCompany, getAllCompanies, getCompanyById, updateCompany } from './../../services/companies/companiesService';
import CompanyForm from "./form/companyForm";


const Company = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyList, setComapnyList] = useState([])
  const [messageApi, contextHolder] = message.useMessage();
  const [editId, setEditId] = useState(null);

  const toast = (type, toastMessage) => {
    messageApi.open({
      type: type,
      content: toastMessage,
    });
  };

  useEffect(() => {
    getComapnies();
  }, [])

  const getComapnies = async () => {
    const response = await getAllCompanies()
    setComapnyList(response)
  }

  const showModal = () => {
    setIsModalOpen(true);
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

      formData.append('name', values.name);
      formData.append('email', values.email);
      if (values.upload) {
        formData.append('logo', values.upload[0].originFileObj);
      }

      if (editId !== null) {
        formData.append('_id', editId);

        const response = await updateCompany(formData);
        if (response.isSuccess) {
          toast('success', response.message);
          getComapnies();
          setEditId(null)
        } else {
          toast('error', response.message);
        }
      } else {
        formData.append('password', values.password);
        formData.append('confirmPassword', values.confirmPassword);
        formData.append('isSuperAdmin', false)

        const response = await createCompany(formData);
        if (response.isSuccess) {
          toast('success', response.message);
          getComapnies();
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
    setEditId(null)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const fileProps = {
    name: "file",
    multiple: false,
    beforeUpload: () => {
      return false; // Prevents auto-upload
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

  const handleDelete = async (id) => {
    const response = await deleteCompany(id);
    if (response.isSuccess) {
      toast('success', response.message);
      getComapnies();
    } else {
      toast('error', response.message);
    }
  }

  const handleEdit = async (id) => {
    setEditId(id)
    const response = await getCompanyById(id);
    form.setFieldsValue(response.data);
    setIsModalOpen(true);
  }

  const columns = [
    {
      title: 'Logo',
      dataIndex: 'logo',
      key: 'logo',
      render: (text) => <img src={text} alt="Profile" style={{ width: 50, height: 50 }} className="rounded-full border-2 border-black-900" />,
    },
    {
      title: 'Company Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div className="flex gap-3">
          <span className="text-xl text-green-500 cursor-pointer" onClick={() => handleEdit(record._id)}>
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
          <h1 className="text-2xl font-bold text-start">Companies</h1>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>Add Company</Button>
      </div>

      <div className="my-10 max-h-[600px] overflow-hidden overflow-y-auto sm:max-h-full">
        <Table
          columns={columns}
          dataSource={companyList}
          scroll={{ x: 'max-content' }}
        />
      </div>

      <CompanyForm
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        onFinishFailed={onFinishFailed}
        normFile={normFile}
        form={form}
        fileProps={fileProps}
        editId={editId}
      />

    </ProtectedRoute>
  );
}

export default Company;
