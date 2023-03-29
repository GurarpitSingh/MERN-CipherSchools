import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import About from './About'
import './css/ProfileBanner.css'
import Followers from './Followers'
import Heatmap from './Heatmap'
import Interests from './Interests'
import Password from './Password'
import ProfessionalInfo from './ProfessionalInfo'
import Weblinks from './Weblinks'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ProfileBanner = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')
  const [username, setUsername] = useState('')
  const [updatePhone, setUpdatedPhone] = useState('')
  const [lastName, setLastName] = useState('')
  const [image, setImage] = useState('')

  const [webLinks, setWebLinks] = useState({})
  const [professionalInfo, setProfessionalInfo] = useState({})
  const [password, setPassword] = useState('')
  const [interests, setInterests] = useState([])

  const [about, setAbout] = useState('')


  useEffect(() => {
    document.title = 'Dashboard'

    if(localStorage.getItem('token') === null){
      navigate('/login')
      

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
              toast.success('Welcome back ' + data.user.name)

              setFirstName(data.user.name)
              setEmail(data.user.email)
              setDob(data.user.dob)
              setUsername(data.user.username)
              setAbout(data.user.about)
              setLastName(data.user.lastName)
              setUpdatedPhone(data.user.phone)
              setImage(data.user.image? data.user.image.url: '')

              setWebLinks([data.user.linkedin, data.user.github, data.user.twitter, data.user.instagram, data.user.facebook, data.user.website])
              setProfessionalInfo([data.user.highestEducation, data.user.job])
              setPassword(data.user.password)
              setInterests(data.user.interests)

            }
      }
      )


  }
  }, [image])

  const updateInfo = () => {
    const token = window.localStorage.getItem('token')
    fetch('http://localhost:3001/api/updateInfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: firstName, token: token, lastName: lastName, phone: updatePhone})
    })
    .then(res => res.json())
    .then(data => {
        if(data.error) {
            navigate('/')
        }
        else{
            console.log(data)
            toast.success('Profile Updated')
        }
    }
    )
  }








  return (
    <div>
    <div className='backBanner d-flex bg-white px-5' style={{'height': "110px"}}>
        <div className='d-flex flex-column justify-content-center align-items-center' style={{'width': "110px"}}>
          <img className='profilePhoto' src={image? image: require('./logo.png')} alt=""  />
          <button type="button" className="btn bg-dark editIcon" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <box-icon type='solid' color="white" name='pencil'></box-icon>
          </button>
        </div>
      <div className='d-flex justify-content-between align-items-center ms-4' style={{'width': "100%"}}>
      <div className='d-flex flex-column justify-content-center ' >
        <p className='text-dark mb-0 p-0 fontBlue' style={{fontSize: "1.50rem", fontWeight: "300"}}>Hello,</p>
        <p className='text-dark fw-bold mb-0 p-0 fontBlue' style={{fontSize: "24px"}}>{firstName}</p>
        <p className='text-dark pt-0 fontBlue' style={{fontSize: "1rem", fontWeight: "300"}}>{email}</p>
      </div>
      
  <Link id='followers' className='nav-link'  to='/followers'><h5>5 Followers</h5></Link>

      </div>







      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header border-0">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Profile Update</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <div className="row">
          <div className="col-4">
          <div className="d-flex h-100 align-items-center justify-content-center">
            <img className='profilePhoto ms-4' src={image? image: require('./logo.png')} style={{'height': "150px", 'width': "150px"}} alt=""  />
              <div className="input-group">
                  <label className='btn bg-dark editIcon rounded-circle bg-white shadow' style={{'right': '90px', 'top': '45px'}} htmlFor="inputGroupFile01"><box-icon type='solid' color="black" name='pencil'></box-icon></label>
                  <input  className="btn bg-dark editIcon form-control" type="file" onChange={handleImage}  id="inputGroupFile01" hidden />
              </div>
            </div>
          </div>
          <div className="col-8">
            
          <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">First Name</label>
          <input type="text" className="form-control" value={firstName} onChange={e=> setFirstName(e.target.value)} id="fName" placeholder="Enter First Name" />
          </div>
          <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Last Name</label>
          <input type="text" className="form-control" value={lastName} onChange={e=> setLastName(e.target.value)} id="lName" placeholder="Enter Last Name" />
          </div>
          <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="eMail" disabled placeholder={email} />
          </div>
          <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Phone Number</label>
          <input type="tel" className="form-control" id="phone" value={updatePhone} onChange={e=> setUpdatedPhone(e.target.value)} placeholder="Enter Phone number" />
          </div>


          </div>
            
        </div>
      </div>
      <div className="modal-footer border-0">
        <button type="button" className="btn btn-dark myDark" data-bs-dismiss="modal">Cancel</button>
        <button type="button" className="btn text-white myOrange" onClick={updateInfo}>Save changes</button>
      </div>
    </div>
  </div>
</div>

    </div>
<About about={about} />
<Heatmap />
<Weblinks webLinks={webLinks} />
<ProfessionalInfo ProfessionalInfo={professionalInfo} />
<Password Password={password} />
<Interests Interests={interests} />
</div>

  )
}





const postImage = (photo) => {
  const token = window.localStorage.getItem('token')
  fetch('http://localhost:3001/api/updateProfilePic', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({token: token, profilePic: photo})
  })
  .then(res => res.json())
  .then(data => {
      if(data.error) {
          console.log(data.error)
      }
      else{
          console.log('Image uploaded successfully')
          toast.success('Profile Picture Updated')
      }
  }
  )
}

const handleImage = (e) => {
  var file = e.target.files[0]
  var reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = function(){
      // console.log(reader.result)
      postImage(reader.result)
  }

}


