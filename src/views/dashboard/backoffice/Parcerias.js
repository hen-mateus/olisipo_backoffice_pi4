import React, { useEffect, useState } from "react";
import { Row, Col, Image, Table, Button, Modal, Form } from "react-bootstrap";
import axios from './axiosConfig';
import Card from "../../../components/Card";
import { Link } from "react-router-dom";
import { baseUrl } from './baseURL';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const formatTableCell = () => {
    return {
        maxWidth: '200px',
        overflow: 'hidden',
        whiteSpace: 'normal',
    };
};

const Parcerias = () => {
    const { pareciasId } = useParams();
    const [dataParcerias, setdataParcerias] = useState([]);
    const [datatiposParcerias, setdatatiposParcerias] = useState([])
    const [campTipoParceria, setcampTipoParceria] = useState([]);
    const [campNomeParceria, setcampNomeParceria] = useState([]);
    const [campDescricaoParceria, setcampDescricaoParceria] = useState([]);
    const [campBeneficiosParceria, setcampBeneficiosParceria] = useState([]);
    const [campImagemParceria, setcampImagemParceria] = useState([]);
    const [campPublicada, setcampPublicada] = useState([]);;

    const [campCriarTipoParceria, setcampCriarTipoParceria] = useState([]);
    const [campCriarNomeParceria, setcampCriarNomeParceria] = useState([]);
    const [campCriarDescricaoParceria, setcampCriarDescricaoParceria] = useState([]);
    const [campCriarBeneficiosParceria, setcampCriarBeneficiosParceria] = useState([]);
    const [campCriarImagemParceria, setcampCriarImagemParceria] = useState([]);

    const [parceriaIdEditar, setParceriaIdEditar] = useState(null);

    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleClose1 = () => {
        setParceriaIdEditar(null);
        setShow1(false);
    };
    const handleShow1 = () => setShow1(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const handleEditarClick = (parceriaId) => {
        setParceriaIdEditar(parceriaId);
        LoadParceriaIndividual(parceriaId);
        handleShow1();
    };

    const handleGuardarEdição = (parceriaId) => {
        updateParceria(parceriaId);
    };

    const handleNovaParceria = () => {
        handleShow2();
    };

    const handleCriarParceria = () => {
        inserirParceria();
    };

    useEffect(() => {
        LoadParcerias();
        LoadTipoParceria();
        if (pareciasId) {
            LoadParceriaIndividual(pareciasId);
        }
    }, [pareciasId]);

    function LoadParcerias() {
        const url = baseUrl + "/parcerias/";
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataParcerias(data);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error);
            });
    }

    function LoadTipoParceria() {
        const url = baseUrl + "/tipoparceria";
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdatatiposParcerias(data);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error);
            });
    }

    function LoadParceriaIndividual(parceriaId) {
        const url = baseUrl + "/parcerias/" + parceriaId;
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data[0];
                    setcampTipoParceria(data.id_tipo_parceria);
                    setcampNomeParceria(data.nome_parceria);
                    setcampDescricaoParceria(data.descricao_parceria);
                    setcampBeneficiosParceria(data.beneficios_parceria);
                    setcampImagemParceria(data.imagem_parceria);
                    setcampPublicada(data.parceria_publicada);
                }
                else {
                    alert("Error web service")
                }
            })
            .catch(error => {
                alert("Error server: " + error)
            })
    }

    function updateParceria(parceriaId) {
        const url = baseUrl + "/parcerias/update/" + parceriaId
        const dataput = {
            novo_id_tipo_parceria_param: campTipoParceria,
            novo_nome_param: campNomeParceria,
            nova_descricao_param: campDescricaoParceria,
            novos_beneficios_param: campBeneficiosParceria,
            nova_imagem_param: campImagemParceria,
            nova_publicacao_param: false
        }
        axios.put(url, dataput)
            .then(response => {
                if (response.data.success === true) {
                    alert(response.data.message)
                    LoadParcerias();
                }
                else {
                    alert("Error")
                }
            }).catch(error => {
                alert("Error 34 " + error)
            })
    }

    function inserirParceria() {
        if (campCriarTipoParceria === "") {
            alert("Atribua um tipo de parceria!")
        }
        else if (campCriarNomeParceria === "") {
            alert("Atribua um nome!")
        }
        else if (campCriarDescricaoParceria === "") {
            alert("Insira uma descrição!")
        }
        else if (campCriarBeneficiosParceria === "") {
            alert("Insira os benefícios!")
        }
        else if (campCriarImagemParceria === "") {
            alert("Insira uma imagem!")
        }
        else {
            const url = baseUrl + "/parcerias/create/";
            const datapost = {
                id_tipo_parceria_param: campCriarTipoParceria,
                nome_parceria_param: campCriarNomeParceria,
                descricao_parceria_param: campCriarDescricaoParceria,
                beneficios_parceria_param: campCriarBeneficiosParceria,
                imagem_parceria_param: campCriarImagemParceria,
                parceria_publicada_param: false,
            }
            axios.post(url, datapost)
                .then(response => {
                    if (response.data.success === true) {
                        alert(response.data.message)
                        LoadParcerias();
                    }
                    else {
                        alert(response.data.message)
                    }
                }).catch(error => {
                    alert("Error 34 " + error)
                })
        }
    }

    function DeleteParceria(id) {
        Swal.fire({
            title: 'Tem a certeza que quer eliminar?',
            text: 'Não vai conseguir recuperar esta parceria!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, eliminar!',
            cancelButtonText: 'Não, quero manter'
        }).then((result) => {
            if (result.value) {
                SendDeleteParceria(id)
            } else if (result.dismiss ===
                Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelado',
                    'A sua parceria não foi eliminada',
                    'error'
                )
            }
        })
    }

    function SendDeleteParceria(id) {
        const url = baseUrl + "/parcerias/delete/";
        axios.post(url, {
            id_parceria_param: id
        })
            .then(response => {
                if (response.data.success) {
                    Swal.fire(
                        'Eliminado!',
                        'A parceria foi eliminada com sucesso.',
                        'success'
                    )
                }
                LoadParcerias();
            })
            .catch(error => {
                alert("Error 325 ")
            })
    }

    function publicarParceria(parceriaId) {
        const url = baseUrl + "/parcerias/update/" + parceriaId;
        const dataput = {
            nova_publicacao_param: !dataParcerias.find(parceria => parceria.id_parceria === parceriaId).parceria_publicada
        };
        axios.put(url, dataput)
            .then(response => {
                if (response.data.success === true) {
                    alert(response.data.message);
                    LoadParcerias();
                } else {
                    alert("Error");
                }
            })
            .catch(error => {
                alert("Error 34 " + error);
            });
    }

    function TabelaParcerias() {
        return dataParcerias.map((data, index) => {
            return (
                <tr key={index}>
                    <td style={formatTableCell()} className="text-center fs-5 fw-bold">
                        {data.nome_parceria}
                    </td>
                    <td style={formatTableCell()}>
                        {data.descricao_parceria}
                    </td>
                    <td style={formatTableCell()} className="text-center">
                        {data.beneficios_parceria}
                    </td>
                    <td style={formatTableCell()} className="text-center fw-bold">
                        {data.tipo_parceria}
                    </td>
                    <td className="text-center" >
                        <img src="https://i.dummyjson.com/data/products/1/thumbnail.jpg" alt="Imagem" style={{ maxWidth: '100%', height: '100px' }} />
                    </td>
                    <td>
                        <div className="d-flex flex-column align-items-center mb-2 flex-wrap">
                            <div className="d-flex">
                                <Button
                                    variant="success"
                                    className="m-1"
                                    onClick={() => publicarParceria(data.id_parceria)}
                                >
                                    {data.parceria_publicada ? "Despublicar" : "Publicar"}
                                </Button>
                            </div>
                            <div className="d-flex">
                                <Button variant="info" className="m-1" onClick={() => handleEditarClick(data.id_parceria)}>Editar</Button>
                                <Modal
                                    show={show1 && parceriaIdEditar === data.id_parceria}
                                    onHide={handleClose1}
                                    backdrop="static"
                                    keyboard={false}
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Editar Parceria</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="nomep">Nome:</Form.Label>
                                                <Form.Control type="nomep" id="nomep" value={campNomeParceria}
                                                    onChange={(e) => setcampNomeParceria(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="descricaop">Descrição:</Form.Label>
                                                <Form.Control as="textarea" id="descricaop" value={campDescricaoParceria}
                                                    onChange={(e) => setcampDescricaoParceria(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="benp">Benefícios da Parceria:</Form.Label>
                                                <Form.Control as="textarea" id="benp" value={campBeneficiosParceria}
                                                    onChange={(e) => setcampBeneficiosParceria(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="imagemp">Imagem:</Form.Label>
                                                <Form.Control type="imagemp" id="imagemnp" value={campImagemParceria}
                                                    onChange={(e) => setcampImagemParceria(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="tipoParceria">Tipo de Parceria:</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    id="tipoParceria"
                                                    value={campTipoParceria}
                                                    onChange={(e) => setcampTipoParceria(e.target.value)}
                                                >
                                                    <option value="">Selecione um Tipo de Parceria</option>
                                                    {datatiposParcerias.map((tipo) => (
                                                        <option key={tipo.id_tipo_parceria} value={tipo.id_tipo_parceria}>
                                                            {tipo.tipo_parceria}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="primary" onClick={() => handleGuardarEdição(data.id_parceria)}>Guardar</Button>
                                    </Modal.Footer>
                                </Modal>
                                <Button variant="danger" className="m-1" onClick={() => DeleteParceria(data.id_parceria)}>Eliminar</Button>
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
                                <h4 className="card-title">Parcerias</h4>
                                <Button variant="info" className="mt-3" onClick={() => handleNovaParceria()}>Adicionar Nova Parceria</Button>
                                <Modal
                                    show={show2}
                                    onHide={handleClose2}
                                    backdrop="static"
                                    keyboard={false}
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Criar Parceria</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="nomep">Nome:</Form.Label>
                                                <Form.Control type="nomep" id="nomep" value={campCriarNomeParceria}
                                                    onChange={(e) => setcampCriarNomeParceria(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="descricaop">Descrição:</Form.Label>
                                                <Form.Control as="textarea" id="descricaop" value={campCriarDescricaoParceria}
                                                    onChange={(e) => setcampCriarDescricaoParceria(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="benp">Benefícios da Parceria:</Form.Label>
                                                <Form.Control as="textarea" id="benp" value={campCriarBeneficiosParceria}
                                                    onChange={(e) => setcampCriarBeneficiosParceria(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="imagemp">Imagem:</Form.Label>
                                                <Form.Control type="imagemp" id="imagemp" value={campCriarImagemParceria}
                                                    onChange={(e) => setcampCriarImagemParceria(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="tipoParceria">Tipo de Parceria:</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    id="tipoParceria"
                                                    value={campCriarTipoParceria}
                                                    onChange={(e) => setcampCriarTipoParceria(e.target.value)}
                                                >
                                                    <option value="" disabled>Selecione um Tipo de Parceria</option>
                                                    {datatiposParcerias.map((tipo) => (
                                                        <option key={tipo.id_tipo_parceria} value={tipo.id_tipo_parceria}>
                                                            {tipo.tipo_parceria}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="primary" onClick={() => handleCriarParceria()}>Criar Parceria</Button>
                                    </Modal.Footer>
                                </Modal>
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
                                        {TabelaParcerias()}
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
