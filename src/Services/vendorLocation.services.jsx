import Axios from '@/config/axios';
import InfoModal from '@/lib/commonComponent/ConfirmModal';

export const AddLocationVendService = async (body) => {
    try {
        const response = await Axios.post('/api/vendor-locations-add', body);
        if (response?.status === 200) {
            InfoModal({ 
                type:'success',
                title:'Success',
                text: 'Location Saved Successfully',
            })
        }
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

export const GetVendorLocationService = async (userId) => {
    try {
        const response = await Axios.get(`/api/vendor/locations/${userId}` );
        return { response };
    } catch (error) {
        console.log("find me -->>",error);
    }
}

export const GetVendorLocationByIdService = async (userId, locationId) => {
    try {
        const response = await Axios.get(`/api/vendor/location/${userId}/${locationId}` );
        return { response };
    } catch (error) {
        console.log("find me -->>",error);
    }
}

export const UpdateLocationVendorService = async (locationId, data) => {
    try {
        console.log('update Api Data ==>>', data);
        const response = await Axios.post(`/api/vendor/update-locations/${locationId}`, data);
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

export const getVenderLocationStatusService = async (data) =>{
    try{
        const formData = new FormData();
        for (const key in data) {
            formData.append(key,data[key])
        }
        console.log(formData);
        const response = await Axios.post(`/api/location-status`,formData);
        console.log("getVenderLocationStatusService==>getVenderLocationStatusService",response)
        return {response};
    }catch(error){
        console.log("getVenderLocationStatusService===>",error)
    }
}


export const DeleteVenderLocationByIdService = async (data) => {
    try {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key,data[key])
        }
        console.log(formData);
        const response = await Axios.post(`/api/location-delete`,formData);
        console.log("DeleteVenderLocationByIdService==>DeleteVenderLocationByIdService",response)
        return {response} ;
    }catch(error){
        console.log("DeleteVenderLocationByIdService -->>",error);
    }
}
