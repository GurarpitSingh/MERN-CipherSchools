import React from 'react'
import { useState, useEffect } from 'react'

const About = (props) => {
    // console.log(props.about);
    const [about, setAbout] = useState(props.about)
    const [edit, setEdit] = useState('block')
    const [submit, setSubmit] = useState('none')

    useEffect(() => {
        setAbout(props.about)
    }, [props.about])

    const handleAbout = () => {
        document.getElementById('about').disabled = true;
        setSubmit('none')
        setEdit('block')
        fetch('http://localhost:3001/api/updateAbout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token: localStorage.getItem('token'), about: about})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }

    const editAbout = () => {
        document.getElementById('about').disabled = false;
        setSubmit('block')
        setEdit('none')
    }

  return (
    <div>
    <div className='d-flex p-5 py-4 flex-column '>
        <div className='d-flex justify-content-between align-items-center'>
            <p className='fontBlue fw-bold m-0'>ABOUT ME</p>
            <button className='btn myOrange px-4' style={{'display': submit}} onClick={handleAbout}>Submit</button>
            <button className='btn myOrange px-4 ' style={{'display': edit}} onClick={editAbout} >Edit</button>
        </div>
        <textarea name="" value={about} className='border-0 rounded text-muted p-3 my-3 bg-white' placeholder={about}  onChange={e => setAbout(e.target.value)} id="about" cols="30" rows="5" disabled ></textarea>
    </div>
    <div className="border-bottom mx-5"></div>
    </div>
  )
}

export default About