import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white shadow-lg md:hidden z-50">
      <div className="flex justify-around py-3 max-w-md mx-auto">
        {/* Home Link */}
        <Link
          to="/"
          className="flex flex-col items-center text-sm transition hover:text-red-500"
        >
          <div className="p-2 rounded-full hover:bg-gray-700 hover:shadow-lg transition">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 12l9-9 9 9h-3v9h-12v-9h-3z" />
            </svg>
          </div>
          Home
        </Link>

        {/* Collection Link */}
        <Link
          to="/collection"
          className="flex flex-col items-center text-sm transition hover:text-red-500"
        >
          <div className="p-2 rounded-full hover:bg-gray-700 hover:shadow-lg transition">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4 4h16v16h-16z" />
            </svg>
          </div>
          Collection
        </Link>

        {/* Upload Link */}
        <Link
          to="/upload"
          className="flex flex-col items-center text-sm transition hover:text-red-500"
        >
          <div className="p-2 rounded-full hover:bg-gray-700 hover:shadow-lg transition">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 5v14m-7-7h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          Upload
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
