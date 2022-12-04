import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

function HostSignUp()  {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  let navigate = useNavigate();

  useEffect( () =>{
    document.getElementById('submit').onclick = function() {
            var name = document.getElementById('name').value
              var em = document.getElementById('email').value
              var pass = document.getElementById('password').value
              var phone = document.getElementById('phone').value
              var img = document.getElementById('image').value
              var loc = document.getElementById('location').value
              var about = document.getElementById('aboutme').value
              var details = document.getElementById('details').value
            console.log(JSON.stringify( {  // you will get user information from login form
                name: name,
                email: em,
                hsignuppswd: pass,
                phoneNo: phone,
                image: img,
                location: loc,
                aboutMe: about,
                details: details
      
              } ))
              console.log('Host signup form submitted succesfully')
              fetch('http://localhost:3000/hostregister', {
                method: "POST",
                body: JSON.stringify( {  // you will get user information from login form
                    name: name,
                    email: em,
                    hsignuppswd: pass,
                    phoneNo: phone,
                    image: img,
                    location: loc,
                    aboutMe: about,
                    details: details
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
                      alert('Host already exists. Try a different email address')
                  }
                  else if(data.mess === "blank")
                  {
                      alert('Please fill all fields')
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
                <div class="d-flex justify-content-center">

        <div class="card" style={{marginTop: '15px', marginBottom: '15px'}}>
            <div class="card-body">
              <h5 class="card-title" >Host signup</h5>

              <form>
                <div class="form-inline">
                    <label for="name">Name:</label>
                    <input type="text" class="form-control" id="name" aria-describedby="name" placeholder="Enter your name" style={{marginTop: '5px', marginBottom: '5px'}}/>
                  </div>
                <div class="form-inline">
                  <label for="email">Email:</label>
                  <input type="email" class="form-control" id="email" aria-describedby="email" placeholder="Enter email" style={{marginTop: '5px', marginBottom: '5px'}}/>
                </div>
                <div class="form-inline">
                  <label for="password">Password:</label>
                  <input type="password" class="form-control" id="password" placeholder="Enter password" style={{marginTop: '5px', marginBottom: '5px'}}/>
                </div>
                <div class="form-inline">
                    <label for="password">Phone:</label>
                    <input type="number" class="form-control" id="phone" placeholder="Enter your phone" style={{marginTop: '5px', marginBottom: '5px'}}/>
                </div>
                <div class="form-inline">
                    <label for="image">Image:</label>
                    <input type="file" class="form-control" id="image" placeholder="Upload your photo" style={{marginTop: '5px', marginBottom: '5px'}}/>
                </div>
                <div class="form-inline">
                    <label for="location">Location:</label>
                    <input type="text" class="form-control" id="location" placeholder="Enter location" style={{marginTop: '5px', marginBottom: '5px'}}/>
                </div>
                <div class="form-inline">
                    <label for="details">Details:</label>
                    <input type="text" class="form-control" id="details" placeholder="Enter details" style={{marginTop: '5px', marginBottom: '5px'}}/>
                </div>

                <button type="submit" id ="submit" class="btn btn-primary" style={{marginTop: '15px', marginBottom: '15px'}}>Submit</button>
              </form>
            </div>
          </div>


    </div>  
            </div> 
  
        );}
        else{
            navigate("/welcome")
        }

      }
  
}

export default HostSignUp;