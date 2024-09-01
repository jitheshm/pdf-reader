import axios from 'axios'


const instance = axios.create({
    baseURL:String(import.meta.env.VITE_SERVER_URL) ,
    
   
  });

  export default instance;