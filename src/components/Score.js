import React ,{ useState, useEffect } from "react";



const Score = ({numTotalCities , numAnswered ,numOfCorrect ,Score}) => {

    return (
    <> 
        {/* <div>Total: {numTotalCities}</div> */}
        {/* <div>Answered: {numAnswered}</div> */}
        <div>Correct: {numOfCorrect}/{numTotalCities}</div>
        <div>Score: {Score}</div>
        {/* <div>Wrong: {numAnswered-numOfCorrect}</div>  */}
    </>
     );
}
 
export default Score;