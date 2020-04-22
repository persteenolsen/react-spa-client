import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import queryString from 'query-string';


import Button from "react-bootstrap/Button";


export default class EditPerson extends React.Component {

    constructor(props) {

      super(props);
      this.state = {id: '', name: '', email: '', age: '' };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
    
	// Used for React Hooks
    //const search = window.location.search;
    //const params = new URLSearchParams(search);
    //const foo = params.get('id'); 
	
	const value = queryString.parse(this.props.location.search);
    const urlid = value.id;
       
	 // By web.config CORS are enable and method GET, POST, PUT and DELETE are allowed in my Node.js app at Azure
	fetch('https://pso-node-react-spa.azurewebsites.net/getperson/' + urlid )
		
    //fetch('getperson/' + urlid)
	
   .then(response => {
     return response.json();
    }).then(result => {

    // console.log(result);
     this.setState({
      id:result.id,
      name:result.name,
      email:result.email,
      age:result.age
     });
    });

    }


    handleChange(event) {
     const state = this.state
     state[event.target.name] = event.target.value
     this.setState(state);
    }


    handleSubmit(event) {
		
     event.preventDefault();
     	 
	 // By web.config CORS are enable and method GET, POST, PUT and DELETE are allowed in my Node.js app at Azure
	 fetch('https://pso-node-react-spa.azurewebsites.net/editperson/' + this.state.id, {
	  
     //fetch('editperson/' + this.state.id, {
     method: 'PUT',
     body: JSON.stringify({
         id:this.state.id,
         name: this.state.name,
         email: this.state.email,
         age: this.state.age
     }),
     headers: {
         "Content-type": "application/json; charset=UTF-8"
     }
    }).then(response => {

      // If the New Person was create the server will responde with 200 or 202
      if(response.status == 200 || response.status == 202 ) {
        alert("The Person was updated successfully");
       
        // JavaScript: The user is redirected to the admin list of Persons
        //window.location.href = "/listpersons";
		
        // React: The user is redirected to the admin list of Persons using withRouter from react-router-dom
		this.props.history.push("/listpersons");
		
		  
      }
      else
          alert("One or more values may be wrong and the Person was not updated!");
     });
    }
    
    render() {
      return (
     <div id="container">
          
		<br/>
		
		<Link to="/listpersons">View the list of Persons</Link>        
		
		<br/> <br/>

        <form onSubmit={this.handleSubmit}>

           <table className="react-table-edit">
            
            <tr>
             <td colSpan="2">
                 <input type="hidden" name="id" value={this.state.id}/>
              </td>
            </tr>

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
             <input className="react-input-text" type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="xxx@yyy.com" />
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
      );
    }
  }

  
  
  