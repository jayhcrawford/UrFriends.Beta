import axios from "axios";

export const getUsersPhonebook = async (body) => {
  try {
    const result = await axios.post(
      `http://localhost:3000/api/phonebook/getcontent`,
      body
    );
    //organize the raw data into tieredPhonebook
    let tieredPhonebook = {};
    result.data.phonebook.map((person) => {
      if (Object.hasOwn(tieredPhonebook, `${person.tier}`)) {
        tieredPhonebook[person.tier].push(person);
      } else {
        tieredPhonebook[person.tier] = [person];
      }
    });

    const response = {
      phonebook: tieredPhonebook,
      settings: result.data.settings,
    };
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const postContact = async (body) => {
  console.log("contact body in services: ", body);
  const result = await axios.post("http://localhost:3000/api/phonebook/", body);
  console.log(result);
};

export const patchConversation = async (body) => {
  console.log(body);
  const result = await axios.patch(
    `http://localhost:3000/api/phonebook/patchConversation`,
    body
  );
  console.log(result);
};
