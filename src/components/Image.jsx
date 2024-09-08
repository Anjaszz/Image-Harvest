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
        className="border w-[15rem] max-w-[20rem] h-[20rem] mb-[2rem] overflow-hidden rounded-[1rem]"
       >
                <img
  src={src}
  alt={description || "image"}
  className="object-cover min-h-full transition-transform duration-300 ease-in-out hover:scale-110"
/>

              </div>
      
    )
  }
  
  export default Image