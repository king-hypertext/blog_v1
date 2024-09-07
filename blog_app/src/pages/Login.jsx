import React, { useState, useEffect } from 'react'
import Helmet from 'react-helmet'
import Input from '../components/Input'
import Button from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import apiClient from '../utilities/AxiosConfig'
import { useStateContext } from '../utilities/ContextProvider'
import Home from './Home'
import axios from 'axios'
import Swal from 'sweetalert2'
function Login() {
    const { setUser, setAccessToken, accessToken } = useStateContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (accessToken) {
            // debugger;
            navigate('/');
        }
    }, [accessToken]);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const login = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios.get('/sanctum/csrf-cookie', {
            url: 'http://localhost:8000',
        }).then(() => {
            apiClient.post('/login', {
                username: username,
                password: password
            }).then(({ data }) => {
                console.log(data);
                setLoading(false);
                setAccessToken(data.token);
                setUser(data.user);
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: false,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    },
                    icon: "success",
                    title: "You're welcome: " + `${data.user.username.toString().toUpperCase()}`
                });
            }).catch((error) => {
                const { response } = error;
                setLoading(false);
                if (response.status === 422) {
                    setErrors(response.data.errors);
                } else if (response.status === 417) {
                    setErrors(response.data)
                }
                console.log(error, response);
            });
        });

    }
    return (
        <>
            <Helmet>
                <title>OOKINGSLEY BLOG | Login</title>
                <meta name="description" content="OOKINGSLEY BLOG, login to your your account, start blogging & posting your articles" />
            </Helmet>
            <h6 className='h6 text-capitalize fw-semibold text-center mb-3'>login to account</h6>
            {errors &&
                <div className="alert alert-danger" role="alert">
                    <ul className="list-unstyled mb-0">
                        {
                            Object.keys(errors).map(error =>
                                <li>{errors[error][0]}</li>
                            )
                        }
                    </ul>
                </div>
            }
            <form onSubmit={login}>
                <Input focus required onChange={e => setUsername(e.target.value)} animate labelText='Username' placeholder='enter a username' />
                <Input required onChange={e => setPassword(e.target.value)} animate labelText='Password' type='password' placeholder='Password' />
                <div className="row justify-content-between my-2">
                    <div className="col-12  col-sm-6">
                        <Button loading={loading} type='submit' text='create account' className='auth-btn btn-lg' />

                    </div>
                    <div className="col-12 mt-2 col-sm-6">

                        <span>
                            Do not have an Account?<Link to={'/auth/create-account '} title='create an account' className=''> Create</Link>
                        </span>
                    </div>
                </div>
            </form>

        </>
    )
}

export default Login
