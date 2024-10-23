import axios from '../../axios/interceptor';

// Get All blogs
export const getAllSubscriber = async (product) => {
    try {
        const res = await axios.get('subscriber/getByProduct', { params: { product } })
        return res.data.data
    } catch (err) {
        console.log(err);
    }
}
