import { useDispatch, useSelector } from "react-redux";
import Tier from "./Tier.jsx";
import { Link } from "react-router";
import { setVisibleModal } from "../features/modalSlice.js";

function Phonebook(props) {
  const dispatch = useDispatch();
  const tiers = useSelector((state) => state.phonebook.tiers);

  const addContact = () => {
    dispatch(setVisibleModal({ modalContentType: "add-contact" }));
  };

  const bulkAdd = () => {
    console.log("bulk add");
  };

  //render
  if (!tiers || !props.people) {
    return null;
  }
  return (
    <>
      <div>
        <button onClick={addContact}>Add Contact</button>
        <Link to="/editTiers">
          <button>Edit Tiers</button>
        </Link>
        <button onClick={bulkAdd}>Bulk Add People</button>
        {/*contacts-list section is the flex container for contact-cards-div and any content below the header*/}
        <section id="contacts-list">
          {/*contact-cards-div is where the tiers and contact cards will be displayed.*/}
          <div id="contact-cards-div">
            {tiers.map((tier) => {
              return (
                <article key={tier} className="tier-and-contacts-container">
                  <Tier
                    settings={props.settings}
                    tierName={tier}
                    people={props.people}
                  />
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
