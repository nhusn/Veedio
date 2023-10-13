import React, { useState } from 'react'
import { Card, Modal } from 'react-bootstrap'
import {addToWatchHistory, deleteAVideos} from '../services/allAPI';



function VideoCard({displayData,setDeleteVideoStatus,insideCategory}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);
    const {embedLink,caption}= displayData
    let today = new Date()
    let TimeStamp=new Intl.DateTimeFormat('en-US',{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(today)

    let videoDetais={
      caption,embedLink,TimeStamp
    }
    await addToWatchHistory(videoDetais)
  }
  

  const removeVideo=async (id)=>{
    const response = await deleteAVideos(id)
    setDeleteVideoStatus(true)
  }

  const dragStarted = (e,id)=>{
    console.log(id);
    e.dataTransfer.setData("videoId",id)
  }

  return (
    <>
      <Card draggable onDragStart={(e)=>dragStarted(e,displayData?.id)}>
        <Card.Img height={'350px'} onClick={handleShow} variant="top" src={displayData.url} />
        <Card.Body>
          <Card.Title className='d-flex justify-content-between align-tems-center'>
            <h6>{displayData.caption}</h6>
            { insideCategory?'':
              <i onClick={()=>removeVideo(displayData?.id)} class="fa-solid fa-trash text-danger"></i>}
          </Card.Title>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe width={"100%"} height="274" src={displayData?.embedLink}  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default VideoCard