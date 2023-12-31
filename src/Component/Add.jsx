import React, { useState } from 'react'
import { Button, Modal,Form } from 'react-bootstrap';
import {uploadVideo} from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add({setUploadVideoServerResponse}) {
  const [video,setVideo] = useState({
    id:"",caption:"",embedLink:""
  })

  const handleUpload = async ()=>{
    const {id,caption,url,embedLink} = video
    if(!id || !caption || !url || !embedLink){
      toast.warning("Please fill the form completely")
    }else{
      const response = await uploadVideo(video)
      console.log(response);
      if(response.status>=200 && response.status<300){
        toast.success(`'${response.data.caption}' video uploaded successfully!!!`)
        // set server reponse
        setUploadVideoServerResponse(response.data)
        // reset video
        setVideo({
          id:"",caption:"",embedLink:""
        })
        // hide modal
        handleClose()
      }else{
        console.log(response);
        alert("please provide unique id for uploading video")
      }
    }
  }

  const getEmbedLink = (e)=>{
    const {value}=e.target
    if(value){
      const link = `https://www.youtube.com/embed/${value.slice(-11)}`
      setVideo({...video,embedLink:link})
    }else{
      setVideo({...video,embedLink:""})
    }
    
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(video);
  return (
    <>
      <div className='d-flex align-items-center'>
        <h5>Upload New Video</h5>
        <button onClick={handleShow} className='btn'><i className='fa-solid fa-circle-plus fs-5'></i></button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please Fill the following details</p>
          <Form className='border rounded p-3'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter Video ID" onChange={(e)=>setVideo({...video,id:e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter Video Caption" onChange={(e)=>setVideo({...video,caption:e.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter Video Image URL" onChange={(e)=>setVideo({...video,url:e.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter Youtube Video Link" onChange={getEmbedLink}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpload}>Upload</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
      autoClose={2000}
      theme='colored'
      position='top-center'
      />
    </>
  )
}

export default Add