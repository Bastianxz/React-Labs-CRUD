import React, {Component} from 'react';
import Main from "./components/Main";
import List from "./components/List";
import {Button, Container} from 'reactstrap';
import FormLab from "./components/FormLab";
import logo from "./logo.svg";

export default class App extends Component {
    state = {
        route: 'Formulario',
        itemSelect: null
    }
    handleChangeRoute = (newRoute, item) => {
        this.setState({route: newRoute, itemSelect: item})
    }

    render() {
        const {route, itemSelect} = this.state;
        return (
            <div>
                <React.Fragment key="Main">
                    {route === 'Main' && <Main handleChangeRoute={this.handleChangeRoute}/>}
                </React.Fragment>
                <React.Fragment key="Logo de modulos">
                    {route !== 'Main' &&
                    <div><h5
                        className="m-4">React Labs</h5><img src={logo} className="App-logo-module" alt="logo"
                                                            width="100px"/><br/>
                    </div>}
                </React.Fragment>
                <Container>
                    <React.Fragment>
                        {route === 'Lista' && <List handleChangeRoute={this.handleChangeRoute}/>}
                    </React.Fragment>
                    <React.Fragment>
                        {route === 'Formulario' &&
                        <FormLab itemSelect={itemSelect} handleChangeRoute={this.handleChangeRoute}/>}
                    </React.Fragment>
                    <React.Fragment>
                        {route !== 'Main' && <div className="m-2 text-right">
                            <Button color="danger"
                                    onClick={() => this.handleChangeRoute('Main')}>Salir</Button>
                        </div>}
                    </React.Fragment>
                </Container>
            </div>
        );
    }
}
