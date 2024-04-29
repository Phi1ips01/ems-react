import { useAPI } from "./apiInstance";

const AdminAPI = () => {
  const { api } = useAPI();
  const showAllAdmin = async (column = "", keyword = "") => {
    try {
      return await api.get(`admin/showall?column=${column}&keyword=${keyword}`);
    } catch (error) {
      console.log(error);
    }
  };
  const showOneAdmin = async (payload) => {
    const response = await api.get(`admin/showOne?userId=${payload}`);
    return response;
  };
  const updateAdmin = async (payload) => {
    const response = await api.put("admin/update", payload);
    return response;
  };
  const addAdmin = async (payload) => {
    const response = await api.post("admin/add", payload);
    return response;
  };
  const deleteAdmin = async (payload) => {
    return await api.delete("admin/delete", { data: payload });
  };
  const showAllMessagesApi = async () => {
    const response = await api.get("admin/showAllMessages");
    return response;
  };
  const updateMessageReplyApi = async ({ id, ...payload }) => {
    const response = await api.put(`admin/leaveReply?_id=${id}`, payload);
    return response;
  };
  const showAllDeptsApi = async () => {
    const response = await api.get("admin/getDepts");
    return response;
  };
  const addNewDeptApi = async (payload) => {
    try {
      const response = await api.post("admin/addDepts", payload);
      return response;
    } catch (error) {
      alert("this Dept already exist");
    }
  };
  return {
    showAllAdmin,
    updateAdmin,
    addAdmin,
    deleteAdmin,
    showOneAdmin,
    showAllMessagesApi,
    updateMessageReplyApi,
    showAllDeptsApi,
    addNewDeptApi,
  };
};

export default AdminAPI;
