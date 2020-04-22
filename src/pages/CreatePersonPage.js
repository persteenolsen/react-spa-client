import React from 'react'

import { Link, withRouter } from 'react-router-dom'

import Button from "react-bootstrap/Button";

export default class CreatePerson extends React.Component {

    constructor(props) {

      super(props);
      this.state = {name: '', email:'', age: '' };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

     const state = this.state
     state[event.target.name] = event.target.value
     this.setState(state);
	 

    }
    handleSubmit(event) {
		
     event.preventDefault();
	 	 
	 // Note: At Azure App Service CORS is enabled with a wildcard * 
	 fetch('https://pso-node-react-spa.azurewebsites.net/createperson', {

     //fetch('createperson', {
     method: 'POST',
     body: JSON.stringify({
         name: this.state.name,
         email: this.state.email,
         age: this.state.age
     }),
     headers: {
         "Content-type": "application/json; charset=UTF-8"
     }

    }).then(response => {


      // If the New Person was create the server will responde with 201
      if( response.status == 200 || response.status == 201 ) {
      
        alert("The Person was created successfully");
        
        // JavaScript: The user is redirected to the admin list of Persons
        //window.location.href = "/listpersons";
		
        // React: The user is redirected to the admin list of Persons using withRouter from react-router-dom
		this.props.history.push("/listpersons");
		
       }
       else
           alert("One or more values may be wrong and the Person was not created!");
     });
    }


    render() {
      return (
         <div id="container">
          		   
		  <br/>	
		  
		   <Link to="/listpersons">View the list of Persons</Link>
        
          <br/> <br/>  
              
          <form onSubmit={this.handleSubmit}>

            <table className="react-table-create">
            
            <tr>
              <td>
                 <label>Name:</label>
             </td>
            
             <td>
               <input className="react-input-text" type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Length 2 to 30 letters" />
             </td>
           </tr>

           <tr>
              <td>
             <label>Email:</label>
             </td>
             
             <td>
             <input className="react-input-text" type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="xxx@yyy.com - 8 to 30 letters" />
             </td>
           </tr>
            
           <tr>
              <td>
              <label>Age:</label>
              </td>
             
             <td>
             <input className="react-input-text" type="text" name="age" value={this.state.age} onChange={this.handleChange} placeholder="Number from 18 to 125" />
             </td>
           </tr>

           <tr>
              <td colSpan="2">
			  
			  <Button variant="outline-primary" type="submit">Submit</Button>{' '}
			  
             </td>
           </tr>
          </table>

           </form>
     
        </div>
      )
    }
  }
