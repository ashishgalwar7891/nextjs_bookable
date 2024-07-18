import React, { Fragment, createContext, useContext, useEffect, useRef, useState, } from 'react';
import { Layout, Spin, Col } from 'antd';
// import Sider from 'antd/lib/layout/Sider';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { HeaderTextProvider } from '../../context/HeaderTextContext';
import { routes } from '../../routes';
import AuthHeader from "./CustomHeader/header"
import CustomFooter from "./CustomFooter/footer"
import { CustomContent, CustomHeader, CustomSidebar, MenuCollapse, SecondHeader } from './styledComponent';
import VendorHeader from './vendorHeader/VendorHeader';
import Sidebar from './sidebar';
import UserHeader from './UserHeader';
import { GetCategoryIndustryService } from '@/Services/vendorForms.services';
import MenuHamburger from '../../assets/imgs/icon/MenuHamburger.svg';
import Image from 'next/image';

const { Content } = Layout;
export const VendorPanelTabsContext = createContext([])
export const LayoutContext = createContext();
const CartContext = createContext();
const LayoutMain = ({ children }) => {
    const buttonRef = useRef(null);
    const router = useRouter();
    const pathname = usePathname()
    const [isLoading, setIsLoading] = useState(false);
    const [cartRefresh, setCartRefresh] = useState(true);
    const [headerRefresh, setHeaderRefresh] = useState(true);
    const [activeKey, setActiveKey] = useState('1');
    const [industryData, setindustryData] = useState();
    const [MobileSidebar, setMobileSidebar] = useState(true);
    const Auth_ROUTES = Object.values(routes?.Auth_ROUTES);
    const VENDOR_ROUTES = Object.values(routes?.VENDORS);
    const USER_ROUTES = Object.values(routes?.USER);
    const [SIDEBAR_STATE, SET_SIDEBAR_STATE] = useState(true)

    const [loader, setLoader] = useState(true);
    const [vender_login, set_vender_login] = useState(false);
    const clickHandler = () => {
        router.replace('/vender/login')
    }
    useEffect(() => {
        if (localStorage.getItem('role') == 'vendor') {
            set_vender_login(true)
        } else {
            if (VENDOR_ROUTES.includes(pathname) || pathname.includes("/vendor/location") || pathname.includes("/vendor/resources") || pathname.includes("/vendor/services") || pathname.includes("/vendor/appointments")) {
                router.replace('/vendor/login')
            }
        }
    }, []);
    useEffect(() => {
        (async () => {
            const response = await GetCategoryIndustryService();
            const data = response?.response?.data?.categoriesByIndustry;
            setindustryData(data)
            setCartRefresh(false)
        })();
    }, [headerRefresh]);

    const toggleMobileSidebar = () => {
        setMobileSidebar(!MobileSidebar)
        // setDisplaySidebar(!Display);
    };
    const openNav = (e) => {
        document.getElementById("biz-mySidebar").style.width = "265px";
        document.getElementById("biz-main").style.marginLeft = "265px";
        SET_SIDEBAR_STATE(true);
    }

    const closeNav = (e) => {
        document.getElementById("biz-mySidebar").style.width = "0";
        document.getElementById("biz-main").style.marginLeft = "0";
        SET_SIDEBAR_STATE(false);
    }
    return (
        <Fragment>
            {VENDOR_ROUTES.includes(pathname) || pathname.includes("/vendor/location") || pathname.includes("/vendor/resources") || pathname.includes("/vendor/services") || pathname.includes("/vendor/appointments") || pathname.includes("/vendor/team-management/team-members") ? <>

                {vender_login ? <>
                    <div id="biz-mySidebar" className="biz-sidebar" style={{ width: "265px" }}>
                        <Sidebar MobileSidebar={MobileSidebar} />
                    </div>
                    <div id="biz-main" style={{ marginLeft: "265px" }}  >
                        <SecondHeader style={{ padding: "0px", marginBottom: "15px" }}>
                            <MenuCollapse >
                                {SIDEBAR_STATE ? <Image classNam6e='ChevRight'
                                    src={MenuHamburger}
                                    style={{ cursor: 'pointer', width: '100%' }}
                                    onClick={(e) => closeNav(e)}
                                >
                                </Image> : <>  <Image className='ChevRight'
                                    src={MenuHamburger}
                                    style={{ cursor: 'pointer', width: '100%' }}
                                    onClick={(e) => openNav(e)}
                                >
                                </Image></>}

                            </MenuCollapse>
                        </SecondHeader>
                        {isLoading && headerRefresh ? <Spin /> : children}
                    </div>
                </> : <>
                    <div style={{ textAlign: "center", padding: "120px" }}>
                        <Spin tip="Loading" size="large">
                            <div className="content" />
                        </Spin>
                    </div>
                </>}

            </> : <>
                <LayoutContext.Provider value={{ industryData }}>
                    <Layout style={{ position: 'relative', minHeight: '100%', backgroundColor: '#ffffff !important' }} id='biz-main'>

                        <div className='header-full' id='biz-menu-header'>
                            <CustomHeader>
                                {
                                    Auth_ROUTES.includes(pathname) ? (
                                        <UserHeader cartRefresh={cartRefresh} setCartRefresh={setCartRefresh} />
                                    ) : USER_ROUTES.includes(pathname) || pathname.includes("/servicedetails") || pathname.includes("/user-services") || pathname.includes("/package-details") || pathname.includes("/myappointment") ? (
                                        <UserHeader cartRefresh={cartRefresh} setCartRefresh={setCartRefresh} />
                                    ) : VENDOR_ROUTES.includes(pathname) || pathname.includes("/vendor/changePlan") || pathname.includes("/vendor/resources") || pathname.includes("/vendor/services") || pathname.includes("/vendor/appointments") || pathname.includes("/vendor/bookings") ? (
                                        <VendorHeader cartRefresh={cartRefresh} setCartRefresh={setCartRefresh}/>
                                    ) : ''
                                }
                            </CustomHeader>
                        </div>
                        <Layout style={{ background: 'white !important', display: 'flex', flexDirection: 'column', columnGap: '0' }}>
                            <Layout className="biz-mainhome">
                                <Content
                                    pathname={pathname}
                                    authroutes={Auth_ROUTES}
                                    id="main-layout"
                                >
                                    <VendorPanelTabsContext.Provider value={[activeKey, setActiveKey]}>
                                        <CartContext.Provider value={{ cartRefresh, setCartRefresh, setHeaderRefresh }}>
                                            {isLoading ? <Spin /> : children}
                                        </CartContext.Provider>

                                    </VendorPanelTabsContext.Provider>
                                </Content>

                            </Layout>
                        </Layout>
                        {USER_ROUTES.includes(pathname) || pathname.includes("/package-details") || pathname.includes("/myappointment") || pathname.includes("/vendor/login") || pathname.includes("/login") ? (
                            <CustomFooter />
                        ) :
                            null
                        }
                    </Layout>

                </LayoutContext.Provider>
            </>}


        </Fragment>
    )
}

export default LayoutMain;
export const useCart = () => useContext(CartContext);