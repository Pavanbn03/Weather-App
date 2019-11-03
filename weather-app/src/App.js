import React from 'react';
import Title from './components/Title'
import Form from './components/Form'
import Weather from './components/Weather'
class App extends React.Component{
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getweather = async (e)=> {
    e.preventDefault();
    const city=e.target.elements.city.value;
    const country=e.target.elements.country.value;
    const api_call = await fetch(`https://openweathermap.org/data/2.5/weather?q=${city},${country}&appid=b6907d289e10d714a6e88b30761fae22`);
    const data = await api_call.json();
    if(city && country){
    this.setState({
      temperature:data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: ""
    })
    
  }
  else{
    this.setState({
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error:"Please Enter Proper Values"
    })
  }
  }
  render(){
    return(
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className ="row">
                <div className="col-xs-5 title-container">
                <Title />
              </div>
              <div className ="col-xs-7 form-container">
                <Form getweather={this.getweather}/>
                <Weather 
                  temperature={this.state.temperature} 
                  humidity={this.state.humidity}
                  city={this.state.city}
                  country={this.state.country}
                  description={this.state.description}
                  error={this.state.error} 
                  />
              </div>
            </div>
          </div>
        </div> 
      </div>
      </div>
    );
  }
};

export default App;
