import React,{useState} from "react";
import { Link, useParams } from 'react-router-dom';

function UpdateProperty(){
    
    const {id} = useParams();
    const[data, setProperty] = useState({
        description:'',
        nightlyFee:'',
        cleaningFee:'',
        serviceFee:'',
        amenities:'',
        longTermStays:'',
        bedrooms:'',
        guests:'',
        additional:''

    })
    

    const updateValue = (e)=>{
        
        setProperty({...data, [e.target.id] : e.target.value});
    }
    
    const submitData = (e) => {
        e.preventDefault()
        const dataProperty = {
            description: data.description,
            nightlyFee: data.nightlyFee,
            cleaningFee: data.cleaningFee,
            serviceFee: data.serviceFee,
            amenities: data.amenities,
            longTermStays: data.longTermStays,
            bedrooms: data.bedrooms,
            guests: data.guests,
            additional: data.additional
            
        }
        fetch("http://localhost:3000/properties/"+id,{
            method:'PATCH',
            headers : { 
                'Content-Type': 'application/json',
                 'Accept': 'application/json'
              },
            body:JSON.stringify(dataProperty)
        })
        .then(response => response.json())
        .then(window.alert("Property updated successfully"))
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
                        <h5>Update Property (Fill all details)</h5>
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
							<label for="bedrooms">Number of bedrooms:</label>
							<input type="text" className="form-control" id="bedrooms" aria-describedby="bedrooms" onChange = {updateValue} placeholder="Enter number of bedrooms" style={{marginTop: '5px', marginBottom: '5px'}}/>
						</div>
                        <div class="form-inline">
							<label for="guests">Number of guests:</label>
							<input type="text" className="form-control" id="guests" aria-describedby="guests" onChange = {updateValue} placeholder="Enter number of guests" style={{marginTop: '5px', marginBottom: '5px'}}/>
						</div>
                        <div class="form-inline">
							<label for="additional">Additional:</label>
							<input type="text" className="form-control" id="additional" aria-describedby="additional" onChange = {updateValue} placeholder="Enter additional info" style={{marginTop: '5px', marginBottom: '5px'}}/>
						</div>
                        <button type="button" id ="submit" className="btn btn-primary" style={{marginTop: '15px', marginBottom: '15px'}} onClick={submitData}>Submit</button>
                        <Link to={"/welcome"}><button className="btn btn-primary" style={{ marginLeft: '10px', marginTop: '15px', marginBottom: '15px'}}>Return Home</button></Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateProperty;