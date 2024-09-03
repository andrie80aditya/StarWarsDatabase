import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DetailPage.css';

interface Starship {
    name: string;
    model: string;
    starship_class: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string;
    hyperdrive_rating: string;
    MGLT: string;
    cargo_capacity: string;
    consumables: string;
}

const StarshipDetail: React.FC = () => {
    const [starship, setStarship] = useState<Starship | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchStarship = async () => {
            try {
                const response = await axios.get(`https://swapi.dev/api/starships/${id}/`);
                setStarship(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching starship data:', error);
                setLoading(false);
            }
        };

        fetchStarship();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!starship) {
        return <div>Starship not found</div>;
    }

    return (
        <div className="detail-page">
            <h2>{starship.name}</h2>
            <div className="detail-content">
                <p><strong>Model:</strong> {starship.model}</p>
                <p><strong>Starship Class:</strong> {starship.starship_class}</p>
                <p><strong>Manufacturer:</strong> {starship.manufacturer}</p>
                <p><strong>Cost in Credits:</strong> {starship.cost_in_credits}</p>
                <p><strong>Length:</strong> {starship.length}</p>
                <p><strong>Crew:</strong> {starship.crew}</p>
                <p><strong>Passengers:</strong> {starship.passengers}</p>
                <p><strong>Max Atmosphering Speed:</strong> {starship.max_atmosphering_speed}</p>
                <p><strong>Hyperdrive Rating:</strong> {starship.hyperdrive_rating}</p>
                <p><strong>MGLT:</strong> {starship.MGLT}</p>
                <p><strong>Cargo Capacity:</strong> {starship.cargo_capacity}</p>
                <p><strong>Consumables:</strong> {starship.consumables}</p>
            </div>
        </div>
    );
};

export default StarshipDetail;