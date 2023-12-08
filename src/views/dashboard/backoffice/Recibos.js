import React, { useEffect, useState } from "react";
import { Row, Col, Image, Table, Button } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";
import axios from './axiosConfig';
import { baseUrl } from './baseURL';

//progressbar
import Progress from "../../../components/progress.js";

const Recibos = () => {
  const [dataRecibos, setdataRecibos] = useState([]);
  const [campRecibopdf, setcampRecibopdf] = useState('');
  const [envioRealizado, setEnvioRealizado] = useState(false);

  useEffect(() => {
    LoadRecibos();
  }, []);

  function LoadRecibos() {
    const url = baseUrl + "/recibosvenc/";
    axios.get(url)
      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          setdataRecibos(data);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  function updateRecibo(parceriaId) {
    if (campRecibopdf === "") {
      alert("Escolha um ficheiro!")
    }
    else {
      const url = baseUrl + "/recibosvenc/update/" + parceriaId
      console.log(url)
      const dataput = {
        recibo_pdf_param: campRecibopdf,
      }
      axios.put(url, dataput)
        .then(response => {
          if (response.data.success === true) {
            alert(response.data.message)
            setEnvioRealizado(true);
            LoadRecibos();
          }
          else {
            alert("Error")
          }
        }).catch(error => {
          alert("Error 34 " + error)
        })
    }
  }

  function getFormattedDate(dateString) {
    const options = { month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-PT', options);
  }

  function TabelaRecibos() {
    return dataRecibos.map((data, index) => {
      const formattedDate = getFormattedDate(data.data_recibo);

      const handleEnviarClick = () => {
        updateRecibo(data.id_recibo);
      };
      return (
        <tr key={index}>
          <td className="text-center">
            <h6>{data.nome_pessoa}</h6>
          </td>
          <td className="text-center">
            <div>
              <div>
                {formattedDate}
              </div>
            </div>
          </td>
          <td className="text-center">
            <div>
              <input type="file" className="form-control" name="pic" accept="image/*" value={campRecibopdf} onChange={(value) => setcampRecibopdf(value.target.value)} disabled={envioRealizado}
              />
            </div>
          </td>
          <td>
            <div className="d-flex align-items-center justify-content-center mb-2">
              <Button variant="success" onClick={handleEnviarClick} disabled={envioRealizado}>
                Enviar
              </Button>
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
                <h4 className="card-title">Recibos de Vencimento</h4>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive mt-4">
                <Table striped id="basic-table" className="mb-0" role="grid">
                  <thead>
                    <tr>
                      <th className="text-center">Utilizador</th>
                      <th className="text-center">Data do Recibo</th>
                      <th className="text-center">Recibo</th>

                      <th className="text-center">Envio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TabelaRecibos()}
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

export default Recibos;
