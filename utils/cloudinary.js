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
 
/**
 * @description          Dado un array de rutas en local de imágenes en jpg, las aloja en nuestra cuenta de Cloudinary en formato webp
 * @param {*} images     Array de Rutas de imágenes para subir
 * @param {*} type       Tipo de la imagen 'shop', 'user', 'review' o 'activity', todas las imágenes deben tener el mismo tipo
 * @returns              Devuelve un array de string con las urls publicas de cada imagen que se ha almacenado.
 */
export async function putImagesIntoCloudinary(images, type) {
     let urls =[]
     for(let path of images) {
          urls.push(await putImageIntoCloudinary(path, type))
     }
     return urls
}

/**
 * @description     Dada la ruta en local de imagen en jpg, la aloja en nuestra cuenta de Cloudinary en formato webp
 * @param {*} image Ruta de la imagen a subir
 * @param {*} type  Tipo de la imagen 'shop', 'user', 'review' o 'activity'
 * @returns         Devuelve un string con la url publica de la imagen que se ha almacenado.
 */
async function putImageIntoCloudinary(image, type) {
     cloudinary.v2.config({
          cloud_name: `${process.env.CLOUDINARY_CLOUDNAME}`, 
          api_key: `${process.env.CLOUDINARY_APIKEY}`, 
          api_secret: `${process.env.CLOUDINARY_APISECRET}`,
          url: `${process.env.CLOUDINARY_URL}`
     })
     
     let size = setSizeOfImage(type)
     return new Promise((resolve, reject) => {
          cloudinary.v2.uploader.upload(image, 
               {
                    resouce_type: 'image', 
                    folder: getPathOfImage(type), 
                    format: 'webp',				
                    width: size.width, 
                    height: size.height, 
                    crop: size.crop
               }, 
               (error, result) => {
                    if (error) {
                         reject(error)
                         return
                    }
                    resolve(result.url)
               }
          )
     })	
}
 
/**
 * @description     Dependiendo del tipo de imagen, devuelve la ruta donde se guardará en nuestro servidor
 * @param {*} type  Tipo de la imagen 'shop', 'user', 'review' o 'activity'
 * @returns         Ruta donde se debe guardar la imagen
 */
function getPathOfImage(type) {
     let pathSave 
     if ( type == 'shop' ) {
          pathSave = 'FeriaPIN2021/Avatar/Shop'
     } else if ( type == 'user' ) {
          pathSave = 'FeriaPIN2021/Avatar/User'
     } else if ( type == 'review' ) {
          pathSave = 'FeriaPIN2021/Review'
     } else if ( type == 'activity' ) {
          pathSave = 'FeriaPIN2021/Activity'
     } else {
          pathSave = 'FeriaPIN2021/sin_definir'
     }
     return pathSave
}
 
/**
 * @description     Dependiendo del tipo de imagen, devuelve las dimensiones en las que se tiene que guardar la imagen
 * @param {*} type  Tipo de la imagen 'shop', 'user', 'review' o 'activity', pero solo 'shop' y 'user' se redimensionan como avatar
 * @returns         JSON con el alto, ancho y tipo de recorte
 */
function setSizeOfImage(type) {
     let size 
     if ( type == 'shop' || type == 'user' ) {
          size = {
               width: 500, 
               height: 500, 
               crop: 'fill'
          }
     } else {
          size = {
               width: 1280, 
               height: 720, 
               crop: 'fill'
          }
     }
     return size
}