import React from 'react'
import { useState, useEffect } from 'react'
import './css/ProfessionalInfo.css'

const ProfessionalInfo = (props) => {

    const [edit, setEdit] = useState('block')
    const [submit, setSubmit] = useState('none')
    const [professionalInfo, setProfessionalInfo] = useState({})
    const [highestEducation, setHighestEducation] = useState('')
    const [job, setJob] = useState('')

    useEffect(() => {
        setHighestEducation(props.ProfessionalInfo[0])
        setJob(props.ProfessionalInfo[1])
    }, [props])
    console.log(props);

    const handleProfessionalInfo = () => {
        document.getElementById('disableField2').disabled = true
        setEdit('block')
        setSubmit('none')
        const token = window.localStorage.getItem('token')
        fetch('http://localhost:3001/api/updateProfessionalInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
                highestEducation,
                job
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                console.log(data.error)
            }
            else{
                console.log(data)
                // setProfessionalInfo(data)aa
            }
        }
        )
                

    }

    const editProfessionalInfo = () => {
        console.log(highestEducation);
        document.getElementById('disableField2').disabled = false

        setEdit('none')
        setSubmit('block')
    }

  return (
    <div>
        <div className='d-flex p-5 py-4 flex-column '>
                <div className='d-flex justify-content-between align-items-center'>
                    <p className='fontBlue fw-bold m-0'>PROFESSIONAL INFORMATION</p>
                    <button className='btn myOrange px-4' style={{'display': submit}} onClick={handleProfessionalInfo}>Submit</button>
                    <button className='btn myOrange px-4 ' style={{'display': edit}} onClick={editProfessionalInfo} >Edit</button>
                </div>
            <fieldset id='disableField2' className="row" disabled>
                <div className="row my-1">
                    <div className="col-lg-6">
                        <label class=" mb-1 webTitles fontBlue ">Highest education</label>
                        <div className="d-flex bg-white rounded dropdown">
                        <select className='btn btn-white dropdown-toggle text-start border-0' onLoad={e=> setHighestEducation(e.target.value)} value={highestEducation} onChange={e=> setHighestEducation(e.target.value)} style={{'width': '-webkit-fill-available'}} >
                        <option className='dropdown-item' value="primary">Primary</option>
                        <option className='dropdown-item' value="secondary">Secondary</option>
                        <option className='dropdown-item' value="higher secondary">Higher Secondary</option>
                        <option className='dropdown-item' value="graduation">Graduation</option>
                        <option className='dropdown-item' value="post graduation">Post Graduation</option>
                        </select>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <label class="form-label mb-1 webTitles fontBlue ">What do you do currently?</label>
                        <div className="d-flex bg-white rounded dropdown">
                        <select className='btn btn-white dropdown-toggle text-start border-0' value={job} onChange={e=> setJob(e.target.value)} style={{'width': '-webkit-fill-available'}} >
                        <option className='dropdown-item' value="schooling">Schooling</option>
                        <option className='dropdown-item' value="college">College Student</option>
                        <option className='dropdown-item' value="teaching">Teaching</option>
                        <option className='dropdown-item' value="job">Job</option>
                        <option className='dropdown-item' value="freelancing">Freelancing</option>
                        </select>

                        </div>
                    </div>
                    
                </div>

                
            </fieldset>


    </div>
    <div className="border-bottom mx-5"></div>
    </div>
  )
}

export default ProfessionalInfo