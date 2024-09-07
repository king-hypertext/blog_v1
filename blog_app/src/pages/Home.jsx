import React, { useEffect, useState } from 'react'
import '../assets/styles/app.css'
import { Helmet } from 'react-helmet'
import { useStateContext } from '../utilities/ContextProvider'
import axiosClient from '../utilities/AxiosConfig'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import image from '../assets/images/cover.jpeg'
import PageTitle from '../components/PageTitle'
import Header from '../components/Header'
export default function Home() {
  if (window.location.pathname !== '/auth/login' || window.location.pathname !== '/auth/create-account') {
    document.body.style.backgroundColor = '';
  }
  const { user, setUser, accessToken, setAccessToken } = useStateContext();
  const getUser = async () => {
    await axiosClient.get('/user')
      .then((res) => {
        console.log(res);
        setUser(res.data);
      }).catch((error) => {
        console.error(error);
      }).finally(() => {
        // setLoading(false);
      });
  }
  useEffect(() => {
    if (accessToken) {
      getUser();
    }
  }, [accessToken]);

  const logout = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Logout of the system?',
      // text: 'You will not be able to recover this account!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'

    }).then((results) => {
      if (results.isConfirmed) {
        axiosClient.post('/logout').then(() => {
          setAccessToken(null);
        }).finally(() => {
          setUser(null);
          Swal.fire({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
            icon: "success",
            title: "You've successfully logout"
          })
        });
      }
    });
  }
  // debugger;
  return (
    <>
      <PageTitle title='Home' description='OOKINGSLEY BLOG, start blogging & posting your articles for free' />
      <div /* style={{'background':`url(${image})`}} */ className="bg-picture bg:dark h-100">
        <div className='container'>
          <Header />
          <div className="d-flex justify-content-between">
            <div className="p-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi, modi unde accusamus et amet possimus voluptates, sequi facere deserunt mollitia nulla aut eligendi? Quo perspiciatis adipisci nesciunt, aliquam nisi aspernatur?
            </div>
            <div className="p-3">
              cipn
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
