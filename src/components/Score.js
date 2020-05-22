import React ,{ useState, useEffect } from "react";
import "../css/Score.css"



const Score = ({numTotalCities , numAnswered ,numOfCorrect ,Score}) => {

    return (
    <div className="Score">
        {/* <div>Total: {numTotalCities}</div> */}
        {/* <div>Answered: {numAnswered}</div> */}
        <div>Correct: {numOfCorrect}/{numTotalCities}</div>
        <div>Score: {Score}</div>
        {/* <div>Wrong: {numAnswered-numOfCorrect}</div>  */}
    </div>
     );
}
 
export default Score;