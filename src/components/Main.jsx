import React from 'react';
import logo from './../logo.svg';
import './../App.css';
import {Button} from 'reactstrap';

function Main(props) {
    const handleChangeRoute = newRoute => {
        const {handleChangeRoute} = props
        handleChangeRoute(newRoute)
    }
    return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    React Labs
                </p>
                <Button color="primary" onClick={() => handleChangeRoute('Lista')}>Ingresar</Button>

            </div>
        </div>
    );
}

export default Main;
