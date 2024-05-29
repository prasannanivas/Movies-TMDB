# Movie Catalog Web Application

## Overview

This is a web application that allows users to browse a catalog of movies. It displays popular movies fetched from [The Movie Database (TMDb)](https://www.themoviedb.org/) API. Users can view movie details, search for movies, and scroll infinitely through the catalog.

## Features

- Display a list of popular movies
- Infinite scrolling to load more movies as the user scrolls down
- Search functionality to find specific movies
- Detailed view of each movie including title, poster, overview, release year, and rating
- Responsive design for optimal viewing on various devices
- Modal component to display movie details
- Back-to-top button for easy navigation
- Used debouncing logic for searching movies

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- API key from [The Movie Database (TMDb)](https://www.themoviedb.org/) (place your API key in the appropriate location in the code)
- for easy testing purpose I have hard-coded it

### Installation

1. Clone the repository:

   git clone https://github.com/prasannanivas/Movies-TMDB.git

2. Navigate to the project directory:

   cd movie-catalog-app

3. Install dependencies:

   npm install

### Usage

1. Start the development server:

   npm start

2. Open your browser and go to `http://localhost:3000` to view the application.

## Technologies Used

- React.js
- Tailwind CSS
- React Query
- Font Awesome
- TypeScript

## Directory Structure

```
movie-catalog-app/
│
├── src/
│   ├── components/
│   │   ├── MovieComponent.tsx
│   │   ├── Modal.tsx
│   │   └── BackToTopButton.tsx
|   |   └── MoviesList.tsx
|   |   └── StarRating.tsx
│   ├── hooks/
│   │   ├── useMovies.ts
│   │   ├── useSearchMovies.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── ...
│
├── public/
│   └── index.html
│
├── package.json
├── tsconfig.json
└── ...
```

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [The Movie Database (TMDb)](https://www.themoviedb.org/) for providing the movie data
- React community for building a robust framework
- Tailwind CSS for easy and efficient styling
- Font Awesome for high-quality icons

---

Feel free to customize this README to better suit your project, adding more details or sections as needed. If you have any questions or need further assistance, don't hesitate to ask!
