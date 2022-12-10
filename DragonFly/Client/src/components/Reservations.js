import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './external.css';
import CancelReservation from './CancelReservation'

function Reservations() {
    var pastdetails = [];
    var futuredetails = [];
    const [reservations, setReservations] = useState([]);
    const today =  new Date();

    useEffect (() => {
        const localstorage_user = JSON.parse(localStorage.getItem('user'));
        fetch('http://localhost:3000/reservations/' + localstorage_user._id, {
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        })
        .then( res => res.json() )
        .then( (data) => { 
            console.log('Got the reservations');
            setReservations(data);
        })
        .catch((error) => {
            console.log(error.message);
        });
    }, []);

    reservations.forEach( (data) => {
        if(new Date(data.startDate) < today){
            pastdetails.push([data.propertyTitle, data.startDate, data.endDate, data.propertyNightlyFee, data.propertyCleaningFee, data.propertyServiceFee, data._id]);
        }
        else {
            futuredetails.push([data.propertyTitle, data.startDate, data.endDate, data.propertyNightlyFee, data.propertyCleaningFee, data.propertyServiceFee, data._id]);
        }
    });

    return (
        <div>
            <div className="container-fluid text-center" style={{marginTop: '30px'}}>
                <div className="row">
                <nav className="navbar navbar-light bg-light">
                    <span className="navbar-brand mb-0 h1">Past Reservations</span>
                </nav>
                    <div className="col-md-1 side-section">
                    </div>
                    <div className="col-md-10">
                        Your past reservations are as follows:
                        <div className="container-fluid" style={{marginTop: '30px'}}>
                        {pastdetails.map((reservation) => {
                            return(
                                <div>
                                    <div className="heading-segment">{ reservation[0] }</div>
                                    <div className="dates">Start Date: <span className="makeBold">{ reservation[1] }</span></div>
                                    <div className="dates">End Date: <span className="makeBold">{ reservation[2] }</span></div>
                                    <div className="dates">Nightly Fee: <span className="makeBold">${ reservation[3] } per night</span></div>
                                    <div className="dates">Cleaning fee: <span className="makeBold">${ reservation[4] }</span></div>
                                    <div className="dates">Service fee: <span className="makeBold">${ reservation[5] }</span></div>
                                    <hr></hr>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                    <nav className="navbar navbar-light bg-light">
                        <span className="navbar-brand mb-0 h1">Future Reservations</span>
                    </nav>
                    <div className="col-md-1 side-section">
                    </div>
                    <div className="col-md-10">
                        Your future reservations are as follows:
                        <div className="container-fluid" style={{marginTop: '30px'}}>
                        {futuredetails.map((reservation) => {
                            return(
                                <div>
                                    <CancelReservation reservation={reservation}/>
                                    <div className="heading-segment">{ reservation[0] }</div>
                                    <div className="dates">Start Date: <span className="makeBold">{ reservation[1] }</span></div>
                                    <div className="dates">End Date: <span className="makeBold">{ reservation[2] }</span></div>
                                    <div className="dates">Nightly Fee: <span className="makeBold">${ reservation[3] } per night</span></div>
                                    <div className="dates">Cleaning fee: <span className="makeBold">${ reservation[4] }</span></div>
                                    <div className="dates">Service fee: <span className="makeBold">${ reservation[5] }</span></div>
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