import api from "./axiosInstance"

export const getProfile =async()=>{
    const response = await api.get(`/get_profile`)
    console.log(response.data,"response from getProfile");
    
    return response.data
}

export const editProfile = async(profileData)=>{
    console.log(profileData,"profile data");
    
    const response = await api.post(`/profile`,profileData)
    return response.data
}