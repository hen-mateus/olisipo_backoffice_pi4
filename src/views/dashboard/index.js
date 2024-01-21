import React, { useEffect, useState, memo, Fragment } from "react";
import { Row, Col, Image, Table, Button, Modal, Form, Pagination, Dropdown } from "react-bootstrap";
import Card from "../../components/Card";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from '../dashboard/backoffice/axiosConfig';
import { baseUrl } from '../dashboard/backoffice/baseURL';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faUser, faUserShield, faUserTie } from '@fortawesome/free-solid-svg-icons';
import Circularprogressbar from "../../components/circularprogressbar.js";
import AOS from "aos";
import "../../../node_modules/aos/dist/aos";
import "../../../node_modules/aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
import * as SettingSelector from "../../store/setting/selectors";
SwiperCore.use([Navigation]);

const Index = memo((props) => {
  useSelector(SettingSelector.theme_color);

  const getVariableColor = () => {
    let prefix =
      getComputedStyle(document.body).getPropertyValue("--prefix") || "bs-";
    if (prefix) {
      prefix = prefix.trim();
    }
    const color1 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}primary`
    );
    const color2 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}info`
    );
    const color3 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}primary-tint-20`
    );
    const color4 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}warning`
    );
    return {
      primary: color1.trim(),
      info: color2.trim(),
      warning: color4.trim(),
      primary_light: color3.trim(),
    };
  };
  const variableColors = getVariableColor();

  const colors = [variableColors.primary, variableColors.info];
  useEffect(() => {
    return () => colors;
  });

  useEffect(() => {
    AOS.init({
      startEvent: "DOMContentLoaded",
      disable: function () {
        var maxWidth = 996;
        return window.innerWidth < maxWidth;
      },
      throttleDelay: 10,
      once: true,
      duration: 700,
      offset: 10,
    });
  });

  const [managers, setManagers] = useState([]);
  const [roles, setRoles] = useState([]);
  const { pessoasId } = useParams();
  const [dataEstatisticas, setdataEstatisticas] = useState([]);
  const [dataPessoas, setdataPessoas] = useState([]);
  const [pessoaIdEditar, setpessoaIdEditar] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataPessoas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dataPessoas.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    LoadEstatisticas();
    LoadPessoas();
    if (pessoasId) {
      LoadPessoaIndividual(pessoasId);
    }
    const fetchRoles = async () => {
      try {
        const response = await axios.get(baseUrl + "/roles");
        setRoles(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar os roles:", error);
      }
    };
    const fetchManagers = async () => {
      try {
        const response = await axios.get(baseUrl + "/pessoas/managers");
        setManagers(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar os managers:", error);
      }
    };
    fetchRoles();
    fetchManagers();
  }, [pessoasId]);

  function LoadPessoas() {
    const url = baseUrl + "/pessoas/";
    axios.get(url)
      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          setdataPessoas(data);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  function LoadEstatisticas() {
    const url = baseUrl + "/estatisticas/";
    axios.get(url)
      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          setdataEstatisticas(data);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  function Estatisticas() {
    return dataEstatisticas.map((data, index) => {
      return (
        <Row className="row-cols-1">
          <div
            className="overflow-hidden d-slider1 "
            data-aos="fade-up"
            data-aos-delay="800"
          >
            <Swiper
              className="p-0 m-0 mb-2 list-inline"
              slidesPerView={4}  // Display only 4 cards
              spaceBetween={32}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              breakpoints={{
                320: { slidesPerView: 1 },
                550: { slidesPerView: 2 },
                991: { slidesPerView: 3 },
                1400: { slidesPerView: 3 },
                1500: { slidesPerView: 4 },
                1920: { slidesPerView: 4 },
                2040: { slidesPerView: 4 },
                2440: { slidesPerView: 4 },
              }}
            >
              <SwiperSlide className="card card-slide" >
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faUser} className="fa-3x" style={{ color: '#32D700' }} />
                    <div className="mx-2"></div>
                    <div>
                      <h4 className="mb-2">Colaboradores</h4>
                      <h4 className="counter text-center fw-bold">
                        <CountUp start={0} end={data.cont_colaboradores} duration={2} />
                      </h4>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="card card-slide" >
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faUserShield} className="fa-3x" style={{ color: '#32D700' }} />
                    <div className="mx-4"></div>
                    <div>
                      <h4 className="mb-2">Admins</h4>
                      <h4 className="counter text-center fw-bold">
                        <CountUp start={0} end={data.cont_admins} duration={2} />
                      </h4>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="card card-slide" >
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faUserTie} className="fa-3x" style={{ color: '#32D700' }} />
                    <div className="mx-3"></div>
                    <div>
                      <h4 className="mb-2">Managers</h4>
                      <h4 className="counter text-center fw-bold">
                        <CountUp start={0} end={data.cont_managers} duration={2} />
                      </h4>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="card card-slide" >
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faHandshake} className="fa-3x" style={{ color: '#32D700' }} />
                    <div className="mx-3"></div>
                    <div>
                      <h4 className="mb-2">Parcerias</h4>
                      <h4 className="counter text-center fw-bold">
                        <CountUp start={0} end={data.cont_parcerias} duration={2} />
                      </h4>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </Row>
      );
    });
  }

  const [campCliente, setcampCliente] = useState([]);
  const [campContaAtiva, setcampContaAtiva] = useState([]);
  const [campContaApagada, setcampContaApagada] = useState([]);
  const [campIdTipo, setcampIdTipo] = useState("");
  const [campManager, setcampManager] = useState("");

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => {
    setpessoaIdEditar(null);
    setShow1(false);
  };
  const handleShow1 = () => setShow1(true);
  const handleEditarClick = (pessoaId) => {
    setpessoaIdEditar(pessoaId);
    handleShow1();
    LoadPessoaIndividual(pessoaId);
  };
  const handleGuardarEdição = (pessoaId) => {
    updatePessoa(pessoaId);
  };

  function updatePessoa(pessoaId) {
    const url = baseUrl + "/pessoas/updateindividual/" + pessoaId;
    const dataput = {
      cliente_param: campCliente,
      ativa_param: campContaAtiva,
      deleted_param: campContaApagada,
      pes_id_pessoa_param: campManager,
      id_tipo_param: campIdTipo
    }
    axios.put(url, dataput)
      .then(response => {
        if (response.data.success === true) {
          alert(response.data.message)
          LoadPessoas();
        }
        else {
          alert("Error")
        }
      }).catch(error => {
        alert("Error 34 " + error)
      })
  }

  function LoadPessoaIndividual(pessoaId) {
    const url = baseUrl + "/pessoas/" + pessoaId;
    axios.get(url)
      .then(res => {
        if (res.data.success) {
          const data = res.data.data[0];
          setcampCliente(data.cliente);
          setcampContaAtiva(data.ativa);
          setcampContaApagada(data.deleted);
        }
        else {
          alert("Error web service")
        }
      })
      .catch(error => {
        alert("Error server: " + error)
      })
  }

  function TabelaPessoas() {
    return currentItems.map((data, index) => {
      return (
        <tr key={index}>
          <td className="text-center fs-5">
            {data.nome_pessoa}
          </td>
          <td className="text-center">
            {data.numero_colaborador}
          </td>
          <td className="text-center">
            {data.id_tipo === 1 ? 'Colaborador' : data.id_tipo === 2 ? 'Manager' : data.id_tipo === 3 ? 'Admin' : ''}
          </td>
          <td className="text-center">
            {data.contribuinte}
          </td>
          <td className="text-center">
            {data.cliente}
          </td>
          <td>
            <div className="d-flex flex-column align-items-center mb-2 flex-wrap">
              <div className="d-flex">
                <Button variant="info" className="m-1" onClick={() => handleEditarClick(data.id_pessoa)}>Editar</Button>
                <Modal
                  show={show1 && pessoaIdEditar === data.id_pessoa}
                  onHide={handleClose1}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Editar Pessoa</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="form-group">
                        <Form.Label htmlFor="cliente">Cliente:</Form.Label>
                        <Form.Control type="cliente" id="cliente" value={campCliente} onChange={(e) => setcampCliente(e.target.value)} />
                      </Form.Group>
                        <Form.Group className="form-group">
                          <Form.Label className="form-label">Cargo:</Form.Label>
                          <Form.Select id="inputState" className="form-control" value={campIdTipo} onChange={value => setcampIdTipo(value.target.value)}>
                            <option value="" disabled>Cargo</option>
                            {roles.map(role => (
                              <option key={role.id_tipo} value={role.id_tipo}>{role.tipo}</option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="form-group">
                          <Form.Label className="form-label">Manager:</Form.Label>
                          <Form.Select id="inputState" className="form-control" value={campManager} onChange={value => setcampManager(value.target.value)}>
                            <option value="" disabled>Manager</option>
                            {managers.map(manager => (
                              <option key={manager.id_pessoa} value={manager.id_pessoa}>{manager.nome_pessoa} - {manager.numero_colaborador}</option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      <Form.Group className="form-group">
                        <Form.Label htmlFor="ativacao">Desativar Conta?</Form.Label>
                        <Form.Select id="ativacao" value={campContaAtiva ? 'nao' : 'sim'} onChange={(e) => setcampContaAtiva(e.target.value === 'nao')} >
                          <option value="sim">Sim</option>
                          <option value="nao">Não</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="form-group">
                        <Form.Label htmlFor="delete">Eliminar Conta?</Form.Label>
                        <Form.Select id="delete" value={campContaApagada ? 'sim' : 'nao'} onChange={(e) => setcampContaApagada(e.target.value === 'sim')} >
                          <option value="sim">Sim</option>
                          <option value="nao">Não</option>
                        </Form.Select>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={() => handleGuardarEdição(data.id_pessoa)}>Guardar</Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </td>
        </tr>
      );
    });
  }

  return (
    <Fragment>
      <Row>
        <Col md="12" lg="12">
          {Estatisticas()}
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">Colaboradores</h4>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive mt-4">
                <Table striped id="basic-table" className="mb-0" role="grid">
                  <thead>
                    <tr>
                      <th className="text-center">Nome</th>
                      <th className="text-center">Nº Colaborador</th>
                      <th className="text-center">Cargo</th>
                      <th className="text-center">Nº Contribuinte</th>
                      <th className="text-center">Cliente</th>
                      <th className="text-center">Editar Colaborador</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TabelaPessoas()}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {totalPages > 1 && (
        <Row>
          <Col className="d-flex justify-content-end">
            <Pagination>
              {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>
        </Row>
      )}
    </Fragment>
  );
})

export default Index
