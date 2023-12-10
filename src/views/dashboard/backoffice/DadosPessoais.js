import React, { useEffect, useState } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import axios from './axiosConfig';
import { Link } from "react-router-dom";
import Card from "../../../components/Card";
import { baseUrl } from './baseURL';


const DadosPessoais = () => {
  const handleSimClick = () => {
    // Lógica para lidar com o clique no botão "Sim"
  };

  const handleNaoClick = () => {
    // Lógica para lidar com o clique no botão "Não"
  };

  const [dataDadosPessoais, setdataDadosPessoais] = useState([]);

  useEffect(() => {
    LoadDadosPessoais();
  }, []);

  function LoadDadosPessoais() {
    const url = baseUrl + "/pessoasauxiliar/";
    axios.get(url)
      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          setdataDadosPessoais(data);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  function dadosAprovacao(id_dados, confirmacao) {
    const url = baseUrl + "/pessoasauxiliar/update/" + id_dados;
    const dataput = {
      confirmar_dados: confirmacao
    };
    axios.put(url, dataput)
      .then(response => {
        if (response.data.success === true) {
          alert(response.data.message);
          LoadDadosPessoais();
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        alert("Error 34 " + error);
      });
  }

  function updateDadosPessoa(id_pessoa, nome_pessoa_auxiliar, email_auxiliar) {
    const url = baseUrl + "/pessoas/updatedados/" + id_pessoa;
    const dataput = {
      nome_pessoa_param: nome_pessoa_auxiliar,
      email_param: email_auxiliar
    };
    console.log(id_pessoa)
    axios.put(url, dataput)
      .then(response => {
        if (response.data.success === true) {
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        alert("Error 34 " + error);
      });
  }

  function TabelaAlteracaoDadosPessoais() {
    return dataDadosPessoais.map((data, index) => {

      return (
        <tr key={index}>
          <td className="text-center">
            {data.nome_pessoa}
          </td>
          <td className="text-center">
            {data.nome_pessoa_auxiliar}
          </td>
          <td className="text-center">
            <p>{data.email}</p>
          </td>
          <td className="text-center">
            {data.email_auxiliar}
          </td>
          <td>
            <div className="d-flex align-items-center justify-content-center mb-2">
              <Button variant="success" onClick={() => { dadosAprovacao(data.id_pessoas_auxiliar, true); updateDadosPessoa(data.id_pessoa, data.nome_pessoa_auxiliar, data.email_auxiliar) }}>
                <svg class="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3345 2.75024H7.66549C4.64449 2.75024 2.75049 4.88924 2.75049 7.91624V16.0842C2.75049 19.1112 4.63549 21.2502 7.66549 21.2502H16.3335C19.3645 21.2502 21.2505 19.1112 21.2505 16.0842V7.91624C21.2505 4.88924 19.3645 2.75024 16.3345 2.75024Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M8.43994 12.0002L10.8139 14.3732L15.5599 9.6272" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                </svg>
              </Button>
              <td></td><td></td>
              <Button variant="danger" onClick={() => dadosAprovacao(data.id_pessoas_auxiliar, false)}>                                <svg class="icon-32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                    <path d="M14.3955 9.59497L9.60352 14.387" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M14.3971 14.3898L9.60107 9.59277" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3345 2.75024H7.66549C4.64449 2.75024 2.75049 4.88924 2.75049 7.91624V16.0842C2.75049 19.1112 4.63549 21.2502 7.66549 21.2502H16.3335C19.3645 21.2502 21.2505 19.1112 21.2505 16.0842V7.91624C21.2505 4.88924 19.3645 2.75024 16.3345 2.75024Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                </svg>                            </Button>
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
                <h4 className="card-title">Pedido de alteração de dados pessoais</h4>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive mt-4">
                <Table striped id="basic-table" className="mb-0" role="grid">
                  <thead>
                    <tr>
                      <th className="text-center">Nome Antigo</th>
                      <th className="text-center">Nome Atualizado</th>
                      <th className="text-center">Email Antigo</th>
                      <th className="text-center">Email Atualizado</th>
                      <th className="text-center">Aprovação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TabelaAlteracaoDadosPessoais()}
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

export default DadosPessoais;
