import React, { useEffect, useState } from "react";
import { Row, Col, Image, Table, Button, Modal, Form } from "react-bootstrap";
import axios from 'axios';
import Card from "../../../components/Card";
import { Link } from "react-router-dom";
import { baseUrl } from './baseURL';
import { useParams } from 'react-router-dom';

const formatTableCell = () => {
    return {
        maxWidth: '200px',
        overflow: 'hidden',
        whiteSpace: 'normal',
    };
};


const Notícias = () => {
    const { noticiasId } = useParams();
    const [dataNoticias, setdataNoticias] = useState([]);
    const [dataNoticiasEdit, setdataNoticiasEdit] = useState([]);
    const [campTipoNoticia, setcampTipoNoticia] = useState([]);
    const [campTituloNoticia, setcampTituloNoticia] = useState([]);
    const [campSubtituloNoticia, setcampSubtituloNoticia] = useState([]);
    const [campCorpoNoticia, setcampCorpoNoticia] = useState([]);
    const [campImagemNoticia, setcampImagemNoticia] = useState([]);
    const [campPublicada, setcampPublicada] = useState([]);
    const [datatiposNoticias, setdatatipoNoticias] = useState([]);

    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const handleEditarClick = (noticiaId) => {
        LoadNoticiaIndividual(noticiaId);
        handleShow1();
    };

    const handleGuardarEdição = (noticiaId) => {
        updateNoticia(noticiaId);
    };

    const handleNovaNoticia = () => {

        handleShow2();
    };

    const handleCriarNoticia = () => {
        inserirNoticia();
    };

    useEffect(() => {
        LoadNoticias();
        LoadTipoNoticias();
        if (noticiasId) {
            LoadNoticiaIndividual(noticiasId);
        }
    }, [noticiasId]);

    function LoadNoticias() {
        const url = baseUrl + "/noticias/";
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataNoticias(data);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error);
            });
    }

    function LoadTipoNoticias() {
        const url = baseUrl + "/tiponoticia";
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdatatipoNoticias(data);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error);
            });
    }

    function LoadNoticiaIndividual(noticiaId) {
        const url = baseUrl + "/noticias/" + noticiaId;
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data[0];
                    setdataNoticiasEdit(data);
                    setcampTipoNoticia(data.id_tipo_noticia);
                    setcampTituloNoticia(data.titulo_noticia);
                    setcampSubtituloNoticia(data.subtitulo_noticia);
                    setcampCorpoNoticia(data.corpo_noticia);
                    setcampImagemNoticia(data.imagem_noticia);
                    setcampPublicada(data.noticia_publicada);
                }
                else {
                    alert("Error web service")
                }
            })
            .catch(error => {
                alert("Error server: " + error)
            })
    }

    function updateNoticia(noticiaId) {
        const url = baseUrl + "/noticias/update/" + noticiaId
        console.log(url)
        const dataput = {
            novo_id_tipo_noticia_param: campTipoNoticia,
            novo_titulo_param: campTituloNoticia,
            novo_subtitulo_param: campSubtituloNoticia,
            novo_corpo_param: campCorpoNoticia,
            nova_imagem_param: campImagemNoticia,
            nova_publicacao_param: campPublicada
        }
        console.log(dataput)
        axios.put(url, dataput)
            .then(response => {
                if (response.data.success === true) {
                    alert(response.data.message)
                }
                else {
                    alert("Error")
                }
            }).catch(error => {
                alert("Error 34 " + error)
            })
    }

    function inserirNoticia() {
        if (campTipoNoticia === "") {
            alert("Atribua um tipo de notícia!")
        }
        else if (campTituloNoticia === "") {
            alert("Atribua um título!")
        }
        else if (campSubtituloNoticia === "") {
            alert("Insira um subtítulo!")
        }
        else if (campCorpoNoticia === "") {
            alert("Insira um corpo!")
        }
        else if (campImagemNoticia === "") {
            alert("Insira uma imagem!")
        }
        else {
            const url = baseUrl + "/noticias/create/";
            const datapost = {
                id_tipo_noticia_param: campTipoNoticia,
                titulo_noticia_param: campTituloNoticia,
                subtitulo_noticia_param: campSubtituloNoticia,
                corpo_noticia_param: campCorpoNoticia,
                imagem_noticia_param: campImagemNoticia,
                noticia_publicada_param: false,
            }

            axios.post(url, datapost)
                .then(response => {

                    if (response.data.success === true) {
                        alert(response.data.message)
                    }
                    else {
                        alert(response.data.message)
                    }
                }).catch(error => {
                    alert("Error 34 " + error)
                })
        }
    }

    function TabelaNoticias() {
        return dataNoticias.map((data, index) => {
            return (
                <tr key={index}>
                    <td style={formatTableCell()} className="text-center fs-5 fw-bold">
                        {data.titulo_noticia}
                    </td>
                    <td style={formatTableCell()} className="text-center">
                        {data.subtitulo_noticia}
                    </td>
                    <td style={formatTableCell()} className="text-center">
                        {data.corpo_noticia}
                    </td>
                    <td style={formatTableCell()} className="text-center fw-bold">
                        {data.tipo_noticia}
                    </td>
                    <td className="text-center" >
                        <img src="https://i.dummyjson.com/data/products/1/thumbnail.jpg" alt="Imagem" style={{ maxWidth: '100%', height: '100px' }} />
                    </td>
                    <td>
                        <div className="d-flex flex-column align-items-center mb-2 flex-wrap">
                            <div className="d-flex">
                                <Button variant="success" className="m-1" onClick="">Publicar</Button>
                                <Button variant="info" className="m-1" onClick={() => handleEditarClick(data.id_noticia)}>Editar</Button>
                                <Button variant="info" className="m-1" onClick={() => handleNovaNoticia()}>Nova</Button>
                                <Modal
                                    show={show1}
                                    onHide={handleClose1}
                                    backdrop="static"
                                    keyboard={false}
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Editar Notícia</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="titulon">Título:</Form.Label>
                                                <Form.Control type="titulon" id="titulon" value={campTituloNoticia}
                                                    onChange={(e) => setcampTituloNoticia(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="subtitulon">Subtítulo:</Form.Label>
                                                <Form.Control type="subtitulon" id="subtitulon" value={campSubtituloNoticia}
                                                    onChange={(e) => setcampSubtituloNoticia(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="corpon">Corpo da Notícia:</Form.Label>
                                                <Form.Control as="textarea" id="corpon" value={campCorpoNoticia}
                                                    onChange={(e) => setcampCorpoNoticia(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="imagemn">Imagem:</Form.Label>
                                                <Form.Control type="imagemn" id="imagemn" value={campImagemNoticia}
                                                    onChange={(e) => setcampImagemNoticia(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="tipoNoticia">Tipo de Notícia:</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    id="tipoNoticia"
                                                    value={campTipoNoticia}
                                                    onChange={(e) => setcampTipoNoticia(e.target.value)}
                                                >
                                                    <option value="">Selecione um Tipo de Notícia</option>
                                                    {datatiposNoticias.map((tipo) => (
                                                        <option key={tipo.id_tipo_noticia} value={tipo.id_tipo_noticia}>
                                                            {tipo.tipo_noticia}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="primary" onClick={() => handleGuardarEdição(data.id_noticia)}>Guardar</Button>
                                    </Modal.Footer>
                                </Modal>
                                <Modal
                                    show={show2}
                                    onHide={handleClose2}
                                    backdrop="static"
                                    keyboard={false}
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Editar Notícia</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="titulon">Título:</Form.Label>
                                                <Form.Control type="titulon" id="titulon" value={campTituloNoticia}
                                                    onChange={(e) => setcampTituloNoticia(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="subtitulon">Subtítulo:</Form.Label>
                                                <Form.Control type="subtitulon" id="subtitulon" value={campSubtituloNoticia}
                                                    onChange={(e) => setcampSubtituloNoticia(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="corpon">Corpo da Notícia:</Form.Label>
                                                <Form.Control as="textarea" id="corpon" value={campCorpoNoticia}
                                                    onChange={(e) => setcampCorpoNoticia(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="imagemn">Imagem:</Form.Label>
                                                <Form.Control type="imagemn" id="imagemn" value={campImagemNoticia}
                                                    onChange={(e) => setcampImagemNoticia(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="tipoNoticia">Tipo de Notícia:</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    id="tipoNoticia"
                                                    value={campTipoNoticia}
                                                    onChange={(e) => setcampTipoNoticia(e.target.value)}
                                                >
                                                    <option value="">Selecione um Tipo de Notícia</option>
                                                    {datatiposNoticias.map((tipo) => (
                                                        <option key={tipo.id_tipo_noticia} value={tipo.id_tipo_noticia}>
                                                            {tipo.tipo_noticia}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="primary" onClick={() => handleCriarNoticia()}>Criar Notícia</Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            <div className="d-flex">
                                <Button variant="danger" className="m-1" onClick="">Eliminar</Button>
                            </div>
                        </div>
                    </td>
                </tr>
            );
        });
    }

    return (
        <>
            <Row>
                <Col sm="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="card-title">Notícias</h4>
                            </div>
                        </Card.Header>
                        <Card.Body className="p-0">
                            <div className="table-responsive mt-4">
                                <Table striped id="basic-table" className="mb-0" role="grid">
                                    <thead>
                                        <tr>

                                            <th className="text-center">Título</th>
                                            <th className="text-center">Subtítulo</th>
                                            <th className="text-center">Corpo da Notícia</th>
                                            <th className="text-center">Tipo de Notícia</th>
                                            <th className="text-center">Imagem</th>
                                            <th className="text-center">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {TabelaNoticias()}
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

export default Notícias;
