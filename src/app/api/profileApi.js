import api from "./axiosInstance"

export const getProfile =async()=>{
    const response = await api.get(`/profile/get`)
    return response.data
}

export const editProfile = async(profileData)=>{
    const response = await api.put(`/profile/edit`,profileData)
    return response.data
}