/* eslint-disable react/prop-types */
function Image({src, color, setImagePreviewSrc,setBgColor, description}) {

    function handleImageClick(src, color){
      setImagePreviewSrc(src)
      setBgColor(color)
    }
    return (
        <div 
        onClick={()=>{
          handleImageClick(src, color)
        }}
        className="border-4 w-[10rem] max-w-[20rem] h-60 lg:h-72 lg:w-56 overflow-hidden rounded-[1rem] border-black">
        <img src={src} alt={description || "image"} className="z-10 object-cover min-h-full transition-transform duration-300 ease-in-out hover:scale-110"/>

      </div>
      
    )
  }
  
  export default Image