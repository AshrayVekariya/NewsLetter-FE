import axios from './../../axios/interceptor';

// Get All NewsLetter
export const getAllnewsLetter = async (product) => {
    try {
        const res = await axios.get('news-letter/get', { params: { product } })
        return res.data.data
    } catch (err) {
        console.log(err);
    }
}

// Add NewsLetter
export const createNewsLetter = async (payload) => {
    try {
        const res = await axios.post(`news-letter/add`, payload)
        return res.data
    } catch (error) {
        console.log(error)
    }
}


// Get NewsLetter By ID
export const getNewsLetterById = async (id, product) => {
    try {
        const res = await axios.get(`news-letter/getById`, { params: { id, product } })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

// Update NewsLetter
export const updateNewsLetter = async (payload) => {
    try {
        const res = await axios.put(`news-letter/update`, payload)
        return res.data
    } catch (error) {
        console.log(error)
    }
}


// Delete NewsLetter
export const deleteNewsLetter = async (id) => {
    try {
        const res = await axios.delete(`news-letter/delete`, { params: { id } })
        return res.data
    } catch (error) {
        console.log(error)
    }
}