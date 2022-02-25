import React, {useEffect} from 'react';
import axios, { Axios } from 'axios';
import { response } from '../API/src/app';



const ListaTelefonica = () => {
    const [data, setTelefones] = useState([])

    useEffect ( () => {
    Axios.get('http://localhost:3000/telefones').then((response) => {setTelefones(respose.data.telefones);
});
    }, []);

const DelTelefone = (id) =>{

    Axios.delete (`'http://localhost:3000/telefones/${id}`).then(() => {
        ListaTelefonica()
    })
}

const PutTelefone = (id) => {
    Axios.put (`'http://localhost:3000/telefones/${id}`, data 
    , {'Content-Type': 'application/json'}).then (() =>{
        ListaTelefonica ()
      })
}

export default Lista