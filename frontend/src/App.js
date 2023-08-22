import React  from 'react';
import './App.css'
import {  useGoogleOneTapLogin } from '@react-oauth/google';
import {decodeJwt} from 'jose'
import axios from 'axios'


const App = () => {
  const login =useGoogleOneTapLogin({
    onSuccess:(CredentialResponse)=>{
      console.log(CredentialResponse)
      const {credential}=CredentialResponse
      const payload=credential?decodeJwt(credential):undefined
      if(payload){
        console.log(payload)
        axios.get('http://localhost:4000/protected',{
          headers:{
            Authorization:`Bearer ${credential}`,
          }
        })
        .then(response=>console.log(response.data))
        .catch(error=>console.log(error))
      }
    },
    onError:error=>console.log(error)
  })


  return (
    <div className='=App'>
      <div className='card'>
         <h3>React Google Authentication(Client &amp;Sever)</h3>
        {/*<GoogleLogin
        onSuccess={CredentialResponse=>{
          console.log(CredentialResponse)
          const {credential}=CredentialResponse
          const payload=credential?decodeJwt(credential):undefined
          if(payload){
            console.log(payload)
          }
        }}
        onError={error=>console.log(error)}
        /> */}
      </div>
    </div>
  );
};

export default App;
