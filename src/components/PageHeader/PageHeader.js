
import React from "react";
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

class PageHeader extends React.Component {
  render() {
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
          <form>
            
            <FormGroup>
              <Label for="inputAddress">Airport : </Label>
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
              <Label for="inputAddress2">Weather :  </Label>
   
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
            </FormGroup>
            <Button type="submit" color="success">Create an exercise</Button>
          </form>
        </CardBody>
      </Card>
          </div>
        </Container>
      </div>
     
    );
  }
}

export default PageHeader;
