"use client";
import {
  GetListAllServices,
  getAllLocationsServices,
  getAllPopularServices,
  getDataBySearchingServices,
} from "@/Services/userService.services";
import UserPackageCard from "@/lib/commonComponent/UserPackageCard";
import ServicePackageBox from "@/widgets/service-package-box/ServicePackageBox";
import { Checkbox, Select, Spin } from "antd";
import { Fragment, useContext, useEffect, useState } from "react";
import "./style.css";
import { LayoutContext } from "@/components/Layout";
import { useRouter, useSearchParams } from "next/navigation";
import { SEARCH_FORM } from "@/Services/frontend";
import SearchHeader from "@/lib/commonComponent/SearchHeader";
const Index = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const label = searchParams.get("label");
  const locationId = searchParams.get("locationId");
  const typed = searchParams.get("typed");
  const vendor = searchParams.get("vendor");
  const service = searchParams.get("service");
  const category = searchParams.get("category");
  const industry = searchParams.get("industry");

  const { industryData } = useContext(LayoutContext);
  const [page_loader, set_page_loader] = useState(true);
  const [location_loader, set_location_loader] = useState(false);

  const [allServices,setAllServices] = useState([]);
  const [locationsList, setLocationsList] = useState([]);
  const [location_list, set_location_list] = useState([]);
  const [locSearchLabel, setLocSearchLabel] = useState([]);
  const [serviceSearchResult, setServiceSearchResult] = useState([]);
  const [biz_search_form, set_biz_search_form] = useState([]);
  const [front_services, set_front_services] = useState([]);
  const [front_labels, set_front_labels] = useState([]);
  const [front_vendors, set_front_vendors] = useState([]);
  const [front_print, set_front_print] = useState([]);
  const [front_industry, set_front_industry] = useState([]);
  const [front_Category, set_front_Category] = useState([]);
  const [filter, set_filter] = useState({
    typed: typed || "",
    service_name: service || "",
    business_industry: industry || "",
    business_category: category || "",
    label: label || "",
    city: locationId || "",
    engine: "All Services",
    price: "",
    sortby: "",
    star: "",
    vendor: vendor || "",
  });
  const [checkUserLogin, setCheckUserLogin] = useState(false);
  const GET_SERVICE_LIST = async () => {
    const response = await getAllPopularServices();
    let result = response?.response?.data;
    setServiceSearchResult(result);
  };
  const GET_SEARCH_FORM = async () => {
    const response = await SEARCH_FORM();
    set_biz_search_form(response?.data?.front);
    var output = response?.data?.front?.front_services;
    console.log("output-----", response);
    if (filter.engine === "Packages Only") {
      output = output.filter((item) => parseInt(item.engine) === 4);
    }
    if (filter.engine === "Appointments Only") {
      output = output.filter((item) => parseInt(item.engine) === 5);
    }
    set_front_labels(response?.data?.front.front_labels);
    set_front_vendors(response?.data?.front.front_vendors);
    set_front_print(response?.data?.front.front_services);
    set_front_industry(response?.data?.front.industry);
    set_front_Category(response?.data?.front.category);
    set_front_services(output);
  };
  const GET_ALL_LOCATIONS = async () => {
    const response = await getAllLocationsServices();
    console.log("GET_ALL_LOCATIONS===>", response?.response?.data?.Cities);
    const output = response?.response?.data?.Cities;
    setLocationsList(output);
  };
  const GET_LOCATIONS = async () => {
    set_location_loader(true);
    const response = await GetListAllServices();
    var output = response?.response?.data;
    setAllServices(output)
    console.log("GetListAllServices===>", output);
    console.log("filter===>", filter);
    //
    if (filter.engine === "Packages Only") {
      output = output.filter((location) => parseInt(location.engine) === 4);
    }
    if (filter.engine === "Appointments Only") {
      output = output.filter((location) => parseInt(location.engine) === 5);
    }
    if (filter.service_name) {
      output = output.filter(
        (location) => location.service_name === filter.service_name
      );
    }
    if (filter.business_industry) {
      output = output.filter(
        (location) => location.business_industry === filter.business_industry
      );
    }
    if (filter.business_category) {
      output = output.filter(
        (location) => location.business_category === filter.business_category
      );
    }
    if (filter.city) {
      output = output.filter((location) => location.city === filter.city);
    }
    if (filter.label) {
      output = output.filter(
        (location) => location.label.indexOf(filter.label) > -1
      );
    }
    if (filter.vendor) {
      output = output.filter(
        (location) => location.vendor_name === filter.vendor
      );
    }

    if (filter.price) {
      const regex = /\$\d+/g;
      output = output.filter((item) => {
        const price = parseInt(item.price.replace("$", "").trim());
        const [startAmt, endAmt] = filter?.price
          ?.match(regex)
          .map((match) => parseInt(match.slice(1)));
        return (
          // ( endAmt !== undefined) ? (!startAmt || price >= startAmt) &&
          // (!endAmt || price <= endAmt) : price < 20
          startAmt == 20 && endAmt == undefined
            ? price < 20
            : startAmt == 80 && endAmt == undefined
            ? price > 80
            : (!startAmt || price >= startAmt) && (!endAmt || price <= endAmt)
        );
      });
    }
    if (filter.star) {
      output = output.filter(
        (location) =>
          location.average_rating === parseInt(filter.star) ||
          location.average_rating > parseInt(filter.star)
      );
    }
    if (filter.sortby === "Lowest priced first") {
      output = output.sort(
        (a, b) =>
          parseInt(a.price.split("$ ")[1]) - parseInt(b.price.split("$ ")[1])
      );
    } else if (filter.sortby === "Highest priced first") {
      output = output.sort(
        (a, b) =>
          parseInt(b.price.split("$ ")[1]) - parseInt(a.price.split("$ ")[1])
      );
    }
    set_location_list(output);
    set_page_loader(false);
    set_location_loader(false);
  };

  useEffect(() => {
    GET_SEARCH_FORM();
    GET_SERVICE_LIST();
    GET_ALL_LOCATIONS();
    GET_LOCATIONS();
  }, [filter]);

  const handleIndustryChange = (value) => {
    set_filter({ business_industry: value, business_category: null });
  };

  const handleCategoryChange = (value) => {
    set_filter({ ...filter, business_category: value });
  };

  const getCategoryOptions = () => {
    if (filter.business_industry) {
      const data = industryData?.find(
        (item) => item.industry === filter.business_industry
      );
      if (data) {
        return data.titles
          .split(",")
          .map((title) => ({ value: title, label: title }));
      }
    }
    return [];
  };



  console.log("allServices===>", allServices);

  return (
    <Fragment>
      {/* <div className="search-banner">
                <div className="biz-container">
                    <SearchHeader filterData={filter} setFilterData={set_filter} />
                </div>
            </div> */}
      {page_loader ? (
        <>
          <div style={{ textAlign: "center", padding: "120px", width: "100%" }}>
            <Spin tip="Loading" size="large">
              <div className="content" />
            </Spin>
          </div>
        </>
      ) : (
        <>
          <div className="biz-container" style={{ padding: "15px 0px" }}>
            <p style={{ margin: "15px" }}>
              Search result for :{" "}
              {filter.typed && (
                <>
                  <span
                    style={{
                      background: "#ed510c",
                      color: "#fff",
                      display: "inline-block",
                      padding: "2px 10px",
                      margin: "3px",
                      borderRadius: "5px",
                    }}
                  >
                    {filter.typed}
                  </span>
                </>
              )}{" "}
              {filter.service_name && (
                <>
                  <span
                    style={{
                      background: "#ed510c",
                      color: "#fff",
                      display: "inline-block",
                      padding: "2px 10px",
                      margin: "3px",
                      borderRadius: "5px",
                    }}
                  >
                    {filter.service_name}
                  </span>
                </>
              )}{" "}
              {filter.label && (
                <>
                  <span
                    style={{
                      background: "#ed510c",
                      color: "#fff",
                      display: "inline-block",
                      padding: "2px 10px",
                      margin: "3px",
                      borderRadius: "5px",
                    }}
                  >
                    {filter.label}
                  </span>
                </>
              )}
              {filter.business_industry && (
                <>
                  <span
                    style={{
                      background: "#ed510c",
                      color: "#fff",
                      display: "inline-block",
                      padding: "2px 10px",
                      margin: "3px",
                      borderRadius: "5px",
                    }}
                  >
                    {filter.business_industry}
                  </span>
                </>
              )}
              {filter.business_category && (
                <>
                  <span
                    style={{
                      background: "#ed510c",
                      color: "#fff",
                      display: "inline-block",
                      padding: "2px 10px",
                      margin: "3px",
                      borderRadius: "5px",
                    }}
                  >
                    {filter.business_category}
                  </span>
                </>
              )}
              {filter.city && (
                <>
                  <span
                    style={{
                      background: "#ed510c",
                      color: "#fff",
                      display: "inline-block",
                      padding: "2px 10px",
                      margin: "3px",
                      borderRadius: "5px",
                    }}
                  >
                    {filter.city}
                  </span>
                </>
              )}
              {filter.price && (
                <>
                  <span
                    style={{
                      background: "#ed510c",
                      color: "#fff",
                      display: "inline-block",
                      padding: "2px 10px",
                      margin: "3px",
                      borderRadius: "5px",
                    }}
                  >
                    {filter.price}
                  </span>
                </>
              )}
              {filter.star && (
                <>
                  <span
                    style={{
                      background: "#ed510c",
                      color: "#fff",
                      display: "inline-block",
                      padding: "2px 10px",
                      margin: "3px",
                      borderRadius: "5px",
                    }}
                  >
                    ⭐{filter.star}
                  </span>
                </>
              )}
              {filter.sortby && (
                <>
                  <span
                    style={{
                      background: "#ed510c",
                      color: "#fff",
                      display: "inline-block",
                      padding: "2px 10px",
                      margin: "3px",
                      borderRadius: "5px",
                    }}
                  >
                    {filter.sortby}
                  </span>
                </>
              )}
              {filter.vendor && (
                <>
                  <span
                    style={{
                      background: "#ed510c",
                      color: "#fff",
                      display: "inline-block",
                      padding: "2px 10px",
                      margin: "3px",
                      borderRadius: "5px",
                    }}
                  >
                    {filter.vendor}
                  </span>
                </>
              )}
            </p>

            <h3 className="hidden-mobile" style={{ margin: "5px 15px" }}>
              Filter
            </h3>
            <div className="biz-row hidden-mobile">
              <div className="biz-col-8">
                <div className="search-wapper">

                    <div>
                      <label htmlFor="industry">Industry</label>
                      <Select
                        showSearch
                        allowClear
                        placeholder="Select Industry"
                        value={filter.business_industry}
                        onChange={handleIndustryChange}
                        style={{ width: "100%" }}
                        options={industryData.map((item) => ({
                          value: item.industry,
                          label: item.industry,
                        }))}
                      />
                    </div>
                    <div>
                      <label htmlFor="category">Category</label>
                      <Select
                        showSearch
                        allowClear
                        placeholder="Select Category"
                        value={filter.business_category}
                        onChange={handleCategoryChange}
                        style={{ width: "100%" }}
                        options={getCategoryOptions()}
                      />
                    </div>

                  <div>
                    <label htmlFor="">Location</label>
                    <Select
                      showSearch
                      allowClear
                      placeholder="Select Location"
                      value={filter.city ? filter.city : "Select Location"}
                      onChange={(value) => {
                        set_filter({ ...filter, city: value });
                      }}
                      style={{ width: "100%" }}
                      options={locationsList?.map((item) => ({
                        value: item,
                        label: item,
                      }))}
                    />
                  </div>

                  <div>
                    <label htmlFor="">Price</label>
                    <Select
                      showSearch
                      allowClear
                      placeholder="Select Price"
                      value={filter.price ? filter.price : "Select Price"}
                      onChange={(value) => {
                        set_filter({ ...filter, price: value });
                      }}
                      style={{ width: "100%" }}
                      options={[
                        "Under $20",
                        "$20 - $40",
                        "$40 - $60",
                        "$60 - $80",
                        "$80 - $100",
                        "$100 - $150",
                        "$150 - $250",
                        "$250 - $500",
                        "Above $500",
                      ].map((item) => ({
                        value: item,
                        label: item,
                      }))}
                    />
                  </div>

                  <div>
                    <label htmlFor="">Rating</label>
                    <Select
                      showSearch
                      allowClear
                      placeholder="Select Rating"
                      value={filter.star ? filter.star : "Select Rating"}
                      onChange={(value) => {
                        set_filter({ ...filter, star: value });
                      }}
                      style={{ width: "100%" }}
                      options={[
                        "5⭐only",
                        "4⭐& above",
                        "3⭐& above",
                        "2⭐& above",
                        "1⭐& above",
                      ].map((item) => ({
                        value: item,
                        label: item,
                      }))}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor=""
                      style={{ opacity: "0", display: "block" }}
                    >
                      Sort By
                    </label>
                    <span
                      style={{
                        background: "#ed510c",
                        color: "#fff",
                        textAlign: "center",
                        cursor: "pointer",
                        maxWidth: "92px",
                      }}
                      className="biz-input"
                      onClick={(e) => {
                        set_filter({
                          ...filter,
                          engine: "",
                          service_name: "",
                          vendor: "",
                          business_industry: "",
                          business_category: "",
                          city: "",
                          price: "",
                          star: "",
                          sortby: "",
                          label: "",
                          typed: "",
                        });
                        router.push("/search");
                      }}
                    >
                      Clear
                    </span>
                  </div>

                </div>
              </div>


              <div className="biz-col-4">
                <div
                  className="search-wapper"
                  style={{ alignItems: "center", flexDirection: "row-reverse" }}
                >
                  <div>
                    <label htmlFor="" style={{ opacity: "0" }}>
                      Sort By
                    </label>
                    <select
                      value={filter.engine && filter.engine}
                      style={{ background: "#ed510c", color: "#fff" }}
                      className="biz-input"
                      onChange={(e) => {
                        set_filter({
                          ...filter,
                          engine: e.target.value,
                          service_name: "",
                          vendor: "",
                          business_industry: "",
                          business_category: "",
                          city: "",
                          price: "",
                          star: "",
                          sortby: "",
                          label: "",
                          typed: "",
                        });
                      }}
                    >
                      {[
                        "All Services",
                        "Appointments Only",
                        "Packages Only",
                      ].map((item) => (
                        <option value={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="">Sort By</label>
                    <Select
                      showSearch
                      allowClear
                      placeholder="Short By"
                      value={filter.sortby ? filter.sortby : "Sort By"}
                      onChange={(value) => {
                        set_filter({ ...filter, sortby: value });
                      }}
                      style={{ width: "100%", minWidth: "150px" }}
                      options={[
                        "Lowest priced first",
                        "Highest priced first",
                      ].map((item) => ({
                        value: item,
                        label: item,
                      }))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {location_loader ? (
            <>
              <div
                style={{ textAlign: "center", padding: "120px", width: "100%" }}
              >
                <Spin tip="Loading" size="large">
                  <div className="content" />
                </Spin>
              </div>
            </>
          ) : (
            <>
              <div className="biz-container" style={{ padding: "0px 15px" }}>
                <div className="biz-flex" style={{ margin: "20px -5px" }}>
                  {location_list && location_list.length > 0 ? (
                    location_list?.map((item, key) => {
                      return (
                        <>
                          {"package_service_array" in item ? (
                            <>
                              <UserPackageCard nearBy={true} cardData={item} />
                            </>
                          ) : (
                            <>
                              <ServicePackageBox
                                engine={item.engine}
                                service_id={item.id}
                                location_id={item.location_id}
                                service_title={item.service_name}
                                service_vendor_id={item.vendor_id}
                                service_vendor_name={item.vendor_name}
                                service_labels={item.label}
                                feature_image={item.feature_image}
                                price={item?.price_array?.price}
                                location_title={item.location}
                                location_meta={item.location_meta}
                                currency_name={item?.price_array?.currency_name}
                                currency_symbol={
                                  item?.price_array?.currency_symbol
                                }
                                discount={item?.price_array?.discount}
                                favorite={item.isFavorite}
                                checkUserLogin={checkUserLogin}
                                user_id={localStorage.getItem("userId")}
                              />
                            </>
                          )}
                        </>
                      );
                    })
                  ) : (
                    <>
                      <div
                        style={{
                          textAlign: "center",
                          maxWidth: "100%",
                          fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        Not Found
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </Fragment>
  );
};
export default Index;
