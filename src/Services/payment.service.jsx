import Axios from '@/config/axios';
import InfoModal from '@/lib/commonComponent/ConfirmModal';

// Stripe Payment 

export const StripePaymentIntentService = async (userId, amount) => {
    try {
        body: JSON.stringify({ items: [{ id: "xl-tshirt" }] })
        console.log("userId payment -->>", {"user_id": userId, "amount" : amount });
        const response = await Axios.post('/api/userServicePaymentIntent', {"user_id": userId, "amount" : amount });
        console.log("Payment Int res 1 -->>", response);
        return { response };
    } catch (error) {
        console.log("stipe find me ==>>", error);
        if (error?.response && error?.response?.data && error?.response?.data?.error) {
            InfoModal({ 
                type: 'error',
                title:'Error',
                text: (error?.response?.data?.error?.email)? error?.response?.data?.error?.email[0] : error?.response?.data?.error
            })
        } else {
            InfoModal({ 
                type:'error',
                title:'Error',
                text: 'Something went wrong'
            })
        }
    return { error };
    }
};


export const StripeSubscriptionIntentService = async (body) => {
    try {
        const response = await Axios.post('/api/generate_subscription_intent', body);
        return { response };
    } catch (error) {
        console.log("stipe find me ==>>", error);
        if (error?.response && error?.response?.data && error?.response?.data?.error) {
            InfoModal({ 
                type: 'error',
                title:'Error',
                text: (error?.response?.data?.error?.email)? error?.response?.data?.error?.email[0] : error?.response?.data?.error
            })            
        } else {
            // InfoModal({ 
            //     type:'error',
            //     title:'Error',
            //     text: 'Something went wrong'
            // })
        }
    return { error };
    }
};



export const PostStripePaymentDetails = async (data) => {
    try {
        console.log("userId payment -->>", data);
        const response = await Axios.post('/api/bookanOrder', data);
        console.log("Payment Add res 1 -->>", response);
        return { response };
    } catch (error) {
        console.log("stipe find me ==>>", error);
        if (error?.response && error?.response?.data && error?.response?.data?.error) {
            InfoModal({ 
                type: 'error',
                title:'Error',
                text: (error?.response?.data?.error?.email)? error?.response?.data?.error?.email[0] : error?.response?.data?.error
            })            
        } else {
            InfoModal({ 
                type:'error',
                title:'Error',
                text: 'Something went wrong'
            })
        }
    return { error };
    }
};

export const PostStripeSubscriptionDetails = async (data) => {
    try {
        console.log("userId vendor sub payment data -->>", data);
        const response = await Axios.post('/api/postVendorSubscription', data);
        console.log("Post Vendor Subscription -->>", response);
        return { response };
    } catch (error) {
        console.log("stipe find me ==>>", error);
        if (error?.response && error?.response?.data && error?.response?.data?.error) {
            InfoModal({ 
                type: 'error',
                title:'Error',
                text: (error?.response?.data?.error?.email)? error?.response?.data?.error?.email[0] : error?.response?.data?.error
            })            
        } else {
            InfoModal({ 
                type:'error',
                title:'Error',
                text: 'Something went wrong API Post Stripe Subscription Dets'
            })
        }
    return { error };
    }
};

export const GetStripePaymentDetails = async (data) => {
    try {
        console.log("Get payment details -->>", data);
        const response = await Axios.post('/api/Orderdetails', data);
        console.log("Payment Get res 1 -->>", response);
        return { response };
    } catch (error) {
        console.log("stipe find me ==>>", error);
        if (error?.response && error?.response?.data && error?.response?.data?.error) {
            InfoModal({ 
                type: 'error',
                title:'Error',
                text: (error?.response?.data?.error?.email)? error?.response?.data?.error?.email[0] : error?.response?.data?.error
            })            
        } else {
            InfoModal({ 
                type:'error',
                title:'Error',
                text: 'Something went wrong'
            })
        }
    return { error };
    }
};

export const GetStripeReschedulePayIntent = async (data) => {
    try {
        console.log("Get re payment details -->>", data);
        const response = await Axios.post('/api/reschedule-payment-intent', data);
        console.log("Payment Get res 1 -->>", response);
        return { response };
    } catch (error) {
        console.log("stipe find me ==>>", error);
    }
}
export const ReschedulePayIntent = async (data) => {
    try {
        console.log("Get re payment details -->>", data);
        const response = await Axios.post('/api/biz-reschedule-payment-intent', data);
        console.log("Payment Get res 1 -->>", response);
        return { response };
    } catch (error) {
        console.log("stipe find me ==>>", error);
    }
}
export const PostVendorPaymentDetails = async (data) => {
    try {
        console.log("Get re payment details -->>", data);
        const response = await Axios.post('/api/vendor/plans_post', data);
        console.log("Payment Get res 1 -->>", response);
        return { response };
    } catch (error) {
        console.log("stipe find me ==>>", error);
    }
}


export const updateSubscriptionMonthlyOrAnnual = async (data) => {
    try {
        console.log("updateSubscriptionMonthlyOrAnnual details -->>", data);
        const response = await Axios.post('/api/vendor/subscription_monthly_or_annual', data);
        console.log("Payment Get res 1 -->>", response);
        return { response };
    } catch (error) {
        console.log("stipe find me ==>>", error);
    }
}

export const BIZ_APPLY_COUPON = async (data) => {
    try {
        console.log("apply coupon details data being passed to API as Pay Load -->>", data);
        const response = await Axios.post('/api/biz_apply_coupon', data);
        console.log("Apply Coupon Get res 1 -->>", response);
        return { response };
    } catch (error) {
        console.log("stipe find me ==>>", error);
    }
}



