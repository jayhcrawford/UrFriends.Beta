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
  try {
    const result = await axios.post(
      "http://localhost:3000/api/phonebook/",
      body
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const deleteContact = async (body) => {
  try {
    const result = await axios.delete(
      `http://localhost:3000/api/phonebook/${body}`
    );
    return result;
  } catch (error) {
    return error;
  }
};

//this adds a new conversation to a contact
export const patchConversation = async (body) => {
  try {
    const result = await axios.patch(
      `http://localhost:3000/api/phonebook/patchConversation`,
      body
    );
    return result;
  } catch (error) {
    return error;
  }
};

//update an existing conversation (subdocument 'requires' MongoID)
export const updateConversation = async (body) => {
  try {
    const result = await axios.patch(
      `http://localhost:3000/api/phonebook/updateConversation`,
      body
    );
    return result;
  } catch (error) {
    return error;
  }
};


//change contact(s?) tier(s?)
export const patchTiers = async (body) => {
  const result = await axios.patch(
    `http://localhost:3000/api/phonebook/patchTier`,
    body
  );
};
