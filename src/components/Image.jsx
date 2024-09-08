/* eslint-disable react/prop-types */
function Image({src, color, setImagePreviewSrc,setBgColor, description}) {

    function handleImageClick(src, color){
      setImagePreviewSrc(src)
      setBgColor(color)
    }
    return (
        <div 
        onClick={() => {
          handleImageClick(src, color);
        }}
        className="relative overflow-hidden"
      >
        <img
          src={src}
          alt={description || "image"}
          className="object-cover min-h-full transition ease-in-out duration-200"
        />
      </div>
      
    )
  }
  
  export default Image