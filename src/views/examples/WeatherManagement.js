
import React,{useState,useEffect} from "react";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
// reactstrap components

import {
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
  Card,
  CardBody,
  Table
} from "reactstrap";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";

import bigChartData from "variables/charts.js";

//class WeatherManagement extends React.Component {

  const WeatherManagement = () => {
 
  //render() {
    function Weatherclass(name,wind_direction,wind_speed,visibility) {
    
      this.name = name;
      this.wind_direction = wind_direction;
      this.wind_speed = wind_speed;
      this.visibility = visibility;
      }
      
      const [name, setname] = useState("");
      const [wind_direction, setwind_direction] = useState("");
      
      const [wind_speed, setwind_speed] = useState("");
      const [visibility, setvisibility] = useState("");
      
    const onsubmit = async e => {
        e.preventDefault();
/*         console.log(iata);
 */        const weather = new Weatherclass (name,wind_direction,wind_speed,visibility);
            const response = await fetch("http://localhost:5000/weather",{
            method:"POST",
            headers: {"content-type" : "application/json"},
            body: JSON.stringify(weather)
    });
    console.log(response);

    window.location="/WeatherManagement";
    }

//******************************************************* */
    const [Weather, setWeather] = useState([]);

    //delete weather function
  
  
    const deleteWeather = async id => {
     
      try {
        console.log(id);
        const deleteWeather = await fetch(`http://localhost:5000/weathers/${id}`, {
          method: "DELETE"
        });
  
        setWeather(Weather.filter(weather => weather.id !== id));
      } catch (err) {
        console.error(err.message);
      }
    };


//getweather******************************************************    
    const getWeather = async () => {
      try {
        const response = await fetch("http://localhost:5000/weathers");
        const jsonData = await response.json();
  
        setWeather(jsonData);
      } catch (err) {
        console.error(err.message);
      }
  
  
    };
  
    useEffect(() => {
      getWeather();
    }, []);
  
    console.log(Weather);
  


    return (
      <>

        <div className="page-header header-filter">
          <div className="content-center brand">

            <h1 className="h1-seo">Weather Management </h1>
            <Card>
              <CardBody>
              <form onSubmit= {onsubmit}>
                  <FormGroup>
                    <Label for="exampleEmail">Name : </Label>
                    <Input
                      type="text"
                      name="Name"
                      id="Name"
                      placeholder="Enter Name"
                      value={name} onChange = {e=> setname(e.target.value)}
                    />

                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePassword">Wind direction : </Label>
                    <Input
                      type="number"
                      name="Wind_direction"
                      id="Wind_direction"
                      placeholder="Enter Wind direction"
                      value={wind_direction} onChange = {e=> setwind_direction(e.target.value)}

                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="windSpeed">Wind speed : </Label>
                    <Input
                      type="number"
                      name="wind_speed"
                      id="wind_speed"
                      placeholder="Enter wind speed"
                      value={wind_speed} onChange = {e=> setwind_speed(e.target.value)}
                    />
                  </FormGroup>
                  <Label for="visibility"> Visibility : </Label>
                  <Input
                    type="number"
                    name="visibility"
                    id="visibility"
                    placeholder=" visibility"
                    value={visibility} onChange = {e=> setvisibility(e.target.value)}
                  />
                  <Button color="success" >
                    Submit
               </Button>
                </form>
              </CardBody>
            </Card>

          <br></br>
          <Card>
          <CardBody>
            <Table  >
              <thead>
                <tr>
                  <th className="text-center">Name</th>
                  <th>Wind direction</th>
                  <th>Wind speed</th>
                  <th className="text-center">Visibility  </th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
            <tbody>
              
              {Weather.map(weather => (
                <tr key={weather.id}>
                

                  <td className="text-center">{weather.name}</td>
                  <td>{weather.wind_direction}</td>
                  <td>{weather.wind_speed}</td>
                  <td className="text-center">{weather.visibility}</td>
                  <td className="text-right">
                    <Button className="btn-icon" color="success" size="sm">
                      <i className="fa fa-edit"></i>
                    </Button>{` `}
                    <Button className="btn-icon" color="danger" size="sm" 
                    onClick={() => deleteWeather(weather.id)}>
                      <i className="fa fa-times" />
                    </Button>
                  </td>
                </tr>
                  ))}
                
                
                
            </tbody>
            </Table>
            </CardBody>
            </Card>
          </div>
        </div>
      
      
        <IndexNavbar />
        <div className="wrapper">
          <div className="page-header">
            <img
              alt="..."
              className="path"
              src={require("assets/img/blob.png")}
            />
            <img
              alt="..."
              className="path2"
              src={require("assets/img/path2.png")}
            />
            <img
              alt="..."
              className="shapes triangle"
              src={require("assets/img/triunghiuri.png")}
            />
            <img
              alt="..."
              className="shapes wave"
              src={require("assets/img/waves.png")}
            />
            <img
              alt="..."
              className="shapes squares"
              src={require("assets/img/patrat.png")}
            />
            <img
              alt="..."
              className="shapes circle"
              src={require("assets/img/cercuri.png")}
            />
            
          </div>
        </div>
        

                  
      </>

      
    );
  //}
}

export default WeatherManagement;
