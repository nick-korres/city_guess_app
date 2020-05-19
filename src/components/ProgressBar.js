import React from 'react'


const ProgressBar = ({percentage}) => {
    return (
        <div className="box-2b-filled">
            <div className="perc">{percentage*100}%</div>
            <div className="prog" 
                    style={{ width: `${percentage*100}%` }}
            >
               
            </div> 
        </div> 
    );
}
 
export default ProgressBar;