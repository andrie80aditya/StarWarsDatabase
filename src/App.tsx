import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import PeopleListing from './components/PeopleListing';
import PersonDetail from './components/PersonDetail';
import FilmDetail from './components/FilmDetail';
import SpeciesDetail from './components/SpeciesDetail';
import StarshipDetail from './components/StarshipDetail';
import VehicleDetail from './components/VehicleDetail';
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <div className="container">
                <header>
                    <h1>Star Wars Database</h1>
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/people">People</Link>
                    </nav>
                </header>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/people" element={<PeopleListing />} />
                    <Route path="/people/:id" element={<PersonDetail />} />
                    <Route path="/films/:id" element={<FilmDetail />} />
                    <Route path="/species/:id" element={<SpeciesDetail />} />
                    <Route path="/starships/:id" element={<StarshipDetail />} />
                    <Route path="/vehicles/:id" element={<VehicleDetail />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;