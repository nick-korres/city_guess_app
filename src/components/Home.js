import React,{useEffect, useState, useContext} from 'react';
import "../css/Home.css";
import { CityContext }  from "../context";
import Options from "./Options";
import Score from "./Score"
// import OnSubmitMessage from "./OnSubmitMessage";
import placeholder from "../assets/loading.png"

let lastRound =[];
let lastCity;

function Home(props) {
    const Timer = 10;
    const numChoices =4;


    const cityContext = useContext(CityContext);
    const {getCities,choiceCities, dispCities, api_url,changeDispCities,progPerc,updateProg,started,toggleStart,setFinalScore} = cityContext;
    // choiceCities ==> pool of choices ,cityChoices ==> current group of 4 choices
    const [score,setScore] = useState(0);
    const [timeCounter, setTimeCounter] = useState(Timer);
    const [numOfCorrect , setNumOfCorrect] = useState(0);
    const [numAnswered, setNumAnswered] = useState(0);
    const [numOfCities, setNumOfCities] = useState(10);
    const [selectedOption,setSelectedOption] = useState('');
    const [userSubmited,setUserSubmited] = useState(false);
    const [correct,setCorrect] = useState(false);
    const [finishedLoading,setFinishedLoading] = useState(false);
    const [correctOption,setCorrectOption] = useState([]);
    const [cityDisplayed,setCityDisplayed] = useState({id: 0,name: 'placeholder',url: placeholder});
    const [cityChoices,setCityChoices] = useState([]);
    
    const selectCities = (dispCities) => {
            let cityDisplayedIndex=Math.floor(Math.random()*dispCities.length);
            let chosenCity = dispCities.splice(cityDisplayedIndex,1); //pick a random one
            chosenCity = chosenCity[0]  // extract it
            let cityChoices = choiceCities.splice(0,3) // pick 3 random from different pool of choices
            const randIndex = Math.floor(Math.random()*numChoices);
            cityChoices.splice(randIndex,0,chosenCity)  // put displayed at random index out of the numChoices
            if (numAnswered===numOfCities-1){
                lastRound = cityChoices;
                lastCity = cityChoices[0];
            }
            if ((numAnswered===numOfCities) && started) { 
                cityChoices = lastRound;
                chosenCity = lastCity;
                toggleStart() 
            } ;
            changeDispCities(dispCities);
            setCityDisplayed(chosenCity)
            setCorrectOption(chosenCity);
            setCityChoices(cityChoices);
            setFinishedLoading(true);
            setNumAnswered(numAnswered+1);
            if(correct) {setNumOfCorrect(numOfCorrect+1)} ;
            updateProg(numAnswered/numOfCities);
            setTimeCounter(Timer);
            setUserSubmited(false);
            if ((numAnswered===numOfCities) && started) {
                setFinalScore(numOfCorrect,numOfCities,score);
                // toggleStart(); 
            } ;

    };

    const handleChange = (changeEvent) => {
        setSelectedOption(changeEvent.target.name)
        setUserSubmited(true);
        if (changeEvent.target.name === correctOption.name) {
            setCorrect(true) ;
            setScore(score+timeCounter)
        } else {
            setCorrect(false);
        }  
    };

    useEffect(() => {
        if(!userSubmited && started){
            if (timeCounter > 0){
                setTimeout(() => setTimeCounter(timeCounter - 1), 1000)
            }
            if (timeCounter===0 && !userSubmited) {
                setUserSubmited(true);
                setSelectedOption(correctOption);
                setCorrect(false);
                // selectCities(dispCities);
            }
        }
    }, [timeCounter,started]);
    
    useEffect(() => {
    if (typeof dispCities[0] != 'undefined' && finishedLoading === false){
        selectCities(dispCities)
    }
    },[dispCities])

    useEffect(() => {
        async function fetch(){
            const response = await getCities(numOfCities,numChoices);
        }
        fetch();
    },[])


    return (
        <div className="home-body">
            <div className="countdown">Timer: {timeCounter}</div>
            <div className="image-box">
                <img src={api_url+cityDisplayed.url} alt={cityDisplayed.name} className="image" />
            </div>
            <Score numTotalCities={numOfCities} 
                    numAnswered={numAnswered} 
                    numOfCorrect={numOfCorrect}
                    Score={score}
            />
            <div className="options-box">
                {cityChoices.map( 
                    city => <Options 
                                name={city.name} 
                                givenOption={selectedOption} 
                                change={handleChange} 
                                key={city.id}
                                disabled={userSubmited}
                                correctOption={correctOption.name}
                            />
                    ) 
                }
            </div>  
            <button 
                type="button" 
                disabled={!userSubmited} 
                className={`next-button ${userSubmited ? "normal" : "greyed"}`} 
                onClick={() => selectCities(dispCities)}
            >
                {(numAnswered===numOfCities)?"Results":"Next"} 
            </button>
            {/* <div className="result">
                { userSubmited 
                    ? <OnSubmitMessage correct={correct}/> 
                    : <div>Choose a City</div>
                }
            </div> */}
        </div>
    );
};

export default Home;