import { useEffect, useState } from "react";
import api from "../api/api";
import ComicCard from "../components/ComicCard";

function Collection() {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    api
      .get("/api/comics")
      .then((res) => setComics(res.data))
      .catch((err) => console.error("Error fetching comics:", err));
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      {/* Page Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-white mb-8 drop-shadow-lg">
        Comic Collection
      </h1>

      {/* Comics Grid */}
      {comics.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {comics.map((comic) => (
            <ComicCard key={comic.id} comic={comic} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-lg text-center mt-12">
          No comics found.
        </p>
      )}
    </div>
  );
}

export default Collection;
