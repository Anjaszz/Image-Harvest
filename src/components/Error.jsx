/* eslint-disable react/no-unescaped-entities */
function ErrorComponent() {
    return (
      <div className="flex flex-col items-center justify-center text-center bg-white">
      <p className="mb-4">
        Maaf, kami tidak dapat memproses permintaan Anda saat ini. Silakan periksa koneksi internet atau kata pencarian Anda dan coba lagi.
      </p>
      <img
        src="/notfound.jpg"
        alt="Gambar tidak ditemukan"
        className="w-full max-w-md" // Menyusun ukuran gambar agar responsif
      />
    </div>
    
    )
  }
  
  export default ErrorComponent