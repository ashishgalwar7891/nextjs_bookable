import Axios from '@/config/axios';
import { setCookie } from '../utils/commonMethods';
import InfoModal from '@/lib/commonComponent/ConfirmModal';

// Vendors

export const registerVendorService = async (body) => {

    console.log("registerVendorService--=-->",body)
    try {
        const response = await Axios.post('/api/vendor-register', body);
        if (response?.status === 200) {
            if ('google_details' in response?.data?.success) {
                const extractedToken = response?.data?.success?.token?.token;
                const extractedUserId = response?.data?.success?.user_id;
                const userRole = response?.data?.success?.role;
                const redirect = response?.data?.success?.redirect;
                let userName = response?.data?.success?.name;
                if (extractedToken) {
                    localStorage.setItem('token', extractedToken);
                    localStorage.setItem('userId', extractedUserId);
                    localStorage.setItem('role', userRole);
                    localStorage.setItem('email', response?.data?.success?.email);
                    localStorage.setItem('user', userName);
                    localStorage.setItem('redirect', redirect);
                }

            } else {
                InfoModal({
                    type: 'success',
                    title: 'Email Sent',
                    text: 'We have sent you a verification link on you email. Please log in using the link.',
                })
                // window.location.href = '/vendor/reset-password';
            }

        }
        return response;
    } catch (error) {
        console.log(error);
        if (error?.response && error?.response?.data && error?.response?.data?.error) {
            InfoModal({
                type: 'error',
                title: 'Warning',
                text: (error?.response?.data?.error?.email) ? error?.response?.data?.error?.email[0] : error?.response?.data?.error
            })
        } else {
            InfoModal({
                type: 'error',
                title: 'Error',
                text: 'Something went wrong'
            })
        }
        return { error };
    }
};

export const createPasswordVendorService = async (body) => {
    try {
        const response = await Axios.post('/api/password-setting', body);
        // const { data } = response && response.data;
        // setCookie('token', data);
        if (response?.status === 200) {
            InfoModal({
                type: 'success',
                title: 'Password set success',
                text: 'Congratulations your password has been set successfully',
            })
        }
        return { response };
    } catch (error) {
        console.log(error);
        if (error?.response && error?.response?.data) {
            InfoModal({
                type: 'error',
                title: 'Error',
                text: error?.response?.data?.message
            })
        } else {
            InfoModal({
                type: 'error',
                title: 'Error',
                text: 'Something went wrong'
            })
        }
    }
};

export const loginVendorService = async (body) => {
    try {
        const response = await Axios.post('/api/login', body);

        let Token = response?.data?.success?.token?.token;
        let UserId = response?.data?.success?.user_id;
        let UserRole = response?.data?.success?.role;

        if (Token && UserId) {
            const extractedToken = response?.data?.success?.token?.token;
            const extractedUserId = response?.data?.success?.user_id;
            const userRole = response?.data?.success?.role;
            const redirect = response?.data?.success?.redirect;
            let userName = response?.data?.success?.name;
            if (extractedToken) {
                localStorage.setItem('token', Token);
                localStorage.setItem('userId', UserId);
                localStorage.setItem('role', UserRole);
                localStorage.setItem('user', userName);
                localStorage.setItem('email', response?.data?.success?.email);
                localStorage.setItem('redirect', redirect);
            }

        } else {
            if (response?.data?.status === 422) {
                InfoModal({
                    type: 'warning',
                    title: 'Contact with vendor help',
                    text: response?.data?.errors,
                })
                return false
            } else {
                InfoModal({
                    type: 'success',
                    title: 'Email Sent',
                    text: 'We have sent you a verification link on you email. Please log in using the link.',
                })

            }

        }
        return response;
        // localStorage.setItem(token, response?.token);

        // const { data } = response && response.data;
        // setCookie('token', data);


    } catch (error) {
        console.log(error);
        if (error?.response && error?.response?.data) {
            InfoModal({
                type: 'error',
                title: 'Error',
                text: (error?.response?.data?.error?.password) ? error?.response?.data?.error?.password[0] : error?.response?.data?.error
            })
        } else {
            InfoModal({
                type: 'error',
                title: 'Error',
                text: 'Something went wrong'
            })
        }
    }
};

export const ForgotPasswordService = async (body) => {
    try {
        const response = await Axios.post('/api/forgot-password', body);

        if (response?.status === 200) {
            InfoModal({
                type: 'success',
                title: 'Email Sent',
                text: 'We have sent you a verification link on you email. Please reset using the link.',
            })
        }
        return { response };
    } catch (error) {
        console.log(error);
        if (error?.response && error?.response?.data && error?.response?.data?.error) {
            InfoModal({
                type: 'error',
                title: 'Error',
                text: (error?.response?.data?.error?.email) ? error?.response?.data?.error?.email[0] : error?.response?.data?.error
            })
            return error;
        } else {
            InfoModal({
                type: 'error',
                title: 'Error',
                text: 'something went wrong'
            })
        }
    }

};

export const resetPasswordService = async (body) => {
    try {
        const response = await Axios.post('/api/reset-password', body);
        // const { data } = response && response.data;
        // setCookie('token', data);
        if (response?.status === 200) {
            InfoModal({
                type: 'success',
                title: 'Password set success',
                text: 'Congratulations your password has been set successfully',
            })
        }
        return { response };
    } catch (error) {
        console.log(error);

        if (error?.response && error?.response?.data && error?.response?.data?.error) {
            InfoModal({
                type: 'error',
                title: 'Error',
                text: error?.response?.data?.error
            })
        } else {
            InfoModal({
                type: 'error',
                title: 'Error',
                text: 'something went wrong'
            })
        }
    }
};

//  Users

