import api from "./axiosInstance"

export const getProfile =async()=>{
    const response = await api.get(`/profile/get`)
    return response.data
}

export const editProfile = async(profileData)=>{
    console.log("edit profile api called");
    
    console.log(profileData,"profileData before sending to the api");
    const response = await api.put(`/profile/edit`,profileData)
    console.log(response.data,"response data from api");
    
    return response.data
}