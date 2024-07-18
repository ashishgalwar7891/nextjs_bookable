import Image from 'next/image';
import React, { useState, useContext, useEffect, useRef } from 'react';
import { CustomHeader, StyledCol, StyledMenuTitle, StyledSideBarText, HeadRow } from "./styledComponent";
import BookableBizLogo from '../../../assets/imgs/logo-V3.png'
import BookableBizLogoMark from '../../../assets/imgs/Bookablebiz_logoMark.png'
import Plane from '../../../assets/imgs/icon/plane.png'
import CartIcon from '../../../assets/imgs/icon/shopping-cart.svg'
import BurgerMenu from '../../../assets/imgs/icon/MenuFries.svg'
import { CaretDownOutlined, CaretUpOutlined, DownOutlined, UserOutlined, AlignRightOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Row, Divider, Menu, Switch, ConfigProvider, Space, Spin, Tabs } from 'antd';
import { useRouter } from 'next/navigation';
import { LayoutContext } from '..';
import { AuthContext } from '@/app/layout';
import UserProfile from '@/components/User/user-sidebar/profile';
import profileLogo from '../../../assets/imgs/icon/profile.svg'
import bookingsIcon from '../../../assets/imgs/icon/bookings.svg'
import paymentIcon from '../../../assets/imgs/icon/Sidebar-Icons/payment-icon.svg'
import addressIcon from '../../../assets/imgs/icon/Sidebar-Icons/address-icon.svg'
import calenderIcon from '../../../assets/imgs/icon/Sidebar-Icons/calender-icon.svg'
import favouritIcon from '../../../assets/imgs/icon/Sidebar-Icons/favourite-icon.svg'
import logoutIcon from '../../../assets/imgs/icon/Sidebar-Icons/logout-icon.svg'
import packagesIcon from '../../../assets/imgs/icon/Sidebar-Icons/packages-icon.svg'
import UserBookings from '@/components/User/user-sidebar/myBookings';
import UserAppointment from '@/components/User/user-sidebar/myAppointment';
import UserFavourites from '@/components/User/user-sidebar/Favourit';
import UserPayment from '@/components/User/user-sidebar/Payment';
import UserSettings from '@/components/User/user-sidebar/setting';
import { GetUserCartItemCountServices } from '@/Services/userService.services';
import { userLogoutService } from '@/Services/auth.services';
import UserPackages from '@/components/User/user-sidebar/myPackages';
import styled from '@emotion/styled';
import { AppstoreOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { FaAngleRight } from 'react-icons/fa';

export const CustomSideDrawer = styled(Drawer)`
    .ant-drawer-content-wrapper {
        height: fit-content !important;
        width: 800px !important;
    }
`;

const Header = ({ cartRefresh, setCartRefresh }) => {
    const ref = useRef();
    const dropdownRef = useRef(null);
    const dropdownRefMenu = useRef(null);
    const router = useRouter();
    const { userDetails } = useContext(AuthContext);
    const { industryData } = useContext(LayoutContext)
    const [showDropdown, setShowDropdown] = useState(false);
    const [MobileMenu, setMobileMenu] = useState(false);
    const [userInfo, setUserInfo] = useState();
    const [showSidebar, setShowSidebar] = useState(false);
    const [showContentScreen, setShowContentScreen] = useState(false);
    const [sideScreen, setSideScreen] = useState('');
    const [cartCount, setCartCount] = useState();
    const [userData, setUserData] = useState();
    const [open, setOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const toggleMobileDropdown = () => {
        setMobileMenu(!MobileMenu);
    };

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label
        };

    }
    const industryTitles = {};
    industryData && industryData.forEach(item => {
        industryTitles[item.industry] = item?.titles.split(',');
    });

    const items = industryData && industryData.map((item, index) => {
        const industryOptions = industryTitles?.[item?.industry].map((title, index) => getItem(title, `${item.industry || 'no data'}-${index}`, <a onClick={() => onCategoryClick(title)}> </a>));
        return getItem(item.industry, index, null, industryOptions);
    });


    
    const disabledRoutes = ['/vendor/add-info', 'vendor/stripe-onboard']

    useEffect(() => {
        const currentRoute = window.location.pathname;
      //  console.log('Current Route:', currentRoute); 
        const isRouteDisabled = disabledRoutes.includes(currentRoute);
     //   console.log('Is Disabled:', isRouteDisabled); 
        setIsDisabled(isRouteDisabled);
    }, []);



    const handleVendorClick = () => {
        if (!isDisabled) {
            router.push('/vendor/profile');
        }
    };

    const vendorButtonStyles = {
        minWidth: 'fit-content',
        fontSize: '14px',
        pointerEvents: isDisabled ? 'none' : 'auto',
        opacity: isDisabled ? 0.5 : 1,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
    };

    const toggleDropdown = () => {
        setShowDropdown(true);
    };
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
            if (dropdownRefMenu.current && !dropdownRefMenu.current.contains(event.target)) {
                setMobileMenu(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
    // const hide = () => setShowDropdown(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const userRole = localStorage.getItem('role')
            const userName = localStorage.getItem('user')
            const userToken = localStorage.getItem('token')
            const userId = localStorage.getItem('userId')
            setUserInfo({ "userRole": userRole, "userName": userName })

            setUserData({
                "token": userToken,
                "user_id": userId
            })

            const response = await GetUserCartItemCountServices({
                "token": userToken,
                "user_id": userId
            });
            if (response?.response?.status === 200) {
                setCartCount(response?.response?.data?.count);
                setCartRefresh(false);
            }
            setIsLoading(false);
        })();
    }, [cartCount, cartRefresh]);

    useEffect(() => {
        const handleWindowClick = (e) => {
            if (showSidebar && e.composedPath()[1] !== ref.current) {
                setShowSidebar(false)
            }
        }

        document.body.addEventListener('click', handleWindowClick);

    }, [showSidebar, showDropdown]);

    const handleLogin = () => {
        if (userInfo?.userName && userInfo?.userRole === "user") {
            const val = !showSidebar
            setShowSidebar(val);
            setSidebarOpen(val);
            onClose();
            setSideScreen("")
        } else {
            router.push('/login')
        }
    }

    const menuItemClick = (page) => {
        if (page === "logout") {
            handleClickLogout(userData?.user_id)
        } else {
            setShowSidebar(false)
            setShowContentScreen(true);
            setSideScreen(page);
            handleRateClick()
        }
    }

    const handleClickLogout = async (userId) => {
        await userLogoutService(userId)
        setShowSidebar(false)
        onClose();
        window.location.href = "/"
        // router.push('/')
    }

    const hnadleClickUserCart = () => {
        setSideScreen('');
        setShowSidebar(false);
        onClose();
        router.push('/user-cart');
    }

    const hnadleClickMyBookings = () => {
        setSideScreen('');
        setShowSidebar(false);
        onClose();
        router.push('/mybookings');
    }

    const handleClickAppointment = () => {
        setSideScreen('');
        setShowSidebar(false);
        onClose();
        router.push('/myappointment');
    }

    const handleClickUserAddres = () => {
        setSideScreen('');
        setShowSidebar(false);
        onClose();
        router.push('/user-address');
    }

    const handleRateClick = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
    };

    // const showSidebarDrawer = () => {
    //     // setSidebarOpen(true);
    // };

    const onSidebarClose = () => {
        setSidebarOpen(false);
    };

    const onCategoryClick = (category) => {
        console.log("onCategoryClick===>",category)
        // router.push(`/user-services/search?label=${category}`)
        const link = `/search?category=${category}`
        window.location.href = link
        // window.open(link, '_blank');
        setShowDropdown(false)
    }
    const removeCalenderActiveClass = () => {
        var classNone = document.querySelectorAll('.left-menu-tab ul li');
        var classNone2 = document.querySelectorAll('.right-content-tab > div');
        for (let index = 0; index < classNone.length; index++) {
            classNone[index].classList.remove('active');
            classNone2[index].style.display = "none";
        }
    }
    const showCustomTab = (e, index) => {
        removeCalenderActiveClass();
        document.getElementById('right-content-tab-' + index).style.display = "block";
        e.target.classList.add('active');
    }

    const finalItem = [
        getItem('Service Categories', 'sub1', <AppstoreOutlined />, items),
        getItem(<a href="/" rel="noopener noreferrer">Home </a>,
            'link',
            // <LinkOutlined />,
        ),
        getItem(<a href="/about" rel="noopener noreferrer"> About</a>,
            'link',
            // <LinkOutlined />,
        ),
        getItem(<a href="/contact" rel="noopener noreferrer"> Contact</a>,
            'link',
            // <LinkOutlined />,
        ),
        getItem(
            <>
                {userInfo?.userName && userInfo?.userRole === "vendor" ? <>

                    <span
                        className="biz-common-btn-2"
                        style={{ minWidth: "295px" }}
                        onClick={() => { window.location = 'vendor/profile' }}
                    >
                        <strong style={{ width: "260px", textAlign: "center" }}>
                            {'Business-' + userInfo?.userName}
                        </strong>
                    </span>
                </> : <>
                    <span type='primary'
                        onClick={() => { window.location = '/vendor/login' }}
                        className="biz-common-btn-2"
                        style={{ minWidth: "165px" }}
                    >
                        Business Login
                    </span>
                </>}
            </>
        ),
    ];
    return (
        <>
            <Spin style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} spinning={isLoading}>
                <div className='biz-container'>

                    <CustomHeader>

                        <HeadRow className='HeadRow' span={24} style={{ display: 'flex', fontSize: '16px', height: '100%', width: '100%' }}>
                            <Col style={{ height: '80%', display: 'flex', alignItems: 'center', gap: '5%' }}>

                                <Image className='BurgerMenu'
                                    src={BurgerMenu}
                                    style={{ height: '100%', width: 'auto', cursor: 'pointer' }}
                                    onClick={toggleMobileDropdown}
                                />

                                <Image className='Logo brand-logo'
                                    src={BookableBizLogo}
                                    onClick={() => router.push('/')}
                                    alt={'Brand Logo'}
                                    preview={false}
                                    style={{height:'auto'}}

                                />

                                <Image className='LogoMark'
                                    src={BookableBizLogoMark}
                                    onClick={() => router.push('/')}
                                    alt={'Brand Logo Mark'}
                                    preview={false}
                                    style={{ cursor: 'pointer' }}
                                />

                                <div className="menuButton" style={{ position: 'relative', height: '100%' }}>
                                    <Button
                                        onClick={toggleDropdown}
                                        // onBlur={hide}
                                        style={{ width: 'auto', padding: 'auto', cursor: 'pointer', borderRadius: '5px', border: '1px solid #F2F1F0', color: '#fff', background: 'transparent', margin: 'auto' }}
                                        className="business-login-button"
                                    >
                                        Service categories
                                        <DownOutlined style={{ marginLeft: '5px', fontSize: '13px' }} />
                                    </Button>
                                </div>
                            </Col>

                            <nav className='Nav' style={{}}>
                                <ul className='home-page-menu'>
                                    <button
                                        style={{
                                            padding: '6px ',
                                            borderRadius: '5px',
                                            border: 'none',
                                            maxHeight: '2em', position: 'relative',
                                            color: '#fff', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                                            fontSize: '80%', background: 'green', cursor: 'pointer'
                                        }}
                                        className='business-login-button NavLinks'
                                        onClick={() => { window.open('https://bookablebiz.net/travel-2') }}
                                    >
                                        TRAVEL
                                        <Image src={Plane} style={{ position: 'absolute', left: '.0rem' }} />
                                    </button>
                                    <span className='NavLinks' style={{ color: '#72959A', cursor: 'pointer' }} onClick={() => router.push('/')}><strong>Home</strong></span>
                                    <span className='NavLinks' style={{ color: '#72959A', cursor: 'pointer' }} onClick={() => router.push('/about')}><strong>About</strong></span>
                                    <span className='NavLinks' style={{ color: '#72959A', cursor: 'pointer' }} onClick={() => router.push('/contact')}><strong>Contact</strong></span>


                                    <button
                                        className="business-login-button"
                                        style={{
                                            padding: '4px 8px',
                                            borderRadius: '5px',
                                            border: 'none',
                                            maxHeight: '2em', position: 'relative',
                                            color: '#fff', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                                            fontSize: '12px', background: 'none', cursor: 'pointer'
                                        }}
                                        onClick={() => { router.push('/user-cart') }}
                                    >
                                        <Image src={CartIcon} style={{ width: '1.2rem', height: 'auto' }} />

                                        {cartCount ? <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '1.4rem', height: '1.4rem', background: '#ED510C', position: 'absolute', right: '0px', top: '-4px', borderRadius: '50%' }}>{cartCount}</Col> : null}

                                    </button>

                                    {userInfo?.userName && userInfo?.userRole === "user"
                                        ? <>
                                            <span
                                                className="biz-common-btn"
                                                onClick={handleLogin}
                                                style={{ minWidth: "fit-content", fontSize: '14px' }}
                                            >
                                                <strong>
                                                    {userInfo?.userName.split(" ")?.[0]}
                                                </strong>
                                                <span style={{ right: '4px', color: '#ffffff', cursor: 'pointer' }} >
                                                    {(userInfo?.userName && userInfo?.userRole === "user") ?
                                                        (showSidebar) ? <AlignRightOutlined /> : <CaretDownOutlined /> : null
                                                    }
                                                </span>
                                            </span>

                                        </>
                                        : <>
                                            {userInfo?.userName && userInfo?.userRole === "vendor" ? <>
                                                  <span
                                                     className={`biz-common-btn-2 hidden-mobile ${isDisabled ? 'disabled red-blocked-cursor' : ''}`}
                                                     style={vendorButtonStyles}
                                                     onClick={handleVendorClick}
                                                    >
                                                <strong style={{ width: "fit-content", textAlign: "center" }}>
                                                {'Business-' + userInfo?.userName}
                                                   </strong>
                                                 </span>

                                                <span
                                                    className="biz-common-btn-2 show-mobile"
                                                    style={{ minWidth: "40px" }}
                                                    onClick={() => localStorage.getItem('redirect') !== 'dashboard' ? router.replace('/vendor/add-info') : router.replace('/vendor/profile')}
                                                >
                                                    <UserOutlined />
                                                </span>
                                            </> : <>
                                                <span
                                                    className="biz-common-btn"
                                                    style={{ minWidth: "fit-content", fontSize: '14px' }}
                                                    onClick={handleLogin}
                                                >
                                                    <strong>
                                                        Login
                                                    </strong>

                                                </span>


                                                <span type='primary'
                                                    onClick={() => router.push('/vendor/login')}
                                                    className="biz-common-btn-2 hidden-mobile"
                                                    style={{ minWidth: "fit-content", fontSize: '14px' }}
                                                >
                                                    Business Login
                                                </span>
                                            </>}

                                        </>
                                    }
                                </ul>
                            </nav>
                        </HeadRow>
                    </CustomHeader>

                </div>

                {/* // --------- *********** AntD mobile navigation added by Ankur ***************-------------// */}
                {MobileMenu && (

                    <Row style={{ transition: 'all 0.3s', width: '100%', margin: 'auto', left: '0', zIndex: '1000000', position: 'absolute', boxShadow: '-6px 0 16px 0 rgba(0, 0, 0, 0.08), -3px 0 6px -4px rgba(0, 0, 0, 0.12), -9px 0 28px 8px rgba(0, 0, 0, 0.05' }}>

                        <Col span={24} style={{ margin: 0, height: "auto", background: '#F2F1F0', width: '100%', zIndex: '1000', }} >
                            <div id='drop-down-menu' ref={dropdownRefMenu}>
                                <Menu
                                    style={{ width: '100%', padding: '10px' }}
                                    mode="inline"
                                    theme="light"
                                    items={finalItem}
                                />
                            </div>
                        </Col>
                        <Col className='class="ant-drawer-mask' style={{
                            position: 'absolute',
                            inset: '0',
                            height: '100vh',
                            zIndex: '1',
                            background: 'rgba(0, 0, 0, 0.45)',
                            pointerEvents: 'auto',
                        }}>
                        </Col>
                    </Row>


                )}

                {showDropdown && (
                    <>
                        <div className='drop-down-menu-tab' id='drop-down-menu-tab' ref={dropdownRef}>
                            <div className='left-menu-tab'>
                                <ul>
                                    {industryData?.map((item, index) => {
                                        return (<>
                                            <li onClick={(e) => showCustomTab(e, index)} className={index === 0 ? 'active' : ''}>{item?.industry} <FaAngleRight style={{ float: "right", position: "relative", top: "7px" }} /></li>
                                        </>)
                                    })}
                                </ul>
                            </div>
                            <div className='right-content-tab'>

                                {industryData?.map((item, index) => {
                                    const titles = item.titles.split(',');
                                    return (<>
                                        <div id={'right-content-tab-' + index} style={index === 0 ? { display: "block" } : { display: "none" }}>
                                            <h4>{item?.industry} </h4>
                                            <div className='flex-menu-tab'>
                                                {titles?.map((title, index) => {
                                                    return (<div className='biz-tab-list' onClick={(e) => { onCategoryClick(title) }} key={index}>{title.trim()}</div>)
                                                })}
                                            </div>
                                        </div>
                                    </>);
                                })}

                            </div>


                        </div>
                    </>

                )}

                <Drawer width={350} closable={true} onClose={onSidebarClose} open={showSidebar} style={{ display: 'flex', justifyContent: 'end', paddingTop: '70px', width: '100%' }}>

                    <Col span={24} ref={ref} style={{ height: "auto", width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }} >

                        <StyledSideBarText onClick={() => { menuItemClick("profile") }} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}  > <Image src={profileLogo} /> My profile</StyledSideBarText>
                        <StyledSideBarText onClick={hnadleClickMyBookings} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}> <Image src={bookingsIcon} /> My Bookings</StyledSideBarText>
                        <StyledSideBarText onClick={handleClickAppointment} style={{ display: 'flex', alignItems: 'center', gap: '10px' }} > <Image src={calenderIcon} /> My Appointments</StyledSideBarText>
                        <StyledSideBarText onClick={() => { menuItemClick("packages") }} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}> <Image src={packagesIcon} /> My Packages</StyledSideBarText>
                        <StyledSideBarText onClick={() => { menuItemClick("favourit") }} style={{ display: 'flex', alignItems: 'center', gap: '10px' }} > <Image src={favouritIcon} /> Favourites</StyledSideBarText>
                        {/* <StyledSideBarText onClick={ () => { menuItemClick("message") }} > <Image src={bookingsIcon} /> Messages</StyledSideBarText> */}
                        <StyledSideBarText onClick={handleClickUserAddres} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}> <Image src={addressIcon} /> Address</StyledSideBarText>
                        <StyledSideBarText onClick={() => {
                            setSideScreen('');
                            setShowSidebar(false);
                            router.push('user-payment');
                        }} style={{ display: 'flex', alignItems: 'center', gap: '10px' }} > <Image src={paymentIcon} /> Payments</StyledSideBarText>
                        {/* <StyledSideBarText onClick={ () => { menuItemClick("setting") }} > <Image src={bookingsIcon} /> Setting</StyledSideBarText> */}
                        <StyledSideBarText onClick={hnadleClickUserCart} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}> <Image src={bookingsIcon} /> Cart</StyledSideBarText>
                        <StyledSideBarText onClick={() => { menuItemClick("logout") }} style={{ display: 'flex', alignItems: 'center', gap: '10px' }} > <Image src={logoutIcon} /> Log out</StyledSideBarText>

                    </Col>

                </Drawer>

                {showContentScreen && (
                    <CustomSideDrawer
                        style={{ paddingTop: '70px' }}
                        title={null}
                        closeIcon={null}
                        placement="right"
                        size={'large'}
                        onClose={onClose}
                        open={open}
                        width={(sideScreen === 'favourit') ? 600 : 600}
                        closable={true}

                    >
                        {/* <Row style={{ display:'flex', justifyContent:'end', position:'absolute', right: 0, top: 65 }} onClick={handleHeaderClick}> */}
                        <Col span={24} style={{ minHeight: "500px", background: '#FFFFFF' }} >
                            {(sideScreen === 'profile') ? <UserProfile /> :
                                (sideScreen === 'packages') ? <UserPackages setOpen={setOpen} /> :
                                    (sideScreen === 'favourit') ? <UserFavourites setShowContentScreen={setShowContentScreen} /> :
                                        (sideScreen === 'payment') ? <UserPayment /> :
                                            (sideScreen === 'setting') ? <UserSettings /> : null
                            }
                        </Col>
                        {/* </Row> */}
                    </CustomSideDrawer>
                )}
            </Spin>
        </>
    )
};

export default Header;