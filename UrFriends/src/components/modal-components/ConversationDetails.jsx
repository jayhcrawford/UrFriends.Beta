import React from "react"

const ConversationDetails = (props) => {
    return (
        <div>
            Conversation Details Component
            <br/>
            {props.topic}
        </div>
    )
}

export default ConversationDetails