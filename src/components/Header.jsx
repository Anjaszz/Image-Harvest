import { FaArrowLeft } from 'react-icons/fa'
import InputAndSearchButton from './inputButton'
import { useNavigate } from 'react-router-dom'
export const Header = () => {
    const navigate = useNavigate()
  return (
    <div className="fixed top-0 left-0 w-full z-40 bg-white px-2 shadow-md border-b border-opacity-40">
    <div className="flex flex-col items-start px-2 ">
      <div className="flex items-center cursor-pointer space-x-2 hover:text-blue-600 transition duration-300 ease-in-out mt-4"
           onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="lg:text-xl text-sm" />
        <p className="lg:text-lg text-sm font-medium">Kembali</p>
      </div>
      <InputAndSearchButton />
    </div>
  </div>
  
  )
}
