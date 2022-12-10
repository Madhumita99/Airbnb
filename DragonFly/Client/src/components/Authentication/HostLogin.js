import React,{useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

	function HostLogin(){
		
		let navigate = useNavigate();
		  const[data, setCustomer] = useState({
			
			  email:'',
			  password:''
		  })
		  const[formErrors, setFormErrors] = useState({});
		  const[isSubmit, setIsSubmit] = useState(false);
	  
	  
		  let name,value;
		  const updateValue = (e)=>{
			name=e.target.name;
			value=e.target.value;
			setCustomer({...data, [name]:value})
			  
		  } 
	  
		  const submitData = async (e) => {
			  e.preventDefault();
			  setFormErrors(validate(data));
			  const dataCustomer = {
				
				  email: data.email,
				  password: data.password
				  
			  }
			  
			  const res = await fetch("http://localhost:3000/hostlogin",{
				  method:'POST',
				  headers : { 
					  'Content-Type': 'application/json',
					   'Accept': 'application/json'
					},
				  body:JSON.stringify(dataCustomer)
			  });

			  const usr = await res.json();
			  
			  if(res.status === 425){
				  window.alert("Host doesn't exist. Please SignUp!");
				  navigate('/register');
			  }
        if(res.status === 420){
          window.alert("Host email or password is incorrect!");
        }
			  if(res.status === 200){
          localStorage.setItem('host', JSON.stringify(data));
				  window.alert("Login successful");
				  navigate('/welcome');
			  }
			  
		  }
	  
		  useEffect(() => {
			  console.log(formErrors);
			  if(Object.keys(formErrors).length === 0 && isSubmit){
			    console.log(data);
			  }
		  },[formErrors]);
	  
		  const validate = (values) => {
			  const errors = {};
		
			  if (!values.email) {
			    errors.email = "Email is required! and should be in format abc@gmail.com";
			  }
			
			  if (!values.password) {
				  errors.password = "Password is required! It should be alphanumeric value";
			  }
			  return errors;
		  };
		 
		  return(
        <div>
        <div className="d-flex justify-content-center">
        <div className="card" style={{marginTop: '15px', marginBottom: '15px'}}>
        <div className="card-body">
            <div>
            <h3 className="card-title">Host Login</h3>
            <form>
            <div className="form-inline">
              Email: <input id="email" className="form-control" name="email" value={data.email} onChange = {updateValue} type="text"/><br />
                <span>{formErrors.email}</span>
            </div>
            
            <div className="form-inline">
              Password: <input id="password" className="form-control" name="password" value={data.password} onChange = {updateValue}  type="password"/><br />
                  <span>{formErrors.password}</span>
            </div>
            
            <div className="login-button">
              <button type="submit" className="btn btn-primary" onClick={submitData}>Submit</button>
            </div>
            New to DragonFly? <Link to="/hostregister">Sign Up</Link>
            </form>
            </div>
          </div>
          </div>
        </div>	  
      </div>
		  )
	  }
	  
	  

export default HostLogin;