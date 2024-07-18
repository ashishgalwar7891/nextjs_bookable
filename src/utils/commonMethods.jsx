import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

export const setCookie = (key, value, path) => {
  let encrypted = CryptoJS.AES.encrypt(value, 'encryptedstring');
  Cookies.set(key, encrypted.toString(), { expires: 7 });
  // localStorage.setItem(key, encrypted.toString());
};

export const getCookie = (key) => {
  // For Local Storage
  // let encryptedToken = localStorage.getItem(key) || '';
  let encryptedToken = Cookies.get(key) || '';
  let decrypted = CryptoJS.AES.decrypt(
    encryptedToken,
    'encryptedstring'
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
};

export const eraseCookieByKey = (key) => {
  localStorage.removeItem(key);
  Cookies.remove(key);
};

export const eraseCookieAll = () => {
  localStorage.clear();
  sessionStorage.clear();

  const cookies = Cookies.get();
  for (const cookie in cookies) {
    Cookies.remove(cookie); 
  }
  setCookie('');
};

export const getFirstDateofSelection  = (Data) => {
    const {currDate, startdayName, excludedDays} = modalData;
    return currDate; 
};

export const getDaysOfWeekBetweenDates = (sDate, eDate) => {
  const startDate = new Date(sDate)
  const endDate = new Date(eDate);
  
  endDate.setDate(endDate.getDate() + 1);
  
  const daysOfWeek = [];
  
  let i = 0;
  
  while (i < 7 && startDate < endDate) {
    daysOfWeek.push(startDate.getDay());
    startDate.setDate(startDate.getDate() + 1);
    i++;
  }

  return daysOfWeek;
};


export const removeUndefinedValuesFromObject = (obj)=> {
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);
  return obj;
};

