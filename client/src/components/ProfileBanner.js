import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import About from './About'
import './css/ProfileBanner.css'
import Heatmap from './Heatmap'
import Password from './Password'
import ProfessionalInfo from './ProfessionalInfo'
import Weblinks from './Weblinks'

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
              setFirstName(data.user.name)
              setEmail(data.user.email)
              setDob(data.user.dob)
              setUsername(data.user.username)
              setAbout(data.user.about)
              setLastName(data.user.lastName)
              setUpdatedPhone(data.user.phone)
              setImage(data.user.image.url)

              setWebLinks([data.user.linkedin, data.user.github, data.user.twitter, data.user.instagram, data.user.facebook, data.user.website])
              setProfessionalInfo([data.user.highestEducation, data.user.job])
              setPassword(data.user.password)
            }
      }
      )


  }
  }, [image])

  const updateInfo = () => {
    alert('Updating')
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
          alert('Updated Successfully')
            console.log(data)
        }
    }
    )
  }








  return (
    <div>
    <div className='backBanner d-flex bg-white px-5' style={{'height': "110px"}}>
        <div className='d-flex flex-column justify-content-center align-items-center' style={{'width': "110px"}}>
          <img className='profilePhoto' src={image? image: require('./logo.png')} alt="" srcset="" />
          <button type="button" class="btn bg-dark editIcon" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <box-icon type='solid' color="white" name='pencil'></box-icon>
          </button>
        </div>
      <div className='d-flex justify-content-between align-items-center ms-4' style={{'width': "100%"}}>
      <div className='d-flex flex-column justify-content-center ' >
        <p className='text-dark mb-0 p-0 fontBlue' style={{'font-size': "1.50rem", 'font-weight': "300"}}>Hello,</p>
        <p className='text-dark fw-bold mb-0 p-0 fontBlue' style={{'font-size': "24px"}}>{firstName}</p>
        <p className='text-dark pt-0 fontBlue' style={{'font-size': "1rem", 'font-weight': "300"}}>{email}</p>
      </div>
      <h5>5 Followers</h5>
      </div>







      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header border-0">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Profile Update</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div className="row">
          <div className="col-4">
          <div className="d-flex h-100 align-items-center justify-content-center">
            <img className='profilePhoto' src={image? image: require('./logo.png')} style={{'height': "150px", 'width': "150px"}} alt="" srcset="" />
              <div class="input-group">
                  <label className='btn bg-dark editIcon rounded-circle bg-white shadow' style={{'right': '90px', 'top': '45px'}} for="inputGroupFile01"><box-icon type='solid' color="black" name='pencil'></box-icon></label>
                  <input  class="btn bg-dark editIcon form-control" type="file" onChange={handleImage}  id="inputGroupFile01" hidden />
              </div>
            </div>
          </div>
          <div className="col-8">
            
          <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">First Name</label>
          <input type="text" class="form-control" value={firstName} onChange={e=> setFirstName(e.target.value)} id="fName" placeholder="Enter First Name" />
          </div>
          <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Last Name</label>
          <input type="text" class="form-control" value={lastName} onChange={e=> setLastName(e.target.value)} id="lName" placeholder="Enter Last Name" />
          </div>
          <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="eMail" disabled placeholder={email} />
          </div>
          <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Phone Number</label>
          <input type="tel" class="form-control" id="phone" value={updatePhone} onChange={e=> setUpdatedPhone(e.target.value)} placeholder="Enter Phone number" />
          </div>


          </div>
            
        </div>
      </div>
      <div class="modal-footer border-0">
        <button type="button" class="btn btn-dark myDark" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn text-white myOrange" onClick={updateInfo}>Save changes</button>
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
</div>

  )
}





const postImage = (photo) => {
  // alert(photo)
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
          // navigate('/')
          console.log(data.error)
      }
      else{
          console.log(data)
      }
  }
  )
}

const handleImage = (e) => {
  // alert('hello')
  var file = e.target.files[0]
  var reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = function(){
      console.log(reader.result)
      postImage(reader.result)
  }



}


