import React, { useEffect, useState } from "react";
import { Row, Col, Table, Button, Pagination } from "react-bootstrap";
import axios from './axiosConfig';
import { Link } from "react-router-dom";
import Card from "../../../components/Card";
import { baseUrl } from './baseURL';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const Reunioes = () => {
  const [dataReunioes, setdataReunioes] = useState([]);
  const [dataReunioesManager, setdataReunioesManager] = useState([]);

  useEffect(() => {
    LoadReunioes();
    LoadReunioesManager();
  }, []);

  function LoadReunioes() {
    const url = baseUrl + "/reuniao/";
    axios.get(url)
      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          setdataReunioes(data);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  function LoadReunioesManager() {
    const url = baseUrl + "/reuniao/listmanager";
    axios.get(url)
      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          setdataReunioesManager(data);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  function reuniaoAprovacao(id_reuniao, confirmacao) {
    const url = baseUrl + "/reuniao/update/" + id_reuniao;
    const dataput = {
      confirmar_reuniao: confirmacao
    };
    axios.put(url, dataput)
      .then(response => {
        if (response.data.success === true) {
          alert(response.data.message);
          LoadReunioes();
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        alert("Error 34 " + error);
      });
  }

  function AdminReunioes() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dataReunioes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(dataReunioes.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    function TabelaReunioes() {
      return currentItems.map((data, index) => {
        return (
          <tr key={index}>
            <td className="text-center">
              {data.nome_pessoa_1}
            </td>
            <td className="text-center">
              {data.nome_pessoa_2}
            </td>
            <td className="text-center">
              {data.data_reuniao}
            </td>
            <td className="text-center">
              {data.horas}
            </td>
            <td className="text-center">
              {data.motivo}
            </td>
            <td>
              <div className="d-flex align-items-center justify-content-center mb-2">
                <Button variant="success" onClick={() => reuniaoAprovacao(data.id_reuniao, true)}>
                  <svg class="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3345 2.75024H7.66549C4.64449 2.75024 2.75049 4.88924 2.75049 7.91624V16.0842C2.75049 19.1112 4.63549 21.2502 7.66549 21.2502H16.3335C19.3645 21.2502 21.2505 19.1112 21.2505 16.0842V7.91624C21.2505 4.88924 19.3645 2.75024 16.3345 2.75024Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M8.43994 12.0002L10.8139 14.3732L15.5599 9.6272" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                </svg>
                </Button>
                <div className="mx-2"></div>
                <Button variant="danger" onClick={() => reuniaoAprovacao(data.id_reuniao, false)}>                                <svg class="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                    <path d="M14.3955 9.59497L9.60352 14.387" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M14.3971 14.3898L9.60107 9.59277" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3345 2.75024H7.66549C4.64449 2.75024 2.75049 4.88924 2.75049 7.91624V16.0842C2.75049 19.1112 4.63549 21.2502 7.66549 21.2502H16.3335C19.3645 21.2502 21.2505 19.1112 21.2505 16.0842V7.91624C21.2505 4.88924 19.3645 2.75024 16.3345 2.75024Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                </svg>                            </Button>
              </div>
            </td>
          </tr>
        );
      });
    }

    return (
      <Row>
        <Col sm="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">Pedidos de reunião</h4>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive mt-4">
                <Table striped id="basic-table" className="mb-0" role="grid">
                  <thead>
                    <tr>
                      <th className="text-center">Colaborador</th>
                      <th className="text-center">Manager</th>
                      <th className="text-center">Dia</th>
                      <th className="text-center">Hora</th>
                      <th className="text-center">Assunto</th>
                      <th className="text-center">Aprovação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TabelaReunioes()}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
        {
          totalPages > 1 && (
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
          )
        }
      </Row>
    );
  }

  function ManagerReunioes() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dataReunioesManager.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(dataReunioesManager.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    function TabelaReunioesManager() {
      return currentItems.map((data, index) => {
        return (
          <tr key={index}>
            <td className="text-center">
              {data.nome_pessoa_1}
            </td>
            <td className="text-center">
              {data.nome_pessoa_2}
            </td>
            <td className="text-center">
              {data.data_reuniao}
            </td>
            <td className="text-center">
              {data.horas}
            </td>
            <td className="text-center">
              {data.motivo}
            </td>
            <td>
              <div className="d-flex align-items-center justify-content-center mb-2">
                <Button variant="success" onClick={() => reuniaoAprovacao(data.id_reuniao, true)}>
                  <svg class="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3345 2.75024H7.66549C4.64449 2.75024 2.75049 4.88924 2.75049 7.91624V16.0842C2.75049 19.1112 4.63549 21.2502 7.66549 21.2502H16.3335C19.3645 21.2502 21.2505 19.1112 21.2505 16.0842V7.91624C21.2505 4.88924 19.3645 2.75024 16.3345 2.75024Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M8.43994 12.0002L10.8139 14.3732L15.5599 9.6272" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                </svg>
                </Button>
                <div className="mx-2"></div>
                <Button variant="danger" onClick={() => reuniaoAprovacao(data.id_reuniao, false)}>                                <svg class="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                    <path d="M14.3955 9.59497L9.60352 14.387" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M14.3971 14.3898L9.60107 9.59277" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3345 2.75024H7.66549C4.64449 2.75024 2.75049 4.88924 2.75049 7.91624V16.0842C2.75049 19.1112 4.63549 21.2502 7.66549 21.2502H16.3335C19.3645 21.2502 21.2505 19.1112 21.2505 16.0842V7.91624C21.2505 4.88924 19.3645 2.75024 16.3345 2.75024Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                </svg>                            </Button>
              </div>
            </td>
          </tr>
        );
      });
    }

    return (<Row>
      <Col sm="12">
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <div className="header-title">
              <h4 className="card-title">Pedidos de reunião</h4>
            </div>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="table-responsive mt-4">
              <Table striped id="basic-table" className="mb-0" role="grid">
                <thead>
                  <tr>
                    <th className="text-center">Colaborador</th>
                    <th className="text-center">Manager</th>
                    <th className="text-center">Dia</th>
                    <th className="text-center">Hora</th>
                    <th className="text-center">Assunto</th>
                    <th className="text-center">Aprovação</th>
                  </tr>
                </thead>
                <tbody>
                  {TabelaReunioesManager()}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </Col>
      {
        totalPages > 1 && (
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
        )
      }
    </Row>)
  }

  const token = Cookies.get('token');
  const decodedToken = jwtDecode(token);
  const idTipo = decodedToken.id_tipo;
  return (
    <>
      {idTipo === 2 && ManagerReunioes()}
      {idTipo === 3 && AdminReunioes()}
    </>
  );
};

export default Reunioes;