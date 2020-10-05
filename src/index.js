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
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.1.0";
import "assets/demo/demo.css";

import Index from "views/Index.js";
import AirportManagement from "views/examples/AirportManagement.js";
import WeatherManagement from "views/examples/WeatherManagement.js";
import ExerciseManagement from "views/examples/ExerciseManagement.js";


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/Home" render={props => <Index {...props} />} />
      <Route
        path="/AirportManagement"
        render={props => <AirportManagement {...props} />}
      />
       <Route
        path="/ExerciseManagement"
        render={props => <ExerciseManagement {...props} />}
      />
      <Route
        path="/WeatherManagement"
        render={props => <WeatherManagement {...props} />}
      />
     
      <Redirect from="/" to="/Home" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
