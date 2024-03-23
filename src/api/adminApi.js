
import { APIInstance } from './apiInstance';

export const instance = new APIInstance({
    baseURL: 'admin/showall'
});

export const updateInstance = new APIInstance({
    baseURL: 'admin/update'
})
export const postInstance = new APIInstance({
    baseURL: 'admin/add'
});
export const deleteInstance = new APIInstance({
    baseURL: 'admin/delete'
})

const api = instance.api;
const postApi = postInstance.api
const deleteApi = deleteInstance.api
const updateApi = updateInstance.api

export const showAllAdmin = () => {
    return api.get()        
};

export const addAdmin = async (payload) => {
    console.log("payload",payload)
    const response =await postApi.post(postApi.baseURL,payload)
    console.log("payload response",response)
    return response
}

export const deleteAdmin = (payload) => {
    console.log("payload",payload)
    return deleteApi.delete(deleteApi.baseURL, {data: payload })
}

export const updateAdmin = async (payload)=>{
    const response = await updateApi.put(updateApi.baseURL,payload)
    console.log("admin api update", response.data.response)
    return response.data.response
}
