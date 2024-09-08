import { FaArrowLeft, FaDownload, FaSearch } from 'react-icons/fa'
import { MdSearch } from 'react-icons/md'
import InputAndSearchButton from '../components/inputButton'
import ImagePreviewer from '../components/ImagePreview'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Image from '../components/Image'
import ErrorComponent from '../components/Error'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

function PackView() {
   const { collectionId } = useParams()
   const navigate = useNavigate()
   const [isLoading, setIsLoading] = useState(true)
   const [error, setError] = useState(false)
   const [imagePreviewSrc, setImagePreviewSrc] = useState("")
   const [bgColor, setBgColor] = useState("")
   const [previewPhotosArray, setPreviewPhotosArray] = useState([])
   const key = "g7d7KRxOl8fE437qOTxlsf9XYcd3ApDgtZlLs5XMa3Y"

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
      fetch(`https://api.unsplash.com/collections/${collectionId}/photos?client_id=${key}&per_page=30`)
      .then(response => response.json())
      .then(photos => {
         setError(false)
         setPreviewPhotosArray(photos)
         setIsLoading(false)
      })
      .catch((err) => {
         setError(true)
         setIsLoading(false)
      })
   }, [])

   function navigateToPreviousPage() {
      navigate(-1)
   }

   let page = 1
   let perPage = 30
   let totalImages = localStorage.getItem("total-images")
   let images = []

   function handleImageDownload() {
      return fetch(`https://api.unsplash.com/collections/${collectionId}/photos?client_id=${key}&page=${page}&per_page=${perPage}`)
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
      .catch((err) => {
         alert("Seems like an error occurred while trying to download, please check your internet connection and try again")
      })
   }  

   return (
    <div className="min-h-screen pt-0 pb-8">
    <div className="fixed top-0 left-0 w-full bg-white flex items-center justify-between px-8 py-4 shadow-md border-b border-opacity-40">
        <FaArrowLeft/>
        <InputAndSearchButton />
    </div>

    {!isLoading && (
        <main className='mx-auto'>
            <p className="text-2xl pt-24 mb-8 font-clashmedium tracking-wide">
                {title} by {user} [preview]<br />
                <span className='text-lg text-opacity-63 text-[#663076] font-montserrat'>
                    *You can preview an image by clicking/tapping on it*
                </span>
            </p>
            {error && <ErrorComponent />}
            <div className="grid grid-cols-5 items-center gap-3 justify-items-center justify-between">
                {collectionPhotos}
            </div>
            {!error && (
                <button 
                    onClick={handleImageDownload}
                    className="mt-8 mx-auto px-6 py-3 text-white bg-[var(--buttonBg)] rounded-lg flex items-center justify-center">
                   <FaDownload/>
                    Download
                </button>
            )}
            {imagePreviewSrc && (
                <ImagePreviewer src={imagePreviewSrc} bgColor={bgColor} setImagePreviewSrc={setImagePreviewSrc} />
            )}
        </main>
    )}

    {isLoading && (
        <div className="fixed top-0 left-0 w-full h-screen bg-white z-50 flex items-center justify-center">
            <FaSearch className="w-9/12 max-w-3xl animate-glow" />
            <p className="text-2xl font-clashmedium">Loading Preview...</p>
        </div>
    )}

    {downloadIndicator && (
        <div className="fixed top-40 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md p-4 bg-[#d3ffd3] border border-green-500 shadow-lg rounded-lg hidden animate-disappear">
            <p className="text-xl text-green-700 font-montserrat text-center">Your download will start soon</p>
        </div>
    )}
</div>

   )
}

export default PackView
