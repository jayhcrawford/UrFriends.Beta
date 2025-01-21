import axios from "axios";

export const login = async (body) => {
  const result = await axios.post('http://localhost:3000/api/login/', body)
  return result
}