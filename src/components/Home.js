import React,{Component} from 'react';
import "../css/Home.css";
import { CityContext }  from "../context";
import Options from "./Options";
import OnSubmitMessage from "./OnSubmitMessage";
import placeholder from "../assets/loading.png"

class Home extends React.Component {
    constructor(props){
    super(props);
    this.state = { 
        correctOption: [],
        selectedOption: "",
        userSubmited: false,
        correct: false,
        cityDiplayed: [],
        cityChoices: [],
        finishedLoading: false
     };
  
    };
    
    loadCities(currCities) {
            let numChoices=4;
            let cityChoices=[];
            let newCities=[...currCities];
            for(let i=1;i<=numChoices;i++){
                let randIndex=Math.floor(Math.random()*newCities.length);
                cityChoices.push(newCities[randIndex]);
                newCities.splice(randIndex,1);
            }
            const { changeCurrCities } = this.context;
            changeCurrCities(newCities,numChoices);
            let cityDiplayed=Math.floor(Math.random()*cityChoices.length);
            this.setState({
                userSubmited: false,
                correctOption: cityChoices[cityDiplayed],
                cityDiplayed: cityChoices[cityDiplayed],
                cityChoices: cityChoices
            });
    };

    handleChange = changeEvent => {
        this.setState({
          selectedOption: changeEvent.target.value
        });
    };

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();
        if (this.state.selectedOption === this.state.correctOption.name) {
            this.setState({
                userSubmited: true,
                correct: true
              });  
        } else {
            this.setState({
                userSubmited: true,
                correct: false
              }); 
        }
    };
    
    async componentDidMount() {
        this.setState({
            cityDiplayed: {id: 0,name: 'placeholder',url: placeholder}
        })
        const { getCities } = this.context;
        await getCities();
        const { currCities } = this.context;
        this.setState({finishedLoading: true});
        this.loadCities(currCities);
    };

    render() {
        const { currCities, api_url } = this.context;
        const { cityDiplayed, cityChoices, selectedOption, userSubmited, correct } = this.state;
        return ( 
            <div className="home-body">
                <img src={api_url+cityDiplayed.url} alt={cityDiplayed.name} className="image" />
                <form className="form" onSubmit={this.handleFormSubmit} >
                    <section>
                    {cityChoices.map( 
                        city => <Options 
                                    name={city.name} 
                                    givenOption={selectedOption} 
                                    change={this.handleChange} 
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
                    onClick={() => this.loadCities(currCities)}
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
    }
}
Home.contextType = CityContext;

export default Home;