import React, { useEffect, useState } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import axios from 'axios';
import { Link } from "react-router-dom";
import Card from "../../../components/Card";
import { baseUrl } from './baseURL';

//progressbar
import Progress from "../../../components/progress.js";

const Horas = () => {
  const handleSimClick = () => {
    // Lógica para lidar com o clique no botão "Sim"
  };

  const handleNaoClick = () => {
    // Lógica para lidar com o clique no botão "Não"
  };

  const [dataHoras, setdataHoras] = useState([]);

  useEffect(() => {
    LoadHoras();
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

  function TabelaHoras() {
    return dataHoras.map((data, index) => {
      if (data.confirmacao_relatorio_horas === false) {
        console.log(data.id_estado)
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
            <td>
              <div className="d-flex align-items-center justify-content-center mb-2">
                <Button variant="success" onClick={() => inserirRelacaoAprovada(data.id_relatorio_horas)}>
                  <svg class="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3345 2.75024H7.66549C4.64449 2.75024 2.75049 4.88924 2.75049 7.91624V16.0842C2.75049 19.1112 4.63549 21.2502 7.66549 21.2502H16.3335C19.3645 21.2502 21.2505 19.1112 21.2505 16.0842V7.91624C21.2505 4.88924 19.3645 2.75024 16.3345 2.75024Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M8.43994 12.0002L10.8139 14.3732L15.5599 9.6272" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                </svg>
                </Button>
                <td></td><td></td>
                <Button variant="danger" onClick={() => inserirRelacaoRecusada(data.id_relatorio_horas)}>                                <svg class="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                    <path d="M14.3955 9.59497L9.60352 14.387" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M14.3971 14.3898L9.60107 9.59277" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3345 2.75024H7.66549C4.64449 2.75024 2.75049 4.88924 2.75049 7.91624V16.0842C2.75049 19.1112 4.63549 21.2502 7.66549 21.2502H16.3335C19.3645 21.2502 21.2505 19.1112 21.2505 16.0842V7.91624C21.2505 4.88924 19.3645 2.75024 16.3345 2.75024Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                </svg>                            </Button>
              </div>
            </td>
          </tr>
        );
      }
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
    </>
  );
};

export default Horas;
