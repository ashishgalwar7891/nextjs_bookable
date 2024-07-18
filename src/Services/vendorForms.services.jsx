import Axios from "@/config/axios";
import InfoModal from "@/lib/commonComponent/ConfirmModal";

export const PersonalDetailsVendService = async (body) => {
  try {
    const response = await Axios.post("/api/personal-info", body);
    return { response };
  } catch (error) {
    console.log(error);
  }
};

export const EditPersonalDetailsVendService = async (body) => {
  try {
    const response = await Axios.post("/api/vendor/update-personal-info", body);
    if (response?.status === 200) {
      InfoModal({
        type: "success",
        title: "Service Saved",
        text: "Profile Updated Successfully",
      });
    }
    return { response };
  } catch (error) {
    console.log(error);
  }
};

export const BusinessDetailsVendService = async (body) => {
  
    console.log("personal Info ==>>", body);
    const formData = new FormData();
    for (const key in body) {
      if (key === "image") {
        formData.append("image", body[key]?.file?.originFileObj);
      } else {
        formData.append(key, body[key]);
      }
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "Access-token": "QWERTYUIOP123",
      },
    };
    const response = await Axios.post("/api/business-info", formData, config);
    return { response };

};

export const EditBusinessDetailsVendService = async (body) => {

    console.log("personal Info ==>>", body);
    const formData = new FormData();
    for (const key in body) {
      if (key === "image") {
        formData.append("image", body[key]?.file?.originFileObj);
      } else {
        formData.append(key, body[key]);
      }
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "Access-token": "QWERTYUIOP123",
      },
    };
    const response = await Axios.post(
      "/api/vendor/update-info-business",
      formData,
      config
    );
    if (response?.status === 200) {
      InfoModal({
        type: "success",
        title: "Success",
        text: "Profile Updated Successfully",
      });
    }
    return { response };
 
};

export const GetPageStatusVendorService = async (userId) => {
  try {
    const response = await Axios.get(`/api/check-step?user_id=${userId}`);
    return { response };
  } catch (error) {
    console.log("find me -->>", error);
  }
};

export const GetStripeAccountDetailsnURL = async (userId) => {
  console.log("find me hit again-->>");
  try {
    const response = await Axios.post(`/api/stripe-onboard?user_id=${userId}`);
    return { response };
  } catch (error) {
    console.log("find me -->>", error);
  }
};

export const GetCategoryIndustryService = async () => {
  try {
    const response = await Axios.get(`/api/vendor/category-industry`);
    return { response };
  } catch (error) {
    console.log("find me -->>", error);
  }
};

export const GetAllPlansService = async () => {
  try {
    console.log("Working..");
    const response = await Axios.get(`/api/vendor/plans`);
    return { response };
  } catch (error) {
    console.log("find me -->>", error);
  }
};

export const GetExistingVendorPlan = async (userId) => {
  try {
    console.log("Working get existing..");
    const response = await Axios.post(
      `/api/vendor/getexistingplan?user_id=${userId}`
    );
    return { response };
  } catch (error) {
    console.log("find me -->>", error);
  }
};

export const SelectPlanVendService = async (body) => {
  try {
    const response = await Axios.post("/api/vendor/starter_plans_post", body);
    return { response };
  } catch (error) {
    console.log(error);
  }
};
