import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';



function GetAPI() {
  const [dados, attDados] = useState(null)
  const [show, attDiv] = useState(false)

useEffect(()=> {
  console.log(dados);
  
},[dados])

useEffect(() => {
  async function callApi () {
    const result = await axios({
      url: 'https://api.graph.cool/simple/v1/ck5xusde95ny80166qevlr1yq',
      method: 'post',
      data: {
        query: `
        {
          allPessoas{
            nome
            cpf
            enderecos{
              logradouro
              numero
              bairro
              municipio
              estado
            }
          }
        }
          `
      }
    })
    
    console.log(result.data.data);    
    attDados(result.data.data.allPessoas)  
  }
  callApi()
  },[]);

return (
  <>
  <button className="btn btn-primary" onClick={()=>{attDiv(!show)}}>Resultados</button>
  {show && 
  <div id='data'>
  <table className='table table-dark'>
    {dados.map((rest) => 
    <tbody>
      <tr>
        <th>Nome</th>
        <th>CPF</th>       
        <th>Logradouro</th>
        <th>Numero</th>
        <th>Bairro</th>
        <th>Municipio</th>
        <th>Estado</th>
      </tr>
      <tr>
        <th>{rest ? rest.nome : 'default'}</th>
        <th>{rest ? rest.cpf : 'default'}</th>
        {rest.enderecos.map((endereco) => <>
        <th>{rest ? endereco.logradouro : 'default'}</th>
        <th>{rest ? endereco.numero : 'default'}</th>
        <th>{rest ? endereco.bairro : 'default'}</th>
        <th>{rest ? endereco.municipio : 'default'}</th>
        <th>{rest ? endereco.estado : 'default'}</th>
        </>)}
      </tr>
    </tbody>
     )}
  </table>
  </div>}
  </>
)
}

export default GetAPI;
