import React from "react";
import { Row, Col, Image, Table, Button } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";

//progressbar
import Progress from "../../../components/progress.js";

// img
import shap1 from "../../../assets/images/shapes/01.png";
import shap2 from "../../../assets/images/shapes/02.png";
import shap3 from "../../../assets/images/shapes/03.png";
import shap4 from "../../../assets/images/shapes/04.png";
import shap5 from "../../../assets/images/shapes/05.png";
import shap6 from "../../../assets/images/shapes/06.png";

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
                                            <th>Parceria</th>
                                            <th>Descrição</th>
                                            <th>Benefícios</th>
                                            <th>Categoria</th>
                                            <th>Imagem</th>

                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h6>Vera Alves</h6>

                                            </td>
                                            <td>
                                                <div>
                                                    <div>
                                                        2023
                                                    </div>
                                                </div>
                                            </td>
                                            <td>Janeiro</td>
                                            <td>
                                                <div>31/01/2023</div>
                                            </td>
                                            <td>

                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center mb-2">
                                                    <Button variant="success" onClick={handleSimClick}>Publicar</Button>
                                                </div>

                                                <div className="d-flex align-items-center mb-2">
                                                    <Button variant="info" onClick={handleSimClick}>Editar</Button>
                                                </div>
                                                <div className="d-flex align-items-center mb-2">
                                                    <Button variant="danger" onClick={handleNaoClick}>Eliminar</Button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h6>Manuel Pinto</h6>
                                            </td>
                                            <td>
                                                <div>
                                                    <div>
                                                        2023
                                                    </div>
                                                </div>
                                            </td>
                                            <td>Janeiro</td>
                                            <td>
                                                <div>31/01/2023</div>
                                            </td>
                                            <td></td>
                                            <td>
                                                <div className="d-flex align-items-center mb-2">
                                                    <Button variant="success" onClick={handleSimClick}>Publicar</Button>
                                                </div>
                                                <div className="d-flex align-items-center mb-2">
                                                    <Button variant="info" onClick={handleSimClick}>Editar</Button>
                                                </div>
                                                <div className="d-flex align-items-center mb-2">
                                                    <Button variant="danger" onClick={handleNaoClick}>Eliminar</Button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>

                                                <h6>João Santos</h6>

                                            </td>
                                            <td>
                                                <div>
                                                    <div>
                                                        2023
                                                    </div>
                                                </div>
                                            </td>
                                            <td>Janeiro</td>
                                            <td>
                                                <div>31/01/2023</div>
                                            </td>
                                            <td>

                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center mb-2">
                                                    <Button variant="success" onClick={handleSimClick}>Publicar</Button>
                                                </div>
                                                <div className="d-flex align-items-center mb-2">
                                                    <Button variant="info" onClick={handleSimClick}>Editar</Button>
                                                </div>
                                                <div className="d-flex align-items-center mb-2">
                                                    <Button variant="danger" onClick={handleNaoClick}>Eliminar</Button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>

                                                <h6>Beatriz Santos</h6>

                                            </td>
                                            <td>
                                                <div>
                                                    <div>
                                                        2023
                                                    </div>
                                                </div>
                                            </td>
                                            <td>Janeiro</td>
                                            <td>
                                                <div>31/01/2023</div>
                                            </td>


                                            <td>

                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center mb-2">
                                                    <Button variant="success" onClick={handleSimClick}>Publicar</Button>
                                                </div>
                                                <div className="d-flex align-items-center mb-2">
                                                    <Button variant="info" onClick={handleSimClick}>Editar</Button>
                                                </div>
                                                <div className="d-flex align-items-center mb-2">
                                                    <Button variant="danger" onClick={handleNaoClick}>Eliminar</Button>
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
