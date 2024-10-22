import axios from '../../axios/interceptor';

const bearerToken = JSON.parse(localStorage.getItem('accessToken'));
const product = localStorage.getItem('productId')

const headers = {
    Authorization: `Bearer ${bearerToken}`
}

// Get All blogs
export const getAllSubscriber = async () => {
    try {
        const res = await axios.get('subscriber/getByProduct', { params: { product }, headers })
        return res.data.data
    } catch (err) {
        console.log(err);
    }
}
