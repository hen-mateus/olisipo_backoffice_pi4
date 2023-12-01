import React from "react";
import { Row, Col, Image, Table, Button } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";

const formatTableCell = () => {
    return {
        maxWidth: '200px',
        overflow: 'hidden',
        whiteSpace: 'normal',
    };
};

const Parcerias = () => {
    const handleSimClick = () => {
        // Lógica para lidar com o clique no botão "Sim"
    };

    const handleNaoClick = () => {
        // Lógica para lidar com o clique no botão "Não"
    };

    return (
        <>
            <Row>
                <Col sm="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="card-title">Parcerias</h4>
                            </div>
                        </Card.Header>
                        <Card.Body className="p-0">
                            <div className="table-responsive mt-4">
                                <Table striped id="basic-table" className="mb-0" role="grid">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Parceria</th>
                                            <th className="text-center">Descrição</th>
                                            <th className="text-center">Benefícios</th>
                                            <th className="text-center">Categoria</th>
                                            <th className="text-center">Imagem</th>
                                            <th className="text-center">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={formatTableCell()} className="text-center"   >
                                                <h6 className="fs-4 fw-bold">FitnessUp</h6>
                                            </td>
                                            <td style={formatTableCell()}>
                                                <div>
                                                    <div>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={formatTableCell()}>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            </td>
                                            <td style={formatTableCell()} className="text-center fs-4 fw-bold">
                                                <div>Desporto</div>
                                            </td>
                                            <td className="text-center" >
                                                <img src="https://i.dummyjson.com/data/products/1/thumbnail.jpg" alt="Imagem" style={{ maxWidth: '100%', height: '100px' }} />
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column align-items-center mb-2 flex-wrap">
                                                    <div className="d-flex">
                                                        <Button variant="success" className="m-1" onClick={handleSimClick}>Publicar</Button>
                                                        <Button variant="info" className="m-1" onClick={handleSimClick}>Editar</Button>
                                                    </div>
                                                    <div className="d-flex">
                                                        <Button variant="danger" className="m-1" onClick={handleNaoClick}>Eliminar</Button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Parcerias;
