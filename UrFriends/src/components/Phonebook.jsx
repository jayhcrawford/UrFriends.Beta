import Tier from "./Tier.jsx";

function Phonebook(props) {
  //render
  if (!props.people) {
    return null;
  }
  return (
    <>
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
    </>
  );
}

export default Phonebook;
