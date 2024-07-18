export const routes = {
    Auth_ROUTES: {
        LOGIN_ROUTE: '/login',
        FORGOT_PASSWORD: '/forgot-password',
        RESET_PASSWORD: '/reset-password',
        // LOGOUT_ROUTE: '/',
        SIGNUP: '/register',
        CREATE_PASSWORD: '/user-password',
        
        V_LOGIN_ROUTE: '/vendor/login',
        V_FORGOT_PASSWORD: '/vendor/forgot-password',
        V_RESET_PASSWORD: '/vendor/reset-password',
        V_LOGOUT_ROUTE: '/vendor/login',
        V_SIGNUP: '/vendor/register',
        V_CREATE_PASSWORD: '/vendor/vendor-password',
        PAYMENT: '/vendor/payment',
        V_ADD_INFO: '/vendor/add-info'
    },

    SIDEBAR: {
        PROFILE_DIRECT: '/vendor/profile/redirect-subscription',
        PROFILE: '/vendor/profile',
        LOCATION: '/vendor/location',
        RESOURCES: '/vendor/resources',
        SERVICES: '/vendor/services',
        APPOINTMENTS: '/vendor/appointments',
        BOOKINGS: '/vendor/bookings',
        PAYOUTS: '/vendor/payouts',
        LOGOUT: '/vendor/login',
        SETTINGS:'/vendor/settings',
        Role_Permissions:'/vendor/team-management/role-permissions',
        Team_Members:'/vendor/team-management/team-members',
        Customer_Booking:'/vendor/Customer-Booking'
    },

    VENDORS: {
        PROFILE_DIRECT: '/vendor/profile/redirect-subscription',
        PROFILE: '/vendor/profile',
        LOCATION: '/vendor/location',
        RESOURCES: '/vendor/resources',
        SERVICES: '/vendor/services',
        APPOINTMENTS:'/vendor/appointments',
        BOOKINGS:'/vendor/bookings',
        BIZ_BOOKING_DETAIL:'/vendor/booking-detail',
        PAYOUTS:'/vendor/payouts',
        PAYOUTS_INFO:'/vendor/payouts/info',
        SETTINGS:'/vendor/settings',
        EDIT_PERSONAL_INFO:'/vendor/profile/edit/personal',
        EDIT_BUSINESS_INFO:'/vendor/profile/edit/business-info',
        Role_Permissions:'/vendor/team-management/role-permissions',
        Team_Members:'/vendor/team-management/team-members',
        Customer_Booking:'/vendor/Customer-Booking'
    },

    USER: {
        HOME: '/',
        SERVICES: '/user-services',
        SERVICE_DETAILS: '/servicedetails/[serviceId]/[locationId]',
        BIZ_SERVICE_DETAILS: '/service-detail',
        BIZ_PACKAGE_DETAILS: '/package-detail',
        BIZ_USER_PAYMENT: '/user-payment',
        USER_ADDRESS: '/user-address',
        USER_CART:'/user-cart',
        STORE_FRONT:'/store-front',
        FAQ:'/faqs',
        SEARCH:'/search',
        ABOUT_US:'/about',
        PRIVACY_POLICY:'/policy',
        MARKETPLACE_GUIDE:'/marketplace-guide',
        TERMS_OF_SERVICES:'/terms-of-service',
        CONTACT:'/contact',
        THANKYOU:'/thankyou',
        BOOKINGS: '/bookings',
        MYBOOKINGS: '/mybookings',
        RESCHEDULE_PAY: '/pay',
        BUSINESS: '/business',
        PACKAGE_DETAILS: '/package-details',
        RESCHEDULE_BOOKINGS: '/reschedule/bookings'
    },
}