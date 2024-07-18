import Axios from '@/config/axios';
import InfoModal from '@/lib/commonComponent/ConfirmModal';

export const AddResourceVendService = async (body) => {
    try {
        // const response = await Axios.post('/api/vendor/resource/', body);
        // return { response };
        console.log("resource Info ==>>", body);
        const formData = new FormData();
        for (const key in body) {
            if (key === 'image') {
                formData.append('image', body[key]?.file?.originFileObj);
            } else {
                formData.append(key, body[key]);
            }
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        const response = await Axios.post('/api/vendor-resource-add', formData, config );
        if (response?.status === 200) {
            InfoModal({ 
                type:'success',
                title:'Success',
                text: 'Resource Saved Successfully',
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

export const GetResourceVendService = async (userId) => {
    try {
        console.log("GetResourceVend ==>>", userId);
        const response = await Axios.get(`/api/vendor/resource/${userId}` );
        console.log("GetResourceVend ==>99999999999999999999999999999999999999999999999999999999>", response);
        return { response };
    } catch (error) {
        console.log("find me -->>",error);
    }
}

export const UpdateResourceVendService = async (resourceId, data) => {
    
    const formData = new FormData();
    
    for (const key in data) {
        if (key === 'image') {
            formData.append('image', data[key]?.file?.originFileObj);
        } else {
            formData.append(key, data[key]);
        }
    }
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        },
    };
    
    
    try {
        const response = await Axios.post(`/api/vendor/update-resource/${resourceId}`, formData, config );
        return { response };
    } catch (error) {
        console.log("find me -->>",error);
    }
}

export const GetVendorResourceByIdService = async (userId, resourceId) => {
    try {
        const response = await Axios.get(`/api/vendor/resource_id/${userId}/${resourceId}` );
        return { response };
    } catch (error) {
        console.log("find me -->>",error);
    }
} 



export const DeleteVenderResourceByIdService = async (data) => {
    try {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key,data[key])
        }
        console.log(formData);
        const response = await Axios.post(`/api/resourse-delete`,formData);
        console.log("DeleteVenderResourceByIdService==>DeleteVenderResourceByIdService",response)
        return {response} ;
    }catch(error){
        console.log("DeleteVenderResourceByIdService -->>",error);
    }
}



export const getVenderResourceStatusService = async (data) =>{
    try{
        const formData = new FormData();
        for (const key in data) {
            formData.append(key,data[key])
        }
        console.log(formData);
        const response = await Axios.post(`/api/resourse-status`,formData);
        console.log("getVenderResourceStatusService==>getVenderResourceStatusService",response)
        return {response} ;
    }catch(error){
        console.log("getVenderResourceStatusService -->>",error);
    }
}