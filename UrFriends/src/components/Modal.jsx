import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideModal } from "../features/modalSlice";
import ReachOut from "./modal-components/ReachOut";
import ConvoStarters from "./modal-components/ConvoStarters";
import ScheduleConvo from "./modal-components/ScheduleConvo";
import ContactSettings from "./modal-components/ContactSettings";
import TierSettings from "./modal-components/TierSettings";
import ConversationDetails from "./modal-components/ConversationDetails";
import NewPerson from "./modal-components/NewPerson";

const Modal = (props) => {
  const modalVisible = useSelector((state) => state.modal.visible);
  const modalType = useSelector((state) => state.modal.type);
  const conversationTopic = useSelector(
    (state) => state.modal.topic
  );
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideModal());
  };


  /*

        All of this is passed as props to Modal,
        Do I want to put it in the store? More than likely:

        TODO: Pass this stuff thru the store if possible

        people={phonebook}
        setPhonebook={setPhonebook}
        setTiers={setTiers}
        tiers={tiers}

  */

  //render
  if (!modalVisible) {
    return null;
  }
  return (
    <>
      <div className="modal-base-transparency">
        <div className="modal-box">
        <div className="modal-top-bar">
        <button onClick={handleClose}>Close</button>
        </div>
          {modalType == "add-contact" && (
            <NewPerson
              people={props.people}
              setPhonebook={props.setPhonebook}
              setTiers={props.setTiers}
              tiers={props.tiers}
            />
          )}
          {modalType == "we-spoke" && <ReachOut />}
          {modalType == "convo-starters" && <ConvoStarters />}
          {modalType.slice(0, 13) == "schedule-conv" && <ScheduleConvo />}
          {modalType.slice(0, 8) == "settings" && <ContactSettings />}
          {modalType == "tier-settings" && <TierSettings />}
          {modalType == "conversation" && (
            <ConversationDetails topic={conversationTopic} />
          )}

        </div>
      </div>
    </>
  );
};

export default Modal;
