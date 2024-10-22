import axios from './../../axios/interceptor';

const bearerToken = JSON.parse(localStorage.getItem('accessToken'));

const headers = {
    Authorization: `Bearer ${bearerToken}`
}

// Get All Comapny
export const getAllCompanies = async () => {
    try {
        const res = await axios.get('company/get', { headers })
        return res.data.data
    } catch (err) {
        console.log(err);
    }
}

// Add Comapny
export const createCompany = async (payload) => {
    try {
        const res = await axios.post(`company/add`, payload, { headers })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

// Get Comapny By ID
export const getCompanyById = async (id) => {
    try {
        const res = await axios.get(`company/getById`, { params: { id }, headers })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

// Update Company
export const updateCompany = async (payload) => {
    try {
        const res = await axios.put(`company/update`, payload, { headers })
        return res.data
    } catch (error) {
        console.log(error)
    }
}


// Delete Compant
export const deleteCompany = async (id) => {
    try {
        const res = await axios.delete(`company/delete`, { params: { id }, headers })
        return res.data
    } catch (error) {
        console.log(error)
    }
}