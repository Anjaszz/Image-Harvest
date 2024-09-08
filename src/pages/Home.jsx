import InputAndSearchButton from "../components/inputButton";


function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4 py-16 md:px-8">
      <img
        className="w-3/4 max-w-md mb-8 md:w-1/2 lg:w-1/3"
        src="https://img.freepik.com/free-vector/download-concept-illustration_114360-3911.jpg"
        alt="illustration of a man holding a progress bar"
      />

      <h1 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
        Download <span className="text-blue-600">Bulk Images</span> without stress
      </h1>

      <p className="text-lg text-gray-600 mb-6 max-w-2xl">
        Using Bulk Downloader, you can download over 30+ images at once with just one click.
      </p>

      <InputAndSearchButton />
    </main>
  );
}

export default Home;
