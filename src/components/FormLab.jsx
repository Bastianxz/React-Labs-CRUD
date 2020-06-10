import React, {Component} from 'react';
import {Button, Card, CardBody, CardTitle, Col, CustomInput, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import axios from 'axios'

const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.name = 'Nombre es obligatorio'
    }
    if (!values.desc) {
        errors.desc = 'Descripcion es obligatorio'
    }
    if (!values.date) {
        errors.date = 'Fecha es obligatorio'
    }
    return errors
}
export default class FormLab extends Component {
    state = {
        errors: {},
        id: null,
        desc: null,
        name: null,
        date: null,
        active: false
    }

    constructor(props) {
        super(props);
        this.state = {
            ...this.state, ...props.itemSelect
        }
    }

    formatDateFormInput = (date) => {
        const curr = new Date(date);
        return curr.toISOString().substr(0, 10);
    }
    handleChangeRoute = newRoute => {
        const {handleChangeRoute} = this.props;
        handleChangeRoute(newRoute)
    }
    handleChange = ({target}) => {
        if (target.name === 'date') {
            this.setState({
                [target.name]: new Date(target.value)
            })
        } else if (target.name === 'active') {
            this.setState({
                [target.name]: !!target.checked
            })
        } else {
            this.setState({
                [target.name]: target.value
            })
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        const {errors, ...sinErrors} = this.state;
        const result = validate(sinErrors);
        this.setState({errors: result})
        if (!Object.keys(result).length) {
            //envio del formulario no hay errores
            axios.post('http://localhost:8080/entity', sinErrors).then((item) => {
                alert(sinErrors.id ? 'Item ' + sinErrors.id + 'Editado con exito' : 'Item Agregado con exito')
                this.handleChangeRoute('Lista')
            })
            e.target.reset();
        }
    }

    render() {
        const {errors, id, name, desc, date, active} = this.state
        return (
            <div>
                <Card>
                    <CardBody>
                        <Row>
                            <Col><CardTitle className="text-center h1">Formulario</CardTitle></Col>
                            <Col><h1 className="text-right"><Button onClick={() => {
                                this.handleChangeRoute('Lista')
                            }} color="secondary">Volver</Button></h1></Col>
                        </Row>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label hidden={!id} for="id">ID</Label>
                                <Input type={id ? 'text' : 'hidden'} readOnly defaultValue={id} id="id" name="id"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Nombre</Label>
                                <Input defaultValue={name} name="name" id="name"
                                       onChange={this.handleChange}/>
                                {errors.name && <p className="text-danger">{errors.name}</p>}
                            </FormGroup>
                            <FormGroup>
                                <Label for="desc">Descripcion</Label>
                                <Input defaultValue={desc} name="desc" id="desc"
                                       onChange={this.handleChange}/>
                                {errors.desc && <p className="text-danger">{errors.desc}</p>}
                            </FormGroup>
                            <FormGroup>
                                <Label for="date">Fecha</Label>
                                <Input type="date"
                                       defaultValue={date ? this.formatDateFormInput(date) : null}
                                       name="date" id="date"
                                       onChange={this.handleChange}/>
                                {errors.date && <p className="text-danger">{errors.date}</p>}
                            </FormGroup>
                            <FormGroup check className="text-center">
                                <Label for="active">Estado</Label>
                                <CustomInput
                                    defaultChecked={active}
                                    type="switch" id="active"
                                    name="active" onChange={this.handleChange}
                                />
                            </FormGroup>
                            <br/>


                            <FormGroup className=" text-center">
                                <input className="btn btn-primary" type="submit" value="Enviar"/>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        );
    }
}
