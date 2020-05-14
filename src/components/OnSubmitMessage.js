import React from 'react';
import "../css/OnSubmitMessage.css";

const OnSubmitMessage = ({correct}) => {
    return ( correct 
        ? (
        <div className="correct">correct</div>
        ) 
        : (
        <div className="false">false</div>
        )
     );
}
 
export default OnSubmitMessage;