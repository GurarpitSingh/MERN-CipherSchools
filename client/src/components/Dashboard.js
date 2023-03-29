import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
    
    useEffect(() => {
        document.title = 'Dashboard'
        if(!window.localStorage.getItem('token')) {
            navigate('/')
            window.localStorage.clear()
        }
        else{
            const token = window.localStorage.getItem('token')
            fetch('http://localhost:3001/api/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({token})
            })
            .then(res => res.json())
            .then(data => {
                if(data.error) {
                    navigate('/')
                    window.localStorage.clear()
                }
                else{
                    console.log(data)
                }
            }
            )


        }
    }, [])
  return (
    <div className='container p-5'>
<div className='bg-trans p-2 rounded'>
<h3 className='pt-3'><span className='text-muted'>Hii</span> <span className='fw-bold'>{window.localStorage.getItem('username')}</span></h3>
<p className='text-end text-muted'>This page is secured using <span className='fw-bold'>JWT</span></p>
        <table class="table rounded mt-5">
  <thead className='table-success'>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Date Created</th>
      <th scope="col">Role</th>
      <th scope="col">Status</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>04/10/13</td>
      <td>Admin</td>
      <td><span class="badge rounded-pill bg-success">Active</span></td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>05/09/13</td>
      <td>Publisher</td>
      <td><span class="badge rounded-pill bg-success">Active</span></td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td >Larry</td>
      <td>21/03/13</td>
      <td>Publisher</td>
      <td><span class="badge rounded-pill bg-secondary">Suspended</span></td>
      <td>@twitter</td>
    </tr>
    <tr>
      <th scope="row">4</th>
      <td >Harry</td>
      <td>29/01/14</td>
      <td>Reviewer</td>
      <td><span class="badge rounded-pill bg-success">Active</span></td>
      <td>@twitter</td>
    </tr>
    <tr>
      <th scope="row">5</th>
      <td >Carl</td>
      <td>10/12/14</td>
      <td>Admin</td>
      <td><span class="badge rounded-pill bg-secondary">Suspended</span></td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
  <p className='text-muted text-end'>Note: This Table is not being fetched by backend, complying to rules</p>
</div>
    </div>
  )
}

export default Dashboard