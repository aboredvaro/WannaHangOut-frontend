/**
 * Es necesario instalar los siguientes paquetes.... aunque ya están instalados, así que hacer solo $ yarn
 *   $ yarn add cloudinary
 *   $ yarn add blueimp-file-upload
 *   $ yarn add cloudinary
 * 
 * Además hay archivos de configuración en el .env
 */

import log from './log.js'
import process from 'process'
import cloudinary from 'cloudinary'

export async function putImageIntoCloudinary(image, type) {
     cloudinary.v2.config({
          cloud_name: `${process.env.CLOUDINARY_CLOUDNAME}`, 
          api_key: `${process.env.CLOUDINARY_APIKEY}`, 
          api_secret: `${process.env.CLOUDINARY_APISECRET}`,
          url: `${process.env.CLOUDINARY_URL}`
     })

     return new Promise((resolve, reject) => {
          cloudinary.v2.uploader.upload(image, {resouce_type: 'image', folder: pathOfImage(type), format: 'webp' }, (error, result) => {
               if (error) {
                    reject(error)
                    return
               }
               resolve(result.url)
          })
     })
     
}

export async function putImagesIntoCloudinary(images, type) {
     let urls =[]

     for(let path of images) { 
          urls.push(await putImageIntoCloudinary(path, type))
     }

     return urls
}

function pathOfImage(type) {
     let pathSave 
     if ( type == 'avatar' ) {
          pathSave = 'FeriaPIN2021/Avatar'
     } else if ( type == 'review' ) {
          pathSave = 'FeriaPIN2021/Review'
     } else if ( type == 'activity' ) {
          pathSave = 'FeriaPIN2021/Activity'
     } else {
          pathSave = 'FeriaPIN2021/sin_definir'
     }
     return pathSave
}