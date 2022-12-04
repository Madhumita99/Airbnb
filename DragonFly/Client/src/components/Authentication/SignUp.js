import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';


function SignUp()  {
    
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  let navigate = useNavigate();

  useEffect( () =>{
    document.getElementById('submit').onclick = function() {
            var name = document.getElementById('name').value
              var em = document.getElementById('email').value
              var pass = document.getElementById('password').value

              const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{5,})");
            console.log(JSON.stringify( {  // you will get user information from login form
                name: name,
                email: em,
                password: pass,
              } ))
              console.log('form submitted succesfully')
              fetch('http://localhost:3000/register', {
                method: "POST",
                body: JSON.stringify( {  // you will get user information from login form
                    name: name,
                    email: em,
                    password: pass,
                  } ),
                headers : { 
                  'Content-Type': 'application/json',
                   'Accept': 'application/json'
                }
              })
              .then( res => res.json() )
              .then( (data) => {
                  if(data.mess === "exists")
                  {
                      alert('User already exists. Try a different email address')
                  }
                  else if(data.mess === "blank")
                  {
                    alert('Fill all the fields!')
                  }
                  else if(!regex.test(data.password))
                  {
                    alert('Password min. length 5 and include at least 1 uppercase and lowercase letter, 1 number and 1 special character!')
                  }
                  else{
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
        {
            return (
            <div>
                <div className="d-flex justify-content-center">
                    <div className="card" style={{marginTop: '15px', marginBottom: '15px'}}>
                        <div className="card-body">
                            <h5 className="card-title">Signup</h5>
                                <form>
                                    <div className="form-inline">
                                        <label for="name">Name:</label>
                                        <input type="text" className="form-control" id="name" aria-describedby="name" placeholder="Enter your name" style={{marginTop: '5px', marginBottom: '5px'}}/>
                                    </div>
                                    <div class="form-inline">
                                        <label for="email">Email:</label>
                                        <input type="email" className="form-control" id="email" aria-describedby="email" placeholder="Enter email" style={{marginTop: '5px', marginBottom: '5px'}}/>
                                    </div>
                                    <div class="form-inline">
                                        <label for="password">Password:</label>
                                        <input type="password" className="form-control" id="password" placeholder="Enter password" style={{marginTop: '5px', marginBottom: '5px'}}/>
                                    </div>
                                    <button type="submit" id ="submit" className="btn btn-primary" style={{marginTop: '15px', marginBottom: '15px'}}>Submit</button>
                                    <Link to={"/"}><button className="btn btn-primary" style={{marginTop: '15px', marginBottom: '15px'}}>Return Home</button></Link>
                                </form>
                        </div>
                    </div>
                </div>      
            </div> 
  
        );}
        else{
            navigate("/");
            <Link to={"/"}><button class="btn btn-outline-dark">Return Home</button></Link>
        }

      }
  
}

export default SignUp;