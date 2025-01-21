import axios from "axios";

export const postContact = async (body) => {
  console.log("contact body in services: ", body)
  const result = await axios.post('http://localhost:3000/api/phonebook/', body)
  console.log(result)
}

export const patchConversation = async (body) => {
  console.log(body)
  const result = await axios.patch(`http://localhost:3000/api/phonebook/patchConversation`, body)
  console.log(result)
}