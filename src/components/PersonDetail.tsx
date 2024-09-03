import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './PersonDetail.css';

interface Person {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    films: string[];
    species: string[];
    starships: string[];
    vehicles: string[];
}

interface FilmData {
    title: string;
    url: string;
}

interface SpeciesData {
    name: string;
    url: string;
}

interface StarshipData {
    name: string;
    url: string;
}

interface VehicleData {
    name: string;
    url: string;
}

const PersonDetail: React.FC = () => {
    const [person, setPerson] = useState<Person | null>(null);
    const [films, setFilms] = useState<FilmData[]>([]);
    const [species, setSpecies] = useState<SpeciesData[]>([]);
    const [starships, setStarships] = useState<StarshipData[]>([]);
    const [vehicles, setVehicles] = useState<VehicleData[]>([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchPerson = async () => {
            try {
                const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
                setPerson(response.data);
                await fetchRelatedData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching person data:', error);
                setLoading(false);
            }
        };

        fetchPerson();
    }, [id]);

    const fetchRelatedData = async (personData: Person) => {
        const filmPromises = personData.films.map(url => axios.get(url));
        const speciesPromises = personData.species.map(url => axios.get(url));
        const starshipPromises = personData.starships.map(url => axios.get(url));
        const vehiclePromises = personData.vehicles.map(url => axios.get(url));

        const [filmResponses, speciesResponses, starshipResponses, vehicleResponses] = await Promise.all([
            Promise.all(filmPromises),
            Promise.all(speciesPromises),
            Promise.all(starshipPromises),
            Promise.all(vehiclePromises),
        ]);

        setFilms(filmResponses.map(res => ({ title: res.data.title, url: res.data.url })));
        setSpecies(speciesResponses.map(res => ({ name: res.data.name, url: res.data.url })));
        setStarships(starshipResponses.map(res => ({ name: res.data.name, url: res.data.url })));
        setVehicles(vehicleResponses.map(res => ({ name: res.data.name, url: res.data.url })));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!person) {
        return <div>Person not found</div>;
    }

    return (
        <div className="person-detail">
            <h2>{person.name}</h2>
            <div className="detail-grid">
                <div className="detail-item">
                    <h3>Personal Information</h3>
                    <p>Height: {person.height} cm</p>
                    <p>Mass: {person.mass} kg</p>
                    <p>Hair Color: {person.hair_color}</p>
                    <p>Skin Color: {person.skin_color}</p>
                    <p>Eye Color: {person.eye_color}</p>
                    <p>Birth Year: {person.birth_year}</p>
                    <p>Gender: {person.gender}</p>
                </div>
                <div className="detail-item">
                    <h3>Films</h3>
                    <ul>
                        {films.map((film, index) => (
                            <li key={index}>
                                <Link to={`/films/${film.url.split('/').slice(-2, -1)[0]}`}>{film.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="detail-item">
                    <h3>Species</h3>
                    <ul>
                        {species.map((speciesItem, index) => (
                            <li key={index}>
                                <Link to={`/species/${speciesItem.url.split('/').slice(-2, -1)[0]}`}>{speciesItem.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="detail-item">
                    <h3>Starships</h3>
                    <ul>
                        {starships.map((starship, index) => (
                            <li key={index}>
                                <Link to={`/starships/${starship.url.split('/').slice(-2, -1)[0]}`}>{starship.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="detail-item">
                    <h3>Vehicles</h3>
                    <ul>
                        {vehicles.map((vehicle, index) => (
                            <li key={index}>
                                <Link to={`/vehicles/${vehicle.url.split('/').slice(-2, -1)[0]}`}>{vehicle.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PersonDetail;