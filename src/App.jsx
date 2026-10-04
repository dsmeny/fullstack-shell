import { useEffect, useState } from "react";

export default function App() {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setMessage(data.message))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-900 text-white">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <p className="text-slate-400">
        {error ? `API error: ${error}` : message ?? "Loading..."}
      </p>
    </main>
  );
}
