import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DetailPage.css';

interface Film {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
}

const FilmDetail: React.FC = () => {
    const [film, setFilm] = useState<Film | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchFilm = async () => {
            try {
                const response = await axios.get(`https://swapi.dev/api/films/${id}/`);
                setFilm(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching film data:', error);
                setLoading(false);
            }
        };

        fetchFilm();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!film) {
        return <div>Film not found</div>;
    }

    return (
        <div className="detail-page">
            <h2>{film.title}</h2>
            <div className="detail-content">
                <p><strong>Episode:</strong> {film.episode_id}</p>
                <p><strong>Director:</strong> {film.director}</p>
                <p><strong>Producer:</strong> {film.producer}</p>
                <p><strong>Release Date:</strong> {film.release_date}</p>
                <p><strong>Opening Crawl:</strong></p>
                <p className="opening-crawl">{film.opening_crawl}</p>
            </div>
        </div>
    );
};

export default FilmDetail;