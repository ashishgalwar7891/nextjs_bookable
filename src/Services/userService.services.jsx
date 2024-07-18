import Axios from '@/config/axios';
import InfoModal from '@/lib/commonComponent/ConfirmModal';

export const GetListAllServices = async (data) => {
    try {
        const response = await Axios.post(`/api/service-card`, data);
        return { response };
    } catch (error) {
        console.log("find me -->>",error);
    }
}

export const GetServiceById = async (serviceId, locationId) => {
    try {
        const response = await Axios.get(`/api/service/${serviceId}/${locationId}` );
        return { response };
    } catch (error) {
        console.log("find me -->>",error);
    }
    
}

export const GetPackageStatusService = async (data) => {
    try {
        const response = await Axios.post(`/api/check-user-package`, data );
        return { response };
    } catch (error) {
        console.log("find me -->>",error);
    }
    
}

export const getDataBySearchingServices = async (values) => {
    try {
        const response = await Axios.get(`/api/search/details?query=${values}`);
        return { response };
    } catch (error) {
        console.log("find me -->>",error);
    }
}

export const getDataBySearchingLocation = async (values) => {
    try {
        const response = await Axios.get(`/api/search/suggest?query=${values}`);
        return { response };
    } catch (error) {
        console.log("find me -->>",error);
    }
}

export const getAllPopularServices = async (data) => {
    try {
        const response = await Axios.post(`/api/popularService`, data);
        return { response };
    } catch (error) {
        console.log("find me -->>",error);
    }
}

export const getAllNearByServices = async (userId, userCity) => {
    try {
        const response = await Axios.get(`/api/nearMe?user_id=${userId}&city=${userCity}`);
        return { response };
    } catch (error) {
        console.log("find me -->>",error);
    }
}

export const getAllLocationsServices = async () => {
    try {
        const response = await Axios.get(`/api/locations`);
        return { response };
    } catch (error) {
        console.log("find me -->>",error);
    }
}

export const addUserLocationServices = async (data) => {
    try {
        const response = await Axios.post(`/api/user-address`, data);
        if (response?.status === 200) {
            InfoModal({ 
                type:'success',
                title:'successful',
                text: 'User Address saved successfully',
            })
        }
        return { response };
    } catch (error) {
        console.log("find me -->>",error);
        InfoModal({ 
            type:'error',
            title:'Error',
            text: 'Something went wrong'
        })
    }
}

export const addToCartUserServices = async (data) => {
    try {
        const response = await Axios.post(`/api/add_cart`, data);
        if (response?.status === 200) {
            InfoModal({ 
                type:'success',
                title:'successful',
                text: 'Item successfully added to the cart',
            })
        }
        return { response };
    } catch (error) {
        console.log("find me add Cart -->>",error);
        if (error?.response?.data?.error && typeof(error?.response?.data?.error) == 'string') {
            InfoModal({ 
                type:'error',
                title:'Error',
                text: error?.response?.data?.error
            })
        } else {
            InfoModal({ 
                type:'error',
                title:'Error',
                text: 'Something went wrong'
            })
        }
        return error;
    }
}


export const GetBookedSlotsDetailsforaDate = async (data) => {
    try {
        const response = await Axios.post(`/api/getBookedSlots `, data)
        return { response };
    } catch (error) {
        console.log("find me for get Booked Slots data for a date-->>",error);  
    }
}


export const GetUserCartItemCountServices = async (data) => {
    try {
        const response = await Axios.post(`/api/count_cart `, data);
        return { response };
    } catch (error) {
        console.log(error);
    }
}

export const GetAllCartItemUserServices = async (data) => {
    try {
        const response = await Axios.post(`/api/cart_show`, data);
        return { response };
    } catch (error) {
        console.log(error);
        if(!data?.token && !data?.user_id) {
            InfoModal({ 
                type:'error',
                title:'Error',
                text: 'token not valid please login'
            })
        } else {
            InfoModal({ 
                type:'error',
                title:'Error',
                text: 'Something went wrong'
            })
        }
    }
}

