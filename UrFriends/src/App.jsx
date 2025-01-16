import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header";
import Phonebook from "./components/Phonebook";
import Modal from "./components/Modal";
import Login from "./components/Login";
import SideMenu from "./components/SideMenu";
import NewPersonModal from "./components/NewPersonModal";
import Footer from "./components/Footer";

import { login, logout } from "./features/loginSlice";
import { hideSideMenu } from "./features/sideMenuSlice";

function App() {
  const loggedIn = useSelector((state) => state.login.user);
  const [phonebook, setPhonebook] = useState(null);
  const [tiers, setTiers] = useState([]);

  const dispatch = useDispatch();

  if (!loggedIn) {
    //TODO: verify that the user's credentials are valid and return the user ID
    if (localStorage.getItem("loggedIn")) {
      const localToken = JSON.parse(localStorage.getItem("loggedIn"));
      dispatch(login({ user: localToken }));
    }
  }

  //TODO: remove redux architecture related to previously storing phonebook in state


  //is the user logged in?
  //TODO: implement loginSlice
  useEffect(() => {
    //get server data
    axios
      .get(`http://localhost:3000/api/phonebook/${loggedIn.user.id}`)
      .then((response) => {
        //this works if the user data is stored as one long string... don't think it'll work
        //being fetched from api/phonebook/string
        //const result = JSON.parse(response.data[0].phonebookData);

        //This works if we fetch all of the phonebook entries from one massive collection. Not ideal. Works for beta.
        let tieredPhonebook = {};
        response.data.map((person) => {
          if (Object.hasOwn(tieredPhonebook, `${person.tier}`)) {
            tieredPhonebook[person.tier].push(person);
          } else {
            tieredPhonebook[person.tier] = [person];
          }
        });

        const result = tieredPhonebook;
        return result;
      })
      .then((response) => {
        setPhonebook(response);
        let tiersArray = Object.keys(response);
        setTiers(tiersArray);
      });
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    const password = event.target.password.value;
    const username = event.target.username.value;

    try {
      const result = await axios.post("http://localhost:3000/api/login", {
        username: username,
        password: password,
      });
      dispatch(login({ user: result.data }));
      localStorage.setItem("loggedIn", JSON.stringify(result.data));
    } catch (error) {
      console.log(error);
    }

    event.target.password.value = "";
    event.target.username.value = "";
  };

  const handleLogOut = () => {
    dispatch(hideSideMenu());
    dispatch(logout());
  };

  if (!loggedIn) {
    return <Login handleLogin={handleLogin} />;
  }

  return (
    <>
      <NewPersonModal people={phonebook} setPhonebook={setPhonebook} />
      <SideMenu logout={handleLogOut} />
      <Modal />
      <Header />
      <p></p>
      <Phonebook people={phonebook} tiers={tiers} />
      <Footer />
    </>
  );
}

export default App;
