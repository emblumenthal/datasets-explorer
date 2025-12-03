# Datasets Explorer

**search and explore datasets by subject area and dataset name**
The app loads a JSON database of datasets and allows filtering by typing in the search box. Each dataset includes:

* `subject_area` – the field or category of the dataset
* `dataset` – the dataset name (clickable link)
* `dataset_link` – URL to the dataset
* `description` – short description of the dataset

The app is hosted on GitHub Pages: [Datasets Explorer](https://emblumenthal.github.io/datasets-explorer/)

---

## Features

* Search by **subject area** or **dataset name**
* Dynamic, live filtering as you type
* Clickable dataset links that open in a new tab
* Lightweight and fast, built with **React + Vite**
* JSON data stored in `public/datasets.json` for easy updates

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/emblumenthal/datasets-explorer.git
cd datasets-explorer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

* Open [http://localhost:5173](http://localhost:5173) in your browser to see the app live.

### 4. Build for production

```bash
npm run build
```

* This generates the `dist/` folder for deployment.

### 5. Preview the production build locally

```bash
npm run preview
```

---

## Deployment

This project is deployed on **GitHub Pages**. To deploy:

1. Install `gh-pages` if not already:

```bash
npm install --save-dev gh-pages
```

2. Add deploy scripts in `package.json`:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Deploy:

```bash
npm run deploy
```

* The app will be live at [https://emblumenthal.github.io/datasets-explorer/](https://emblumenthal.github.io/datasets-explorer/)

---

## JSON Dataset Format

The app expects a JSON file (`public/datasets.json`) with the following structure:

```json
[
  {
    "subject_area": "Health",
    "dataset": "CDC Mortality Data",
    "dataset_link": "https://www.cdc.gov/data",
    "description": "Mortality statistics for US populations."
  },
  {
    "subject_area": "Education",
    "dataset": "NCES School Data",
    "dataset_link": "https://nces.ed.gov/",
    "description": "Data on schools, enrollments, and performance."
  }
]
```

---

## Contributing

* Add new datasets by editing `datasets.json` in the `public/` folder
* Open a PR with improvements or bug fixes
* Make sure to test locally (`npm run dev`) before submitting changes

---

## Tech Stack

* [React](https://react.dev/) – UI library
* [Vite](https://vite.dev/) – Build tool
* GitHub Pages – Hosting

---

## License

This project is open-source under the MIT License.
