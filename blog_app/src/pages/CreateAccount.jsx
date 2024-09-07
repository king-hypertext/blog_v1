import React, { useEffect, useRef, useState } from 'react'
import DateTime from '../utilities/DateTime'
import Helmet from 'react-helmet'
import Input from '../components/Input'
import Button from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import axioxClient from '../utilities/AxiosConfig'
import { useStateContext } from '../utilities/ContextProvider'

function CreateAccount() {
  const { setUser, setAccessToken, accessToken } = useStateContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (accessToken) {
      debugger;
      navigate('/');
    }
  }, [accessToken]);
  const [username, setUsername] = useState(null);
  const [firstName, setFirstname] = useState(null);
  const [lastName, setLasttname] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  // debugger;
  const Signup = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axioxClient.post('/user-create', {
      username: username,
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
      phone_number: phone
    })
      .then(({ data }) => {
        console.log(data);
        setAccessToken(data.token);
        setUser(data.user);
        navigate('/');
      }).catch((error) => {
        setLoading(false);
        const { response } = error;
        console.log(error, response);

        if (response.status === 401) {
          window.localStorage.removeItem('access_token');
        }
        if (response.status === 422) {
          console.log(response.data.errors);

          setErrors(response.data.errors);
        }
        console.log(response.data.errors);
      });

  }
  return (
    <>
      <Helmet>
        <title>OOKINGSLEY BLOG | Create Account</title>
        <meta name="description" content="OOKINGSLEY BLOG, Create an account, start blogging & posting your articles" />
      </Helmet>
      <h6 className='h6 text-capitalize fw-semibold text-center mb-3'>create account</h6>
      {errors &&
        <div className="alert alert-danger" role="alert">

          <ul className="list-unstyled mb-0">
            {
              Object.keys(errors).map((error) =>
                <li key={error}>{errors[error][0]}</li>
              )
            }
          </ul>
        </div>
      }
      <form onSubmit={Signup}>
        <Input focus required onChange={e => setUsername(e.target.value)} animate labelText='Username' placeholder='enter a username' />
        <Input required onChange={e => setFirstname(e.target.value)} animate labelText='First name' placeholder='enter your first name' />
        <Input required onChange={e => setLasttname(e.target.value)} animate labelText='Last name' placeholder='enter your last name' />
        <Input required onChange={e => setEmail(e.target.value)} animate labelText='Email address' type='email' inputMode={'email'} placeholder='enter a username' />
        <Input required onChange={e => setPhone(e.target.value)} animate labelText='Phone number' type='text' inputMode={'number'} placeholder='enter your phone number' />
        <Input required onChange={e => setPassword(e.target.value)} animate labelText='Password' type='password' placeholder='Password' />
        <div className="row justify-content-between my-2">
          <div className="col-12  col-sm-6">
            <Button loading={loading} type='submit' text='create account' className='auth-btn btn-lg' />

          </div>
          <div className="col-12 mt-2 col-sm-6">

            <span>
              Already have an Account?<Link to={'/auth/login'} title='login to your account' className=''> Login</Link>
            </span>
          </div>
        </div>
      </form>
    </>
  )
}

export default CreateAccount
