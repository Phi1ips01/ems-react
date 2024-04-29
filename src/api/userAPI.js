import { useAPI } from "./apiInstance";

const UserAPI = () => {
  const { api } = useAPI();
  console.log("api");
  const showOneUser = async (payload) => {
    console.log("Userapi", payload);
    const response = await api.get(`user/show?userId=${payload}`);
    return response;
  };
  const updateUser = async (UserData) => {
    return await api.put("user/update", UserData);
  };
  const applyLeaveApi = async (id, payload) => {
    console.log("id");
    const response = await api.post(`user/messageleave?userId=${id}`, payload);
    return response;
  };
  const showOneUserMessageApi = async (id) => {
    console.log("id", id);
    const response = await api.get(`user/show_user_message_leave?userId=${id}`);
    return response;
  };

  return {
    updateUser,
    showOneUser,
    applyLeaveApi,
    showOneUserMessageApi,
  };
};

export default UserAPI;
