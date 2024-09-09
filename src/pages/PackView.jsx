/* eslint-disable no-unused-vars */
import { FaDownload } from 'react-icons/fa'
import ImagePreviewer from '../components/ImagePreview'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Image from '../components/Image'
import ErrorComponent from '../components/Error'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { Header } from '../components/Header'
import BackToTop from '../components/BackToTop'

function PackView() {
   const { collectionId } = useParams()
   const [isLoading, setIsLoading] = useState(true)
   const [error, setError] = useState(false)
   const [imagePreviewSrc, setImagePreviewSrc] = useState("")
   const [bgColor, setBgColor] = useState("")
   const [previewPhotosArray, setPreviewPhotosArray] = useState([])
   const apiKey = import.meta.env.VITE_API_KEY;

   const collectionPhotos = previewPhotosArray.map((photo) => {
      return (
         <Image 
            key={photo.id}
            setImagePreviewSrc={setImagePreviewSrc}
            setBgColor={setBgColor}
            color={photo.color}
            description={photo.description}
            src={photo.urls.regular} 
         />
      )
   })

   const [title, setTitle] = useState(() => localStorage.getItem("images-title"))
   const [user, setUser] = useState(() => localStorage.getItem("images-user"))
   const [downloadIndicator, setDownloadIndicator] = useState(false)

   useEffect(() => {
      fetch(`https://api.unsplash.com/collections/${collectionId}/photos?client_id=${apiKey}&per_page=30`)
      .then(response => response.json())
      .then(photos => {
         setError(false)
         setPreviewPhotosArray(photos)
         setIsLoading(false)
      })
      .catch(() => {
         setError(true)
         setIsLoading(false)
      })
   }, [])

   let page = 1
   let perPage = 30
   let totalImages = localStorage.getItem("total-images")
   let images = []

   function handleImageDownload() {
      return fetch(`https://api.unsplash.com/collections/${collectionId}/photos?client_id=${apiKey}&page=${page}&per_page=${perPage}`)
      .then(response => response.json())
      .then(data => {
         images.push(...data)
         if (images.length === totalImages) {
            setDownloadIndicator(true)
            setTimeout(() => {
               setDownloadIndicator(false)
            }, 2000)

            const zip = new JSZip()
            let photoZip = zip.folder(`${title} by ${user}`)
            const promises = [] 
            for (let i = 0; i < images.length; i++) {
               const promise = fetch(images[i].urls.regular)
               .then(response => response.blob())
               .then(blob => {
                  photoZip.file(`${title + [i]}.jpg`, blob)
                  promises.push(promise)
                  if (promises.length === images.length) {
                     Promise.all(promises).then(() => {
                        zip.generateAsync({ type: "blob" }).then((content) => {
                           saveAs(content, `${title} by ${user} image pack.zip`)
                        })
                     })
                  }
               })
            }
         } else {
            page++
            handleImageDownload()
         }
      })
      .catch(() => {
         alert("Seems like an error occurred while trying to download, please check your internet connection and try again")
      })
   }  

   return (
    <div className="min-h-screen mt-8 pb-4">
      <Header/>
    {!isLoading && (
        <main className='mx-6 lg:mx-14 mt-36'>
            <p className="text-xl lg:text-2xl mb-6 font-bold tracking-wide">
              Gambar {title} Milik {user}<br />
                <span className='text-sm text-opacity-63 text-[#535dd1] font-montserrat'>
                    *Klik Gambar untuk melihat pratinjau*
                </span>
            </p>
            {error && <ErrorComponent />}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 items-center gap-10 justify-items-center justify-between">
  {collectionPhotos}
</div>

            {!error && (
                <button 
                    onClick={handleImageDownload}
                    className="my-5 mx-auto w-auto text-center min-w-[200px] px-5 py-3 text-white transition-all rounded-md shadow-xl sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:bg-gradient-to-b dark:shadow-blue-900 shadow-blue-200 hover:shadow-2xl hover:shadow-blue-400 hover:-tranneutral-y-px  flex items-center justify-center">
                     
                   <FaDownload className='mr-2'/>
                    Download
                </button>
            )}
            {imagePreviewSrc && (
                <ImagePreviewer src={imagePreviewSrc} bgColor={bgColor} setImagePreviewSrc={setImagePreviewSrc} />
            )}
        </main>
    )}

    {isLoading && (
       <div className="fixed top-0 left-0 w-full h-screen bg-white z-50 flex flex-col items-center justify-center">
       <img src="/Search.jpg" alt="Loading preview" className="mb-4 w-1/2 max-w-md" />
       <p className="text-2xl font-clashmedium">Memuat Gambar...</p>
     </div>
     
    )}

    {downloadIndicator && (
        <div className="fixed top-40 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md p-4 bg-[#d3ffd3] border border-green-500 shadow-lg rounded-lg hidden animate-disappear">
            <p className="text-xl text-green-700 font-montserrat text-center">Download akan segera dimulai</p>
        </div>
    )}
    <BackToTop/>
</div>

   )
}

export default PackView
