import api from "./axiosInstance"

export const getProfile =async(user_id)=>{

    
    const response = await api.post(`/get_profile.php`, user_id )


    return response.data
}

export const editProfile = async(profileData)=>{

    
    const response = await api.post(`/profile.php`,profileData)

    
    return response.data
}