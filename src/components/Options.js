import React from 'react';
import "../css/Options.css";

const Options = ({name,givenOption,change,disabled,correctOption}) => {
   
    let color = "normal";
    if (disabled){
        if(name===correctOption){
            color = "green";
        }
        else if(givenOption === name){
            color = "red";
        }
        else{
            color = "greyed";
        }
    }
    return ( 
        <div className="button-container">
                    <button  className={`option ${color}`}
                        type="button" 
                        name={name}
                        value={name}
                        onClick={change}
                        disabled={disabled}                   
                    >
                    {name}
                    </button>
         </div> 
        )
};
 
export default Options;