import mongoose from 'mongoose';
import type {NextApiRequest, NextApiResponse, NextApiHandler} from 'next';
import type {RespostaPadraoMsg} from '../types/RespostaPadraoMsg'

export const conexaoMongoDB = (handler : NextApiHandler) => 
async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {

    // Verificar se o Banco de dados está conectado
    if(mongoose.connections[0].readyState){
        return handler(req, res);
    }

    // Obter a variavel de ambiente env
    const{DB_CONEXAO_STRING} = process.env;

    // Se a env estiver vazia, retornar um erro 
    if(!DB_CONEXAO_STRING){
        return res.status(500).json({ erro: 'Env de configuração do banco, não informada'});
    }

    mongoose.connection.on('connected', () => console.log('Banco de dados conectado'));
    mongoose.connection.on('error', error => console.log(`Ocorreu um erro ao conectar o banco de dados: ${error}`));
    await mongoose.connect(DB_CONEXAO_STRING);

    // Seguir endpoint, pois o banco está conectado
    return handler(req, res);
     
}