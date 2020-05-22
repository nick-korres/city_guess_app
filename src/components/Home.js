import React,{useEffect, useState, useContext} from 'react';
import "../css/Home.css";
import { CityContext }  from "../context";
import Options from "./Options";
import Score from "./Score"
// import OnSubmitMessage from "./OnSubmitMessage";
import placeholder from "../assets/loading.png"

function Home(props) {

    const cityContext = useContext(CityContext);
    const {getCities, currCities, api_url,changeCurrCities,progPerc,updateProg,started,toggleStart} = cityContext;
    const [score,setScore] = useState(0);
    const [timeCounter, setTimeCounter] = useState(10);
    const [numOfCorrect , setNumOfCorrect] = useState(0);
    const [numAnswered, setNumAnswered] = useState(0);
    const [numOfCities, setNumOfCities] = useState(10);
    const [selectedOption,setSelectedOption] = useState('');
    const [userSubmited,setUserSubmited] = useState(false);
    const [correct,setCorrect] = useState(false);
    const [finishedLoading,setFinishedLoading] = useState(false);
    const [correctOption,setCorrectOption] = useState([]);
    const [cityDisplayedIndex,setCityDisplayedIndex] = useState({id: 0,name: 'placeholder',url: placeholder});
    const [cityChoices,setCityChoices] = useState([]);
    
    const selectCities = (currCities) => {
            console.log("All Cities: ");
            currCities.map((city)=>console.log(city.name));
            let numChoices=4;
            let cityChoices=[];
            let tempCities=[...currCities];
            for(let i=1;i<=numChoices;i++){
                let randIndex=Math.floor(Math.random()*tempCities.length);
                cityChoices.push(tempCities[randIndex]);
                tempCities.splice(randIndex,1);
                console.log("City Choices: ");
                cityChoices.map((city)=>console.log(city.name));
            }
            changeCurrCities(tempCities,numChoices);
            let cityDisplayedIndex=Math.floor(Math.random()*cityChoices.length);
            setUserSubmited(false);
            setCorrectOption(cityChoices[cityDisplayedIndex]);
            setCityDisplayedIndex({
                id: cityChoices[cityDisplayedIndex].id, 
                name: cityChoices[cityDisplayedIndex].name , 
                url: api_url+cityChoices[cityDisplayedIndex].url
            });
            setCityChoices(cityChoices);
            setFinishedLoading(true);
            setNumAnswered(numAnswered+1);
            if(correct) {setNumOfCorrect(numOfCorrect+1)} ;
            updateProg(numAnswered/numOfCities);
            setTimeCounter(10);
            if ((numAnswered===numOfCities) && started) { toggleStart() } ;
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
                // selectCities(currCities);
            }
        }
    }, [timeCounter,started]);
    
    useEffect(() => {
    if (typeof currCities[0] != 'undefined' && finishedLoading === false){
        selectCities(currCities)
    }
    },[currCities])

    useEffect(() => {
        async function fetch(){
            const response = await getCities(numOfCities);
        }
        fetch();
    },[])

    return ( 
        <div className="home-body">
            <div className="countdown">Timer: {timeCounter}</div>
            <div className="image-box">
                <img src={cityDisplayedIndex.url} alt={cityDisplayedIndex.name} className="image" />
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
                onClick={() => selectCities(currCities)}
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