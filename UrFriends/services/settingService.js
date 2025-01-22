import axios from "axios";

//update UserData; pass jwt token and new settings object thru body
export const patchSettings = async (body) => {
  console.log(body);
  const result = await axios.patch(
    `http://localhost:3000/api/settings`,
    body
  );
  console.log(result);
};