import React, { useEffect, useState } from 'react'
import { Modal,Form,Button, FormLabel, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCategory, deleteCategory, getAVideos, getAllCategory, updateCategory } from '../services/allAPI';
import VideoCard from './VideoCard';

function Category() {
  const [allCategories,setAllCatgories] = useState([])
  const [categoryName,setCategoryName] = useState("")
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAddCategory = async()=>{
    if(categoryName){
      const body={
        categoryName,allVideos:[]
      }
      const response = await addToCategory(body)
      if(response.status>200 && response.status<300){
        // hide modal
        handleClose()
        // reset state
        setCategoryName("")
        // get category
        getCategories()
      }else{
        toast.error("Operation failed!!! please try again after some times")
      }
    }else{
      toast.warning("Please provide category name")
    }
  }
  const getCategories = async ()=>{
      const {data}= await getAllCategory()
      setAllCatgories(data)
      console.log(data);
  }
  useEffect(()=>{
    getCategories()
  },[])

  const handleDelete= async (id)=>{
    await deleteCategory(id)
    getCategories()
  }

  const dragOver = (e)=>{
    e.preventDefault()
  }

  const videoDrop = async (e,categoryId)=>{
    // console.log("video dropped on category id "+categoryId);
    const videoId = e.dataTransfer.getData("videoId")
    // console.log("Video Card Id ",videoId);
    const {data} = await getAVideos(videoId)
    const selectedCategory = allCategories?.find(item=>item.id===categoryId)
    selectedCategory.allVideos.push(data)
    console.log(selectedCategory);
    // make api call to update category
    await updateCategory(categoryId,selectedCategory)
    getCategories()
  }


  return (
    <>

      <div className='d-grid ms-3'><button onClick={handleShow} className='btn btn-primary'>Add New Category</button></div>
      {
        allCategories?.length>0?allCategories?.map(item=>(
            <div className='mt-3 ms-3 border rounded pt-3' droppable onDragOver={(e)=>dragOver(e)} onDrop={(e)=>videoDrop(e,item?.id)}>
              <div className='d-flex justify-content-around align-items-center'>
                <h6>{item?.categoryName}</h6>
                <button onClick={()=>handleDelete(item?.id)} className='btn'><i className='fa-solid fa-trash text-danger'></i></button>
              </div>
              <Row className='d-flex justify-content-center'>
              {
                item?.allVideos && 
                item?.allVideos.map(card=>(
                  <Col sm={10} className='mt-3'>
                    <VideoCard  insideCategory={true} displayData={card} />
                  </Col>
                ))
              }
              </Row>
            </div>
        )):<p className='fw-bolder fs-5 ms-3 mt-3 text-danger'>No categories are added</p>
      }
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please Fill the following details</p>
          <Form className='border rounded p-3'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FormLabel>Enter Category Name</FormLabel>
              <Form.Control type="text" placeholder="Enter Video ID" onChange={(e)=>setCategoryName(e.target.value)}/>
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>Add</Button>
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

export default Category