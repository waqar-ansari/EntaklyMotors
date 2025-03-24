import api from "./axiosInstance"

export const getProfile =async()=>{
    const response = await api.get(`/get_profile`)
    return response.data
}

export const editProfile = async(profileData)=>{
    const response = await api.post(`/profile`,profileData)
    return response.data
}