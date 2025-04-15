import api from "./axiosInstance"

export const getProfile =async(user_id)=>{
  
    const response = await api.post(`/get_profile.php`, user_id )


    return response.data
}

export const editProfile = async(profileData)=>{

    console.log(profileData,"profileData from profile api");
    
    const response = await api.post(`/profile.php`,profileData)

    console.log(response.data,"response from profile data");
    
    return response.data
}