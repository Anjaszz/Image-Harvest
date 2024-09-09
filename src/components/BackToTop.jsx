
import { FaArrowUp } from "react-icons/fa6";


function BackToTop() {
  function backToTop(){
    window.scrollTo({
        top:0,
        left:0,
        behavior : "smooth"
    })
}

  return (
    <div 
    onClick={backToTop}
    className="fixed bottom-4 right-4 bg-violet-600 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-violet-700 transition duration-300 ease-in-out"
>
    <FaArrowUp className="text-xl" />
</div>

  )
}

export default BackToTop