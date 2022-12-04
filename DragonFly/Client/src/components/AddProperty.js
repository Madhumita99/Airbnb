import React,{useState} from "react";
import { Link, NavLink } from 'react-router-dom';

function AddProperty(){
    const[data, setProperty] = useState({
        title:'',
        city:'',
        state:'',
        country:'',
        location:'',
        photo:'',
        description:'',
        nightlyFee:'',
        cleaningFee:'',
        serviceFee:'',
        amenities:'',
        longTermStays:'',
        bedrooms:'',
        guests:'',
        reviews:'',
        available:'',
        dates:'',
        additional:''

    })
    

    const updateValue = (e)=>{
        
        setProperty({...data, [e.target.id] : e.target.value});
    }
    
    const submitData = (e) => {
        e.preventDefault()
        const dataProperty = {
            title: data.title,
            city: data.city,
            state: data.state,
            country: data.country,
            location: data.location,
            photo: data.photo,
            description: data.description,
            nightlyFee: data.nightlyFee,
            cleaningFee: data.cleaningFee,
            serviceFee: data.serviceFee,
            amenities: data.amenities,
            longTermStays: data.longTermStays,
            bedrooms: data.bedrooms,
            guests: data.guests,
            reviews: 1,
            available: true,
            dates: data.dates,
            additional: data.additional
            
        }
        fetch("http://localhost:3000/properties",{
            method:'POST',
            headers : { 
                'Content-Type': 'application/json',
                 'Accept': 'application/json'
              },
            body:JSON.stringify(dataProperty)
        })
        .then(response => response.json())
        .then(window.alert("Property added successfully"))
        .catch(e => {
            console.log("e",e)
        })
        
    }

    return(
        <div>
            <div className="d-flex justify-content-center">
                <div className="card" style={{marginTop: '15px', marginBottom: '15px'}}>
                    <div className="card-body">
                        <form>
                        <h5>Add Property</h5>
                        <div class="form-inline">
							<label for="title">Title:</label>
							<input type="text" className="form-control" id="title" aria-describedby="title" onChange = {updateValue} placeholder="Enter title" style={{marginTop: '5px', marginBottom: '5px'}}/>
						</div>
                        <div class="form-inline">
							<label for="city">City:</label>
							<input type="text" className="form-control" id="city" aria-describedby="city" onChange = {updateValue} placeholder="Enter city" style={{marginTop: '5px', marginBottom: '5px'}}/>
						</div>
                        <div class="form-inline">
							<label for="state">State:</label>
							<input type="text" className="form-control" id="state" aria-describedby="state" onChange = {updateValue} placeholder="Enter state" style={{marginTop: '5px', marginBottom: '5px'}}/>
						</div>
                        <div class="form-inline">
							<label for="country">Country:</label>
							<input type="text" className="form-control" id="country" aria-describedby="country" onChange = {updateValue} placeholder="Enter country" style={{marginTop: '5px', marginBottom: '5px'}}/>
						</div>
                        <div class="form-inline">
							<label for="location">Location:</label>
							<input type="text" className="form-control" id="location" aria-describedby="location" onChange = {updateValue} placeholder="Enter location" style={{marginTop: '5px', marginBottom: '5px'}}/>
						</div>
                        <div class="form-inline">
							<label for="photo">Photo:</label>
							<input type="file" className="form-control" id="photo" aria-describedby="photo" onChange = {updateValue} placeholder="Enter photo" style={{marginTop: '5px', marginBottom: '5px'}}/>
						</div>
                        <div class="form-inline">
							<label for="description">Description:</label>
							<input type="text" className="form-control" id="description" aria-describedby="description" onChange = {updateValue} placeholder="Enter description" style={{marginTop: '5px', marginBottom: '5px'}}/>
						</div>
                        <div class="form-inline">
							<label for="nightlyFee">Nightly Fee:</label>
							<input type="text" className="form-control" id="nightlyFee" aria-describedby="nightlyFee" onChange = {updateValue} placeholder="Enter nightly fee" style={{marginTop: '5px', marginBottom: '5px'}}/>
						</div>
                        <div class="form-inline">
							<label for="cleaningFee">Cleaning Fee:</label>
							<input type="text" className="form-control" id="cleaningFee" aria-describedby="cleaningFee" onChange = {updateValue} placeholder="Enter cleaning fee" style={{marginTop: '5px', marginBottom: '5px'}}/>
						</div>
                        <div class="form-inline">
							<label for="serviceFee">Service Fee:</label>
							<input type="text" className="form-control" id="serviceFee" aria-describedby="serviceFee" onChange = {updateValue} placeholder="Enter service fee" style={{marginTop: '5px', marginBottom: '5px'}}/>
						</div>
                        <div class="form-inline">
							<label for="amenities">Amenities:</label>
							<input type="text" className="form-control" id="amenities" aria-describedby="amenities" onChange = {updateValue} placeholder="Enter amenities" style={{marginTop: '5px', marginBottom: '5px'}}/>
						</div>
                        <div class="form-inline">
							<label for="longTermStays">Long Term Stays (Allowed/Not Allowed):</label>
							<input type="text" className="form-control" id="longTermStays" aria-describedby="longTermStays" onChange = {updateValue} placeholder="Enter long term stays" style={{marginTop: '5px', marginBottom: '5px'}}/>
						</div>
                        <div class="form-inline">
							<label for="bedrooms">Number of bedrooms:</label>
							<input type="text" className="form-control" id="bedrooms" aria-describedby="bedrooms" onChange = {updateValue} placeholder="Enter number of bedrooms" style={{marginTop: '5px', marginBottom: '5px'}}/>
						</div>
                        <div class="form-inline">
							<label for="guests">Number of bedrooms:</label>
							<input type="text" className="form-control" id="guests" aria-describedby="guests" onChange = {updateValue} placeholder="Enter number of guests" style={{marginTop: '5px', marginBottom: '5px'}}/>
						</div>
                        <div class="form-inline">
							<label for="available">Dates Available:</label>
							<input type="text" className="form-control" id="available" aria-describedby="available" onChange = {updateValue} placeholder="Enter dates available" style={{marginTop: '5px', marginBottom: '5px'}}/>
						</div>
                        <div class="form-inline">
							<label for="additional">Additional:</label>
							<input type="text" className="form-control" id="additional" aria-describedby="additional" onChange = {updateValue} placeholder="Enter additional info" style={{marginTop: '5px', marginBottom: '5px'}}/>
						</div>
                        <button type="button" id ="submit" className="btn btn-primary" style={{marginTop: '15px', marginBottom: '15px'}} onClick={submitData}>Submit</button>
                        <Link to={"/"}><button className="btn btn-primary" style={{marginTop: '15px', marginBottom: '15px'}}>Return Home</button></Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProperty;