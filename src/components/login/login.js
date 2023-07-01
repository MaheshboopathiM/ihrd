import React, { useState } from 'react'
import './login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

  const navigate =useNavigate();

  const [data, setdata] = useState({
    email: '',
    password: '',
  })

  const [erro, seterror] = useState({
    emailerror: '',
    passworderror: '',
  })

  const [loading,setloading]=useState(false);

  const onChangeEmail = (e) => {
    let email = e.target.value;
    setdata({...data,email:e.target.value})
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(email) === false) {
      seterror({ ...erro, emailerror: "Email is not valid" });
      return false;
    }else{
      seterror({...erro,emailerror:''})
    }
  }

  const isValid = () => {
    let isValid = false;
    if(data.email == ""){
      seterror({...erro,emailerror:"Email not be Empty"})
      return isValid;
    }else if(data.password == ''){
      seterror({...erro,passworderror:"Password not be Empty"})
      return isValid;
    }else{
      seterror('')
      return !isValid;
    }
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(isValid()){
      setloading(true);
      let result = await axios.post(`http://localhost:5000/api/v1/user/login`,{
        email_id:data.email,
        password:data.password
      })

      if(result.data && result.data.data){
        setloading(false)
        const token =result.data.data.auth_token;
        localStorage.setItem("token",token)
        
        navigate(`${result.data.data.redirect}`)
      }else{
        setloading(false)
        seterror({...erro,passworderror:result.data.data.message})
      }
    }
  }
  return (
    <>
      <div className='container login-margin-top heading-login'>
        <span className='span-login'>College of Applied Science,Muttom Thodupuzha</span>
      </div>
      <div style={{ backgroundImage: "url(" + "http://www.casthodupuzha.ihrd.ac.in/images/slider/0.jpg" + ")", backgroundSize: 'cover', backgroundPosition: 'center' }} class="container-fluid text-center middle-con-login">
        <div class="row">
          <div class="col-12 d-flex justify-content-center align-items-end" style={{ marginTop: '10%' }}>
            <form className='login-form' onSubmit={handleSubmit}>
              <input type="text" placeholder="Email" value={data.email} onChange={(e) => onChangeEmail(e)} />
              {erro.emailerror &&
              <div class="alert alert-danger" role="alert">
                {erro.emailerror}
              </div>
              }
              <input type="password" placeholder="Password" onChange={(e) => setdata({ ...data, password: e.target.value })} />
              {erro.passworderror &&
              <div class="alert alert-danger" role="alert">
                {erro.passworderror}
              </div>
              }
              <button class="login">{loading? 'Loading............' : 'Log in'}</button>
              <a href="#">Forgot Password ?</a>
            </form>
            <div className='row'>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
