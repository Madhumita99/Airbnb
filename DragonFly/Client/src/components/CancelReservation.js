import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './external.css';

function CancelReservation(props) {

    const reservation = props.reservation;
    const today =  new Date();

    const validCancel = (reservation) => {
        if((new Date(reservation[1])-today)/(1000*60*60) < 48)
            return true;
        else 
            return false;
    }
    
    const deleteReservation = () => {
        const localstorage_user = JSON.parse(localStorage.getItem('user'));
        fetch('http://localhost:3000/reservations/' + localstorage_user._id + "/" + reservation[6],{
                method:'DELETE'
            })
            .then(response => response.json())
            .then(window.alert("Reservation deleted successfully"))
            .catch(e => {
                console.log("e",e)
        })
    }
    return (
        <div>
            <button type='button' style={{float: 'right'}} onClick={deleteReservation} disabled={validCancel(reservation)}>
                Cancel
            </button>
        </div>
    );
}

export default CancelReservation;