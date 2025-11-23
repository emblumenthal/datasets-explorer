import { useState, useEffect } from "react";

function App() {
  const [datasets, setDatasets] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch datasets.json from public folder
  useEffect(() => {
    fetch(import.meta.env.BASE_URL + "datasets.json")
      .then((res) => res.json())
      .then((data) => {
        setDatasets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load datasets:", err);
        setLoading(false);
      });
  }, []);

  // Filter datasets by subject_area OR dataset name
  const filteredDatasets = datasets.filter((d) =>
    d.subject_area.toLowerCase().includes(search.toLowerCase()) ||
    d.dataset.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Dataset Finder</h1>

      <input
        type="text"
        placeholder="Search by subject area or dataset name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "0.5rem",
          fontSize: "1rem",
          width: "100%",
          maxWidth: "400px",
          marginBottom: "1rem",
        }}
      />

      {loading ? (
        <p>Loading datasets...</p>
      ) : filteredDatasets.length === 0 ? (
        <p>No datasets found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredDatasets.map((d, i) => (
            <li
              key={i}
              style={{
                border: "1px solid #ccc",
                borderRadius: "6px",
                padding: "1rem",
                marginBottom: "0.5rem",
              }}
            >
              <a
                href={d.dataset_link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontWeight: "bold", textDecoration: "none" }}
              >
                {d.dataset}
              </a>
              <p style={{ margin: "0.25rem 0" }}>
                <em>{d.subject_area}</em>
              </p>
              <p style={{ margin: "0.25rem 0" }}>{d.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
