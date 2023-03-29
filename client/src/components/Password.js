import React from 'react'
import { useState, useEffect } from 'react'

const Password = (props) => {

    const [edit, setEdit] = useState('block')
    const [submit, setSubmit] = useState('none')
    const [password, setPassword] = useState('')

    useEffect(() => {
        setPassword(props.Password)
    }, [props])

    const handlePassword = () => {
        document.getElementById('disableField3').disabled = true
        setEdit('block')
        setSubmit('none')
        const token = window.localStorage.getItem('token')
        fetch('http://localhost:3001/api/updatePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
                password
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                console.log(data.error)
            }
            else{
                console.log(data)
            }
        }
        )
    }

    const editPassword = () => {
        document.getElementById('disableField3').disabled = false
        setEdit('none')
        setSubmit('block')
    }

  return (
    <div>
    <div className='d-flex p-5 py-4 flex-column '>
                <div className='d-flex justify-content-between align-items-center'>
                    <p className='fontBlue fw-bold m-0'>PASSWORD $ SECURITY</p>
                    <button className='btn myOrange px-4' style={{'display': submit}} onClick={handlePassword}>Submit</button>
                    <button className='btn myOrange px-4 ' style={{'display': edit}} onClick={editPassword} >Edit</button>
                </div>
            <fieldset id='disableField3' className="row" disabled>
                <div className="row my-1">
                    
                    <div className="col-12">
                        <label class="form-label mb-1 webTitles fontBlue ">Password</label>
                        <div className="d-flex bg-white rounded dropdown">
                        <input type="password" class="form-control border-0 noFocusBorder bg-white" value={password} onChange={e=> setPassword(e.target.value)} placeholder={password} />
                        </div>
                    </div>
                    
                </div>

                
            </fieldset>


    </div>
    <div className="border-bottom mx-5"></div>
    </div>
  )
}

export default Password