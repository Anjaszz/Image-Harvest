/* eslint-disable react/prop-types */
import { IoMdClose } from "react-icons/io";


function ImageViewer({ src, setImagePreviewSrc }) {


  return (
    <div className="fixed top-0 left-0 w-full min-h-screen z-40 bg-[var(--overlay)] backdrop-blur-md pb-80 animate-blur duration-500 ease-in-out">
    <div className="flex flex-col items-center w-11/12 mt-40 xl:mt-24 mx-auto">
        <IoMdClose 
            onClick={() => setImagePreviewSrc("")}
            className="w-8 h-auto mb-8 cursor-pointer drop-shadow-sm relative left-36 lg:left-44 top-7 text-red-600"
        />
        <div className="w-full max-w-72 lg:max-w-80 h-full lg:h-4/5 overflow-hidden border-black border-4 border-solid rounded-lg mx-auto">
            <img 
                src={src} 
                alt="Preview"
                className="object-cover w-full h-full"
            />
        </div>
    </div>
</div>


  );
}

export default ImageViewer;
