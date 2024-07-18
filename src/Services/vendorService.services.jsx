import Axios from "@/config/axios";
import InfoModal from "@/lib/commonComponent/ConfirmModal";

export const STORAGE_URL = "https://dev-admin.bookablebiz.website/storage";
export const RETURN_URL = "https://dev-web.bookablebiz.website/bookings";
export const RESCHEDULE_RETURN_URL =
  "https://dev-web.bookablebiz.website/thankyou";
//export const RETURN_URL = "http://localhost:3000/bookings";
//export const RESCHEDULE_RETURN_URL = "http://localhost:3000/thankyou";
// export const STORAGE_URL = "http://localhost:3000/storage";

export const GetServicesVendService = async (userId) => {
  try {
    console.log("Get serv vend ==>>", userId);
    const response = await Axios.get(`/api/getserviceInfo/${userId}`);
    return { response };
  } catch (error) {
    console.log("find me -->>", error);
  }
};

export const GetListOfAllVendorServices = async (userId) => {
  try {
    console.log("Get serv vend ==>>", userId);
    const response = await Axios.get(`/api/services/listing/${userId}`);
    return { response };
  } catch (error) {
    console.log("find me -->>", error);
  }
};

export const DeleteServicesVendorService = async (data) => {
  // console.log("DeleteServicesVendorService ===>",data)
  const response = await Axios.post(`/api/service-delete`, data);
  console.log("delete vendor service -------", response);
  return { response };
};
export const GetListOfAllPackageServices = async (userData) => {
  try {
    console.log("Get serv vend ==>>", userData);
    const response = await Axios.post(`/api/vendor-all-packages`, userData);
    return { response };
  } catch (error) {
    console.log("find me -->>", error);
  }
};

export const GetAllLabelsVendService = async () => {
  try {
    const response = await Axios.get(`/api/vendor/labels`);
    return { response };
  } catch (error) {
    console.log("find me -->>", error);
  }
};

export const AddVendService = async (userId, body) => {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "Access-token": "QWERTYUIOP123",
      },
    };
    const response = await Axios.post(
      `/api/postserviceInfo/${userId}`,
      body,
      config
    );
    if (response?.status === 200) {
      InfoModal({
        type: "success",
        title: "Service Saved",
        text: "We have saved your services.",
      });
    }
    return { response };
  } catch (error) {
    console.log("find me -->>", error);
    if (error?.response?.data?.error) {
      InfoModal({
        type: "error",
        title: "Error",
        text: error?.response?.data?.error,
      });
    } else {
      InfoModal({
        type: "error",
        title: "Error",
        text: "Something went wrong",
      });
    }
    return error;
  }
};

export const EditVendInfoService = async (body) => {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "Access-token": "QWERTYUIOP123",
      },
    };

    const response = await Axios.post(`/api/vendorServiceInfo`, body, config);
    if (response?.status === 200) {
      return { response };
    }
  } catch (error) {
    console.log("find me -->>", error);
    InfoModal({
      type: "error",
      title: "Error",
      text: "Something went wrong",
    });
  }
};

export const EditVendService = async (service_id, body) => {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "Access-token": "QWERTYUIOP123",
      },
    };

    const response = await Axios.post(
      `/api/updateService/${service_id}`,
      body,
      config
    );
    if (response?.status === 200) {
      InfoModal({
        type: "success",
        title: "Service Updated",
        text: "We have saved your services.",
      });
    }
    return { response };
  } catch (error) {
    console.log("find me -->>", error);
    if (error?.response?.data?.error) {
      InfoModal({
        type: "error",
        title: "Error",
        text: error?.response?.data?.error,
      });
    } else {
      InfoModal({
        type: "error",
        title: "Error",
        text: "Something went wrong",
      });
    }
    return error;
  }
};

export const AddVendPackageService = async (body) => {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "Access-token": "QWERTYUIOP123",
      },
    };

    console.log("final Body ==>>", body);
    const response = await Axios.post(`/api/vendor-package-info`, body, config);
    if (response?.status === 200) {
      InfoModal({
        type: "success",
        title: "Package Saved",
        text: "We have saved your package.",
      });
    }
    return { response };
  } catch (error) {
    console.log("find me -->>", error);
    InfoModal({
      type: "error",
      title: "Error",
      text: "Something went wrong",
    });
  }
};

