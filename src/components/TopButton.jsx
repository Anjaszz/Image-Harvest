
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
        <img src={FaArrowUp} alt="go back to the top of the page" />
    </div>
  )
}

export default BackToTop