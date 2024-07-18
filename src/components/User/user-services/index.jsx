import PromotionCard from "@/lib/commonComponent/CustomPromoCard";
import ListingCard from "@/lib/commonComponent/CustomUserCard";
import SearchHeader from "@/lib/commonComponent/SearchHeader";
import { Button, Col, ConfigProvider, Dropdown, Empty, Menu, Row, Select, Spin } from "antd";
import { Fragment, useContext, useEffect, useState } from "react";
import { StyledText, StyledTitle } from "./styledComponent";
import { GetListAllServices, getAllLocationsServices, getDataBySearchingServices } from "@/Services/userService.services";
import { LayoutContext } from "@/components/Layout";
import UserPackageCard from "@/lib/commonComponent/UserPackageCard";
import { BodyDemi, BodyTiny } from "@/styles/styledComponent";
import { useTheme } from "@emotion/react";
import ServicePackageBox from "@/widgets/service-package-box/ServicePackageBox";


const UserServices = (props) => {
    const { Option } = Select;
    const { screen } = useTheme();
    const { label, vendor, service, typed, category, industry } = props
    const locationId = props.locationId
    const { industryData } = useContext(LayoutContext)
    const [listData, setListData] = useState();
    const [featuredList, setFeaturedList] = useState();
    const [packagesList, setPackagesList] = useState();
    const [locationsList, setLocationsList] = useState();
    const [showAppointment, setshowAppointment] = useState(false);
    const [appointmentData, setAppointmentData] = useState();
    const [isLoading, setisLoading] = useState(false);
    const [userId, setUserId] = useState();
    const [userToken, setUserToken] = useState();
    const [userRole, setUserRole] = useState();
    const [checkUserLogin, setCheckUserLogin] = useState(false);
    const [filterData, setFilterData] = useState({
        price: '',
        service_name : service || '',
        star: '',
        location: locationId || '',
        industry: industry || '',
        category: category || '',
        sortby: '',
        service: service || '',
        label: label || '',
        vendor: vendor || '',
        typed: typed || '',
    });

    useEffect(() => {
        (async () => {
            const response = await getAllLocationsServices();
            const output = response?.response?.data;
            setLocationsList(output);
        })();
    }, [])

    useEffect(() => {
        (async () => {
            setisLoading(true);

            const userId = localStorage.getItem('userId');
            // setUserId(user_id);
            const userToken = localStorage.getItem('token');
            // setUserToken(token);
            const userRole = localStorage.getItem('role');
            // setUserRole(userRole);
            if (userId) {
                setCheckUserLogin(true)
            }
            const response = await GetListAllServices({ user_id: userId, token: userToken, role: userRole });
            let output = response?.response?.data;

            const featuredData = output?.filter(item => item["featured"] === "yes");

            output = output?.filter(item => item["featured"] !== "yes");

            const allApointments = output && output.filter((item) => {
                return item.appointment == 'yes'
            });
            console.log("allApointments 11 ==>>", allApointments);


            if (hasValues(filterData)) {
                console.log("Check filter values ==>>", filterData);
                const listingCardData = applyFilters(output, filterData);
                setListData(listingCardData);

                const filterFeaturedData = applyFilters(featuredData, filterData);
                setFeaturedList(filterFeaturedData);

                if (showAppointment) {
                    const filterAppointData = applyFilters(allApointments, filterData);
                    setAppointmentData(filterAppointData);
                }

            } else {
                setListData(output);
                setFeaturedList(featuredData);
                setAppointmentData(allApointments);
            }
            setisLoading(false);
        })();
    }, [filterData])

    function hasValues(filterData) {
        return Object.values(filterData).some(val => val !== '');
    }

    const applyFilters = async (data, filterSelectedData) => {
        let filteredData = [...data]

        const selectedFilters = Object.keys(filterSelectedData).filter(key => filterSelectedData[key] !== '');
        if (selectedFilters.length > 0) {
            for (const filter of selectedFilters) {
                console.log('Processing filter:', filter);

                if (filter === 'price') {
                    const regex = /\$\d+/g;
                    filteredData = filteredData.filter(item => {
                        const price = parseInt(item.price.replace('$', '').trim());
                        const [startAmt, endAmt] = filterData?.price?.match(regex).map(match => parseInt(match.slice(1)));
                        return (
                            // ( endAmt !== undefined) ? (!startAmt || price >= startAmt) && 
                            // (!endAmt || price <= endAmt) : price < 20
                            (startAmt == 20 && endAmt == undefined) ? price < 20 :
                                (startAmt == 80 && endAmt == undefined) ? price > 80 : (!startAmt || price >= startAmt) &&
                                    (!endAmt || price <= endAmt)
                        );
                    });

                } else if (filter === 'star') {
                    filteredData = filteredData.filter(item => {
                        const stars = item?.['average-rating'];
                        return Number(stars) >= filterData?.star;
                    });

                } else if (filter === 'location') {
                    filteredData = filteredData.filter(item => {
                        return item?.city.toLowerCase() === filterData?.location.toLowerCase();
                    });

                } else if (filter === 'industry') {
                    // filteredData = filteredData.filter(item => item.industry === filter.value);
                    filteredData = filteredData.filter(item => {
                        return item?.["business-industry"] === filterData.industry;
                    });

                } else if (filter === 'category') {
                    // filteredData = filteredData.filter(item => item.category === filter.value);
                    filteredData = filteredData.filter(item => {
                        return item?.business_category === filterData.category;
                    });

                } else if (filter === 'vendor') {
                    filteredData = filteredData.filter(item => {
                        return item?.["vendor-name"] === filterData.vendor;
                    });

                } else if (filter === 'service') {
                    filteredData = filteredData.filter(item => {
                        return item?.["service-name"] === filterData.service;
                    });

                } else if (filter === 'label') {
                    filteredData = filteredData.filter(item => {
                        return item?.["label"].some(l => l.includes(filterData.label));
                    });

                } else if (filter === 'typed') {

                    console.log('Typed filter detected:', filterData.typed);


                    const response = await getDataBySearchingServices(filterData.typed);
                     let result = response?.response?.data?.data;


                    const filteredData1 = filteredData.filter(item => {

                        const lowerlabel = item?.["label"].map(element => {
                            return element.toLowerCase();
                        });

                        return lowerlabel.some(l => l.includes(filterData.typed?.toLowerCase()));
                    });


                    const filteredData2 = filteredData.filter(item => {
                        return item?.["service-name"]?.toLowerCase() === filterData.typed?.toLowerCase();
                    });


                    const filteredData3 = filteredData.filter(item => {
                        return item?.["vendor-name"]?.toLowerCase() === filterData.typed?.toLowerCase();
                    });


                    filteredData = filteredData1.concat(filteredData2, filteredData3)

                }

                else if (filter === 'sortby') {
                    if (filterData.sortby === 'Lowest priced first') {
                        filteredData = filteredData.sort((a, b) => parseInt(a.price.split('$ ')[1]) - parseInt(b.price.split('$ ')[1]));
                    } else if (filterData.sortby === 'Highest priced first') {
                        filteredData = filteredData.sort((a, b) => parseInt(b.price.split('$ ')[1]) - parseInt(a.price.split('$ ')[1]));
                    }
                }
            }
            return filteredData;
        }
    };

    const handleIndustryClick = (item) => {
        if (item) {
            setFilterData({ ...filterData, industry: item });
        } else {
            setFilterData({ ...filterData, industry: '' });
        }
    };

    const handleHomeSearchClick = (item) => {
        if (item) {
            setFilterData({ ...filterData, service: item });
        } else {
            if (filterData?.service !== '') {
                setFilterData({ ...filterData, service: '' });
            }
            if (filterData?.label !== '') {
                setFilterData({ ...filterData, label: '' });
            }
            if (filterData?.category !== '') {
                setFilterData({ ...filterData, category: '' });
            }
            if (filterData?.vendor !== '') {
                setFilterData({ ...filterData, vendor: '' });
            }
        }
    };

    const handleLocationClick = (item) => {
        if (item) {
            setFilterData({ ...filterData, location: item });
        } else {
            setFilterData({ ...filterData, location: '' });
        }
    };

    const handlePriceClick = (item) => {
        if (item) {
            setFilterData({ ...filterData, price: item });
        } else {
            setFilterData({ ...filterData, price: '' });
        }
    };

    const handleStarsClick = (item) => {
        if (item) {
            setFilterData({ ...filterData, star: item });
        } else {
            setFilterData({ ...filterData, star: '' });
        }
    };

    const handleSortByClick = (item) => {
        if (item) {
            setFilterData({ ...filterData, sortby: item });
        } else {
            setFilterData({ ...filterData, sortby: '' })
        }
    };

    const handleClearClick = (type) => {
        setFilterData({ ...filterData, type: '' });
    }

    const showAllAppointments = () => {
        setFilterData({
            price: '',
            star: '',
            location: '',
            industry: '',
            category: '',
            sortby: '',
            service: '',
            label: '',
            vendor: '',
            typed: '',
        });
        setshowAppointment(!showAppointment);
    }

    console.log("allApointments st 22 ==>>", showAppointment);

    return (
        <Fragment>
            <Spin style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} spinning={isLoading}>
                <Row>
                    <Col span={24}>
                        <SearchHeader filterData={filterData} setFilterData={setFilterData} />
                        <Row style={{ display: 'flex', justifyContent: 'center', flexWrap: 'nowrap', padding: "30px 15px" }}>
                            <Col md={20} xs={22} sm={22}>
                                {(filterData?.service || filterData?.vendor || filterData?.label || filterData?.category) &&
                                    <span style={{ display: 'flex', fontWeight: 600 }}>
                                        search result for : <StyledTitle>{filterData?.service || filterData?.vendor || filterData?.label || filterData?.category}</StyledTitle>
                                    </span>
                                }
                                {(screen !== 'xs') && <Row xl={24} style={{ marginTop: '12px', gap: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Col xl={12}>
                                        {(filterData?.vendor || filterData?.label || filterData?.service || filterData?.typed || filterData.category) &&
                                            <Select
                                                value={filterData?.industry || filterData?.category}
                                                onChange={handleHomeSearchClick}
                                                allowClear
                                                onClear={() => handleClearClick("industry")}
                                                style={{ width: '120px', marginRight: '10px' }}
                                            >
                                                <Option value="">{filterData?.vendor || filterData?.label || filterData?.service || filterData?.typed || filterData.category}</Option>
                                            </Select>
                                        }

                                        {!filterData.category &&
                                            <Select
                                                value={filterData?.industry}
                                                onChange={handleIndustryClick}
                                                allowClear
                                                onClear={() => handleClearClick("industry")}
                                                style={{ width: '120px', marginRight: '10px' }}
                                            >
                                                <Option value="">Industry</Option>
                                                {industryData && industryData?.map((item) => (
                                                    <Option key={item?.industry} value={item?.industry}>
                                                        {item?.industry}
                                                    </Option>
                                                ))}
                                            </Select>
                                        }

                                        <Select
                                            value={filterData?.location}
                                            onChange={handleLocationClick}
                                            allowClear
                                            onClear={() => handleClearClick("location")}
                                            style={{ width: '120px', marginRight: '10px' }}
                                        >
                                            <Option value="">Location</Option>
                                            {locationsList && locationsList?.Cities && locationsList?.Cities.map((location) => (
                                                <Option key={location} value={location}>
                                                    {location}
                                                </Option>
                                            ))}
                                        </Select>

                                        <Select
                                            value={filterData?.price}
                                            onChange={handlePriceClick}
                                            allowClear
                                            onClear={() => handleClearClick("price")}
                                            style={{ width: '120px', marginRight: '10px' }}
                                        >
                                            <Option value="">Price</Option>
                                            {["Under $20", "$20 - $40", "$40 - $60", "$60 - $80", "Above $80"].map((item) => (
                                                <Option key={item} value={item}>
                                                    {item}
                                                </Option>
                                            ))}
                                        </Select>

                                        <Select
                                            value={filterData?.star}
                                            onChange={handleStarsClick}
                                            allowClear
                                            onClear={() => handleClearClick("star")}
                                            style={{ width: '120px', marginRight: '10px' }}
                                        >
                                            <Option value="">Rating</Option>
                                            {['5⭐only', '4⭐& above', '3⭐& above', '2⭐& above', '1⭐& above'].map((item, index) => (
                                                <Option key={5 - index} value={5 - index}>
                                                    {item}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Col>
                                    <Col xl={8} style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                        <Col xl={10} style={{ display: 'flex', justifyContent: 'end' }}>
                                            <Select
                                                value={filterData?.sortby}
                                                onChange={handleSortByClick}
                                                allowClear
                                                style={{ width: '150px' }}
                                            >
                                                <Option value="">Sort By</Option>
                                                {["Lowest priced first", "Highest priced first"].map((item) => (
                                                    <Option key={item} value={item}>
                                                        {item}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Col>

                                        <Col xl={10} style={{ display: 'flex', justifyContent: 'flex-end', height: '100%', cursor: 'pointer' }} onClick={showAllAppointments}>
                                            {(!showAppointment) ?
                                                <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', background: 'rgb(237, 81, 12)', padding: '6px 10px', }} >
                                                    {/* <Col span={24}> <BodyTiny> Pay at the location </BodyTiny> </Col> */}
                                                    <Col span={24}> <BodyDemi style={{ fontSize: '12px', color: '#fff' }}>Appointments only</BodyDemi> </Col>
                                                </Row> :
                                                <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px', background: 'linear-gradient(180deg, #4E39B7 0%, #322477 100%)', padding: '6px 10px' }}>
                                                    <Col span={24}> <BodyDemi style={{ fontSize: '12px', color: '#F2F1F0' }}>Show All</BodyDemi> </Col>
                                                </Row>
                                            }
                                        </Col>
                                    </Col>
                                </Row>
                                }
                                {(!showAppointment) ?
                                    <>
                                        <StyledText>Featured Services</StyledText>
                                        <div className="biz-flex" style={{ margin: "0px -5px" }}>
                                            {featuredList?.map((item, key) => {
                                                return (
                                                    <>
                                                    {'package_service_array' in item ? <>
                                                          <UserPackageCard nearBy={true} cardData={item} />
                                                      </> : <>
                                                      
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
                                                              currency_symbol={item?.price_array?.currency_symbol}
                                                              discount={item?.price_array?.discount}
                                                              favorite={item.isFavorite}
                                                              checkUserLogin={checkUserLogin}
                                                              user_id={localStorage.getItem('userId')}
                                                          />
                                                     
                                                      </>}
                                                  </>
                                                )
                                            })}
                                        </div>

                                        <div className="biz-flex" style={{ margin: "0px -5px" }}>
                                            {listData && listData.length > 0 ? listData?.map((item, key) => {
                                                return (
                                                    <>
                                                  {'package_service_array' in item ? <>
                                                        <UserPackageCard nearBy={true} cardData={item} />
                                                    </> : <>
                                                    
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
                                                            currency_symbol={item?.price_array?.currency_symbol}
                                                            discount={item?.price_array?.discount}
                                                            favorite={item.isFavorite}
                                                            checkUserLogin={checkUserLogin}
                                                            user_id={localStorage.getItem('userId')}
                                                        />
                                                   
                                                    </>}
                                                </>
                                                )
                                            }) : <Col xl={6} lg={8} sm={12} xs={12}> <Empty /> </Col>
                                            }
                                        </div>
                                    </> :
                                    <div className="biz-flex" style={{ margin: "0px -5px" }}>
                                        {appointmentData && appointmentData.length > 0 ? appointmentData?.map((item, key) => {
                                            return (
                                            
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
                                                        currency_symbol={item?.price_array?.currency_symbol}
                                                        discount={item?.price_array?.discount}
                                                        favorite={item.isFavorite}
                                                        checkUserLogin={checkUserLogin}
                                                        user_id={localStorage.getItem('userId')}
                                                    />
                                               
                                            )
                                        }) : <Col xl={6} lg={8} sm={12} xs={12}> <Empty /> </Col>
                                        }
                                    </div>
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Spin>
        </Fragment>
    );
};
export default UserServices;