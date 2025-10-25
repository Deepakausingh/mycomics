import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import View from './pages/View';
import Upload from './pages/Upload';
import Header from './components/Header';
import Footer from "./components/Footer";
import Manage from './pages/Manage';

function App() {
  return (
    <Router>
      <Header />
      <main className="flex-1 pb-20">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/manage" element={<Manage />} />
      </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