export const UpdateVendorPackageService = async (package_id, body) => {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "Access-token": "QWERTYUIOP123",
      },
    };

    const response = await Axios.post(
      `/api/vendor-package-update/${package_id}`,
      body,
      config
    );
    if (response?.status === 200) {
      InfoModal({
        type: "success",
        title: "Service Updated",
        text: "We have saved your services.",
      });
    }
    return { response };
  } catch (error) {
    console.log("find me -->>", error);
    if (error?.response?.data?.error) {
      InfoModal({
        type: "error",
        title: "Error",
        text: error?.response?.data?.error,
      });
    } else {
      InfoModal({
        type: "error",
        title: "Error",
        text: "Something went wrong",
      });
    }
    return error;
  }
};

export const getAllAppointmentVendService = async (userData) => {
  try {
    const response = await Axios.post(`/api/vendor-appointment-info`, userData);
    if (response?.status === 200) {
    }
    return { response };
  } catch (error) {
    console.log("find me -->>", error);
    InfoModal({
      type: "error",
      title: "Error",
      text: "Something went wrong",
    });
  }
};

export const getPackageVendService = async (userData) => {
  try {
    const response = await Axios.post(`/api/get-vendor-package-info`, userData);
    if (response?.status === 200) {
    }
    return { response };
  } catch (error) {
    console.log("find me -->>", error);
    InfoModal({
      type: "error",
      title: "Error",
      text: "Something went wrong",
    });
  }
};

// Mahesh API
export const VENDOR_LOCATIONS_AND_RESOURCES = async (userData) => {
  try {
    const response = await Axios.post(
      `/api/vendor_locations_and_resource`,
      userData
    );
    return { response };
  } catch (error) {
    InfoModal({
      type: "error",
      title: "Error",
      text: "Check the network error. Thanks",
    });
  }
};
export const ALLOW_FOR_PACKAGE = async (userData) => {
  try {
    const response = await Axios.post(`/api/allow_for_package`, userData);
    return { response };
  } catch (error) {
    InfoModal({
      type: "error",
      title: "Error",
      text: "Check the network error. Thanks",
    });
  }
};
export const CREATE_SLOTS_API = async (userData) => {
  try {
    const response = await Axios.post(`/api/create_slots_api`, userData);
    return { response };
  } catch (error) {
    InfoModal({
      type: "error",
      title: "Error",
      text: "Check the network error. Thanks",
    });
  }
};

export const BIZ_ADD_SERVICE = async (userData) => {
  try {
    const response = await Axios.post(`/api/biz_add_service`, userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { response };
  } catch (error) {
    InfoModal({
      type: "error",
      title: "Error",
      text: "Check the network error. Thanks",
    });
  }
};
export const BIZ_UPDATE_SERVICE = async (userData) => {
  try {
    const response = await Axios.post(`/api/biz_update_service`, userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { response };
  } catch (error) {
    InfoModal({
      type: "error",
      title: "Error",
      text: "Check the network error. Thanks",
    });
  }
};

export const PREVIEW_SERVICE_DETAILS = async (userData) => {
  try {
    const response = await Axios.post(
      `/api/biz_preview_service_details`,
      userData
    );
    return { response };
  } catch (error) {
    // InfoModal({
    //     type:'error',
    //     title:'Error',
    //     text: 'Check the network error. Thanks'
    // })
  }
};

export const BIZ_VENDOR_SERVICES_LIST = async (userData) => {
  try {
    const response = await Axios.post(
      `/api/biz_vendor_services_list`,
      userData
    );
    return { response };
  } catch (error) {
    InfoModal({
      type: "error",
      title: "Error",
      text: "Check the network error. Thanks",
    });
  }
};
export const BIZ_SINGLE_SERVICE = async (userData) => {
  try {
    const response = await Axios.post(`/api/biz_single_service`, userData);
    return { response };
  } catch (error) {
    InfoModal({
      type: "error",
      title: "Error",
      text: "Check the network error. Thanks",
    });
  }
};
export const GET_PACKAGE_DETAILS = async (userData) => {
  try {
    const response = await Axios.post(`/api/get_package_detail`, userData);
    return { response };
  } catch (error) {
    InfoModal({
      type: "error",
      title: "Error",
      text: "Check the network error. Thanks",
    });
  }
};
