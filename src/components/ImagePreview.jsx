/* eslint-disable react/prop-types */
import { IoMdClose } from "react-icons/io";


function ImageViewer({ src, bgColor, setImagePreviewSrc }) {
  const style = {
    backgroundColor: `${bgColor}67`,
  };

  return (
    <div
      className="fixed top-0 left-0 w-full min-h-screen z-40 bg-overlay backdrop-blur-lg animate-blur padding-bottom-80"
      style={style}
    >
      <div className="flex flex-col items-end w-[90%] max-w-[40rem] mt-[9rem] mx-auto">
        <img
          onClick={() => {
            setImagePreviewSrc("");
          }}
          src={IoMdClose}
          alt="close image preview"
          className="w-12 mb-8 cursor-pointer drop-shadow-[0_0_0.1rem_rgba(0,0,0,0.432)]"
        />

        <div className="w-full max-w-[40rem] h-[50rem] overflow-hidden mx-auto border-4 rounded-lg">
          <img src={src} alt="" className="object-cover w-full h-full" />
        </div>
      </div>
    </div>
  );
}

export default ImageViewer;
