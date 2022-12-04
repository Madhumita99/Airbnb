import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

function Login()  {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  let navigate = useNavigate();

  useEffect( () =>{
    document.getElementById('submit').onclick = function() {
              var em = document.getElementById('email').value
              var pass = document.getElementById('pass').value
            console.log(JSON.stringify( {  // you will get user information from login form
        
                email: em,
                sloginpswd: pass,
      
              } ))
              console.log('form submitted succesfully')
              fetch('http://localhost:3000/login', {
                method: "POST",
                body: JSON.stringify( {  // you will get user information from login form
        
                    email: em,
                    sloginpswd: pass,
          
                  } ),
                headers : { 
                  'Content-Type': 'application/json',
                   'Accept': 'application/json'
                }
              })
              .then( res => res.json() )
              .then( (data) => {
                  if(data.mess === "blank")
                  {
                      alert('Please fill all the detaiils')
                  }
                  else if(data.mess === "incorrect")
                  {
                      alert('Incorrect login credentials. Please check email/password')
                  }
                  else
                  {
                    console.log(data);
        
                    let inMemoryToken = data.token;
                    console.log(inMemoryToken)
          
                    localStorage.setItem('user', JSON.stringify(data));
                    setFlag(true);
                  }
                  
        
                  
              })
              .catch((error) => {
                console.log(error.message);
              
              });
          }
  }, [])


      if (isLoading){
        return(
          <div>Loading...</div>

        );

      }
      else if (error){
        return(
          <div>Error: {error.message }</div>

        );
      }
      else{
        if(flag === false)
        {return (
		  <div>
		  <div className="d-flex justify-content-center">
			  <div className="card" style={{marginTop: '15px', marginBottom: '15px'}}>
				  <div className="card-body">
					  <h5 className="card-title">Login</h5>
						  <form>
							  <div class="form-inline">
								  <label for="email">Email:</label>
								  <input type="email" className="form-control" id="email" aria-describedby="email" placeholder="Enter email" style={{marginTop: '5px', marginBottom: '5px'}}/>
							  </div>
							  <div class="form-inline">
								  <label for="password">Password:</label>
								  <input type="password" className="form-control" id="password" placeholder="Enter password" style={{marginTop: '5px', marginBottom: '5px'}}/>
							  </div>
							  <button type="button" id ="submit" className="btn btn-primary" style={{marginTop: '15px', marginBottom: '15px'}}>Login</button>
						  </form>
				  </div>
			  </div>
		  </div>
	</div> 
  
        );}
        else{
            navigate("/")
        }

      }
     
      
}

export default Login;
