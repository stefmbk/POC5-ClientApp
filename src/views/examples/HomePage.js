
import  React, {useState,useEffect,DropDownList} from "react";
import {
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody
  
} from "reactstrap";
// reactstrap components
import { Container } from "reactstrap";



import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


// class HomePage extends React.Component {


  

  const HomePage= () => {

    // GET AIRPORTS  ( GET REQUEST )
    const [airports, setairports] = useState([]);
    const getairports = async () => {
      try {
        const response = await fetch("http://localhost:5000/airports");
        const jsonData = await response.json();
  
        setairports(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };


      useEffect(() => {
        getairports();
      }, []);
    

    // GET WEATHERS  ( GET REQUEST )

    const [Weathers, setWeathers] = useState([]);
    const getWeathers = async () => {
      try {
        const response = await fetch("http://localhost:5000/weathers");
        const jsonData = await response.json();
  
        setWeathers(jsonData);
      } catch (err) {
        console.error(err.message);
      }
  
  
    };
  
    useEffect(() => {
      getWeathers();
    }, []);





    // CREATE EXERCICE (POST REQUEST)
    const [name, setname] = useState("");
    const [airport, setAirport] = useState("");
    const [weather, setWeather] = useState("");
  

    function Exercise(name, airport_iata, weather_id) {
      this.name = name;
      this.airport_iata = airport_iata;
      this.weather_id = weather_id;
    }
    
    
    function getByValue(map, searchValue) {
      for (let [key, value] of map.entries()) {
        console.log(key);
        if (value === searchValue)
          return key;
      }
    }
    
    const onSubmitForm = async e => {

      e.preventDefault();
      try {
          //const body = { airport };
          
          function searchAirport(nameKey, myArray){
            for (var i=0; i < myArray.length; i++) {
                if (myArray[i].name === nameKey) {
                    return myArray[i].iata;
                }
            }
        }
        function searchWeather(nameKey, myArray){
          for (var i=0; i < myArray.length; i++) {
              if (myArray[i].name === nameKey) {
                  return myArray[i].id;
              }
          }
      }
        
       
          
          const exercise = new Exercise(name, searchAirport(airport,airports), searchWeather(weather,Weathers));
         
          const response = await fetch("http://localhost:5000/exercice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(exercise)
        });
  
        window.location = "/Home";
      } catch (err) {
        console.error(err.message);
      }
    };







    





  //render() {
    return (
      <div className="page-header header-filter">
        <div className="squares square1" />
        <div className="squares square2" />
        <div className="squares square3" />
        <div className="squares square4" />
        <div className="squares square5" />
        <div className="squares square6" />
        <div className="squares square7" />
        <Container>
            <div className="content-center brand">
            <h1 className="h1-seo">Create exercise</h1>

            <h3 className="d-none d-sm-block"></h3>
            <Card>
              <CardBody>
                <form onSubmit={onSubmitForm}>
                <FormGroup>
                    <Label for="name">Exercice name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter Exercise name"
                      value={name}
                      onChange={e => setname(e.target.value)}
                    />
                </FormGroup>
                  <FormGroup>
                    <FormGroup>
                      <Label for="chooseAirport">Choose Airport</Label>
                      <Input type="select" name="select" id="chooseAirport" 
                        value={airport} onChange={e => setAirport(e.target.value)}>
                        {airports.map(airport => {
                          return <option key={airport.iata} value={airport.name}>{airport.name}</option>;
                        })}

                      </Input> 

                     
                    </FormGroup>
                  <FormGroup>
                      <Label for="chooseWeather">Choose Weather</Label>
                      <Input type="select" name="select" id="chooseWeather" value={weather} onChange={e => setWeather(e.target.value)}>
                       {Weathers.map(weather => {
                          return <option key={weather.id} value={weather.name}>{weather.name}</option>;
                        })}

                      </Input>
                    </FormGroup>
                  </FormGroup>
                  {/* <button className='submit'>Insert Exercise</button> */}
                 <Button type="submit" color="success">Create an exercise</Button>
                </form>
              </CardBody>
            </Card>
          </div>
        </Container>
      </div>
     
    );
  }
//}

export default HomePage;
