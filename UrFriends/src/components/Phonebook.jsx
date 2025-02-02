import { useDispatch, useSelector } from "react-redux";
import Tier from "./Tier.jsx";
import { Link } from "react-router";
import { setVisibleModal } from "../features/modalSlice.js";

//static; passed to HeroButton as props
const AddUserIcon = () => {
  return <i className="fa-solid fa-user-plus fa-3x"></i>;
};
//static; passed to HeroButton as props
const BulkAddIcon = () => {
  return <i className="fa-regular fa-address-book fa-3x"></i>;
};
//static; passed to HeroButton as props
const EditTiersIcon = () => {
  return <i className="fa-solid fa-users-gear fa-3x"></i>;
};
//static
export const HeroButton = (props) => {
  return (
    <button className="hero-btn" onClick={props.clickHandler}>
      <div className="hero-btn-content">
        <div className="action-button-graphic">{props.icon}</div>
        {props.text}
      </div>
    </button>
  );
};

//export
function Phonebook() {
  const dispatch = useDispatch();
  const phonebookStore = useSelector((state) => state.phonebook.phonebook);
  const tiersStore = useSelector((state) => state.phonebook.tiers);
  const settingsStore = useSelector((state) => state.login.settings);

  const addContact = () => {
    dispatch(setVisibleModal({ modalContentType: "add-contact" }));
  };

  //render
  if (!tiersStore || !phonebookStore) {
    return null;
  }
  return (
    <>
      <div>
        <HeroButton
          clickHandler={addContact}
          icon={<AddUserIcon />}
          text="Add Contact"
        />
        <Link to="/editTiers">
          <HeroButton
            clickHandler={null}
            icon={<EditTiersIcon />}
            text="Edit Tiers"
          />
        </Link>
        <Link to="/bulkAdd">
          <HeroButton icon={<BulkAddIcon />} text="Bulk Add" />
        </Link>

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
