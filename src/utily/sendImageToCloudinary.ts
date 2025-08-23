import { v2 as cloudinary,  } from 'cloudinary';
import config from '../app/config';
import multer from 'multer';

import fs from 'fs'



 cloudinary.config({ 
        cloud_name: config.cloudy_name, 
        api_key: config.cloudy_api_key, 
        api_secret: config.cloudy_secret // Click 'View API Keys' above to copy your API secret
    });

 export const sendImageToCloudinary=async(imageName:string,path:string)=>{
     // Configuration
   
    
 try{
        // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           path, {
               public_id: imageName,
           }
       )
    //    console.log({uploadResult});
        fs.unlink(path,()=>{
            // console.log('finally delete ')
        });
    console.log("Local file deleted.");

   return uploadResult

    }
 catch(error) {
           console.log(error);
       };
  
 } 

 const storage = multer.diskStorage({
  destination: function (req, file, cb) {  
    
    cb(null, process.cwd()+'/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
  
})

export const upload = multer({ storage: storage })