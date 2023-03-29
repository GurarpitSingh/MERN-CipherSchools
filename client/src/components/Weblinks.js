import React, { useEffect } from 'react'
import { useState } from 'react'
import './css/Weblinks.css'

const Weblinks = (props) => {
    const [edit, setEdit] = useState('block')
    const [submit, setSubmit] = useState('none')

    const [facebook, setFacebook] = useState('')
    const [twitter, setTwitter] = useState('')
    const [instagram, setInstagram] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [github, setGithub] = useState('')
    const [website, setWebsite] = useState('')

    // console.log(props);
    useEffect(() => {
        setFacebook(props.webLinks[4])
        setTwitter(props.webLinks[2])
        setInstagram(props.webLinks[3])
        setLinkedin(props.webLinks[0])
        setGithub(props.webLinks[1])
        setWebsite(props.webLinks[5])
    }, [props])


    const handleWebLinks = () => {
        setSubmit('none')
        setEdit('block')
        document.getElementById('disableField').disabled = true;

        fetch('http://localhost:3001/api/updateWebLinks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token: localStorage.getItem('token'), facebook: facebook, twitter: twitter, instagram: instagram, linkedin: linkedin, github: github, website: website})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }



    const editWebLinks = () => {
        setSubmit('block')
        setEdit('none')
        document.getElementById('disableField').disabled = false;

    }




  return (
    <div>
        <div className='d-flex p-5 py-4 flex-column '>
                <div className='d-flex justify-content-between align-items-center'>
                    <p className='fontBlue fw-bold m-0'>ON THE WEB</p>
                    <button className='btn myOrange px-4' style={{'display': submit}} onClick={handleWebLinks}>Submit</button>
                    <button className='btn myOrange px-4 ' style={{'display': edit}} onClick={editWebLinks} >Edit</button>
                </div>
            <fieldset id='disableField' className="row" disabled>
                <div className="row my-1">
                    <div className="col-lg-4">
                        <label class="form-label mb-1 webTitles fontBlue ">LinkedIn</label>
                        <div className="d-flex bg-white rounded">
                        <box-icon type='logo' class='bg-secondary round ms-3 my-1 me-1 ' size='sm' color='white' name='linkedin'></box-icon><input type="text" class="form-control border-0 noFocusBorder bg-white" value={linkedin} onChange={e=> setLinkedin(e.target.value)} placeholder={linkedin} /><box-icon type='solid' class='mt-2 me-3' style={{'display': submit}} color='grey' name='pencil'></box-icon>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <label class="form-label mb-1 webTitles fontBlue ">GitHub</label>
                        <div className="d-flex bg-white rounded">
                        <box-icon type='logo' class='bg-secondary round ms-3 my-1 me-1' size='sm' color='white' name='github'></box-icon><input type="text" class="form-control border-0 noFocusBorder bg-white" value={github} onChange={e=> setGithub(e.target.value)} placeholder={github} /><box-icon type='solid' class='mt-2 me-3' style={{'display': submit}} color='grey' name='pencil'></box-icon>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <label class="form-label mb-1 webTitles fontBlue ">Facebook</label>
                        <div className="d-flex bg-white rounded">
                        <box-icon type='logo' class='bg-secondary round ms-3 my-1 me-1' size='sm' color='white' name='facebook-circle'></box-icon><input type="text" class="form-control border-0 noFocusBorder bg-white" value={facebook} onChange={e=> setFacebook(e.target.value)} placeholder={facebook} /><box-icon type='solid' class='mt-2 me-3' style={{'display': submit}} color='grey' name='pencil'></box-icon>
                        </div>
                    </div>
                </div>

                <div className="row my-1">
                    <div className="col-lg-4">
                        <label class="form-label mb-1 webTitles fontBlue ">Twitter</label>
                        <div className="d-flex bg-white rounded">
                        <box-icon type='logo' class='bg-secondary round ms-3 my-1 me-1' size='sm' color='white' name='twitter'></box-icon><input type="text" class="form-control border-0 noFocusBorder bg-white" value={twitter} onChange={e=> setTwitter(e.target.value)} placeholder={twitter} /><box-icon type='solid' class='mt-2 me-3' style={{'display': submit}} color='grey' name='pencil'></box-icon>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <label class="form-label mb-1 webTitles fontBlue ">Instagram</label>
                        <div className="d-flex bg-white rounded">
                        <box-icon type='logo' class='bg-secondary round ms-3 my-1 me-1' size='sm' color='white' name='instagram'></box-icon><input type="text" class="form-control border-0 noFocusBorder bg-white" value={instagram} onChange={e=> setInstagram(e.target.value)} placeholder={instagram} /><box-icon type='solid' class='mt-2 me-3' style={{'display': submit}} color='grey' name='pencil'></box-icon>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <label class="form-label mb-1 webTitles fontBlue ">Website</label>
                        <div className="d-flex bg-white rounded">
                        <box-icon type='logo' class='bg-secondary round ms-3 my-1 me-1' size='sm' color='white' name='globe'></box-icon><input type="text" class="form-control border-0 noFocusBorder bg-white" value={website} onChange={e=> setWebsite(e.target.value)} placeholder={website} /><box-icon type='solid' class='mt-2 me-3' style={{'display': submit}} color='grey' name='pencil'></box-icon>
                        </div>
                    </div>
                </div>
            </fieldset>


    </div>
    <div className="border-bottom mx-5"></div>
    </div>
  )
}

export default Weblinks