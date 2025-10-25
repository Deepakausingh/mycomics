import { Link } from 'react-router-dom';
import Icon from '../assets/cm2.png'; // Adjust the path to your PNG file

function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-md px-6 py-4 flex justify-between items-center fixed top-0 z-50">
      {/* Logo / Title */}
      <div className="flex items-center space-x-3">
        <img src={Icon} alt="Icon" className="w-8 h-8" />
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide">COMICS</h1>
      </div>

      {/* Navigation */}
      <nav className="space-x-6 text-lg font-medium">
        <Link
          to="/"
          className="relative group hover:text-red-500 transition-colors duration-300"
        >
          Home
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
        </Link>
        <Link
          to="/collection"
          className="relative group hover:text-red-500 transition-colors duration-300"
        >
          Collection
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
        </Link>
        <Link
          to="/upload"
          className="relative group hover:text-red-500 transition-colors duration-300"
        >
          Upload
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
