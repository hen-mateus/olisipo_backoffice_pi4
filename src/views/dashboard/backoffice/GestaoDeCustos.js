import React, { useEffect, useState } from "react";
import { Row, Col, Table, Button, Pagination } from "react-bootstrap";
import axios from './axiosConfig';
import { Link } from "react-router-dom";
import Card from "../../../components/Card";
import { baseUrl } from './baseURL';

const formatTableCell = () => {
  return {
    maxWidth: '200px',
    overflow: 'hidden',
    whiteSpace: 'normal',
  };
};

const GestaoDeCustos = () => {
  const [dataAjudasCusto, setdataAjudasCusto] = useState([]);
  const [dataDespesasViatura, setdataDespesasViatura] = useState([]);

  // Pagination logic Ajudas de Custo
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataAjudasCusto.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dataAjudasCusto.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Pagination logic Viatura Própria
  const [currentPageVP, setCurrentPageVP] = useState(1);
  const [itemsPerPageVP] = useState(3);
  const indexOfLastItemVP = currentPageVP * itemsPerPageVP;
  const indexOfFirstItemVP = indexOfLastItemVP - itemsPerPageVP;
  const currentItemsVP = dataDespesasViatura.slice(indexOfFirstItemVP, indexOfLastItemVP);
  const totalPagesVP = Math.ceil(dataDespesasViatura.length / itemsPerPageVP);
  const paginateVP = (pageNumber) => setCurrentPageVP(pageNumber);


  useEffect(() => {
    LoadAjudasCusto();
    LoadDespesasViatura();
  }, []);

  function LoadAjudasCusto() {
    const url = baseUrl + "/ajudascusto/";
    axios.get(url)
      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          setdataAjudasCusto(data);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  function LoadDespesasViatura() {
    const url = baseUrl + "/despesasviatura/";
    axios.get(url)
      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          setdataDespesasViatura(data);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  function inserirRelacaoAprovadaAjudas(id_ajudas) {
    const url = baseUrl + "/relacaoestados/createajudas/";
    const datapost = {
      id_estado: 1,
      id_ajudas: id_ajudas,
    }
    axios.post(url, datapost)
      .then(response => {

        if (response.data.success === true) {
          alert(response.data.message)
          LoadAjudasCusto();
        }
        else {
          alert(response.data.message)
        }
      }).catch(error => {
        alert("Error 34 " + error)
      })
  }

  function inserirRelacaoRecusadaAjudas(id_ajudas) {
    const url = baseUrl + "/relacaoestados/createajudas/";
    const datapost = {
      id_estado: 2,
      id_ajudas: id_ajudas,
    }
    axios.post(url, datapost)
      .then(response => {

        if (response.data.success === true) {
          alert(response.data.message)
          LoadAjudasCusto();
        }
        else {
          alert(response.data.message)
        }
      }).catch(error => {
        alert("Error 34 " + error)
      })
  }

  function inserirRelacaoAprovadaDespesas(id_despesasviatura) {
    const url = baseUrl + "/relacaoestados/createdespesas/";
    const datapost = {
      id_estado: 1,
      id_despesasviatura: id_despesasviatura,
    }
    axios.post(url, datapost)
      .then(response => {

        if (response.data.success === true) {
          alert(response.data.message)
          LoadDespesasViatura();
        }
        else {
          alert(response.data.message)
        }
      }).catch(error => {
        alert("Error 34 " + error)
      })
  }

  function inserirRelacaoRecusadaDespesas(id_despesasviatura) {
    const url = baseUrl + "/relacaoestados/createdespesas/";
    const datapost = {
      id_estado: 2,
      id_despesasviatura: id_despesasviatura,
    }
    axios.post(url, datapost)
      .then(response => {

        if (response.data.success === true) {
          alert(response.data.message)
          LoadDespesasViatura();
        }
        else {
          alert(response.data.message)
        }
      }).catch(error => {
        alert("Error 34 " + error)
      })
  }

  function TabelaAjudasCusto() {
    return currentItems.map((data, index) => {
      return (
        <tr key={index}>
          <td className="text-center">
            {data.nome_pessoa}
          </td>
          <td className="text-center">
            {data.valor_ajuda}
          </td>
          <td className="text-center" style={formatTableCell()}>
            {data.descritivo_ajuda}
          </td>
          <td className="text-center">
            <Button variant="light">
              Download
            </Button>
          </td>
          <td>
            <div className="d-flex align-items-center justify-content-center mb-2">
              <Button variant="success" onClick={() => inserirRelacaoAprovadaAjudas(data.id_ajuda_custo)}>
                <svg class="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3345 2.75024H7.66549C4.64449 2.75024 2.75049 4.88924 2.75049 7.91624V16.0842C2.75049 19.1112 4.63549 21.2502 7.66549 21.2502H16.3335C19.3645 21.2502 21.2505 19.1112 21.2505 16.0842V7.91624C21.2505 4.88924 19.3645 2.75024 16.3345 2.75024Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M8.43994 12.0002L10.8139 14.3732L15.5599 9.6272" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                </svg>
              </Button>
              <div className="mx-2"></div>
              <Button variant="danger" onClick={() => inserirRelacaoRecusadaAjudas(data.id_ajuda_custo)}>                                <svg class="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                    <path d="M14.3955 9.59497L9.60352 14.387" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M14.3971 14.3898L9.60107 9.59277" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3345 2.75024H7.66549C4.64449 2.75024 2.75049 4.88924 2.75049 7.91624V16.0842C2.75049 19.1112 4.63549 21.2502 7.66549 21.2502H16.3335C19.3645 21.2502 21.2505 19.1112 21.2505 16.0842V7.91624C21.2505 4.88924 19.3645 2.75024 16.3345 2.75024Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                </svg>                            </Button>
            </div>
          </td>
        </tr>
      );
    });
  }

  function TabelaDespesasViatura() {
    return currentItemsVP.map((data, index) => (
      <tr key={index}>
        <td className="text-center">
          {data.nome_pessoa}
        </td>
        <td className="text-center">
          {data.quilometros}
        </td>
        <td className="text-center">
          {data.data_deslocacao}
        </td>
        <td className="text-center">
          {data.ponto_de_origem}
        </td>
        <td className="text-center">
          {data.ponto_de_chegada}
        </td>
        <td>
          <div className="d-flex align-items-center justify-content-center mb-2">
            <Button variant="success" onClick={() => inserirRelacaoAprovadaDespesas(data.id_despesa)}>
              <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M16.3345 2.75024H7.66549C4.64449 2.75024 2.75049 4.88924 2.75049 7.91624V16.0842C2.75049 19.1112 4.63549 21.2502 7.66549 21.2502H16.3335C19.3645 21.2502 21.2505 19.1112 21.2505 16.0842V7.91624C21.2505 4.88924 19.3645 2.75024 16.3345 2.75024Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M8.43994 12.0002L10.8139 14.3732L15.5599 9.6272" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </Button>
            <div className="mx-2"></div>
            <Button variant="danger" onClick={() => inserirRelacaoRecusadaDespesas(data.id_despesa)}>
              <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.3955 9.59497L9.60352 14.387" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M14.3971 14.3898L9.60107 9.59277" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M16.3345 2.75024H7.66549C4.64449 2.75024 2.75049 4.88924 2.75049 7.91624V16.0842C2.75049 19.1112 4.63549 21.2502 7.66549 21.2502H16.3335C19.3645 21.2502 21.2505 19.1112 21.2505 16.0842V7.91624C21.2505 4.88924 19.3645 2.75024 16.3345 2.75024Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </Button>
          </div>
        </td>
      </tr>
    ));
  }

  return (
    <>
      <Row>
        <Col sm="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">Despesas em viatura própria</h4>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive mt-4">
                <Table striped id="basic-table" className="mb-0" role="grid">
                  <thead>
                    <tr>
                      <th className="text-center">Utilizador</th>
                      <th className="text-center">Quilometros</th>
                      <th className="text-center">Data da deslocação</th>
                      <th className="text-center">Origem</th>
                      <th className="text-center">Chegada</th>
                      <th className="text-center">Aprovação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TabelaDespesasViatura()}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {totalPagesVP > 1 && (
        <Row>
          <Col className="d-flex justify-content-end">
            <Pagination>
              {Array.from({ length: totalPagesVP }, (_, index) => (
                <Pagination.Item key={index + 1} active={index + 1 === currentPageVP} onClick={() => paginateVP(index + 1)}>
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>
        </Row>
      )}
      <Row>
        <Col sm="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">Ajudas de Custo</h4>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive mt-4">
                <Table striped id="basic-table" className="mb-0" role="grid">
                  <thead>
                    <tr>
                      <th className="text-center">Utilizador</th>
                      <th className="text-center">Valor</th>
                      <th className="text-center">Descritivo</th>
                      <th className="text-center">Fatura</th>

                      <th className="text-center">Aprovação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TabelaAjudasCusto()}
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

export default GestaoDeCustos;
