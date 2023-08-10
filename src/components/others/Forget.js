import React, { useState } from 'react'
// import './forget.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { BASEURL } from '../../BaseUrl/Baseurl';
function Forget() {

    const [email_id, setemail_id] = useState('');
    const [emailcheck, setemailCheck] = useState(true);
    const [showOTP, setshoeotp] = useState(false);
    const [erro, seterror] = useState('');
    const [emailverify, setEmailverify] = useState('');
    const onChangeEmail = (e) => {
        let email = e.target.value;
        setemail_id(e.target.value)
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (regex.test(email) === false) {
            seterror("Email is not valid");
            return false;
        } else {
            seterror('')
        }
    }

    const validateEmail = () => {
        let isValid;
        if (!email_id) {
            seterror("email not be Empty");
            isValid = false;
        } else {
            seterror('');
            isValid = true
        }
        return isValid;
    }

    const handlenextemail = async (e) => {
        e.preventDefault()
        if (await validateEmail) {
            axios.post(`${BASEURL}/forget`, {
                email_id: email_id,
            }).then((res) => {
                if (res.status == 200) {
                    setemailCheck(false)
                    setEmailverify(res.data.data.email_id)
                    localStorage.setItem('OTP', res.data.data.OTP)
                    setshoeotp(true);
                }
                if (res.status == 201) {
                    seterror(res.data.data.msg)
                }
            })
        }
    }
    return (
        <>
            {emailcheck &&
                <div className='d-flex justify-content-center align-items-center classnamefor'>
                    <div class="container-center">
                        <center>
                            <img src="http://casthodupuzha.ihrd.ac.in/images/logo.png" width="100%" />
                        </center>
                        <h2>Don't Worry!</h2>
                        <form action="">
                            <h4>
                                Just provide your email<br />
                                and we can do the rest
                            </h4>
                            <formgroup>
                                <input type="text" name="email" onChange={(e) => onChangeEmail(e)} />
                                <label for="email"><br />Email</label>
                                <span>enter your email</span>
                            </formgroup>
                            {erro &&
                                <span style={{ color: 'red', textAlign: 'center', width: '100%', marginBottom: '20px' }}>{erro}</span>

                            }


                            <button id="login-btn" onClick={(e)=>handlenextemail(e)}>Next</button>



                        </form>

                        <p>Did you remember? <Link to={'/'}>Sign In </Link> </p>
                    </div>
                </div>

            }


            {/* OTP  verify  */}
            {showOTP &&
                <div class="container height-100 d-flex justify-content-center align-items-center">
                    <div class="position-relative">
                        <div class="card p-2 text-center">
                            <h6>Please enter the one time password <br /> to verify your account</h6>
                            <div> <span>A code has been sent to</span> <small>{emailverify}</small> </div>
                            <div id="otp" class="inputs d-flex flex-row justify-content-center mt-2"> <input class="m-2 text-center form-control rounded" type="text" id="first" maxlength="1" /> <input class="m-2 text-center form-control rounded" type="text" id="second" maxlength="1" /> <input class="m-2 text-center form-control rounded" type="text" id="third" maxlength="1" /> <input class="m-2 text-center form-control rounded" type="text" id="fourth" maxlength="1" /> <input class="m-2 text-center form-control rounded" type="text" id="fifth" maxlength="1" /> <input class="m-2 text-center form-control rounded" type="text" id="sixth" maxlength="1" /> </div>
                            <div class="mt-4"> <button class="btn btn-danger px-4 validate">Validate</button> </div>
                            <span class="btn resend">Resend OTP</span>
                        </div>
                    </div>
                </div>
            }



            {/* new password  */}
            {/* <div class="mainDiv">
                <div class="cardStyle">
                    <form action="" method="post" name="signupForm" id="signupForm">

                        <img src="" id="signupLogo" />

                        <h2 class="formTitle">
                            Reset Your Password
                        </h2>

                        <div class="inputDiv">
                            <label class="inputLabel" for="password">New Password</label>
                            <input type="password" id="password" name="password" required/>
                        </div>

                        <div class="inputDiv">
                            <label class="inputLabel" for="confirmPassword">Confirm Password</label>
                            <input type="password" id="confirmPassword" name="confirmPassword"/>
                        </div>

                        <div class="buttonWrapper">
                            <button type="submit" id="submitButton" onclick="validateSignupForm()" class="submitButton pure-button pure-button-primary">
                                <span>Continue</span>
                                {/* <span id="loader"></span> 
                            </button>
                        </div>

                    </form>
                </div>
            </div> */}
        </>
    )
}

export default Forget