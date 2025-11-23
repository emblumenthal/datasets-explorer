import { useState, useEffect } from "react";

function App() {
  const [datasets, setDatasets] = useState([]);
  const [searchText, setSearchText] = useState(""); // For subject/dataset/description
  const [variableText, setVariableText] = useState(""); // For variable search
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

  // Filter datasets
  const filteredDatasets = datasets.filter((d) => {
    const searchLower = searchText.toLowerCase();
    const variableLower = variableText.toLowerCase();
    const variables = Array.isArray(d.variable_names) ? d.variable_names.join(" ") : "";

    const matchesSearch =
      d.subject_area.toLowerCase().includes(searchLower) ||
      d.dataset.toLowerCase().includes(searchLower) ||
      d.description.toLowerCase().includes(searchLower);

    const matchesVariable =
      variableLower === "" || variables.toLowerCase().includes(variableLower);

    return matchesSearch && matchesVariable;
  });

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Dataset Finder</h1>

      <input
        type="text"
        placeholder="Search by subject, dataset, or description..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{
          padding: "0.5rem",
          fontSize: "1rem",
          width: "100%",
          maxWidth: "500px",
          marginBottom: "0.5rem",
        }}
      />

      <input
        type="text"
        placeholder="Optional: Search by variable..."
        value={variableText}
        onChange={(e) => setVariableText(e.target.value)}
        style={{
          padding: "0.5rem",
          fontSize: "1rem",
          width: "100%",
          maxWidth: "500px",
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

              {/* Display variable names if available */}
              {d.variable_names && d.variable_names.length > 0 && (
                <p style={{ margin: "0.25rem 0" }}>
                  <strong>Variables:</strong> {d.variable_names.join(", ")}
                </p>
              )}

              {/* Display API documentation link if available */}
              {d.api_docs && (
                <p style={{ margin: "0.25rem 0" }}>
                  <a href={d.api_docs} target="_blank" rel="noopener noreferrer">
                    API Documentation
                  </a>
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
