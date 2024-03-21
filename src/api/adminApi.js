
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

export const addAdmin = (payload) =>{
    console.log("payload",payload)
    return postApi.post(postApi.baseURL,payload)
}

export const deleteAdmin = (payload) => {
    console.log("payload",payload)
    return deleteApi.delete(deleteApi.baseURL, { data: payload })
}

export const updateAdmin = (payload)=>{
    return updateApi.put(updateApi.baseURL,payload)
}
