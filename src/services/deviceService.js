import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "https://resolved-api.herokuapp.com/api/devices/";

// Get list of all devices
const getDevices = () => {
    return axios.get(API_URL + "all", {headers: authHeader()});
}

// Get device info
const getDeviceInfo = (id) => {
    return axios.get(API_URL + "details" + id, {headers: authHeader()});
}

// Get user's device
const getUserDevices = () => {
    return axios.get(API_URL + "list", {headers: authHeader()});
}

// Add device to account
const addDeviceToAccount = (deviceId) => {
    return axios.post(API_URL + "list/add" + deviceId, {headers: authHeader()});
}

// Remove device from account
const deleteDeviceFromAccount = (deviceId) => {
    return axios.delete(API_URL + "list/remove" + deviceId, {headers: authHeader()});
}

// Add new device
const addDevice = (type, name) => {
    return axios.post(API_URL,{type, name}, {headers: authHeader()});
}

//Edit device
const editDevice = (type, name, id) => {
    return axios.put(API_URL + `${id}`, {type, name}, {headers: authHeader()});
}

// Delete device
const deleteDevice = (id) => {
    return axios.delete(API_URL + `${id}`, {headers: authHeader()});
}

const DeviceService = {
    getDevices,
    getDeviceInfo,
    getUserDevices,
    addDeviceToAccount,
    deleteDeviceFromAccount,
    addDevice,
    editDevice,
    deleteDevice
};

export default DeviceService;