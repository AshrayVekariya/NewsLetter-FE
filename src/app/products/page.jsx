'use client';
import React, { useEffect, useState } from "react";

// Antd
import { Button, Form, message, Table } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

// Components
import ProtectedRoute from "../components/ProtectedRoutes";
import { getAllCompanies } from "../../services/companies/companiesService";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../../services/products/productsServices";
import ProductForm from './form/productForm'

const Company = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyList, setComapnyList] = useState([])
  const [productList, setProductList] = useState([])
  const [messageApi, contextHolder] = message.useMessage();
  const [editId, setEditId] = useState(null);

  const toast = (type, toastMessage) => {
    messageApi.open({
      type: type,
      content: toastMessage,
    });
  };

  useEffect(() => {
    getProducts();
    getComapnies();
  }, [])

  const getProducts = async () => {
    const response = await getAllProducts();
    setProductList(response)
  }

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
      formData.append('company', values.company);
      if (values.upload) {
        formData.append('logo', values.upload[0].originFileObj);
      }

      if (editId !== null) {
        formData.append('_id', editId);
        const response = await updateProduct(formData);
        if (response.isSuccess) {
          toast('success', response.message);
          getProducts();
          setEditId(null)
        } else {
          toast('error', response.message);
        }

      } else {
        const response = await createProduct(formData);
        if (response.isSuccess) {
          toast('success', response.message);
          getProducts();
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
    const response = await deleteProduct(id);
    if (response.isSuccess) {
      toast('success', response.message);
      getProducts();
    } else {
      toast('error', response.message);
    }
  }

  const handleEdit = async (id, company) => {
    setEditId(id)
    const response = await getProductById(id, company);
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
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Company Name',
      dataIndex: 'company',
      key: 'company',
      render: (text) => <div>
        {
          companyList.find((companyData) => companyData._id === text)?.name
        }
      </div>,
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
          <span className="text-xl text-green-500 cursor-pointer" onClick={() => handleEdit(record._id, record.company)}>
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
          <h1 className="text-2xl font-bold text-start">Products</h1>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>Add Product</Button>
      </div>

      <div className="my-10 max-h-[600px] overflow-hidden overflow-y-auto sm:max-h-full">
        <Table
          columns={columns}
          dataSource={productList}
          scroll={{ x: 'max-content' }}
        />
      </div>

      <ProductForm
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        onFinishFailed={onFinishFailed}
        normFile={normFile}
        form={form}
        fileProps={fileProps}
        editId={editId}
        companyList={companyList}
      />


    </ProtectedRoute>
  );
}

export default Company;
