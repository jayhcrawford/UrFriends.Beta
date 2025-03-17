import axios from "axios";

//update UserData; pass jwt token and new settings object thru body
export const patchSettings = async (body) => {
  try {
    const result = await axios.patch(
      `http://localhost:3000/api/settings`,
      body
    );
    return result;
  } catch (error) {
    console.log(error);
    return { error: "There was an error updating the settings" };
  }
};
