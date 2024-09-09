/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useRef, useState } from 'react';
import { FaDownload } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import JSZip from 'jszip';
import saveAs from 'file-saver';

function CollectionPack({
  title,
  total,
  previewPhotoOne,
  previewPhotoTwo,
  previewPhotoThree,
  user,
  id,
  altDescription,
  setDownloadIndicator,
}) {
  const sliderRef = useRef();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const key = 'g7d7KRxOl8fE437qOTxlsf9XYcd3ApDgtZlLs5XMa3Y';

  function handleViewImagesClick(id, total, title, user) {
    navigate(`/packview/${id}`);
    localStorage.setItem('total-images', total);
    localStorage.setItem('images-title', title);
    localStorage.setItem('images-user', user);
  }

  let page = 1;
  const perPage = 30;
  const totalImages = total;
  const images = [];

  function handleImageDownload() {
    return fetch(
      `https://api.unsplash.com/collections/${id}/photos?client_id=${key}&page=${page}&per_page=${perPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        images.push(...data);
        if (images.length === totalImages) {
          setDownloadIndicator(true);
          setTimeout(() => {
            setDownloadIndicator(false);
          }, 2000);

          const zip = new JSZip();
          const photoZip = zip.folder(`${title} by ${user}`);
          const promises = [];

          for (let i = 0; i < images.length; i++) {
            const promise = fetch(images[i].urls.regular)
              .then((response) => response.blob())
              .then((blob) => {
                photoZip.file(`${title}_${i}.jpg`, blob);
                promises.push(promise);
                if (promises.length === images.length) {
                  Promise.all(promises).then(() => {
                    zip.generateAsync({ type: 'blob' }).then((content) => {
                      saveAs(content, `${title} by ${user} image pack.zip`);
                    });
                  });
                }
              });
          }
        } else {
          page++;
          handleImageDownload();
        }
      })
      .catch(() => {
        alert(
          'Seems like an error occurred while trying to download, please check your internet connection and try again'
        );
      });
  }

  return (
    <div className="border border-blue-400 p-4 rounded-lg bg-white mb-8 max-w-xs">
    <Swiper 
        ref={sliderRef}
        className="border-2 border-gray-300 w-full h-40 rounded-lg" 
        onSlideChange={(e) => {
            setActiveIndex(e.activeIndex);
        }}
    >
        <SwiperSlide>
            <img src={previewPhotoOne} alt={altDescription} className="w-full h-full object-cover rounded-md" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={previewPhotoTwo} alt={`photo relating to ${title}`} className="w-full h-full object-cover rounded-md" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={previewPhotoThree} alt={`photo relating to ${title}`} className="w-full h-full object-cover rounded-md" />
        </SwiperSlide>
    </Swiper>
    <div className="flex max-w-xs items-center justify-center mx-auto my-4">
        <span 
            onClick={() => {
                sliderRef.current.swiper.slideTo(0);
            }}
            className={`w-2.5 h-2.5 ${activeIndex == 0 ? "bg-gray-700" : "bg-gray-400"} rounded-full cursor-pointer mx-1`}
        ></span>
        {total >= 2 && (
            <span 
                onClick={() => {
                    sliderRef.current.swiper.slideTo(1);
                }}
                className={`w-2.5 h-2.5 ${activeIndex == 1 ? "bg-gray-700" : "bg-gray-400"} rounded-full cursor-pointer mx-1`}
            ></span>
        )}
        {total >= 3 && (
            <span 
                onClick={() => {
                    sliderRef.current.swiper.slideTo(2);
                }}
                className={`w-2.5 h-2.5 ${activeIndex == 2 ? "bg-gray-700" : "bg-gray-400"} rounded-full cursor-pointer mx-1`}
            ></span>
        )}
    </div>
    <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-center text-gray-800">{title} by {user}</p>
    <p className="text-sm sm:text-base lg:text-lg text-center mb-5 text-gray-600">{total} images</p>
    <div className="flex items-center justify-between flex-wrap">
    <button 
    onClick={handleImageDownload}
    className="flex items-center px-5 py-2 text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring"
>
    <FaDownload className="mr-2" />
    Download
</button>

        <button 
            onClick={() => handleViewImagesClick(id, total, title, user)}
            className="px-5 py-2 min-w-[120px] text-center text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring"
        >
            View Images
        </button>
    </div>
</div>

  );
}

export default CollectionPack;
