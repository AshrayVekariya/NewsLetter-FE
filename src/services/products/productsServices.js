import axios from './../../axios/interceptor';

const bearerToken = JSON.parse(localStorage.getItem('accessToken'));

const headers = {
    Authorization: `Bearer ${bearerToken}`
}

// Get All Product
export const getAllProducts = async () => {
    try {
        const res = await axios.get('product/get', { headers })
        return res.data.data
    } catch (err) {
        console.log(err);
    }
}

// Add Product
export const createProduct = async (payload) => {
    try {
        const res = await axios.post(`product/add`, payload, { headers })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

// Get Product By ID
export const getProductById = async (id, company) => {
    try {
        const res = await axios.get(`product/getById`, { params: { id, company }, headers })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

// Update Product
export const updateProduct = async (payload) => {
    try {
        const res = await axios.put(`product/update`, payload, { headers })
        return res.data
    } catch (error) {
        console.log(error)
    }
}


// Delete Product
export const deleteProduct = async (id) => {
    try {
        const res = await axios.delete(`product/delete`, { params: { id }, headers })
        return res.data
    } catch (error) {
        console.log(error)
    }
}