import { useState } from "react";
import axios from "axios";

const PredictionForm = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    setSuccess(null);
    try {
      const predictResponse = await axios.post(
        "http://localhost:8000/predict",
        {
          title,
          text,
        }
      );

      const { prediction, confidence } = predictResponse.data;

      setResult({ prediction, confidence });
      setSuccess("La noticia fue analizada y guardada en la base de datos ✅");

    
    } catch (err) {
      console.error("Prediction error:", err);
      setError("Hubo un problema al analizar la noticia. Intenta nuevamente.");
      setError("Hubo un problema al analizar la noticia. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-10">
      <div className="bg-white/9 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/10">
        <h2 className="text-2xl font-semibold mb-4">
          ¿Noticia verdadera o falsa?
        </h2>
        <p className="text-md text-center text-gray-300 mb-6">
          Ingresa una noticia o fragmento de texto y nuestro sistema basado en
          IA lo analizará.
        </p>

        <div>
          <input
            type="text"
            value={title}
            placeholder="Titulo..."
            onChange={(e) => setTitle(e.target.value)}
            className="mb-5 w-full p-2 rounded-lg bg-white/5 border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black transition"
          />
        </div>

        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            placeholder="Escribe o pega aquí la noticia..."
            className="w-full p-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black transition"
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300 border border-blue-400/30 focus:outline focus:outline-2 focus:outline-blue-300/40"
            disabled={loading || !text}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Analizando...
              </div>
            ) : (
              "Analizar"
            )}
          </button>
        </div>

        {error && (
          <div className="mt-6 text-red-400 bg-red-800/30 border border-red-500/40 p-4 rounded-lg text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-6 text-green-400 bg-green-800/30 border border-green-500/40 p-4 rounded-lg text-center">
            {success}
          </div>
        )}

        {result && (
          <div className="mt-6 text-center text-white">
            <p>
              <span className="font-semibold">Resultado:</span>{" "}
              <span
                className={
                  result.prediction === "fake"
                    ? "text-red-400"
                    : "text-green-400"
                }
              >
                {result.prediction === "fake" ? "Falsa" : "Verdadera"}
              </span>
            </p>
            <p>
              <span className="font-semibold">Confianza:</span>{" "}
              {(result.confidence * 100).toFixed(2)}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionForm;
