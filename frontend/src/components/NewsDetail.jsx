// src/components/NewsDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/news/${id}`)
      .then((response) => {
        setNews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  }, [id]);

  const handleDelete = async () => {
    const confirmed = confirm(
      "¿Estás seguro de que deseas eliminar esta noticia?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:8000/news/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        navigate("/news");
      } else {
        alert("No se pudo eliminar la noticia.");
      }
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  if (!news)
    return <p className="text-center text-gray-500">Cargando noticia...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-xl rounded-2xl p-8 mt-10 border border-white/10">
      {/* Title */}
      <h2 className="text-3xl font-extrabold mb-4 text-white tracking-wide">
        {news.title}
      </h2>

      {/* Main text */}
      <p className="text-slate-200 leading-relaxed whitespace-pre-wrap mb-6">
        {news.text}
      </p>

      {/* Resuls */}
      <div className="mt-6 p-4 mx-auto shadow-inner rounded-xl bg-white/10 border border-white/20">
        <p className="text-lg mb-2">
          <span className="font-semibold text-slate-300">Resultado:</span>{" "}
          <span
            className={
              news.prediction === "fake"
                ? "text-red-400 font-bold"
                : "text-green-400 font-bold"
            }
          >
            {news.prediction.toUpperCase()}
          </span>
        </p>

        <p className="text-lg mb-2">
          <span className="font-semibold text-slate-300">Confianza:</span>{" "}
          <span className="text-yellow-400 font-bold">
            {(news.confidence * 100).toFixed(2)}%
          </span>
        </p>

        <p className="text-sm text-slate-400 italic">
          <span className="font-semibold">Fecha:</span>{" "}
          {new Date(news.created_at).toLocaleString("es-MX")}
        </p>
      </div>

      {/* Button */}
      <button
        onClick={handleDelete}
        className="mt-8 w-full px-4 py-3 bg-red-600 text-white text-lg rounded-xl hover:bg-red-700 transition shadow-md"
      >
        🗑 Eliminar noticia
      </button>
    </div>
  );
}

export default NewsDetail;
