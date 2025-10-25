import { useState } from "react";
import api from "../api/api";

function Upload() {
  const [title, setTitle] = useState("");
  const [imageLinks, setImageLinks] = useState([]);
  const [linkInput, setLinkInput] = useState("");

  // Paste link automatically
  const handleLinkPaste = (e) => {
    const pastedText = e.clipboardData.getData("text");
    if (pastedText && (pastedText.startsWith("http://") || pastedText.startsWith("https://"))) {
      setImageLinks((prev) => [...prev, pastedText]);
      setLinkInput("");
      e.preventDefault();
    }
  };

  // Drag files or URLs into the input
  const handleLinkDrop = (e) => {
    e.preventDefault();

    const url = e.dataTransfer.getData("text/uri-list");
    if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
      setImageLinks((prev) => [...prev, url]);
      return;
    }

    const files = Array.from(e.dataTransfer.files);
    const fileLinks = files.map((file) => URL.createObjectURL(file));
    setImageLinks((prev) => [...prev, ...fileLinks]);
  };

  // Delete any image
  const handleDelete = (index) => {
    setImageLinks((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit comic
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || imageLinks.length === 0) {
      alert("Please enter title and at least one image!");
      return;
    }

    try {
      await api.post("/api/comics", { title, links: imageLinks });
      alert("Comic saved successfully!");
      setTitle("");
      setImageLinks([]);
      setLinkInput("");
    } catch (err) {
      console.error("Error uploading comic:", err);
      alert("Failed to upload comic!");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700">
      <style>
        {`
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      <div className="max-w-3xl mx-auto p-6 bg-gray-800 shadow-2xl border border-white text-white">
        <h2 className="text-3xl font-bold mb-6 text-center drop-shadow-lg">Upload Comic</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <input
            type="text"
            placeholder="Enter comic title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-white w-full p-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Paste Link Input */}
          <input
            type="text"
            placeholder="Paste image link or drop images here..."
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
            onPaste={handleLinkPaste}
            onDrop={handleLinkDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border border-white w-full p-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Image Previews */}
          {imageLinks.length > 0 && (
            <div className="overflow-y-auto max-h-96 mt-4 p-2 bg-gray-700 border border-white hide-scrollbar">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {imageLinks.map((link, i) => (
                  <div key={i} className="relative group w-full aspect-[3/4] border border-white">
                    <img
                      src={link}
                      alt={`Preview ${i + 1}`}
                      className="w-full h-full object-cover border border-white"
                    />
                    <button
                      type="button"
                      onClick={() => handleDelete(i)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 text-xs opacity-0 group-hover:opacity-100 transition"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-green-600 text-white border border-white hover:bg-green-700 transition"
            >
              Save Comic
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Upload;
