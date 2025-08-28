import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:8000/news");
        setNews(response.data); // Be sure to adjust based on your API response structure

      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-300 py-10">
        Cargando noticias...
      </div>
    );
  }


  return (
        <div className="px-6 py-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-white text-center">
        Noticias almacenadas
      </h2>

      {news.length === 0 ? (
        <p className="text-center text-gray-400">
          No hay noticias registradas.
        </p>
      ) : (
        <div className="space-x-4">
          {news.map((item) => (
            <Link to={`/news/${item.id}`} key={item.id}>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 shadow-md hover:shadow-lg transition">
                <h3 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-300 mb-5">
                  {item.text.length > 150
                    ? item.text.slice(0, 150) + "..."
                    : item.text}
                </p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    item.is_fake ? "bg-red-600/80" : "bg-green-600/80"
                  } text-white`}
                >
                  {item.is_fake ? "Falsa" : "Verdadera"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsList;
