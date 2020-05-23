import React, { Component } from 'react';

const CityContext = React.createContext();

class CityProvider extends Component {
    constructor(){
        super()  
        this.state = {
            started: false,
            progPerc: 0,
            dispCities:[],
            choiceCities:[],
            api_url: process.env.API_URL // 'http://127.0.0.1:5000/' // 'https://city-guess-api.herokuapp.com/' 
        };
    }

    updateProg = (newPerc) => {
        this.setState({progPerc: newPerc});
    }
    toggleStart = () => {
        this.setState({started: !this.state.started});
    }
     
    loadCities =  async (numOfCities,multiplier) => {
        const response = await fetch(this.state.api_url+'images/'+numOfCities*multiplier)
                               .then((resp) => {    // Server errors
                                if (resp.status >= 400 && resp.status < 600) {
                                    throw new Error("Bad response from server "+resp.status);
                                  }
                                  return resp;
                               })
                               .then(resp => resp.json())
                               .catch((error) => console.log(error)) // Network errors


        this.setState({
            dispCities: response.slice(0,numOfCities),
            choiceCities: response.slice(numOfCities)
        });     
    }

    changeDispCities = (newCities) => { if (newCities.length>0) this.setState({dispCities:newCities})};      
  
   
    render() { 
        return (  
            <CityContext.Provider 
                value={{...this.state,
                    changeDispCities: this.changeDispCities,
                    getCities: this.loadCities,
                    showThem: this.showThem,
                    updateProg: this.updateProg,
                    toggleStart: this.toggleStart
                }}
            >
                {this.props.children}
            </CityContext.Provider>
          );
    }
}

const CityConsumer = CityContext.Consumer;

export { CityProvider, CityContext , CityConsumer };