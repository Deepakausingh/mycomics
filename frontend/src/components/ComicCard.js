import { useNavigate } from 'react-router-dom';

function ComicCard({ comic }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/view/${comic.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative cursor-pointer overflow-hidden shadow-lg transform hover:-translate-y-1 transition-all bg-gray-800 border border-white hover:border-red-500"
      style={{
        aspectRatio: "0.6667", // width / height = 1:1.5
      }}
    >
      {/* Cover Image */}
      {comic.images && comic.images.length > 0 && (
        <img
          src={comic.images[0]}
          alt={comic.name}
          className="w-full h-full object-cover"
        />
      )}
      {/* Name Overlay */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-2 text-center">
        <h3 className="text-white font-semibold text-sm sm:text-base">
          {comic.name}
        </h3>
      </div>
    </div>
  );
}

export default ComicCard;