export const registerUserService = async (body) => {
    try {
        const response = await Axios.post('/api/user-register', body);
        // const { data } = response && response.data;
        // setCookie('token', data);
        console.log(response)
        if (response?.status === 200) {
            if (response?.data?.success?.google_details?.email_verified) {
                const extractedToken = response?.data?.success?.token?.token;
                const extractedUserId = response?.data?.success?.user_id;
                const userRole = response?.data?.success?.role;
                let userName = response?.data?.success?.name;
                if (extractedToken) {
                    localStorage.setItem('token', extractedToken);
                    localStorage.setItem('userId', extractedUserId);
                    localStorage.setItem('role', userRole);
                    localStorage.setItem('user', userName);
                }
            } else {
                InfoModal({
                    type: 'success',
                    title: 'Email Sent',
                    text: 'We have sent you a verification link on you email. Please log in using the link.',
                })
                // window.location.href = '/reset-password';
            }

        }
        return response;
    } catch (error) {
        console.log(error);
        if (error?.response && error?.response?.data && error?.response?.data?.error) {
            InfoModal({
                type: 'error',
                title: 'Error',
                text: (error?.response?.data?.error?.email) ? error?.response?.data?.error?.email[0] : error?.response?.data?.error
            })
        } else {
            InfoModal({
                type: 'error',
                title: 'Error',
                text: 'Something went wrong'
            })
        }
        return { error };
    }
};

export const createPasswordUserService = async (body) => {
    try {
        const response = await Axios.post('/api/user-password-setting', body);
        // const { data } = response && response.data;
        // setCookie('token', data);
        if (response?.status === 200) {
            InfoModal({
                type: 'success',
                title: 'Password set success',
                text: 'Congratulations your password has been set successfully',
            })
        }
        return { response };
    } catch (error) {
        console.log(error);
        if (error?.response && error?.response?.data) {
            InfoModal({
                type: 'error',
                title: 'Error',
                text: error?.response?.data?.message
            })
        } else {
            InfoModal({
                type: 'error',
                title: 'Error',
                text: 'Something went wrong'
            })
        }
    }
};

export const loginUserService = async (body) => {
    try {
        const response = await Axios.post('/api/user-login', body);
        const extractedToken = response?.data?.success?.token?.token;
        const extractedUserId = response?.data?.success?.user_id;
        const userRole = response?.data?.success?.role;
        let userName = response?.data?.success?.name;
        if (extractedToken) {
            localStorage.setItem('token', extractedToken);
            localStorage.setItem('userId', extractedUserId);
            localStorage.setItem('role', userRole);
            localStorage.setItem('user', userName);
        } else {
            if (response?.data?.status === 422) {
                InfoModal({
                    type: 'warning',
                    title: 'Contact with support help',
                    text: response?.data?.errors,
                })
                return false
            } else {
                InfoModal({
                    type: 'success',
                    title: 'Email Sent',
                    text: 'We have sent you a verification link on you email. Please log in using the link.',
                })

            }

        }

        return response;
    } catch (error) {
        console.log(error);
        if (error?.response && error?.response?.data) {
            InfoModal({
                type: 'error',
                title: 'Error',
                text: (error?.response?.data?.error?.password) ? error?.response?.data?.error?.password[0] : error?.response?.data?.error
            })
        } else {
            InfoModal({
                type: 'error',
                title: 'Error',
                text: 'Something went wrong'
            })
        }
    }
};

export const ForgotUserPasswordService = async (body) => {
    try {
        const response = await Axios.post('/api/user-forgot-password', body);

        if (response?.status === 200) {
            InfoModal({
                type: 'success',
                title: 'Email Sent',
                text: 'We have sent you a verification link on you email. Please reset using the link.',
            })
        }
        return { response };
    } catch (error) {
        console.log(error);
        if (error?.response && error?.response?.data && error?.response?.data?.error) {
            InfoModal({
                type: 'error',
                title: 'Error',
                text: (error?.response?.data?.error?.email) ? error?.response?.data?.error?.email[0] : error?.response?.data?.error
            })
        } else {
            InfoModal({
                type: 'error',
                title: 'Error',
                text: 'something went wrong'
            })
        }
    }

};

export const resetUserPasswordService = async (body) => {
    try {
        const response = await Axios.post('/api/user-reset-password', body);
        // const { data } = response && response.data;
        // setCookie('token', data);
        if (response?.status === 200) {
            InfoModal({
                type: 'success',
                title: 'Password set success',
                text: 'Congratulations your password has been set successfully',
            })
        }
        return { response };
    } catch (error) {
        console.log(error);

        if (error?.response && error?.response?.data && error?.response?.data?.error) {
            InfoModal({
                type: 'error',
                title: 'Error',
                text: error?.response?.data?.error
            })
        } else {
            InfoModal({
                type: 'error',
                title: 'Error',
                text: 'something went wrong'
            })
        }
    }
};

export const userLogoutService = async (user_id) => {
    try {
        console.log("Logout Id ==>>", user_id)
        const response = await Axios.post(`/api/logout?user_id=${user_id}`);

        if (response?.status === 200) {
            localStorage.clear();
            sessionStorage.clear();
            // window.location.reload(); 
            // InfoModal({ 
            //     type:'success',
            //     title:'logout success',
            //     text: 'user logout successfully',
            // })
        }
        return { response };
    } catch (error) {
        console.log(error);

        if (error?.response && error?.response?.data && error?.response?.data?.error) {
            InfoModal({
                type: 'error',
                title: 'Error',
                text: error?.response?.data?.error
            })
        } else {
            InfoModal({
                type: 'error',
                title: 'Error',
                text: 'something went wrong'
            })
        }
    }
};


export const CMS_Services = async() =>{
    try{
        const response = await Axios.post(`/api/cms`);
        return {response}
    }catch(err){
        console.log(err)
    }
}