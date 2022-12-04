import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './external.css';

function Reservations() {
    var details = [];
    const [reservations, setReservations] = useState([]);
    //const localstorage_user = JSON.parse(localStorage.getItem('user'));
        // fetch('http://localhost:3000/' + localstorage_user._id + '/reservations', {
        // headers : { 
        //     'Content-Type': 'application/json',
        //     'Accept': 'application/json'
        // }
        // })
    fetch("reservations.json")
    .then( res => res.json() )
    .then( (data) => { 
        console.log('Got the reservations');
        setReservations(data);
    })
    .catch((error) => {
        console.log(error.message);
    });
    console.log(reservations);
    reservations.forEach( (data) => {
        details.push([data.propertyTitle, data.startDate, data.endDate, data.propertyNightlyFee, data.propertyCleaningFee, data.propertyServiceFee]);
    });
    return (
        <div>
            <div className="container-fluid text-center" style={{marginTop: '30px'}}>
                <div className="row">
                    <div className="col-md-1 side-section">
                    </div>
                    <div className="col-md-10">
                        Your reservations are as follows:
                        <div className="container-fluid" style={{marginTop: '30px'}}>
                        {details.map((reservation) => {
                            return(
                                <div>
                                    <div className="heading-segment">{ reservation[0] }</div>
                                    <div className="dates">Start Date: <span className="makeBold">{ reservation["photo"] }</span></div>
                                    <div className="dates">End Date: <span className="makeBold">{ reservation[2] }</span></div>
                                    <div className="dates">Nightly Fee: <span className="makeBold">{ reservation[3] }</span></div>
                                    <div className="dates">Cleaning fee: <span className="makeBold">{ reservation[4] }</span></div>
                                    <div className="dates">Service fee: <span className="makeBold">{ reservation[5] }</span></div>
                                    <hr></hr>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Reservations;