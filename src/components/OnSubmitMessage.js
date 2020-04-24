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
        // <>
        //     <div> 
        //     { correct && (
        //         <div>
        //             Correct!
        //         </div>
        //     )}
        //     </div>
        //     <div>
        //     { !correct && (
        //         <div>
        //             False!
        //         </div>
        //     )}
        //     </div>
        // </>
     );
}
 
export default OnSubmitMessage;