import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, Card, CardBody, Col, Row, Table} from 'reactstrap';
import axios from 'axios'

function List(props) {
    const [data, setData] = useState([])
    const formatDate = inputDate => {
        const date = new Date(inputDate);
        date.setDate(date.getDate() + 1)

        return date.toLocaleDateString();
    }
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        axios.get('http://localhost:8080/entity').then((data) => {
            setData(data.data)
        })
    }, [refresh]);
    const itemTable = data.map((item) =>
        <tr key={item.id}>
            <th scope="row">{item.id}</th>
            <td>{item.name}</td>
            <td>{item.desc}</td>
            <td>{item.date ? formatDate(item.date) : 'N/A'}</td>
            <td>{item.active ? 'Activo' : 'Inactivo'}</td>
            <td>
                <ButtonGroup>
                    <Button onClick={() => {
                        onForm('Formulario', item)
                    }}>Editar</Button>
                    <Button color="danger" onClick={() => {
                        onDeleteItem(item.id)
                    }}>Eliminar</Button>
                </ButtonGroup></td>
        </tr>
    );
    const onForm = (newRoute, item) => {
        const {handleChangeRoute} = props;
        handleChangeRoute(newRoute, item)
    }
    const onDeleteItem = (id) => {
        console.log(id)
        axios.delete('http://localhost:8080/entity/' + id).then((response) => {
            setRefresh(true);
            alert('Item ' + id + ' eliminado con exito');
        })
    }
    return (
        <div>
            <Card>
                <CardBody>
                    <Row>
                        <Col><h1 className="text-center">Lista</h1></Col>
                        <Col><h1 className="text-right"><Button color="primary" onClick={() => onForm('Formulario')}>+
                            Agregar</Button></h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="table-responsive"> <Table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Descripcion</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th>Opciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {itemTable}
                            </tbody>
                        </Table></Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
}

export default List;
