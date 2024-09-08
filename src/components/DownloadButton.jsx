/* eslint-disable react/prop-types */
import { FaDownload } from 'react-icons/fa'

function DownloadButton({title, onClick, currentCollectionPack}) {
  return (
    <button 
    onClick={onClick}
    className="download-button">
   <FaDownload/>
     {title}
    </button>
  )
}

export default DownloadButton