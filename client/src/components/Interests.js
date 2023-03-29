import * as React from 'react';
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { convertLength } from '@mui/material/styles/cssUtils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import CommentIcon from '@mui/icons-material/Comment';

export default function CheckboxList(props) {
  const [checked, setChecked] = React.useState([]);
  const [submit, setSubmit] = React.useState('none');
    const [edit, setEdit] = React.useState('');
    const [postInterest, setPostInterest] = useState({});

    useEffect(() => {

    // setChecked(['Web Development', 'Data Structures'])
        setChecked(props.Interests);

    }, [props])


    const handleInterest = async () => {
        setSubmit('none');
        setEdit('block');

        // ole.log(postInterest);
        alert(checked)
        // const hel = checked.map((value) => {
        //     return{[value]: value}
        // })
        fetch('http://localhost:3001/api/updateInterest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: window.localStorage.getItem('token'),
                interest: checked
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                console.log(data.error)
            }
            else{
                console.log(data)
                toast.success('Interest Updated Successfully')

            }})
        }

    
    const editInterest = () => {
        setSubmit('block');
        setEdit('none');
    }

    const removeSubmit = () => {
        setSubmit('none');
        setEdit('block');
    }

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    // console.log(value);
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    // console.log(checked);
    // see()
  };

  
  return (
    <div>

<div className='d-flex p-5 py-4 flex-column '>
                <div className='d-flex justify-content-between align-items-center'>
                    <p className='fontBlue fw-bold m-0'>INTERESTS</p>
                    <button className='btn myOrange px-4' style={{'display': submit}} onClick={handleInterest}>Submit</button>
                    <button className='btn myOrange px-4 ' onClick={editInterest} style={{'display': edit}} data-bs-toggle="modal" data-bs-target="#interestModal"  >Edit</button>
                </div>
                <div className='d-flex flex-wrap justify-content-start align-items-center'>
                    {checked.map((value) => {
                        return <button className='btn myOrange m-2'>{value}</button>
                    })}
                </div>


                <div className="modal fade" id="interestModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Interests</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={removeSubmit}></button>
      </div>
      <div className="modal-body">
        
        
        {/* <div className="row"> */}
        
      <List className='p-0'  sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {['App Development', 'Game Development', "Data Science", 'Programming', 'Web Development', "Machine Learning", 'Data Structures', "Others"].map((value) => {
        {/* console.log(value); */}
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            disablePadding
            className='rounded m-2'
            style={{'backgroundColor': '#f49d4598' }}
            key={value}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                {/* <CommentIcon /> */}
              </IconButton>
            }
            // disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    {/* </div> */}



      </div>
      <div className="modal-footer">
      <button type="button" className="btn btn-dark myDark" data-bs-dismiss="modal" onClick={removeSubmit}>Cancel</button>
        <button type="button" className="btn text-white myOrange" data-bs-dismiss="modal" onClick={handleInterest}>Save changes</button>
      </div>
    </div>
  </div>
</div>

                </div>
                </div>

                



    
  );
}