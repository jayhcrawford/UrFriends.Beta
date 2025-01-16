import { useDispatch } from "react-redux";
import Tier from "./Tier.jsx";
import { setVisibleNewPersonModal } from "../features/newPersonModalSlice.js";


function Phonebook(props) {
  const dispatch = useDispatch();

  const addContact = () => {
    dispatch(setVisibleNewPersonModal())
  }

  const editTiers = () => {
    console.log("edit tiers")
  }


  //render
  if (!props.people) {
    return null;
  }
  return (
    <>
      <div>
        <button onClick={addContact}>Add Contact</button>
        <button onClick={editTiers}>Edit Tiers</button>
        {/*contacts-list section is the flex container for contact-cards-div and any content below the header*/}
        <section id="contacts-list">
          {/*contact-cards-div is where the tiers and contact cards will be displayed.*/}
          <div id="contact-cards-div">
            {props.tiers.map((tier) => {
              return (
                <article key={tier} className="tier-and-contacts-container">
                  <Tier tierName={tier} people={props.people} />
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
