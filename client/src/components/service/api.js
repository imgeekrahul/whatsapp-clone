import axios from 'axios'

const url = 'http://localhost:8000';

export const addUser = async (data) => {
    try {
        await axios.post(`${url}/add`, data);
    } catch(err) {
        console.log("Error while adding an user", err)
    } 
}

export const getUsers = async () => {
    try {
        let response = await axios.get(`${url}/users`)
        console.log(response);
        return response.data;
    } catch(err) {
        console.log("Error while calling getUsers api ", err.message);
    }
}

export const setConversation = async (data) => {
    try {
        await axios.post(`${url}/conversation/add`, data)
    } catch(err) {
        console.log("Error while calling setConversation API ", err.message);
    }
}

export const getConversation = async (data) => {
    try {
        let response = await axios.post(`${url}/conversation/get`, data)
        return response.data
    } catch(err) {
        console.log("Error while calling getConversation API ", err.message);
    }
}

export const newMessage = async (data) => {
    try {
        await axios.post(`${url}/message/add`, data);
    }catch (err) {
        console.log("Error while calling newMessage API ", err.message);
    }
}

export const getMessage = async (id) => {
    try {
        let message = await axios.get(`${url}/message/get/${id}`);
        return message.data;
    }catch (err) {
        console.log("Error while calling getMessage API ", err.message);
    }
}

export const uploadFile = async (data) => {
    try {
        console.log("File data: ", data)
        return await axios.post(`${url}/file/upload`, data);
    } catch(err) {
        console.log("Error while uploading a file ", err.message)
    }
}
