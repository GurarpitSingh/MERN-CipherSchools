import React, { useEffect } from 'react'
import { useState } from 'react'
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate } from 'react-router-dom'



const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        document.title = 'Login'
    }, [])

    const loginUser = async (e) => {
        e.preventDefault()
        const res = await fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
        if(res.status === 200) {
            var data = await res.json()
            alert("User logged in successfully")
            localStorage.setItem('token', data.token)
            // localStorage.setItem('username', data.username)
            // localStorage.setItem('name', data.name)
            navigate('/')

        }
        else {
            var dataa = await res.json()
            alert(dataa.message)
        }
        console.log(dataa)
    }

    
  return (

      <div className='container-fluid pt-5 mt-5 '>
        <div className='col-md-4 mx-auto mt-5'>
            <div className='bg-trans p-5 rounded'>
                        <h2 className='mb-4 text-center'>Sign-In</h2>
                        <form  name="userLoginForm" onSubmit={loginUser} > 
                            <div className="d-flex form-group my-2 border-bottom border-dark">
                            <i class="fa-regular fa-id-card pt-2 fa-15x pe-3 text-muted"></i><input type="text" name="username" className="my-form-control border-0 bg-trans " value={username}  onChange={(e) => setUsername(e.target.value)} placeholder="Username" required="required" />
                            </div>
                            <div className="d-flex form-group my-2 border-bottom border-dark">    
                            <i class="fa-solid fa-key pt-2 fa-15x pe-3 text-muted"></i><input type="password" name="password" className="my-form-control border-0 bg-trans " value={password}  onChange={(e) => setPassword(e.target.value)} placeholder="Password" required="required" />
                            </div>
                            <div className="d-flex justify-content-center form-group my-4 ">
                                <button type="submit" className="btn btn-primary  w-100 ">Sign In</button>
                            </div>
                            <Link className='float-end text-muted text-decoration-none'  to='/register'>Don't have an account? <span className=' ml-2 text-primary fw-bold'>Register</span></Link> 

                        </form>
                    </div>
                </div>
            </div>
  )
}

export default Login