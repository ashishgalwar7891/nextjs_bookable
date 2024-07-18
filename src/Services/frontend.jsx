import Axios from '@/config/axios';
import { setCookie } from '../utils/commonMethods';
import InfoModal from '@/lib/commonComponent/ConfirmModal';


export const SERVICE_DETAILS = async (userData) => {
    try {
       
        const response = await Axios.post(`/api/biz_front_service_details`, userData);
        return { response };
    } catch (error) {
        InfoModal({ 
            type:'error',
            title:'Error',
            text: 'Check the network error. Thanks'
        })
    }
}
export const PACKAGE_DETAILS = async (userData) => {
    try {
       
        const response = await Axios.post(`/api/biz_front_package_details`, userData);
        return { response };
    } catch (error) {
        InfoModal({ 
            type:'error',
            title:'Error',
            text: 'Check the network error. Thanks'
        })
    }
}
export const LOCATION_SLOT_BY_RESOURCE = async (userData) => {
    try {
       
        const response = await Axios.post(`/api/location_slot_by_resource`, userData);
        return { response };
    } catch (error) {
        InfoModal({ 
            type:'error',
            title:'Error',
            text: 'Check the network error. Thanks'
        })
    }
}
export const SESSION_DATE_SLOTS = async (userData) => {
    try {
       
        const response = await Axios.post(`/api/session_date_slots`, userData);
        return { response };
    } catch (error) {
        InfoModal({ 
            type:'error',
            title:'Error',
            text: 'Check the network error. Thanks'
        })
    }
}
export const ADD_TO_CART = async (userData) => {
    try {
        console.log("ADD_TO_CART===>",userData)
        const response = await Axios.post(`/api/add_to_cart`, userData);
        console.log("ADD_TO_CART -services",response.data.user.id)
        localStorage.setItem('CustomerId',response.data.user.id)
        return { response };
    } catch (error) {
        InfoModal({ 
            type:'error',
            title:'Error',
            text: 'Check the network error. Thanks'
        })
    }
}
export const BOOK_DIRECT = async (userData) => {
    try {
       
        const response = await Axios.post(`/api/book_direct`, userData);
        return { response };
    } catch (error) {
        InfoModal({ 
            type:'error',
            title:'Error',
            text: 'Check the network error. Thanks'
        })
    }
}
export const RESCHEDULE_REQUEST = async (userData) => {
    try {
       
        const response = await Axios.post(`/api/reschedule_request`, userData);
        return { response };
    } catch (error) {
        InfoModal({ 
            type:'error',
            title:'Error',
            text: 'Check the network error. Thanks'
        })
    }
}
export const UPDATE_PAYMENT = async (userData) => {
    try {
       
        const response = await Axios.post(`/api/update_payment`, userData);
        return { response };
    } catch (error) {
        InfoModal({ 
            type:'error',
            title:'Error',
            text: 'Check the network error. Thanks'
        })
    }
}

export const BOOK_APPOINTMENT = async (userData) => {
    try {
       
        const response = await Axios.post(`/api/book_appointment`, userData);
        return { response };
    } catch (error) {
        InfoModal({ 
            type:'error',
            title:'Error',
            text: 'Check the network error. Thanks'
        })
    }
}
export const BIZ_FAVORITE_ADD_UPDATE = async (userData) => {
    try {
       
        const response = await Axios.post(`/api/biz_add_to_favorite`, userData);
        return { response };
    } catch (error) {
        InfoModal({ 
            type:'error',
            title:'Error',
            text: 'Check the network error. Thanks'
        })
    }
}
export const USER_PAYMENT_LIST = async (userData) => {
    try {
       
        const response = await Axios.post(`/api/user_payment_list`, userData);
        return { response };
    } catch (error) {
        InfoModal({ 
            type:'error',
            title:'Error',
            text: 'Check the network error. Thanks'
        })
    }
}
export const BOOKING_DETAILS = async (userData) => {
    try {
       
        const response = await Axios.post(`/api/booking_detail`, userData);
        return { response };
    } catch (error) {
        InfoModal({ 
            type:'error',
            title:'Error',
            text: 'Check the network error. Thanks'
        })
    }
}

export const SEND_CONTACT_MAIL = async (userData) => {
    try {
       
        const response = await Axios.post(`/api/query`, userData);
        return response;
    } catch (error) {
        InfoModal({ 
            type:'error',
            title:'Error',
            text: 'Check the network error. Thanks'
        })
    }
}

export const SEND_VENDOR_CALL_MAIL = async (userData) => {
    try {
       
        const response = await Axios.post(`/api/help`, userData);
        return response;
    } catch (error) {
        InfoModal({ 
            type:'error',
            title:'Error',
            text: 'Check the network error. Thanks'
        })
    }
}

export const GET_USER_PROFILE = async (userData) => {
    try {
       
        const response = await Axios.post(`/api/get_user_profile`, userData);
        return response;
    } catch (error) {
        InfoModal({ 
            type:'error',
            title:'Error',
            text: 'Check the network error. Thanks'
        })
    }
}
export const SEARCH_FORM = async (userData) => {
    try {
       
        const response = await Axios.post(`/api/biz_search_form`, userData);
        return response;
    } catch (error) {
        InfoModal({ 
            type:'error',
            title:'Error',
            text: 'Check the network error. Thanks'
        })
    }
}
export const CHECK_USER_STATUS = async (userData) => {
    try {
       
        const response = await Axios.post(`/api/check_user_status`, userData);
        return response;
    } catch (error) {
        InfoModal({ 
            type:'error',
            title:'Error',
            text: 'Check the network error. Thanks'
        })
    }
}


