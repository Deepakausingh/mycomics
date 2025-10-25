import { useEffect, useState } from "react";
import api from "../api/api";

function Manage() {
  const [comics, setComics] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  // Fetch all comics
  useEffect(() => {
    fetchComics();
  }, []);

  const fetchComics = async () => {
    try {
      const res = await api.get("/api/comics");
      setComics(res.data);
    } catch (err) {
      console.error("Error fetching comics:", err);
    }
  };

  // Delete comic
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this comic?")) return;

    try {
      await api.delete(`/api/comics/${id}`, {
        headers: { "Content-Type": "application/json" },
      });
      fetchComics();
    } catch (err) {
      console.error("Delete error:", err.response || err);
      alert("Failed to delete comic!");
    }
  };

  // Start editing
  const handleEdit = (comic) => {
    setEditId(comic.id);
    setEditTitle(comic.title || comic.name);
  };

  // Save edited title
  const handleSave = async () => {
    if (!editTitle.trim()) {
      alert("Title cannot be empty!");
      return;
    }
    try {
      await api.put(`/api/comics/${editId}`, { title: editTitle });
      setEditId(null);
      setEditTitle("");
      fetchComics();
    } catch (err) {
      console.error("Error updating comic:", err.response || err);
      alert("Failed to update comic!");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center drop-shadow-lg">
          Manage Comics
        </h2>

        {comics.length === 0 ? (
          <p className="text-gray-400 text-center mt-12">No comics available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {comics.map((comic) => (
              <div
                key={comic.id}
                className="relative group border border-white bg-gray-700"
              >
                {/* Comic Cover with 1:1.5 ratio */}
                <div className="w-full aspect-[2/3]">
                  {comic.images && comic.images.length > 0 && (
                    <img
                      src={comic.images[0]}
                      alt={comic.name || comic.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Overlay for title and actions */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition pointer-events-auto">
                  <div className="p-2">
                    {editId === comic.id ? (
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full p-1 bg-gray-800 text-white border border-white"
                      />
                    ) : (
                      <h3 className="text-white font-semibold text-center">
                        {comic.name || comic.title}
                      </h3>
                    )}
                  </div>

                  <div className="flex justify-around p-2">
                    {editId === comic.id ? (
                      <button
                        onClick={handleSave}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 border border-white transition"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(comic)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 border border-white transition"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(comic.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 border border-white transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Manage;
