import axios from '../../axios/interceptor';

// Get All blogs
export const getAllBlogs = async (product) => {
    try {
        const res = await axios.get('blog/get', { params: { product } })
        return res.data.data
    } catch (err) {
        console.log(err);
    }
}

// Add Blogs
export const createBlogs = async (payload) => {
    try {
        const res = await axios.post(`blog/add`, payload)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

// Get Blogs By ID
export const getBlogsById = async (id, product) => {
    try {
        const res = await axios.get(`blog/getById`, { params: { id, product } })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

// Update Blogs
export const updateBlogs = async (payload) => {
    try {
        const res = await axios.put(`blog/update`, payload)
        return res.data
    } catch (error) {
        console.log(error)
    }
}


// Delete Blogs
export const deleteBlogs = async (id) => {
    try {
        const res = await axios.delete(`blog/delete`, { params: { id } })
        return res.data
    } catch (error) {
        console.log(error)
    }
}