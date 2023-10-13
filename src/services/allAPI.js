const { commonAPI } = require("./commonAPI")
const { serverURL } = require("./serverURL")

// upload a video
export const uploadVideo = async (reqBody)=>{
    // make post http request to http://localhost:4000/videos to add video in json server and return response to Add component
    return await commonAPI ("POST",`${serverURL}/videos`,reqBody)
}

// get all videos from json server
export const getAllVideos = async ()=>{
    // make a get http request to http://localhost:4000/videos to get all video from json server and return response to view component
    return await commonAPI ("GET",`${serverURL}/videos`,"")
}

// get a videos from json server
export const getAVideos = async (id)=>{
    // make a get http request to http://localhost:4000/videos to get a video from json server and return response to view component
    return await commonAPI ("GET",`${serverURL}/videos/${id}`,"")
}

// remove a videos from json server
export const deleteAVideos = async (id)=>{
    // make delete http request to http://localhost:4000/videos to remove a video from json server and return response to view component
    return await commonAPI ("DELETE",`${serverURL}/videos/${id}`,{})
}

// store watching video history in json server
export const addToWatchHistory = async (videoDetails)=>{
    // make get http request to http://localhost:4000/hustory to get a video from json server and return response to view component
    return await commonAPI("POST",`${serverURL}/history`,videoDetails)
}

// store watching video history in json server
export const getWatchHistory = async ()=>{
    // make get http request to http://localhost:4000/history to get a video from json server and return response to view component
    return await commonAPI("GET",`${serverURL}/history`,"")
}

// delete watching video history in json server
export const deleteHistory = async (id)=>{
    // make get http request to http://localhost:4000/histry/id to delete a video from json server and return response to watch history component
    return await commonAPI("DELETE",`${serverURL}/history/${id}`,{})
}

// add a category to json server
export const addToCategory = async (reqBody)=>{
    // make post http request to http://localhost:4000/categories to add category in json server
    return await commonAPI("POST",`${serverURL}/categories`,reqBody)
}

// add a category to json server
export const getAllCategory = async ()=>{
    // make get http request to http://localhost:4000/categories to get category in json server
    return await commonAPI("GET",`${serverURL}/categories`,"")
}

// add a category to json server
export const deleteCategory = async (id)=>{
    // make DELETE http request to http://localhost:4000/categories/id to delete category in json server
    return await commonAPI("DELETE",`${serverURL}/categories/${id}`,{})
}

// update a category to json server
export const updateCategory = async (id,body)=>{
    // make DELETE http request to http://localhost:4000/categories to delete category in json server
    return await commonAPI("PUT",`${serverURL}/categories/${id}`,body)
}


