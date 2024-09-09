import InputAndSearchButton from "../components/inputButton";
import { FaCheckCircle, FaCloudDownloadAlt, FaUsers, FaThumbsUp } from 'react-icons/fa';

function Home() {
  return (
    <>
    <header className="bg-white py-4 fixed top-0 w-screen">
  <div className="container mx-auto px-4">
    <div className="flex items-center justify-center md:justify-start">
      <img src="/logo.png" alt="Logo" className="w-12 h-12 mr-3" />
      <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-teal-500  font-black text-lg xl:text-3xl">Harvest Image</h1>
    </div>
  </div>
</header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12 md:py-24 mt-16 xl:mt-0">
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
</section>


      {/* Features Section */}
      <section className="py-16 bg-gray-100 text-center">
  <div className="container mx-auto px-6">
    <h2 className="text-3xl font-semibold mb-8">Mengapa Menggunakan Pengunduh Massal Kami?</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="feature-item">
        <FaCloudDownloadAlt className="text-blue-500 text-6xl mb-4 mx-auto" />
        <h3 className="text-xl font-medium">Unduhan Cepat</h3>
        <p className="text-gray-600">Unduh lebih dari 30 gambar dalam hitungan detik tanpa repot.</p>
      </div>
      <div className="feature-item">
        <FaCheckCircle className="text-green-500 text-6xl mb-4 mx-auto" />
        <h3 className="text-xl font-medium">Layanan Terpercaya</h3>
        <p className="text-gray-600">Kami memastikan unduhan yang lancar dan tanpa gangguan.</p>
      </div>
      <div className="feature-item">
        <FaUsers className="text-purple-500 text-6xl mb-4 mx-auto" />
        <h3 className="text-xl font-medium">Ramah Pengguna</h3>
        <p className="text-gray-600">Antarmuka kami sederhana dan mudah digunakan oleh semua orang.</p>
      </div>
      <div className="feature-item">
        <FaThumbsUp className="text-yellow-500 text-6xl mb-4 mx-auto" />
        <h3 className="text-xl font-medium">Sangat Dinilai</h3>
        <p className="text-gray-600">Dipercaya oleh ribuan pengguna di seluruh dunia.</p>
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
