// Importa o Axios, que é uma biblioteca para fazer solicitações HTTP
import axios from 'axios';

// Importa a biblioteca 'js-cookie', que é usada para trabalhar com cookies no navegador
import Cookies from 'js-cookie';

// Função para obter o token de autorização dos cookies
const getAuthorizationToken = () => {
    return Cookies.get('token');
};

// Configuração do interceptor de solicitação do Axios
axios.interceptors.request.use(
    // Função executada antes de cada solicitação ser enviada
    (config) => {
        // Obtém o token de autorização dos cookies
        const token = getAuthorizationToken();

        // Se um token foi obtido, adiciona-o aos cabeçalhos da solicitação como um token Bearer
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Retorna a configuração atualizada para a solicitação
        return config;
    },
    // Função executada se houver um erro durante a configuração da solicitação
    (error) => {
        // Retorna um erro de promessa para ser tratado em casos de falha
        return Promise.reject(error);
    }
);

// Exporta o Axios configurado com o interceptor para ser usado em outros arquivos
export default axios;