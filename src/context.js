import React, { Component } from 'react';

const CityContext = React.createContext();

class CityProvider extends Component {
    constructor(){
        super()  
        this.state = { 
            progPerc: 0,
            currCities:[],
            cities:[],
            api_url: 'http://127.0.0.1:5000/'  //'https://city-guess-api.herokuapp.com/'
        };
    }

    updateProg = (newPerc) => {
        this.setState({progPerc: newPerc})
    }
     
    loadCities =  async (numOfCities) => {
        const response = await fetch(this.state.api_url+'images/'+numOfCities)
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
                    showThem: this.showThem,
                    updateProg: this.updateProg
                }}
            >
                {this.props.children}
            </CityContext.Provider>
          );
    }
}

const CityConsumer = CityContext.Consumer;

export { CityProvider, CityContext , CityConsumer };