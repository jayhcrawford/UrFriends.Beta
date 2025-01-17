import axios from "axios";

export const postContact = async (body) => {
  console.log("contact body in services: ", body)
  const result = await axios.post('http://localhost:3000/api/phonebook/', body)
  console.log(result)
}
