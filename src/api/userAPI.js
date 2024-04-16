import { useAPI } from './apiInstance'; 

const UserAPI = () => {
    const { api } = useAPI();
    console.log("api");
    const showOneUser = async (payload) => {
        console.log("Userapi",payload);
        const response = await api.get(`user/show?userId=${payload}`);
        return response
    };
    const updateUser =async (UserData) => {
        return await api.put('user/update', UserData);
    };

    return {
        updateUser,
        showOneUser
    };
};

export default UserAPI;
