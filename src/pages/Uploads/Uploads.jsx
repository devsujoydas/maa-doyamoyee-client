import  { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const Uploads = () => {

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const API = "http://localhost:5000/api";

  // Fetch images
  const fetchImages = async () => {
    try {
      const res = await axios.get(`${API}/images`);
      setImages(res.data);
      // console.log(res.data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Drag drop
  const onDrop = (acceptedFiles) => {
    const selected = acceptedFiles[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": []
    }
  });

  // Upload image
  const handleUpload = async () => {

    if (!file) {
      toast.error("Select image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {

      setLoading(true);

      const res = await axios.post(`${API}/upload`, formData);

      if (res.data.success) {
        toast.success("Image Uploaded 🚀");
        setFile(null);
        setPreview(null);
        fetchImages();
      }

    } catch (error) {
      // console.log(error)
      toast.error("Upload Failed");

    } finally {

      setLoading(false);

    }

  };

  // Delete image
  const handleDelete = async (id) => {

    try {

      await axios.delete(`${API}/delete/${id}`);
      toast.success("Image Deleted");
      fetchImages();

    } catch (error) {
      console.log(error)
      toast.error("Delete failed");

    }

  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">

      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">

        {/* LEFT PANEL */}

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-900 rounded-2xl p-6 shadow-lg"
        >

          <h2 className="text-2xl font-semibold mb-6">
            Upload Image
          </h2>

          {/* DROPZONE */}

          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition
            ${isDragActive ? "border-blue-400 bg-gray-800" : "border-gray-700"}`}
          >

            <input {...getInputProps()} />

            <p className="text-gray-400">
              Drag & Drop image here
            </p>

            <p className="text-sm text-gray-500 mt-2">
              or click to select
            </p>

          </div>

          {/* PREVIEW */}

          {preview && (
            <div className="mt-6">

              <img loading="lazy"
                src={preview}
                alt="preview"
                className="rounded-lg max-h-64 object-cover"
              />

            </div>
          )}

          {/* BUTTON */}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Uploading..." : "Upload Image"}
          </button>

        </motion.div>

        {/* RIGHT PANEL */}

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-900 rounded-2xl p-6 shadow-lg"
        >

          <h2 className="text-2xl font-semibold mb-6">
            Image Gallery
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

            {images.map((img, index) => (

              <div
                key={index}
                className="relative group"
              >

                <img loading="lazy"
                  src={img.url}
                  className="rounded-lg object-cover h-40 w-full"
                />

                {/* DELETE BUTTON */}

                <button
                  onClick={() => handleDelete(img.public_id)}
                  className="absolute top-2 right-2 bg-red-600 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

        </motion.div>

      </div>

    </div>
  );
};

export default Uploads;