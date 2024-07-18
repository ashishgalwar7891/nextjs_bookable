import Axios from '@/config/axios';
import InfoModal from '@/lib/commonComponent/ConfirmModal';

export const GetAllMyBookingsServices = async (data) => {
    try {
        const response = await Axios.post(`/api/myBookings`, data);
        return { response };
    } catch (error) {
        console.log(error);
        InfoModal({ 
            type:'error',
            title:'Error',
            text: 'Something went wrong'
        })
    }
}

export const GetAllMyAppointmentServices = async (data) => {
    try {
        const response = await Axios.post(`/api/my-appointments`, data);
        return { response };
    } catch (error) {
        console.log(error);
        InfoModal({ 
            type:'error',
            title:'Error',
            text: 'Something went wrong'
        })
    }
}

export const CancelMyBookingsByIdServices = async (data) => {
    try {
        const response = await Axios.post(`/api/cancelBooking`, data);
        console.log("response 1 ==", response);
        if (response?.status === 200) {
            InfoModal({ 
                type:'success',
                title:'Booking Cancel success',
                text: 'Your booking has been cancelled successfully',
            })
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

export const RescheduleMyBookingServices = async (data) => {
    try {
        const response = await Axios.post(`/api/rescheduleBooking`, data);
        console.log("response 1 ==", response);
        if (response?.status === 200) {
            InfoModal({ 
                type:'success',
                title:'Booking Reschedule success',
                text: 'Your Booking has been rescheduled successfully',
            })
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

export const RateBookingServices = async (data) => {
    try {
        const response = await Axios.post(`/api/add-rating`, data);
        if (response?.status === 200) {
            InfoModal({ 
                type:'success',
                title:'Saved Review success',
                text: 'Your Booking review has been saved successfully',
            })
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