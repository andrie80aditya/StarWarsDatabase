import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DetailPage.css';

interface Species {
    name: string;
    classification: string;
    designation: string;
    average_height: string;
    average_lifespan: string;
    eye_colors: string;
    hair_colors: string;
    skin_colors: string;
    language: string;
    homeworld: string;
}

const SpeciesDetail: React.FC = () => {
    const [species, setSpecies] = useState<Species | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchSpecies = async () => {
            try {
                const response = await axios.get(`https://swapi.dev/api/species/${id}/`);
                setSpecies(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching species data:', error);
                setLoading(false);
            }
        };

        fetchSpecies();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!species) {
        return <div>Species not found</div>;
    }

    return (
        <div className="detail-page">
            <h2>{species.name}</h2>
            <div className="detail-content">
                <p><strong>Classification:</strong> {species.classification}</p>
                <p><strong>Designation:</strong> {species.designation}</p>
                <p><strong>Average Height:</strong> {species.average_height}</p>
                <p><strong>Average Lifespan:</strong> {species.average_lifespan}</p>
                <p><strong>Eye Colors:</strong> {species.eye_colors}</p>
                <p><strong>Hair Colors:</strong> {species.hair_colors}</p>
                <p><strong>Skin Colors:</strong> {species.skin_colors}</p>
                <p><strong>Language:</strong> {species.language}</p>
                <p><strong>Homeworld:</strong> {species.homeworld}</p>
            </div>
        </div>
    );
};

export default SpeciesDetail;