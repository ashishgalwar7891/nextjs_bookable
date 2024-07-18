import Axios from '@/config/axios';

export const GetVendorDetailsService = async (userId) => {
    try {
        console.log("vendor details ")
        const response = await Axios.get(`/api/vendor/profile/${userId}` );
        return { response };
    } catch (error) {
        console.log("find me -->>",error);
    }
}

export const UpdatePersonalDetailsVendService = async (body) => {
    try {
        // const response = await Axios.post('/api/personal-info', body);
        // return { response };
        
    } catch (error) {
        console.log(error);
    }
};


