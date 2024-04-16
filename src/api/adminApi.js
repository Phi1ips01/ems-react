import { useAPI } from './apiInstance'; 

const AdminAPI = () => {
    const { api } = useAPI();
    console.log("api");
    const showAllAdmin = async() => {
        return await api.get('admin/showall')        
    };
    const showOneAdmin = async (payload) => {
        console.log("Userapi",payload);
        const response = await api.get(`admin/showOne?userId=${payload}`);
        return response
    };
    const updateAdmin = async(payload)=>{
        const response = await api.put('admin/update',payload)
        console.log("admin api update", response.data.response)
        return response
    }
    const addAdmin = async (payload) => {
        console.log("payload",payload)
        const response =await api.post('admin/add',payload)
        console.log("payload response",response)
        return response
    }
    const deleteAdmin = (payload) => {
        console.log("payload",payload)
        return api.delete('admin/delete', {data: payload })
    }
    return {
        showAllAdmin,
        updateAdmin,
        addAdmin,
        deleteAdmin,
        showOneAdmin
    };
}


export default AdminAPI;
