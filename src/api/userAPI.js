
import { APIInstance } from './apiInstance';

export const instance = new APIInstance({
    baseURL: 'user/show'
});

export const updateInstance = new APIInstance({
    baseURL: 'user/update'
})


const api = instance.api;

const updateApi = updateInstance.api


export const showUser = () => {
    return api.get()        
    };

export const updateUser = (payload)=>{
    return updateApi.put(updateApi.baseURL,payload)
}
