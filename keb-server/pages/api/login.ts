import type { NextApiRequest, NextApiResponse } from 'next';
import {conexaoMongoDB} from '../../middlewares/conexaoMongoDB';
import type {RespostaPadraoMsg} from '../../types/RespostaPadraoMsg'

const endpointLogin = (
    req : NextApiRequest,
    res : NextApiResponse <RespostaPadraoMsg>
) => {
    if(req.method === 'POST'){
        const {login, senha} = req.body;

        if(login === "admin@admin.com" && senha === "Admin123"){
            return res.status(200).json({msg : "Usuaário autenticado com sucesso"});
        }
        return res.status(405).json({erro : 'Usuário ou senha não encontradas'});
    }
    return res.status(405).json({erro : "Método informado não é válido"});
}

export default conexaoMongoDB(endpointLogin);