import React,{useEffect, useState, useContext, useRef} from 'react';
import "../css/Home.css";
import { CityContext }  from "../context";
import Options from "./Options";
import OnSubmitMessage from "./OnSubmitMessage";
import placeholder from "../assets/loading.png"

function Home(props) {

    const cityContext = useContext(CityContext);
    const {getCities, currCities, api_url,changeCurrCities,} = cityContext;
    const [selectedOption,setSelectedOption] = useState('');
    const [userSubmited,setUserSubmited] = useState(false);
    const [correct,setCorrect] = useState(false);
    const [finishedLoading,setFinishedLoading] = useState(false);
    const [correctOption,setCorrectOption] = useState([]);
    const [cityDisplayed,setCityDisplayed] = useState({id: 0,name: 'placeholder',url: placeholder});
    const [cityChoices,setCityChoices] = useState([]);
    
    const selectCities = (currCities) => {
            let numChoices=4;
            let cityChoices=[];
            let newCities=[...currCities];
            for(let i=1;i<=numChoices;i++){
                let randIndex=Math.floor(Math.random()*newCities.length);
                cityChoices.push(newCities[randIndex]);
                newCities.splice(randIndex,1);
            }
            changeCurrCities(newCities,numChoices);
            let cityDisplayed=Math.floor(Math.random()*cityChoices.length);
            setUserSubmited(false);
            setCorrectOption(cityChoices[cityDisplayed]);
            setCityDisplayed({
                id: cityChoices[cityDisplayed].id, 
                name: cityChoices[cityDisplayed].name , 
                url: api_url+cityChoices[cityDisplayed].url
            });
            setCityChoices(cityChoices);
            setFinishedLoading(true);
    };

    const handleChange = changeEvent => {
        setSelectedOption(changeEvent.target.value)
    };

    const handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();
        if (selectedOption === correctOption.name) {
            setUserSubmited(true)
            setCorrect(true) 
        } else {
            setUserSubmited(true)
            setCorrect(false)
        }
    };

    useEffect(() => {
    if (typeof currCities[0] != 'undefined' && finishedLoading === false){
        selectCities(currCities)
    }
    },[currCities])

    useEffect(() => {
        async function fetch(){
            const response = await getCities();
        }
        fetch();
    },[])

    return ( 
        <div className="home-body">
            <img src={cityDisplayed.url} alt={cityDisplayed.name} className="image" />
            <form className="form" onSubmit={handleFormSubmit} >
                <section>
                {cityChoices.map( 
                    city => <Options 
                                name={city.name} 
                                givenOption={selectedOption} 
                                change={handleChange} 
                                key={city.id}
                                disabled={userSubmited}
                            />
                    ) 
                }
                </section>  
                <input type="submit" papia="papia" value="submit"/>
                <button 
                type="button" 
                disabled={!userSubmited} 
                className={userSubmited ? "normal" : "greyed"} 
                onClick={() => selectCities(currCities)}
                >
                Next
                </button>
            </form>
            <div className="result">
                { userSubmited 
                    ? <OnSubmitMessage correct={correct}/> 
                    : <div>Choose a City</div>
                }
            </div>
            <div className="test"> papia </div>
        </div>
    );
};

export default Home;