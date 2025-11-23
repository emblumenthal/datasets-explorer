import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [datasets, setDatasets] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selected, setSelected] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/datasets.json")
      .then((res) => res.json())
      .then((data) => {
        setDatasets(data);
        setSubjects([...new Set(data.map((d) => d.subject_area))]);
      });
  }, []);

  const highlightText = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? <mark key={i}>{part}</mark> : part
    );
  };

  const filtered = datasets.filter((d) => {
    const matchesSubject = selected ? d.subject_area === selected : true;
    const matchesSearch = search
      ? d.dataset.toLowerCase().includes(search.toLowerCase()) ||
        d.description.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchesSubject && matchesSearch;
  });

  // Dynamically update subjects based on current search
  const filteredSubjects = [
    ...new Set(
      datasets
        .filter((d) =>
          search
            ? d.dataset.toLowerCase().includes(search.toLowerCase()) ||
              d.description.toLowerCase().includes(search.toLowerCase())
            : true
        )
        .map((d) => d.subject_area)
    ),
  ];

  return (
    <div className="container">
      <h1>Dataset Explorer</h1>

      <div className="controls">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">All Subjects</option>
          {filteredSubjects.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search datasets or descriptions…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="cards">
        {filtered.map((d, i) => (
          <div className="card" key={i}>
            <h3>{highlightText(d.dataset, search)}</h3>
            <p className="subject">{d.subject_area}</p>
            <p className="description">{highlightText(d.description, search)}</p>
            <a href={d.dataset_url} target="_blank" rel="noopener noreferrer">
              Visit Dataset →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
