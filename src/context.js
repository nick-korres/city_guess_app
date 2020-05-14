import React, { Component } from 'react';

const CityContext = React.createContext();

class CityProvider extends Component {
    constructor(){
        super()  
        this.state = { 
            currCities:[],
            cities:[],
            api_url: 'https://city-guess-api.herokuapp.com/' //'http://127.0.0.1:5000/'
        };
    }
     
    loadCities =  async () => {
        const response = await fetch(this.state.api_url+'images/')
                               .then((resp) => {    // Server errors
                                if (resp.status >= 400 && resp.status < 600) {
                                    throw new Error("Bad response from server "+resp.status);
                                  }
                                  return resp;
                               })
                               .then(resp => resp.json())
                               .catch((error) => console.log(error)) // Network errors
        this.setState({
            currCities: response,
            cities: response
        });
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