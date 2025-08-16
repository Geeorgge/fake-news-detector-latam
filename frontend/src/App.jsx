import { useState } from 'react'

function App() {
  const [text, setText] = useState("")
  const [result, setResult] = useState(null)

  const handleCheck = async () => {
    const res = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div>
      <h1>Fake News Detector LATAM</h1>
      <textarea value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleCheck}>Analizar</button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  )
}

export default App
