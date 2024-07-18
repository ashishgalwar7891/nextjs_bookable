import { Button, Col, Modal, Row } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Reschedulebooking from '@/components/User/user-sidebar/myBookings/manageBookings/rescheduleBooking';
import { RescheduleMyBookingServices } from '@/Services/sidebar.service';
import { useState, useEffect } from 'react';
import InfoModal from '../ConfirmModal';
import { useRouter, usePathname } from 'next/navigation';
import { SERVICE_DETAILS } from '@/Services/frontend';
import Reschedule from '@/widgets/reschedule/Reschedule';


const RescheduleModal = (modalData) => {
    const router = useRouter();
    const pathname = usePathname()
    const [rescheduleBookData, setRescheduleBookData] = useState();
    const { open, setOpen, modelText, cancelCharge } = modalData;

    const [publicServiceResponse, setPublicServiceResponse] = useState();
    const [publicBookableLocation, setPublicBookableLocation] = useState();
    const [publicVendorPopularServices, setPublicVendorPopularServices] = useState();
    const [handleModel, setHandleModel] = useState(false);

    const SERVICE_DETAILS_FETCH = async (l_user_id, serviceId, locationId) => {
        const FORM_DATA = new FormData();
        FORM_DATA.append('id', serviceId);
        FORM_DATA.append('location_id', locationId);
        FORM_DATA.append('user_id', l_user_id);
        const result = await SERVICE_DETAILS(FORM_DATA);
        setPublicServiceResponse(result?.response?.data?.publicServiceResponse);
        setPublicBookableLocation(result?.response?.data?.publicBookableLocation);
        setPublicVendorPopularServices(result?.response?.data?.publicVendorPopularServices);
    }
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        SERVICE_DETAILS_FETCH(userId, modelText?.service_id, modelText?.location_id)
    }, [])



    return (
        <>
             {open && 
                    <Reschedule setOpen={setOpen} order_id={modelText.order_id} booking_id={modelText.id}  rescheduleCharge={parseInt(modelText.booking_engine) !== 5 ? (parseFloat(modelText?.price_detail?.totalPrice) * cancelCharge).toFixed(2) : 0.00} publicServiceResponse={publicServiceResponse} publicBookableLocation={publicBookableLocation} checkUserLogin={true} user_id={localStorage.getItem('userId')} /> }
                    

        </>
    );

};

export default RescheduleModal;