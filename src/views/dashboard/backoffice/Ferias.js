import React, { useEffect, useState } from "react";
import { Row, Col, Table, Button, Pagination } from "react-bootstrap";
import axios from './axiosConfig';
import Card from "../../../components/Card";
import { baseUrl } from './baseURL';

const Ferias = () => {
  const [dataFerias, setdataFerias] = useState([]);

  useEffect(() => {
    LoadFerias();
  }, []);

  function LoadFerias() {
    const url = baseUrl + "/ferias/";
    axios.get(url)
      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          setdataFerias(data);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  function inserirRelacaoAprovada(id_ferias) {
    const url = baseUrl + "/relacaoestados/createferias/";
    const datapost = {
      id_estado: 1,
      id_ferias: id_ferias,
    };
    axios.post(url, datapost)
      .then(response => {
        if (response.data.success === true) {
          alert(response.data.message);
          LoadFerias();
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        alert("Error 34 " + error);
      });
  }

  function inserirRelacaoRecusada(id_ferias) {
    const url = baseUrl + "/relacaoestados/createferias/";
    const datapost = {
      id_estado: 2,
      id_ferias: id_ferias,
    };
    axios.post(url, datapost)
      .then(response => {
        if (response.data.success === true) {
          alert(response.data.message);
          LoadFerias();
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        alert("Error 34 " + error);
      });
  }

  function calcularDiferencaDias(dataInicio, dataFim) {
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);

    const diferencaEmMS = Math.abs(fim - inicio);
    const diferencaEmDias = Math.ceil(diferencaEmMS / (1000 * 60 * 60 * 24));

    return diferencaEmDias;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataFerias.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dataFerias.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function TabelaFerias() {
    return currentItems.map((data, index) => {
      const dias = calcularDiferencaDias(data.data_comeco, data.data_fim);
      return (
        <tr key={index}>
          <td className="text-center">{data.tipo_estado}</td>
          <td className="text-center">{data.nome_pessoa}</td>
          <td className="text-center">
            <p>{data.data_comeco} a {data.data_fim}</p>
          </td>
          <td className="text-center">{dias}</td>
          <td>
            <div className="d-flex align-items-center justify-content-center mb-2">
              <Button variant="success" onClick={() => inserirRelacaoAprovada(data.id_ferias)}>
                <svg class="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3345 2.75024H7.66549C4.64449 2.75024 2.75049 4.88924 2.75049 7.91624V16.0842C2.75049 19.1112 4.63549 21.2502 7.66549 21.2502H16.3335C19.3645 21.2502 21.2505 19.1112 21.2505 16.0842V7.91624C21.2505 4.88924 19.3645 2.75024 16.3345 2.75024Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M8.43994 12.0002L10.8139 14.3732L15.5599 9.6272" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                </svg>
              </Button>
              <div className="mx-2"></div>
              <Button variant="danger" onClick={() => inserirRelacaoRecusada(data.id_ferias)}>                                <svg class="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                    <path d="M14.3955 9.59497L9.60352 14.387" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M14.3971 14.3898L9.60107 9.59277" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3345 2.75024H7.66549C4.64449 2.75024 2.75049 4.88924 2.75049 7.91624V16.0842C2.75049 19.1112 4.63549 21.2502 7.66549 21.2502H16.3335C19.3645 21.2502 21.2505 19.1112 21.2505 16.0842V7.91624C21.2505 4.88924 19.3645 2.75024 16.3345 2.75024Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                </svg>                            </Button>
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
                <h4 className="card-title">Férias</h4>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive mt-4">
                <Table striped id="basic-table" className="mb-0" role="grid">
                  <thead>
                    <tr>
                      <th className="text-center">Estado</th>
                      <th className="text-center">Utilizador</th>
                      <th className="text-center">Datas</th>
                      <th className="text-center">Dias</th>
                      <th className="text-center">Aprovação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TabelaFerias()}
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

export default Ferias;
