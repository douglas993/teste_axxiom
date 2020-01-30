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
        <th>{dados ? dados[0].nome : 'default'}</th>
        <th>{dados ? dados[0].cpf : 'default'}</th>
        <th>{dados ? dados[0].enderecos[0].logradouro : 'default'}</th>
        <th>{dados ? dados[0].enderecos[0].numero : 'default'}</th>
        <th>{dados ? dados[0].enderecos[0].bairro : 'default'}</th>
        <th>{dados ? dados[0].enderecos[0].municipio : 'default'}</th>
        <th>{dados ? dados[0].enderecos[0].estado : 'default'}</th>
      </tr>
    </tbody>
  </table>
  </div>}
  </>
)
}

export default GetAPI;
