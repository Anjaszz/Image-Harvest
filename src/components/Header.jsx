import { FaArrowLeft } from 'react-icons/fa'
import InputAndSearchButton from './inputButton'
import { useNavigate } from 'react-router-dom'
export const Header = () => {
    const navigate = useNavigate()
  return (
    <div className="fixed top-0 left-0 w-full z-40 bg-white flex items-center justify-between px-8 py-4 shadow-md border-b border-opacity-40">
  <div className="flex items-center cursor-pointer space-x-2 hover:text-blue-600 transition duration-300 ease-in-out"
       onClick={() => navigate(-1)}
  >
    <FaArrowLeft className="text-xl" />
    <p className="text-lg font-medium">Kembali</p>
  </div>
  <InputAndSearchButton />
</div>
  )
}
