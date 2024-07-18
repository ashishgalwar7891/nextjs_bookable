import { BIZ_FAVORITE_ADD_UPDATE } from "@/Services/frontend";
import React, { useState } from "react";
import { BiHeart, BiSolidHeart } from "react-icons/bi";

function Favorite({
  favorite,
  service_id,
  package_id,
  location_id,
  user_id,
  vendor_id,
  type,
}) {
  console.log("service--id ", service_id);
  const [stateFav, setStateFav] = useState(favorite);
  const [favLoader, setFavLoader] = useState(false);
  const BIZ_FAVORITE_ADD_UPDATE_API = async (status) => {
   
    setStateFav(status);
    if (package_id) {
      const FORM_DATA = new FormData();
      FORM_DATA.append("package_id", package_id);
      FORM_DATA.append("location_id", location_id);
      FORM_DATA.append("user_id", user_id);
      FORM_DATA.append("vendor_id", vendor_id);
      FORM_DATA.append("favorite", status);
      //FORM_DATA.append("service_id", service_id);
      const result = await BIZ_FAVORITE_ADD_UPDATE(FORM_DATA);
      if (result.response.data.status === 422) {
        console.log("BIZ_FAVORITE_ADD_UPDATE", result);
      } else {
        if (favorite) {
          setStateFav(status);
        } else {
          setStateFav(status);
        }
      }
    } else {
      const FORM_DATA = new FormData();
      FORM_DATA.append("service_id", service_id);
      FORM_DATA.append("location_id", location_id);
      FORM_DATA.append("user_id", user_id);
      FORM_DATA.append("vendor_id", vendor_id);
      FORM_DATA.append("favorite", status);
      const result = await BIZ_FAVORITE_ADD_UPDATE(FORM_DATA);
      if (result.response.data.status === 422) {
        console.log("BIZ_FAVORITE_ADD_UPDATE", result);
      } else {
        if (favorite) {
          setStateFav(status);
        } else {
          setStateFav(status);
        }
      }
    }
  };
  return (
    <>
      {type === "icon" ? (
        <>
          {stateFav ? (
            <>
              <BiSolidHeart
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => BIZ_FAVORITE_ADD_UPDATE_API(0)}
              />
            </>
          ) : (
            <>
              <BiHeart
                style={{ cursor: "pointer" }}
                onClick={() => BIZ_FAVORITE_ADD_UPDATE_API(1)}
              />
            </>
          )}
        </>
      ) : (
        <>
          {stateFav ? (
            <>
              <span
                className="biz-orange-btn"
                onClick={() => BIZ_FAVORITE_ADD_UPDATE_API(0)}
              >
                Remove from Favorites <BiSolidHeart style={{ color: "red" }} />
              </span>
            </>
          ) : (
            <>
              <span
                className="biz-orange-btn"
                onClick={() => BIZ_FAVORITE_ADD_UPDATE_API(1)}
              >
                Add to favorites <BiHeart />
              </span>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Favorite;
