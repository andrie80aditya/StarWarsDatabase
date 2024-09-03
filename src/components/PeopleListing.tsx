import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PeopleListing.css';

interface Person {
    name: string;
    gender: string;
    birth_year: string;
}

const PeopleListing: React.FC = () => {
    const [people, setPeople] = useState<Person[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://swapi.dev/api/people/')
            .then(response => response.json())
            .then(data => {
                setPeople(data.results);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="people-listing">
            <h2>Star Wars Characters</h2>
            <div className="character-grid">
                {people.map((person, index) => (
                    <Link to={`/people/${index + 1}`} key={index} className="character-card">
                        <h3>{person.name}</h3>
                        <p>Gender: {person.gender}</p>
                        <p>Birth Year: {person.birth_year}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PeopleListing;