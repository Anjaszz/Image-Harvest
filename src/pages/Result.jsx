import InputAndSearchButton from '../components/inputButton';
import BackToTop from '../components/TopButton';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CollectionPack from '../components/CollectionPack';
import ErrorComponent from '../components/Error';
import { TbPhotoSearch } from "react-icons/tb";


function Results() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const { searchTerm } = useParams();
    const [collectionArray, setCollectionArray] = useState([]);
    const [downloadIndicator, setDownloadIndicator] = useState(false);
    const key = "g7d7KRxOl8fE437qOTxlsf9XYcd3ApDgtZlLs5XMa3Y";

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://api.unsplash.com/search/collections/?per_page=20&client_id=${key}&query=${searchTerm}`)
            .then(response => response.json())
            .then(collection => {
                if (collection.total === 0) {
                    throw new Error();
                }
                setError(false);
                setCollectionArray(collection.results);
                setIsLoading(false);
            })
            .catch(() => {
                setCollectionArray([]);
                setError(true);
                setIsLoading(false);
            });
    }, [searchTerm]);

    const collectionPack = collectionArray.map((collection) => (
        <CollectionPack
            key={collection.id}
            setDownloadIndicator={setDownloadIndicator}
            altDescription={collection.cover_photo.alt_description}
            id={collection.id}
            title={collection.title}
            total={collection.total_photos}
            user={collection.user.username}
            previewPhotoOne={collection.preview_photos[0]?.urls.small}
            previewPhotoTwo={collection.preview_photos[1]?.urls.small}
            previewPhotoThree={collection.preview_photos[2]?.urls.small}
        />
    ));

    return (
        <div className="bg-gray-50 min-h-screen">
            <header className="w-full bg-white shadow-lg border-b p-4">
                <InputAndSearchButton />
            </header>

            {!isLoading && (
                <main className="py-8">
                    <p className="text-xl font-medium text-gray-700 mb-4 text-center">
                        Showing results for <span className="font-bold text-blue-600">{searchTerm}</span>
                    </p>
                    {error && <ErrorComponent />}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {collectionPack}
                    </div>
                </main>
            )}

            {isLoading && (
                <div className="flex flex-col items-center justify-center h-screen">
                    {/* Ganti <img> dengan ikon pencarian */}
                    <TbPhotoSearch className="w-16 h-16 animate-pulse" />
                    <p className="text-gray-700 mt-4">Searching for images...</p>
                </div>
            )}

            {downloadIndicator && (
                <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                    <p className="text-lg font-semibold">Your download will start soon...</p>
                </div>
            )}

            <BackToTop />
        </div>
    );
}

export default Results;
