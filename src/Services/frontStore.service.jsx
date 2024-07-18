import Axios from '@/config/axios';
import InfoModal from '@/lib/commonComponent/ConfirmModal';

export const GetVendorAllDetailsByIdService = async (vendorId) => {
    // try {
        console.log("Get front vend id ==>>", vendorId);
        const response = await Axios.get(`/api/vendor-profile-details/${vendorId}` );
        console.log("Resonse 1 => ", response);
        return { response };
    // } catch (error) {
    //     console.log("find me -->>",error);
    // }
}

