import { useRouter } from 'next/router'
import React, { useEffect } from 'react';

import api from '../middlewares/axiosConfig';
import HomeLayout from '../components/home/HomeLayout';
import Swal from 'sweetalert2';

function activate() {
  const router = useRouter();

  useEffect(() => {

    let params = getParamsFromRoute();
    if (!params)
      return location.href = "/";

    activateAccount(params);
    
  }, []);
  
  const getParamsFromRoute = () => {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("id")) {
      let search = location.search;
      let redirect = search.replace("?id=", '');
      let params = redirect.split('&');
      let id = params[0];
      let token = params[1].replace("token=", "");
      
      return { id, token };
    }
    return false;
  }

  const activateAccount = async (params) => {
    api.get(`/users/activateAccount/${params.id}/${params.token}`)
      .then(res => {
        Swal.fire({
          title: 'Success!',
          text: 'Successfully activated your account, you can now login',
          icon: 'success',
          confirmButtonText: 'Ok',
          allowOutsideClick: false,
        }).then(() => {
          router.push('/auth');
        });
      })
      .catch(err => err);
  }

  return (
    <HomeLayout>
      <div style={{minHeight:'70vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <p style={{fontSize: '2rem'}}>Please wait while we activate your account...</p>
      </div>
    </HomeLayout>
  )
}

export default activate
