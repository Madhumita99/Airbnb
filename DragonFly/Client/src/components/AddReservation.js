import React,{useState} from "react";
import { Link, NavLink, useLocation } from 'react-router-dom';

function AddReservation(){
    const[data, setProperty] = useState({
        startDate:'',
        endDate:''
    })
    const location = useLocation();
    const{properties} = location.state;

    const updateValue = (e)=>{
        
        setProperty({...data, [e.target.id] : e.target.value});
    }
    var today = new Date();
    
    const submitData = (e) => {
        e.preventDefault()
        const localstorage_user = JSON.parse(localStorage.getItem('user'))
        const dataProperty = {
            userId: localstorage_user._id,
            startDate: data.startDate.getFullYear() + '-' + (data.startDate.getMonth() + 1) + '-' + data.startDate.getDate(),
            endDate: data.endDate.getFullYear() + '-' + (data.endDate.getMonth() + 1) + '-' + data.endDate.getDate(),
            bookingDate: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
            propertyTitle: properties.title,
            propertyNightlyFee: properties.nightlyFee,
            propertyCleaningFee: properties.cleaningFee,
            propertyServiceFee: properties.serviceFee
        }
        fetch("http://localhost:3000/" + localstorage_user._id + "/reservations",{
            method:'POST',
            headers : { 
                'Content-Type': 'application/json',
                 'Accept': 'application/json'
              },
            body:JSON.stringify(dataProperty)
        })
        .then(response => response.json())
        .then(window.alert("Reservation added successfully"))
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
                        <h5>Add Reservation</h5>
                        <div class="form-inline">
							<label for="startDate">Check-in Date:</label>
							<input type="date" className="form-control" id="startDate" aria-describedby="startDate" onChange = {updateValue} value="2022-07-22" min="2022-01-01" max="2022-12-31" style={{marginTop: '5px', marginBottom: '5px'}}/>
						</div>
                        <div class="form-inline">
							<label for="endDate">Check-out Date:</label>
							<input type="date" className="form-control" id="endDate" aria-describedby="endDate" onChange = {updateValue} value="2022-07-22" min="2022-01-01" max="2022-12-31" style={{marginTop: '5px', marginBottom: '5px'}}/>
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

export default AddReservation;