import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import ComicCard from '../components/ComicCard';

function Home() {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    api.get("/api/comics")
      .then((res) => {
        // Sort comics by id descending (latest first) and take first 10
        const latest = res.data.sort((a, b) => b.id - a.id).slice(0, 10);
        setComics(latest);
      })
      .catch(err => console.error("Error loading comics:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Page Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-white mb-8 drop-shadow-lg">
        Latest Comics
      </h1>

      {/* Comics Grid */}
      {comics.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {comics.map(comic => (
            <ComicCard key={comic.id} comic={comic} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center text-lg mt-12">
          No comics found.
        </p>
      )}

      {/* View Full Collection Button */}
      <div className="text-center mt-8">
  <Link
    to="/collection"
    className="px-6 py-2 bg-aqua text-black border border-white rounded-lg transition-all duration-300 relative overflow-hidden hover:text-red-500"
    style={{
      backgroundColor: '#00ffff', // aqua
      borderWidth: '1px',
      fontWeight: '800',
      letterSpacing: '1px',
    }}
  >
    <span className="relative z-10">View Full Collection</span>
    {/* Glow effect */}
    <span
      className="absolute inset-0 bg-aqua opacity-0 transition-all duration-300 rounded-lg"
      style={{
        backgroundColor: '#00ffff',
        filter: 'blur(8px)',
        
      }}
    ></span>
  </Link>
</div>
    </div>
  );
}

export default Home;
