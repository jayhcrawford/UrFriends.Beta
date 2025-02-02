import { useDispatch, useSelector } from "react-redux";
import Tier from "./Tier.jsx";
import { Link } from "react-router";
import { setVisibleModal } from "../features/modalSlice.js";
import LinkBar from "./LinkBar.jsx";


//export
function Phonebook() {
  const dispatch = useDispatch();
  const phonebookStore = useSelector((state) => state.phonebook.phonebook);
  const tiersStore = useSelector((state) => state.phonebook.tiers);
  const settingsStore = useSelector((state) => state.login.settings);

  //render
  if (!tiersStore || !phonebookStore) {
    return null;
  }
  return (
    <>
      <div>
        <LinkBar page="phonebook" />

        {/*contacts-list section is the flex container for contact-cards-div and any content below the header*/}
        <section id="contacts-list">
          {/*contact-cards-div is where the tiers and contact cards will be displayed.*/}
          <div id="contact-cards-div">
            {tiersStore.map((tier) => {
              return (
                <article key={tier} className="tier-and-contacts-container">
                  <Tier tierName={tier} />
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}

export default Phonebook;
