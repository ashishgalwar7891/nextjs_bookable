import Axios from '@/config/axios';
import InfoModal from '@/lib/commonComponent/ConfirmModal';

export const GetAllBookingsVendService = async (body) => {
    try {
        const response = await Axios.post('/api/bookingsService', body);
        if (response?.status === 200) {
            return { response };
        }

    } catch (error) {
        console.log(error);
        InfoModal({ 
            type:'error',
            title:'Error',
            text: 'Something went wrong'
        })
    }
}

export const GetBookServicesNameService = async (body) => {
    try {
        const response = await Axios.post('/api/getBookingService', body);
        if (response?.status === 200) {
            return { response };
        }

    } catch (error) {
        console.log(error);
        InfoModal({ 
            type:'error',
            title:'Error',
            text: 'Something went wrong'
        })
    }
}

export const FetchAllPayoutsForVendor = async (body) => {
    try {
        const response = await Axios.post('/api/get-user-payments', body);
        if (response?.status === 200) {
            return { response };
        }

    } catch (error) {
        console.log(error);
        InfoModal({ 
            type:'error',
            title:'Error',
            text: 'Something went wrong'
        })
    }
}

export const GetBookDetailsByIdService = async (body) => {
    try {
        const response = await Axios.post(`/api/get-user-payments-details`, body);
        if (response?.status === 200) {
            return { response };
        }

    } catch (error) {
        console.log(error);
        InfoModal({ 
            type:'error',
            title:'Error',
            text: 'Something went wrong'
        })
    }
}
