import { KEYS } from "../dataKeys";
import { useAPI } from "./apiInstance";

const Login = () => {
  const { api } = useAPI();
  console.log("api");

  const login = async (UserData) => {
    const response = await api.post("login", UserData);
    localStorage.setItem(KEYS.ACCESS_TOKEN, response.data.token);

    return response;
  };
  return { login };
};

export default Login;