export const DeleteCartItemByIdServices = async (data) => {
    try {
        const response = await Axios.post(`/api/remove_cart`, data);
        return { response };
    } catch (error) {
        console.log("find me -->>",error);
        InfoModal({ 
            type:'error',
            title:'Error',
            text: 'Something went wrong'
        })
    }
}

export const GetUserAddressService = async (data) => {
    try {
        const response = await Axios.post(`/api/getUserAddressDetails`, data);
        return { response };
    } catch (error) {
        console.log("find me -->>",error);
    }
}

export const GetAllPackagesServices = async () => {
    try {
        const response = await Axios.get(`/api/get-package-info` );
        return { response };
    } catch (error) {
        console.log("find me -->>",error);
    }
}

export const GetPackageDetailsService = async (packageId, locationId) => {
    try {
        const response = await Axios.get(`/api/package-details/${packageId}/${locationId}`);
        return { response };
    } catch (error) {
        console.log("find me -->>",error);
    }
}

export const GetMyPackagesService = async (data) => {
    try {
        const response = await Axios.post(`/api/my-packages`, data);
        return { response };
    } catch (error) {
        console.log("find me -->>",error);
    }
}

export const GetMySinglePackageService = async (orderId, packageId, data) => {
    try {
        const response = await Axios.post(`/api/get_package_detail`);
            console.log("Response 11 ", response);
        return { response };
    } catch (error) {
        console.log("find me -->>",error);
    }
}

export const BookAppointmentService = async (data) => {
    try {
        const response = await Axios.post(`/api/bookanappointment`, data);
            if (response.status == 200) {
                InfoModal({ 
                    type:'success',
                    title:'Appointment Saved Success',
                    text: 'Appointment successfully booked',
                })
            }
        return { response };
    } catch (error) {
        console.log("find me -->>",error);
        InfoModal({ 
            type:'error',
            title:'Error',
            text: 'Something went wrong'
        })
    }
}
export const BookAnPackageService = async (data) => {
    try {
        const response = await Axios.post(`/api/bookanpackage-service`, data);
            if (response.status == 200) {
                InfoModal({ 
                    type:'success',
                    title:'Booked Service Success',
                    text: 'Service successfully booked',
                })
            }
        return { response };
    } catch (error) {
        console.log("find me -->>",error);
        InfoModal({ 
            type:'error',
            title:'Error',
            text: 'Something went wrong'
        })
    }
}

export const addToFavouritiesUserServices = async (data) => {
    try {
        const { isFavorite } = data;
        console.log("isFavorite in services ==>> ", isFavorite);
        const response = await Axios.post(`/api/add-to-favorites`, data);
        if (response?.status === 200) {
            InfoModal({ 
                type:'success',
                title:'successful',
                text: `${ (isFavorite) ? 'Item successfully added to the Favorites' : 'Item successfully removed from the Favorites' }`,
            })
        }
        return { response };
    } catch (error) {
        console.log("find me add Cart -->>",error);
            InfoModal({ 
                type:'error',
                title:'Error',
                text: 'Something went wrong'
            })
        return error;
    }
}

export const GetAllFavouritieServices = async (data) => {
    try {
        const { isFavorite } = data;
        console.log("isFavorite in services ==>> ", isFavorite);
        const response = await Axios.post(`/api/favorites`, data);
        
        return { response };
    } catch (error) {
        console.log("find me add Cart -->>",error);
            InfoModal({ 
                type:'error',
                title:'Error',
                text: 'Something went wrong'
            })
        return error;
    }
}

export const checkIsFavoriteService = async (data) => {
    try {
        const response = await Axios.post(`/api/check-favorite`, data);
        
        return { response };
    } catch (error) {
        console.log(error);
        return error;
    }
}


export const my_cart_bookings_packages = async (data) => {
    try {
        const response = await Axios.post(`/api/my-cart-bookings-packages`, data);
        
        return { response };
    } catch (error) {
        console.log(error);
        return error;
    }
}