import Axios from "@/config/axios";
import InfoModal from "@/lib/commonComponent/ConfirmModal";

export const vendorSettingsService = async (body) => {
          try {
            console.log(" api Add_Update_Logo_Image ==>>", body);
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
              },
            };
            const response = await Axios.post(
              "/api/storefront-setting",
              formData,
              config
            );
            if (response?.status === 200) {
              InfoModal({
                type: "success",
                title: "Success",
                text: "Vender Setting Saved Successfully",
              });
              // window.location.reload();
            }
            return { response };
          } catch (error) {
            console.log(error);
            InfoModal({
              type: "error",
              title: "Error",
              text: "Something went wrong",
            });
          }

};


export const getVendorSettingsService = async (body) => {
    try {
        console.log("getVendorSettingsService ==>>", body);
        const response = await Axios.post('/api/storefront-setting-details',body);
        if (response?.status === 200) {
            console.log("response 1 ==", response);
        }
        return { response };
    } catch (error) {
        console.log(error);
    }
}


export const Remove_Banner_Image = async (body) => {
    try {
        console.log("Remove_Banner_Image ==>>", body);
        const response = await Axios.post('/api/remove-banner-image',body);
        if (response?.status === 200) {
            InfoModal({ 
                type:'success',
                title:'Success',
                text: 'Banner Removed Successfully',
            }) 
        window.location.reload()
        }
        return { response };
    } catch (error) {
        console.log(error);
    }
}

export const Add_Banner_Image = async (body) => {
      try {
        console.log("Add_Banner_Image ==>>", body);
        const formData = new FormData();
        for (const key in body) {

          if (key === 'banner_images') {
              body[key].forEach((imageDataUrl, index) => {
                  const file = dataURLtoFile(imageDataUrl, `image_${index}.png`);
                  formData.append('banner_images[]', file);
              });
          } else {
              formData.append(key, body[key]);
          }
          
      }

       
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        const response = await Axios.post('/api/add-banner-image', formData, config );
        if (response?.status === 200) {
            InfoModal({ 
                type:'success',
                title:'Success',
                text: 'Banner Saved Successfully',
            })
        }
         window.location.reload()
        return { response };

    } catch (error) {
        console.log(error);
        InfoModal({ 
            type:'error',
            title:'Error',
            text: 'Something went wrong'
        })
    }

};

function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}


export const Add_Update_Logo_Image = async (body) => {
      try {
        console.log("Add_Update_Logo_Image ==>>", body);
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
        const response = await Axios.post('/api/add-update-logo-image', formData, config );
        if (response?.status === 200) {
            InfoModal({ 
                type:'success',
                title:'Success',
                text: 'Logo Saved Successfully',
            })
            window.location.reload()
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

};