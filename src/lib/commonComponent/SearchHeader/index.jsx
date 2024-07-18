import { Row, Col, Dropdown, Button, Menu, Empty, Select } from "antd";
import { DownOutlined, SearchOutlined, ShoppingCartOutlined , EnvironmentOutlined } from '@ant-design/icons';
import { Fragment, useState, useEffect, useRef, useContext } from "react";
import { CustomUserButton } from "@/components/Layout/CustomFooter/styledComponent";
import SearchIcon from '../../../assets/imgs/icon/search.svg';
import SortIcon from '../../../assets/imgs/icon/Sort.svg';
import FilterIcon from '../../../assets/imgs/icon/Filter.svg';
import { SearchColMobile, SearchCol, CustomInput, SearchImage, CustomRow, FilterRow, FilterImage, RowVerticalBreak } from "./styledComponent.jsx";
import { ResultRow } from "@/components/User/home/styledComponent";
import { debounce } from 'lodash';  
import { useRouter } from 'next/navigation';
import { getAllLocationsServices, getDataBySearchingLocation, getDataBySearchingServices } from "@/Services/userService.services";
import { LayoutContext } from "@/components/Layout";
import { useTheme } from "@emotion/react";

const SearchHeader = ({ filterData, setFilterData }) => {
    const ref = useRef(null);
    const router = useRouter();
    const { screen } = useTheme();
    const { industryData } = useContext(LayoutContext)
    const [isSearchDataVisible, setIsSearchDataVisible] = useState("");
    const [serviceSearchResult, setServiceSearchResult] = useState([]);
    const [locationSearchResult, setLocationSearchResult] = useState([]); 
    const [locSearchLabel, setLocSearchLabel] = useState("")
    const [servSearchLabel,setServSearchLabel] = useState("");
    const [inputValues, setInputValues] = useState({});    
    const [inputLocationVals, setInputLocationVals] = useState({ location:null });
    const [userDetails, setUserDetails] = useState();
    const [locationsList, setLocationsList] = useState();
    const [MobileSearch, setMobileSearch] = useState(false);
    const [MobileFilters, setMobileFilters] = useState(false);
    const [MobileSort, setMobileSort] = useState(false);

    useEffect(() => {
        (async() => {
            const response = await getAllLocationsServices();
            const output = response?.response?.data;
            setLocationsList(output);
        })();
    }, []);

    useEffect(() => {
        (async() => {
            const userId = localStorage.getItem('userId');
            const userToken = localStorage.getItem('token');
            const userRole = localStorage.getItem('role');
            setUserDetails({ "user_Id": userId, 
                "user_token": userToken, 
                'user_role': userRole 
            })
        })();
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsSearchDataVisible(false);
        }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
        document.removeEventListener('click', handleClickOutside);
        };
    }, [ref]);

    const findAsPerSearchedValue = debounce( async (e, type) => {
        setServiceSearchResult([]); 
        setLocationSearchResult([]);

        if (type === 'typed') {
            const response = await getDataBySearchingServices(e);
            let result = response?.response?.data?.data;

            if(result?.business_names.length != 0 || result?.labels.length !=0 || result?.service_names.length !=0 ){
                setServiceSearchResult(result);
                setServSearchLabel('Suggestions..')
            } else {
                const response = await getDataBySearchingServices('a');
                let result = response?.response?.data?.data;
                setServiceSearchResult(result)
                setServSearchLabel('No Matches Found.., Showing Popular Searches')
            }     
    
        } else {
            if (type === 'location') {

                const response = await getDataBySearchingLocation(e);
                let result = response?.response?.data?.data;
                
                const filteredData =  result && result.cities && result.cities
                    .map(item => item.toLowerCase())
                    .filter(item => item.includes(e))
                    .sort();

                    if (filteredData.length != 0) {
                        setLocationSearchResult(filteredData)
                        setIsSearchDataVisible("location")
                        setLocSearchLabel("Suggesting Cities...")
                    } else {
                        setLocationSearchResult(result.cities)
                        setIsSearchDataVisible("location")
                        setLocSearchLabel("Suggesting Popular Cities..")
                    }          
            }
        }
    
    }, 500);
    
    const callingOnChange = async (e, type) => {
        e.stopPropagation(); 
        var value = e.target.value;
        if (value?.length > 0) {
            findAsPerSearchedValue(value,type);
        } else {
            findAsPerSearchedValue('a',type);
        }

        if(type ==='service' || type ==='vendor' || type ==='typed' || type ==='label' ){
            const newInputValues = { [type]: value};
            setInputValues(newInputValues);
            setIsSearchDataVisible("service")
        }
    };

    const callingOnChangeLoc = async (e) => {
        e.stopPropagation(); 
        var value = e.target.value;

        if (value?.length > 0) {
            findAsPerSearchedValue(value,'location');
        } else {
            findAsPerSearchedValue('a', 'location');
        }     
        
        const newInputValues = { location: value };
        setInputLocationVals(newInputValues);
        setIsSearchDataVisible("location");
    }
    
    const handleItemClick = (value, type) => {
        if(type === 'location') {
            const newInputValues = { [location]: value };
            setInputLocationVals(newInputValues)
        } else {
            const newInputValues = { [type]: value };
            setInputValues(newInputValues);
        }
    }

    const handleOnSubmit = (data, place) => {
        console.log("On Submit event ==>>", data, place.location);
        const { location } = place
        const keys = Object.keys(data);  
        window.location.href = `/search?${keys[0]}=${data[`${keys[0]}`]}&locationId=${location || ''}`

        // setFilterData({
        //     ...filterData,
        //     location: place?.location || '',
        //     service: data?.service || ''
        // });
    }

    const toggleMobileSearch = () => {
        setMobileSearch(!MobileSearch);
        setMobileFilters(false);
        setMobileSort(false);
    };

    const toggleMobileFilter = () => {
        setMobileFilters(!MobileFilters);
        setMobileSearch(false);
        setMobileSort(false);
    };

    const toggleMobileSort = () => {
        setMobileSort(!MobileSort);
        setMobileFilters(false);
        setMobileSearch(false);
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
            if (filterData?.service !== ''){
                setFilterData({ ...filterData, service: '' });
            }
            if (filterData?.label !== ''){
                setFilterData({ ...filterData, label: '' });
            }
            if (filterData?.category !== ''){
                setFilterData({ ...filterData, category: '' });
            }
            if ( filterData?.vendor !== ''){
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
    return (
        <Fragment>
            <CustomRow className="mobile-cart" span={14}>
                <Row style={{ height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <SearchImage className='Search' 
                        src={SearchIcon}
                        style={{height: '40%',  cursor: 'pointer'}}
                        onClick={toggleMobileSearch}
                    />
                </Row>
                <RowVerticalBreak/> 
                
                <FilterRow 
                    className='Filters' 
                    onClick={toggleMobileFilter}
                    style={{cursor:'pointer'}}
                >
                    <FilterImage className='FilterImage' 
                        src={FilterIcon}
                        style={{height: '40%', cursor: 'pointer'}}
                    />
                    <p>Filter</p>   
                </FilterRow>  
                <RowVerticalBreak/>
                
                <FilterRow className='Sort' onClick={toggleMobileSort}>
                    <FilterImage className='SortImage' 
                        src={SortIcon}
                        style={{height: '40%', cursor: 'pointer'}}
                    />
                    <p>Sort</p>   
                </FilterRow> 

                <SearchCol style={{ 
                    maxWidth:'800px', 
                    borderRadius:'10px', 
                    overflow:'hidden', 
                    padding: 0,
                    height:'42px',
                }}>
                    <CustomInput 
                        value={inputValues?.service || inputValues?.vendor || inputValues?.label || inputValues?.tpyed}
                        className="SerarchInputs"
                        placeholder="Search" 
                        prefix={<SearchOutlined />} 
                        style={{ borderRadius:'0'}}
                        onClick={(e) => callingOnChange(e, "typed")}
                        onChange={(e) => callingOnChange(e, "typed")}
                    />
                    
                    <CustomInput 
                        value={inputLocationVals?.location }
                        placeholder="City" 
                        className="SerarchInputs"
                        prefix={<EnvironmentOutlined />} 
                        style={{ zIndex:'999', marginLeft:'-1%', borderRadius:'0'}}
                        onClick={(e) => callingOnChangeLoc(e)}
                        onChange={(e) => callingOnChangeLoc(e)}
                    />

                    <CustomUserButton 
                        className="SearchButton"
                        style={{width:'auto', background:'#EA8933', border:"none", borderRadius: '0px 10px 10px 0px', height:'100%', marginLeft:'-4%',  zIndex:'1000' }}
                        onClick={() => handleOnSubmit(inputValues, inputLocationVals)}
                    >
                        Search
                    </CustomUserButton>
                </SearchCol>
            </CustomRow>

            <ResultRow style={{ position:'absolute', width:"375px", left:"50%", transform:"translateX(-50%)", marginTop:"-15px", zIndex:'100000', display:'flex', justifyContent:'center', alignItems:'center' }}>
                <Col xl={24} style={{ display:'flex',  maxWidth:'500px' }}>
                    { (isSearchDataVisible == "service") ? serviceSearchResult && serviceSearchResult?.service_names  ?
                        <Row ref={ref} style={{ background:'white', height: 'auto', width:'100%', display:'flex', padding:'8px', margin:'2px 0 0 0', borderRadius:'8px' }}>
                            
                            <Col span={24} style={{ fontSize: '12px', fontWeight: 400, margin: '5px 0'}} > 
                            <span style={{ padding:'8px 0' }} > {servSearchLabel} </span> <br/><br/>
                            
                            <span style={{ padding:'8px 0' }} >Popular Services </span> <br/>
                                <Row style={{ display:'flex', flexDirection:'row', marginTop: '5px' }} >
                                    {
                                        serviceSearchResult && serviceSearchResult?.service_names && serviceSearchResult?.service_names.map((item, index) => {
                                            return <span
                                            onClick={() => handleItemClick(item, "service") }
                                            style={{
                                                border: '1px solid #72959A',
                                                borderRadius: '5px',
                                                fontSize:'.7rem',
                                                padding: '3px',
                                                color: '#72959A',
                                                margin: '0 5px 5px 0',
                                                cursor:'pointer'
                                            }} >
                                                {item}
                                            </span>
                                        })
                                    }
                                </Row>
                            </Col>

                            <Col span={24} style={{ fontSize: '12px', fontWeight: 400,  margin: '5px 0'}} > <span style={{ padding:'8px 0' }} >CATEGORIES </span> <br/>
                                <Row style={{ display:'flex', flexDirection:'row', marginTop: '5px' }} >
                                    {
                                        serviceSearchResult && serviceSearchResult?.labels && serviceSearchResult?.labels.map((item, index) => {
                                            return <span
                                            onClick={() => handleItemClick(item, "label") }
                                            style={{
                                                border: '1px solid #72959A',
                                                borderRadius: '5px',
                                                fontSize:'.7rem',
                                                padding: '3px',
                                                color: '#72959A',
                                                margin: '0 5px 5px 0',
                                                cursor:'pointer'
                                            }}>
                                                {item}</span>
                                        })
                                    }
                                </Row>
                            </Col>

                            <Col span={24} style={{ fontSize: '12px', fontWeight: 400, margin: '5px 0'}} > <span style={{ padding:'8px 0' }} >VENDORS </span> <br/>
                                <Row style={{ display:'flex', flexDirection:'row', marginTop: '5px' }} >
                                    {
                                        serviceSearchResult && serviceSearchResult?.business_names && serviceSearchResult?.business_names.map((item, index) => {
                                            return <span
                                            onClick={() => handleItemClick(item, "vendor") }
                                            style={{
                                                border: '1px solid #72959A',
                                                borderRadius: '5px',
                                                fontSize:'.7rem',
                                                padding: '3px',
                                                color: '#72959A',
                                                margin: '0 5px 5px 0',
                                                cursor:'pointer'
                                            }}>
                                                {item}</span>
                                        })
                                    }
                                </Row>
                            </Col>
                        </Row> 
                        : (isSearchDataVisible) ?  <Row  style={{ background:'white', height: 'auto', width:'100%', display:'flex', justifyContent:'center', alignItems:'center',  margin:'2px 0 0 11px', borderRadius:'8px' }} > <Empty /> </Row> : null : null
                    } 

                    { (isSearchDataVisible == "location") ? locationSearchResult  ?
                        <Row ref={ref} style={{ background:'white', height: 'auto', width:'100%', display:'flex', flexDirection:'column', padding:'8px', margin:'2px 0 0 0', borderRadius:'8px' }}>
                            
                            <Col span={24} style={{ fontSize: '12px', fontWeight: 400, margin: '5px 0'}} > <span style={{ padding:'8px 0' }} >{locSearchLabel} </span> <br/>

                                <Row style={{ width:'100%', display:'flex', flexDirection:'row', marginTop: '5px' }} >
                                    {
                                        locationSearchResult && locationSearchResult?.map((item, index) => {
                                            return <span 
                                            onClick={() => handleItemClick(item, "location") }
                                            style={{
                                                border: '1px solid #72959A',
                                                borderRadius: '5px',
                                                fontSize:'.7rem',
                                                padding: '3px',
                                                color: '#72959A',
                                                margin: '0 5px 5px 0',
                                                cursor:'pointer'
                                            }} >
                                                {item}
                                            </span>
                                        })
                                    }
                                </Row>
                            </Col>
                        </Row> 
                        : (isSearchDataVisible) ?  <Row  style={{ background:'white', height: 'auto', width:'46%', display:'flex', justifyContent:'center', alignItems:'center',  margin:'2px 0 0 0px', borderRadius:'8px' }} > <Empty /> </Row> : null : null
                    } 
                </Col>
            </ResultRow>

            { MobileSearch && (
                /* ************For Mobile Search view *************/
                <Col style={{ position: 'absolute', height:"auto", background: '#F2F1F0', width:'100%', padding: '3rem 1rem', zIndex:'1000', height:'10%', borderRadius: '0 0 40px 40px', boxShadow:'rgb(0 0 0 / 25%) 0px 10px 10px'}} >
                    <SearchColMobile>
                    <CustomInput 
                        value={inputValues?.service || inputValues?.vendor || inputValues?.label || inputValues?.tpyed}
                        className="SerarchInputs"
                        placeholder="Search" 
                        prefix={<SearchOutlined />} 
                        style={{ borderRadius:'0'}}
                        onClick={(e) => callingOnChange(e, "typed")}
                        onChange={(e) => callingOnChange(e, "typed")}
                    />

                    <CustomInput 
                        value={inputLocationVals?.location }
                        placeholder="City" 
                        className="SerarchInputs"
                        prefix={<EnvironmentOutlined />} 
                        style={{ zIndex:'999', marginLeft:'-1%', borderRadius:'0'}}
                        onClick={(e) => callingOnChangeLoc(e)}
                        onChange={(e) => callingOnChangeLoc(e)}
                    />

                        <CustomUserButton 
                            onClick={() => handleOnSubmit(inputValues, inputLocationVals)}
                        >
                            Search
                        </CustomUserButton>
                    </SearchColMobile>
                </Col>
            )}

            { MobileFilters && (
                <Row>
                    <Col span={24}>
                        <Row style={{textAlign:"center"}}>
                        <Col xl={12}>
                            { (filterData?.vendor || filterData?.label || filterData?.service || filterData?.typed) &&
                                <Select
                                    value={filterData?.industry || filterData?.category}
                                    onChange={handleHomeSearchClick}
                                    allowClear
                                    onClear={() => handleClearClick("industry")}
                                    style={{ width:'120px', marginRight:'10px' }}
                                >
                                    <Option value="">{ filterData?.vendor || filterData?.label || filterData?.service || filterData?.typed || filterData.category }</Option>
                                </Select>
                            }

                            {    !filterData.category &&
                                <Select
                                    value={filterData?.industry}
                                    onChange={handleIndustryClick}
                                    placeholder="Industry"
                                    allowClear
                                    onClear={() => handleClearClick("industry")}
                                    style={{ width:'120px', marginRight:'10px' }}
                                >
                                    <Option value="">Industry</Option>
                                    { industryData && industryData?.map((item) => (
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
                                    placeholder="location"
                                    onClear={() => handleClearClick("location")}
                                    style={{ width:'120px', marginRight:'10px', marginBottom:"10px" }}
                                >
                                    <Option value="">Location</Option>
                                    { locationsList && locationsList?.Cities && locationsList?.Cities.map((location) => (
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
                                    style={{ width:'120px', marginRight:'10px', marginBottom:"10px" }}
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
                                    style={{ width:'120px', marginRight:'10px', marginBottom:"10px" }}
                                >
                                    <Option value="">Rating</Option>
                                    {['5⭐only', '4⭐& above',  '3⭐& above', '2⭐& above', '1⭐& above' ].map((item, index) => (
                                    <Option key={5 - index} value={5 - index}>
                                        {item}
                                    </Option>
                                    ))}
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            )}

            { MobileSort && (
                /* ************For Mobile Sort view *************/
                <Row>
                    <Col span={24}>
                        <Row  style={{textAlign:"center"}}>        
                            <Col span={24} style={{ display:'flex', justifyContent:'center'}}>
                                <Select
                                    value={filterData?.sortby}
                                    onChange={handleSortByClick}
                                    allowClear
                                    placeholder="Sort by"
                                    style={{ width:'150px'}}
                                >
                                    <Option value="">Sort By</Option>
                                    {["Lowest priced first", "Highest priced first"].map((item) => (
                                    <Option key={item} value={item}>
                                        {item}
                                    </Option>
                                    ))}
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            )}

        </Fragment>
    )
}
export default SearchHeader;