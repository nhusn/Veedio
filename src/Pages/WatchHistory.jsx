import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteHistory, getWatchHistory } from '../services/allAPI'

function WatchHistory() {
  const [history, setHistory] = useState([])
  const handleHistory = async () => {
    const { data } = await getWatchHistory()
    setHistory(data)
  }
  console.log(history);
  useEffect(() => {
    handleHistory()
  }, [])

  const handleDeleteHistory = async (id)=>{
    // make api call
    await deleteHistory(id)
    // get remaining history
    handleHistory()
  }

  return (
    <div>
      <div className='container d-flex justify-content-between align-items-center mt-4'>
        <h3>Watch History</h3>
        <Link style={{ textDecoration: "none", }} to={'/home'} ><i class="fa-solid fa-arrow-left fa-fade"></i>Back To Home</Link>
      </div>

      <table className='table container mt-3 mb-3'>
        <thead>
          <tr>
            <th>#</th>
            <th>Caption</th>
            <th>URL</th>
            <th>Time Stamp</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            history ? history.map((item, index)=>(
            <tr key={index}>
              <td>{index+1}</td>
              <td>{item?.caption}</td>
              <td><a href={item?.embedLink}>{item?.embedLink}</a></td>
              <td>{item?.TimeStamp}</td>
              <td><button onClick={()=>handleDeleteHistory(item?.id)} className='btn'><i className="fa-solid fa-trash text-danger"></i></button></td>
            </tr>
            )): <p className='fw-bolder fs-5 text-danger'>Nothing to display</p>
            
          }
        </tbody>
      </table>

    </div>
  )
}

export default WatchHistory