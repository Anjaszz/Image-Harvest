import { IoIosArrowBack } from 'react-icons/io'
import { FaDownload } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import JSZip from "jszip"
import saveAs from "file-saver"
import InputAndSearchButton from '../components/inputButton'
import ImagePreviewer from '../components/ImagePreview'
import Image from '../components/Image'
import ErrorComponent from '../components/Error'
import { BiSearchAlt2 } from 'react-icons/bi'

function PackView() {
  const { collectionId } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [imagePreviewSrc, setImagePreviewSrc] = useState("")
  const [bgColor, setBgColor] = useState("")
  const [previewPhotosArray, setPreviewPhotosArray] = useState([])
  const key = "g7d7KRxOl8fE437qOTxlsf9XYcd3ApDgtZlLs5XMa3Y"

  const collectionPhotos = previewPhotosArray.map((photo) => (
    <Image
      key={photo.id}
      setImagePreviewSrc={setImagePreviewSrc}
      setBgColor={setBgColor}
      color={photo.color}
      description={photo.description}
      src={photo.urls.regular}
    />
  ))

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
      .catch(() => {
        alert("Seems like an error occurred while trying to download, please check your internet connection and try again")
      })
  }

  return (
    <div className="min-h-screen pb-8">
    <div className="bg-white fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 z-10">
      {/* Ganti <img> dengan komponen IoIosArrowBack */}
      <IoIosArrowBack
        onClick={navigateToPreviousPage}
        className="mr-4 cursor-pointer text-2xl" // Tambahkan ukuran atau gaya
      />
      <InputAndSearchButton />
    </div>

    {!isLoading && (
      <main className="mx-auto mt-24">
        <p className="text-3xl mt-24 mb-8 font-clashmedium tracking-wider">
          {title} by {user} [preview]
          <br />
          <span className="text-xl text-[#662076] font-montserrat">
            *You can preview an image by clicking/tapping on it*
          </span>
        </p>
        {error && <ErrorComponent />}

        <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {collectionPhotos}
        </div>

        {!error && (
          <button
            onClick={handleImageDownload}
            className="mx-auto mt-8 flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {/* Ganti <img> dengan komponen FaDownload */}
            <FaDownload className="mr-2 w-6 h-6" />
            Download
          </button>
        )}

        {imagePreviewSrc && (
          <ImagePreviewer
            src={imagePreviewSrc}
            bgColor={bgColor}
            setImagePreviewSrc={setImagePreviewSrc}
          />
        )}
      </main>
    )}

    {isLoading && (
      <div className="flex flex-col items-center justify-center h-screen">
        {/* Ganti <img> dengan komponen BiSearchAlt2 */}
        <BiSearchAlt2 className="w-16 h-16" />
        <p className="text-xl mt-4">Loading Preview...</p>
      </div>
    )}

    {downloadIndicator && (
      <div className="fixed top-40 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md bg-green-100 border border-green-400 shadow-lg rounded p-4 text-center animate-fadeOut">
        <p className="text-xl font-montserrat text-green-800">
          Your download will start soon
        </p>
      </div>
    )}
  </div>
  
  )
}

export default PackView
