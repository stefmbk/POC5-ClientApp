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
import React ,{useState,useEffect} from "react";
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

// class AirportManagement extends React.Component {
const AirportManagement = () => {  
  // render() {
   

    function Airport(iata,name,lattitude,longitude) {
    
      this.iata = iata;
      this.name = name;
      this.lattitude = lattitude;
      this.longitude = longitude;
      }
      

      const [iata, setiata] = useState("");
      const [name, setname] = useState("");
      const [lattitude, setlattitude] = useState("");
      const [longitude, setlongitude] = useState("");
      
    const onsubmit = async e => {
        e.preventDefault();
        console.log(iata);
        const airport = new Airport (iata, name, lattitude,longitude);
            const response = await fetch("http://localhost:5000/airport",{
            method:"POST",
            headers: {"content-type" : "application/json"},
            body: JSON.stringify(airport)
    });
    console.log(response);
    window.location="/AirportManagement";
    }



    const [airports, setAirports] = useState([]);
     //delete airport function


  const deleteAirport = async iata => {
    try {
      const deleteAirport = await fetch(`http://localhost:5000/airports/${iata}`, {
        method: "DELETE"
      });

      setAirports(airports.filter(airport => airport.iata !== iata));
    } catch (err) {
      console.error(err.message);
    }
  };
  const getAirports = async () => {
    try {
      const response = await fetch("http://localhost:5000/airports");
      const jsonData = await response.json();

      setAirports(jsonData);
    } catch (err) {
      console.error(err.message);
    }


  };

  useEffect(() => {
    getAirports();
  }, []);

  console.log(airports);

    return (
      <>

        <div className="page-header header-filter">
          <div className="content-center brand">

            <h1 className="h1-seo">Airport Management </h1>
            <Card>
              <CardBody>
                <form onSubmit= {onsubmit}>
                  <FormGroup>
                    <Label for="IATA">IATA : </Label>
                    <Input
                      type="text"
                      name="IATA"
                      id="IATA"
                      placeholder="Enter IATA"
                      value={iata}  onChange = {e=> setiata(e.target.value)} 
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="AirportName">Aiport Name : </Label>
                    <Input
                      type="text"
                      name="AirportName"
                      id="AirportName"
                      placeholder="Enter Airport Name"
                      value={name} onChange = {e=> setname(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Lattitude">Lattitude : </Label>
                    <Input
                      type="number"
                      name="Lattitude"
                      id="Lattitude"
                      placeholder="Enter Lattitude"
                      value={lattitude} onChange = {e=> setlattitude(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Longitude">Longitude: </Label>
                    <Input
                      type="number"
                      name="Longitude"
                      id="Longitude"
                      placeholder="Enter Longitude"
                      value={longitude} onChange = {e=> setlongitude(e.target.value)}
                    />
                  </FormGroup>

                  <Button color="success" type="submit">
                    Submit
                  </Button>
                </form>
              </CardBody>
            </Card>

          <br></br>
            <Card>
              <CardBody>
                <Table >
                  <thead>
                    <tr>
                      <th className="text-center">IATA</th>
                      <th>Name</th>
                      <th>Lattitude</th>
                      <th className="text-center">Longitude</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {airports.map(airport => (

                    <tr key={airport.iata}>
                      <td className="text-center">{airport.iata}</td>
                      <td>{airport.name}</td>
                      <td>{airport.lattitude}</td>
                      <td className="text-center">{airport.longitude}</td>
                      <td className="text-right">
                        <Button className="btn-icon" color="success" size="sm">
                          <i className="fa fa-edit"></i>
                        </Button>{` `}
                        <Button className="btn-icon" color="danger" size="sm" onClick={() => deleteAirport(airport.iata)}>
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
  }


export default AirportManagement;
