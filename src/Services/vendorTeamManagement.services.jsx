import Axios from '@/config/axios';
import InfoModal from '@/lib/commonComponent/ConfirmModal';


export const GetVendorTeamMembersByIdService = async (data) => {
    try {
        const response = await Axios.post(`/api/vendor-staff-list`,data );
        return { response };
    } catch (error) {
        console.log("find me -->>",error);
    }
} 

export const DeleteTeamMembersByIdService = async (data) => {
    try {
        const response = await Axios.post(`api/delete-a-staff`,data );
        console.log("DeleteTeamMembersByIdService===>",response)
        return { response };
    } catch (error) {
        console.log("find me -->>",error);
    }
} 
export const Update_Staff_Status = async (data) => {
    try {
        const response = await Axios.post(`/api/update-staff-status`,data );
        console.log("Update_Staff_Status===>",response)
        return { response };
    } catch (error) {
        console.log("find me -->>",error);
    }
} 
export const get_locations = async (data) => {
    try {
        const response = await Axios.post(`/api/vendor-locations-list`,data );
        console.log("Update_Staff_Status===>",response)
        return { response };
    } catch (error) {
        console.log("find me -->>",error);
    }
} 
export const save_staff_details = async (body) => {
        console.log("save_staff_details ==>>", body);
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
        const response = await Axios.post('/api/vendor-staff-add', formData, config );
        if (response?.status === 200) {
            InfoModal({ 
                type:'success',
                title:'Success',
                text: 'Staff/Manager Add Successfully',
            })
        }
        return { response };

} 
export const get_Staff_details = async (data) => {
    try {
        const response = await Axios.post(`/api/get-staff-details`,data );
        console.log("Update_Staff_Status===>",response)
        return { response };
    } catch (error) {
        console.log("find me -->>",error);
    }
} 
export const Update_Staff_details = async (body) => {
        console.log("Update_Staff_details ==>>", body);
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
        const response = await Axios.post('/api/update-staff-details', formData, config );
        if (response?.status === 200) {
            InfoModal({ 
                type:'success',
                title:'Success',
                text: `Your changes have been updated`,
            })
        }
        return { response };

} 
