import React, { Component } from 'react';

const CityContext = React.createContext();

class CityProvider extends Component {
    constructor(){
        super()  
        this.state = { 
            currCities:[],
            cities:[],
            api_url: 'https://city-guess-api.herokuapp.com/'
        };
    }
    //  fetch('http://127.0.0.1:5000/').then( res => res.json()).then( data => {this.setState({currCities: data})
     
    // componentDidMount(){
    //     this.loadCities();
    // };

    loadCities =  async () => {
        const response = await fetch(this.state.api_url+'images/').then(resp => resp.json())
        // console.log('inside load cities');
        // console.log(response[1].name);
        this.setState({
            currCities: response,
            cities: response
        });
    }

    showThem = () => {
        console.log(this.state.currCities);
    }

    changeCurrCities = (newCities,numChoices) => {
        if (newCities.length >= numChoices){
            this.setState({currCities:newCities});      
        } else {
            this.setState({currCities: this.state.cities}); 
        }
    };
  

    render() { 
        return (  
            <CityContext.Provider 
                value={{...this.state,
                    changeCurrCities: this.changeCurrCities,
                    getCities: this.loadCities,
                    showThem: this.showThem
                }}
            >
                {this.props.children}
            </CityContext.Provider>
          );
    }
}
 


const CityConsumer = CityContext.Consumer;

export { CityProvider, CityContext , CityConsumer };