import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHideExpandedContactModal } from "../features/expandedContactModal";
import ReachOut from "./modal-components/ReachOut";
import WeSpoke from "./modal-components/WeSpoke"
import ConvoStarters from "./modal-components/ConvoStarters"
import ScheduleConvo from "./modal-components/ScheduleConvo"
import ContactSettings from "./modal-components/ContactSettings"
import TierSettings from "./modal-components/TierSettings"
import ConversationDetails from "./modal-components/ConversationDetails"
import NewPersonModal from "./modal-components/NewPerson";



const Modal = (props) => {
  const modalVisible = useSelector((state) => state.expandContactModal.visible);
  const modalType = useSelector((state) => state.expandContactModal.type);
  const conversationTopic = useSelector((state) => state.expandContactModal.topic)
  const dispatch = useDispatch();


  const handleClose = () => {
    dispatch(setHideExpandedContactModal());
  };

  //render
  if (!modalVisible) {
    return null;
  }
  return (
    <>
      <div className="modal-base-transparency">
        <div className="modal-box">
          {modalType == "add-contact" && <NewPersonModal/>}
          {modalType == "Reach Out" && <ReachOut/>}
          {modalType == "we-spoke" && <WeSpoke/>}
          {modalType == "convo-starters" && <ConvoStarters/>}
          {modalType.slice(0, 13) == "schedule-conv" && <ScheduleConvo/>}
          {modalType.slice(0,8) == "settings" && <ContactSettings/>}
          {modalType == "tier-settings" && <TierSettings/>}
          {modalType == "conversation" && <ConversationDetails topic={conversationTopic}/>}
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    </>
  );
};

export default Modal;
