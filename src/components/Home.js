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

            console.log('mphka')
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
            console.log('inside loadcities')
            console.log(cityChoices[cityDiplayed])
            this.setState({
                userSubmited: false,
                correctOption: cityChoices[cityDiplayed],
                cityDiplayed: cityChoices[cityDiplayed],
                cityChoices: cityChoices
            });
    };

    handleChange = changeEvent => {
        // const { currCities } = this.context;
        // console.log("remaining cities: ",currCities.length);
        this.setState({
          selectedOption: changeEvent.target.value
        });
    };

    handleFormSubmit = formSubmitEvent => {
        // console.log(formSubmitEvent.target); 
        formSubmitEvent.preventDefault();
        // console.log("You have submitted: ", this.state.selectedOption);
        // console.log("Correct option: ",this.state.correctOption.name)
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
        console.log('kati '+ this.context);
        const { getCities } = this.context;
        await getCities();
        const { currCities } = this.context;
        this.setState({finishedLoading: true})
        console.log('inside Home.js')
        console.log(currCities)
        this.loadCities(currCities)
    };


    
    render() {
        const { currCities, api_url } = this.context;
        return ( 
            <div className="home-body">
                <img src={api_url+this.state.cityDiplayed.url} alt={this.state.cityDiplayed.name} className="image" />
                {console.log('in image')}
                {console.log(this.state.cityDiplayed.url+'  '+api_url)}
                <form className="form" onSubmit={this.handleFormSubmit} >
                    <section>
                    {this.state.cityChoices.map( 
                        city => <Options 
                                    name={city.name} 
                                    givenOption={this.state.selectedOption} 
                                    change={this.handleChange} 
                                    key={city.id}
                                    disabled={this.state.userSubmited}
                                />
                        ) 
                    }
                    </section>  
                    <input type="submit" papia="papia" value="submit"/>
                    <button 
                    type="button" 
                    disabled={!this.state.userSubmited} 
                    className={this.state.userSubmited ? "normal" : "greyed"} 
                    onClick={() => this.loadCities(currCities)}
                    >
                    Next
                    </button>
                </form>
                <div className="result">
                    { this.state.userSubmited 
                        ? <OnSubmitMessage correct={this.state.correct}/> 
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