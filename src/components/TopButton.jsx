
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
    className='back-to-top-container'>
        <FaArrowUp />
    </div>
  )
}

export default BackToTop