import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

function View() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comic, setComic] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    api
      .get("/api/comics")
      .then((res) => {
        const found = res.data.find((c) => c.id === parseInt(id));
        setComic(found);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!comic)
    return (
      <p className="p-6 text-center text-white text-lg">Loading comic...</p>
    );

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const goPrev = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? comic.images.length - 1 : prev - 1
    );
  const goNext = () =>
    setCurrentIndex((prev) => (prev === comic.images.length - 1 ? 0 : prev + 1));

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white">
      {/* Back Button */}
      <button
        className="mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 shadow transition border border-white"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {/* Comic Title */}
      <h1 className="text-4xl font-bold mb-6 text-center drop-shadow-lg">
        {comic.name}
      </h1>

      {/* Comic Pages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {comic.images.map((img, i) => (
          <div
            key={i}
            className="overflow-hidden shadow-lg hover:scale-101 transition transform cursor-pointer border border-white"
            onClick={() => openModal(i)}
          >
            {/* Image Container with 2:1 height to width ratio */}
            <div className="w-full aspect-[1/2] sm:aspect-[1/2] md:aspect-[1/2] border border-white">
              <img
                src={img}
                alt={`Page ${i + 1}`}
                className="w-full h-full object-cover border border-white"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          {/* Left/Right Click Zones */}
          <div
            className="absolute left-0 top-0 w-1/2 h-full cursor-pointer z-20"
            onClick={goPrev}
          />
          <div
            className="absolute right-0 top-0 w-1/2 h-full cursor-pointer z-20"
            onClick={goNext}
          />

          {/* Close Button */}
          <button
            className="absolute top-4 left-4 text-white text-3xl font-bold z-30 hover:text-red-500 transition"
            onClick={closeModal}
          >
            ✕
          </button>

          {/* Image */}
          <img
            src={comic.images[currentIndex]}
            alt={`Page ${currentIndex + 1}`}
            className="max-h-full max-w-full object-contain select-none z-10 border border-white"
          />
        </div>
      )}
    </div>
  );
}

export default View;
