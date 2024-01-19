import React, { useEffect, useState } from "react";
import { Row, Col, Table, Button, Modal, Form, Pagination  } from "react-bootstrap";
import axios from './axiosConfig';
import { Link } from "react-router-dom";
import Card from "../../../components/Card";
import { baseUrl } from './baseURL';

const Horas = () => {
  const [dataHoras, setdataHoras] = useState([]);
  const [dataFaltas, setdataFaltas] = useState([]);

  const [pessoaIdSelecionada, setPessoaIdSelecionada] = useState(null);
  const [dataHoraSubmetida, setDataHoraSubmetida] = useState(null);
  const [show, setShow] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataHoras.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dataHoras.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleClose = () => {
    setPessoaIdSelecionada(null);
    setShow(false);
  };

  const handleShow = (pessoaId, dataHoraSubmetida) => {
    setPessoaIdSelecionada(pessoaId);
    setDataHoraSubmetida(dataHoraSubmetida);
    setShow(true);
  };

  useEffect(() => {
    LoadHoras();
    LoadFaltas();
  }, []);

  function LoadHoras() {
    const url = baseUrl + "/horas/";
    axios.get(url)
      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          setdataHoras(data);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  function LoadFaltas() {
    const url = baseUrl + "/faltas/";
    axios.get(url)
      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          setdataFaltas(data);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  function inserirRelacaoAprovada(id_horas) {
    const url = baseUrl + "/relacaoestados/createhoras/";
    const datapost = {
      id_estado: 1,
      id_horas: id_horas,
    }
    axios.post(url, datapost)
      .then(response => {

        if (response.data.success === true) {
          alert(response.data.message)
          LoadHoras();
        }
        else {
          alert(response.data.message)
        }
      }).catch(error => {
        alert("Error 34 " + error)
      })
  }

  function inserirRelacaoRecusada(id_horas) {
    const url = baseUrl + "/relacaoestados/createhoras/";
    const datapost = {
      id_estado: 2,
      id_horas: id_horas,
    }
    axios.post(url, datapost)
      .then(response => {

        if (response.data.success === true) {
          alert(response.data.message)
          LoadHoras();
        }
        else {
          alert(response.data.message)
        }
      }).catch(error => {
        alert("Error 34 " + error)
      })
  }

  function extractYearMonthFromDate(date) {
    if (date && typeof date === 'string') {
      const [year, month] = date.split('-').slice(0, 2);
      return { year, month };
    }
    return { year: '', month: '' };
  }

  function TabelaFaltas(id_pessoa) {
    return dataFaltas.map((data, index) => {
      const { year: yearFalta, month: monthFalta } = extractYearMonthFromDate(data.data_falta);
      const { year: yearHora, month: monthHora } = extractYearMonthFromDate(dataHoraSubmetida);

      if (id_pessoa === data.id_pessoa && yearFalta === yearHora && monthFalta === monthHora) {
        return (
          <tr key={index}>
            <td className="text-center">
              {data.horas_faltadas}
            </td>
            <td className="text-center">
              {data.justificacao}
            </td>
            <td className="text-center">
              {data.data_falta}
            </td>
          </tr>
        );
      }
    });
  }

  function TabelaHoras() {
    return currentItems.map((data, index) => {
      return (
        <tr key={index}>
          <td className="text-center">
            {data.nome_pessoa}
          </td>
          <td className="text-center">
            {data.ano_relatorio_horas}
          </td>
          <td className="text-center">
            {data.mes}
          </td>
          <td className="text-center">
            {data.data_relatorio_horas}
          </td>
          <td className="text-center">
            {data.horas_efetuadas}
          </td>
          <td className="text-center">
            <Button variant="light" className="m-1" onClick={() => handleShow(data.id_pessoa, data.data_relatorio_horas)}>Ver Faltas</Button>
          </td>
          <Modal
            show={show && pessoaIdSelecionada === data.id_pessoa}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Falta Submetidas</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Col sm="12">
                    <Card>
                      <Card.Body className="p-0">
                        <div className="table-responsive mt-4">
                          <Table striped id="basic-table" className="mb-0" role="grid">
                            <thead>
                              <tr>
                                <th className="text-center">Horas Faltadas</th>
                                <th className="text-center">Justificação</th>
                                <th className="text-center">Data da Falta</th>
                              </tr>
                            </thead>
                            <tbody>
                              {TabelaFaltas(data.id_pessoa, dataHoraSubmetida)}
                            </tbody>
                          </Table>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
          <td>
            <div className="d-flex align-items-center justify-content-center mb-2">
              <Button variant="success" onClick={() => inserirRelacaoAprovada(data.id_relatorio_horas)}>
                <svg class="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3345 2.75024H7.66549C4.64449 2.75024 2.75049 4.88924 2.75049 7.91624V16.0842C2.75049 19.1112 4.63549 21.2502 7.66549 21.2502H16.3335C19.3645 21.2502 21.2505 19.1112 21.2505 16.0842V7.91624C21.2505 4.88924 19.3645 2.75024 16.3345 2.75024Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M8.43994 12.0002L10.8139 14.3732L15.5599 9.6272" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                </svg>
              </Button>
              <div className="mx-2"></div>
              <Button variant="danger" onClick={() => inserirRelacaoRecusada(data.id_relatorio_horas)}>                                <svg class="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                    <path d="M14.3955 9.59497L9.60352 14.387" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M14.3971 14.3898L9.60107 9.59277" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3345 2.75024H7.66549C4.64449 2.75024 2.75049 4.88924 2.75049 7.91624V16.0842C2.75049 19.1112 4.63549 21.2502 7.66549 21.2502H16.3335C19.3645 21.2502 21.2505 19.1112 21.2505 16.0842V7.91624C21.2505 4.88924 19.3645 2.75024 16.3345 2.75024Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                </svg>                            </Button>
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
                <h4 className="card-title">Horas submetidas</h4>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive mt-4">
                <Table striped id="basic-table" className="mb-0" role="grid">
                  <thead>
                    <tr>
                      <th className="text-center">Utilizador</th>
                      <th className="text-center">Ano</th>
                      <th className="text-center">Mês</th>
                      <th className="text-center">Data de submissão</th>
                      <th className="text-center">Total Horas</th>
                      <th className="text-center">Faltas</th>
                      <th className="text-center">Aprovação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TabelaHoras()}
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
    </>
  );
};

export default Horas;
