import axios from "axios";

axios.defaults.withCredentials = true;

export const login = async (body) => {
  const result = await axios.post('http://localhost:3000/api/login/', body)
  console.log(result)
  return result
}
