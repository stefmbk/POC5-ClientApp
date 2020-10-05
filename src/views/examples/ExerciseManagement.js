/*!

=========================================================
* BLK Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
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

// class ExerciseManagement extends React.Component {
const ExerciseManagement = () => {




  const [exercises, setexercises] = useState([]);
  const [exerciseName, setexerciseName] = useState([]);

    const getexercises = async () => {
      try {
        const response = await fetch("http://localhost:5000/exercices");
        const jsonData = await response.json();

        setexercises(jsonData);
      } catch (err) {
        console.error(err.message);
      }
  
  
    };
  
    useEffect(() => {
      getexercises();
    }, []);

   



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
        
       
          
          const exercise = new Exercise(exerciseName, searchAirport(airport,airports), searchWeather(weather,Weathers));
         
          const response = await fetch("http://localhost:5000/exercice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(exercise)
        });
  
        window.location = "/ExerciseManagement";
      } catch (err) {
        console.error(err.message);
      }
    };
  // render() {
    return (
      <>

        <div className="page-header header-filter">
          <div className="content-center brand">

            <h1 className="h1-seo">Exercise Management </h1>
            <Card>
        <CardBody>
          <form onSubmit={onSubmitForm}>

          <FormGroup>
                    <Label for="exerciceName">Exercice name : </Label>
                    <Input
                      type="text"
                      name="exerciceName"
                      id="exerciceName"
                      placeholder="Enter Exercice name"
                      value={exerciseName}
                      onChange={e => setexerciseName(e.target.value)}
                    />
                </FormGroup>
            
            {/* <FormGroup>
              <Label for="Airport">Airport : </Label>
              <UncontrolledDropdown group>
   
                      <DropdownToggle caret color="secondary" data-toggle="dropdown">
                        Choose Airport
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>Action</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem>Something else here</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
            </FormGroup>
            <FormGroup>
              <Label for="Weather">Weather :  </Label>
   
              <UncontrolledDropdown group>
                      <DropdownToggle caret color="secondary" data-toggle="dropdown">
                        Choose Weather
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>Action</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem>Something else here</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
            </FormGroup> */}
                  <FormGroup>
                    <FormGroup>
                      <Label for="chooseAirport">Choose Airport</Label>
                      <Input type="select" name="select" id="chooseAirport" value={airport} onChange={e => setAirport(e.target.value)}>
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
            <Button type="submit" color="success">Create an exercise</Button>
          </form>
        </CardBody>
      </Card>

          <br></br>
            <Card>
              <CardBody>
                <Table >
                  <thead>
                    <tr>
                      <th className="text-center">Exercice name</th>
                      <th>Aiport</th>
                      <th className="text-center">Weather</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {airports.map(airport => (
                <tr key={airport.iata}>
                  <td>{airport.iata}</td>
                  <td>{airport.name}</td>
                  <td>{airport.lattitude}</td>
                  <td>{airport.longitude}</td>
                  <td>
                    <EditAirport airport={airport} />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteAirport(airport.iata)}
                    >
                      Delete
                   </button>
                  </td>
                </tr>
              ))
              } */}
                    <tr>
                      <td className="text-center">TUN-Summer</td>
                      <td>Tunis-Carthage International Airport </td>
                      
                      <td className="text-center">Summer</td>
                      <td className="text-right">
                        <Button className="btn-icon" color="success" size="sm">
                          <i className="fa fa-edit"></i>
                        </Button>{` `}
                        <Button className="btn-icon" color="danger" size="sm">
                          <i className="fa fa-times" />
                        </Button>
                      </td>
                    </tr>

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
  }


export default ExerciseManagement;
