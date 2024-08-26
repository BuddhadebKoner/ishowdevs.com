import axiosInstance from '../config/config';


const homeContents = async () => { 
   try {
      const response = await axiosInstance.get(`/admin/home-content`)
      return response.data;
   } catch (error) {
      console.error("Error accessing home contents: ", error);
      throw error;
   }
};


export { homeContents };