import React from 'react';
import "../css/Options.css";

const Options = ({name,givenOption,change,disabled}) => {
    return ( 
        <section className="option">
            <label className={disabled ? "optionLabelGreyed" :"optionLabel"}>
                    <input 
                        type="radio" 
                        name={name}
                        value={name}
                        checked={givenOption === name}
                        onChange={change}
                        disabled={disabled}                   
                    />
                    {name}
            </label>
        </section>
        )
};
 
export default Options;