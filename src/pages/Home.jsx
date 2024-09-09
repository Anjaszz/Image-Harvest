import InputAndSearchButton from "../components/inputButton";
import { FaCheckCircle, FaCloudDownloadAlt, FaUsers, FaThumbsUp } from 'react-icons/fa';

function Home() {
  return (
    <>
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12 md:py-24">
  <div className="container mx-auto px-6 flex flex-col md:flex-row items-center text-center md:text-left">
    <div className="md:flex-1">
      <h1 className="xxl:text-4xl text-2xl md:text-6xl font-bold mb-6">
        Download <span className="text-yellow-300"><br/>Banyak Gambar</span><br/> Dengan Mudah
      </h1>
      <p className="text-sm xxl:text-lg md:text-xl mb-8">
      Dapatkan lebih dari 30+ gambar sekaligus hanya dengan satu klik. Hemat waktu Anda sekarang juga!
      </p>
      <InputAndSearchButton />
    </div>
    <img
      className="mt-12 md:mt-0 w-full max-w-lg ml-0 md:ml-12"
      src="/hero-img.png"
      alt="Illustration of a man holding a progress bar"
    />
  </div>
</header>


      {/* Features Section */}
      <section className="py-16 bg-gray-100 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-8">Why Use Our Bulk Downloader?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="feature-item">
              <FaCloudDownloadAlt className="text-blue-500 text-6xl mb-4 mx-auto" />
              <h3 className="text-xl font-medium">Fast Downloads</h3>
              <p className="text-gray-600">Download 30+ images in seconds with no hassle.</p>
            </div>
            <div className="feature-item">
              <FaCheckCircle className="text-green-500 text-6xl mb-4 mx-auto" />
              <h3 className="text-xl font-medium">Reliable Service</h3>
              <p className="text-gray-600">We ensure smooth and uninterrupted downloads.</p>
            </div>
            <div className="feature-item">
              <FaUsers className="text-purple-500 text-6xl mb-4 mx-auto" />
              <h3 className="text-xl font-medium">User-Friendly</h3>
              <p className="text-gray-600">Our interface is simple and easy to use for everyone.</p>
            </div>
            <div className="feature-item">
              <FaThumbsUp className="text-yellow-500 text-6xl mb-4 mx-auto" />
              <h3 className="text-xl font-medium">Highly Rated</h3>
              <p className="text-gray-600">Trusted by thousands of users across the globe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-8">What Our Users Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="testimonial-item bg-gray-100 p-6 rounded shadow-md">
              <p className="text-gray-600 italic mb-4">"This tool saved me so much time, I can download images in bulk and get my work done faster!"</p>
              <h4 className="text-lg font-bold">- John Doe</h4>
            </div>
            <div className="testimonial-item bg-gray-100 p-6 rounded shadow-md">
              <p className="text-gray-600 italic mb-4">"Bulk Downloader is a must-have for any designer who needs to gather a lot of images quickly."</p>
              <h4 className="text-lg font-bold">- Jane Smith</h4>
            </div>
            <div className="testimonial-item bg-gray-100 p-6 rounded shadow-md">
              <p className="text-gray-600 italic mb-4">"Highly recommend this app, it’s fast, easy, and reliable. Just what I needed."</p>
              <h4 className="text-lg font-bold">- Michael Lee</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm mb-4">&copy; 2024 Bulk Downloader. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-blue-400">Facebook</a>
            <a href="#" className="text-blue-400">Twitter</a>
            <a href="#" className="text-blue-400">Instagram</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
