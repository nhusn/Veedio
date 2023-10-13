import React, { useEffect, useState } from 'react';
import VideoCard from './VideoCard'
import { Col, Row } from 'react-bootstrap'
import { getAllVideos } from '../services/allAPI';


function View({uploadVideoServerResponse}) {
  const [deleteVideoStatus,setDeleteVideoStatus] = useState(false)
  const [allVideos,setAllvideos] = useState([])
  const getAllUploadedVideos = async ()=>{
    const {data} = await getAllVideos()
    setAllvideos(data)
  }
  useEffect(()=>{
    getAllUploadedVideos()
    setDeleteVideoStatus(false)
  },[uploadVideoServerResponse,deleteVideoStatus])
  
  console.log(allVideos);

  return (
    <>
      <Row>
       
         {
          allVideos.length>0?
          allVideos.map(video=>(
          <Col sm={12} md={6} lg={4} xl={3}>
            <VideoCard displayData={video} setDeleteVideoStatus={setDeleteVideoStatus}/>
          </Col>))
          : <p>Nothing to display</p>
          }
      </Row>
    </>
  )
}

export default View