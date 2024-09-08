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
    <div className="relative">
      <Swiper
        ref={sliderRef}
        className="carousel"
        onSlideChange={(e) => setActiveIndex(e.activeIndex)}
      >
        <SwiperSlide>
          <img
            src={previewPhotoOne}
            alt={altDescription}
            className="object-cover w-full h-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={previewPhotoTwo}
            alt={`photo relating to ${title}`}
            className="object-cover w-full h-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={previewPhotoThree}
            alt={`photo relating to ${title}`}
            className="object-cover w-full h-full"
          />
        </SwiperSlide>
      </Swiper>
      <div className="flex justify-center mt-4 space-x-2">
        <span
          onClick={() => {
            sliderRef.current.swiper.slideTo(0);
          }}
          className={`h-2 w-2 rounded-full ${
            activeIndex === 0 ? 'bg-blue-500' : 'bg-gray-400'
          } cursor-pointer`}
        ></span>
        {total >= 2 && (
          <span
            onClick={() => {
              sliderRef.current.swiper.slideTo(1);
            }}
            className={`h-2 w-2 rounded-full ${
              activeIndex === 1 ? 'bg-blue-500' : 'bg-gray-400'
            } cursor-pointer`}
          ></span>
        )}
        {total >= 3 && (
          <span
            onClick={() => {
              sliderRef.current.swiper.slideTo(2);
            }}
            className={`h-2 w-2 rounded-full ${
              activeIndex === 2 ? 'bg-blue-500' : 'bg-gray-400'
            } cursor-pointer`}
          ></span>
        )}
      </div>
      <p className="text-center mt-4 text-lg font-semibold">
        • {title} by {user}
      </p>
      <p className="text-center text-gray-600">
        • {total} images
      </p>
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={handleImageDownload}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          <FaDownload/>
          Download
        </button>
        <button
          onClick={() => handleViewImagesClick(id, total, title, user)}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition"
        >
          View Images
        </button>
      </div>
    </div>
  );
}

export default CollectionPack;
