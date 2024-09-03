import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DetailPage.css';

interface Vehicle {
    name: string;
    model: string;
    vehicle_class: string;
    manufacturer: string;
    length: string;
    cost_in_credits: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string;
    cargo_capacity: string;
    consumables: string;
}

const VehicleDetail: React.FC = () => {
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const response = await axios.get(`https://swapi.dev/api/vehicles/${id}/`);
                setVehicle(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching vehicle data:', error);
                setLoading(false);
            }
        };

        fetchVehicle();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!vehicle) {
        return <div>Vehicle not found</div>;
    }

    return (
        <div className="detail-page">
            <h2>{vehicle.name}</h2>
            <div className="detail-content">
                <p><strong>Model:</strong> {vehicle.model}</p>
                <p><strong>Vehicle Class:</strong> {vehicle.vehicle_class}</p>
                <p><strong>Manufacturer:</strong> {vehicle.manufacturer}</p>
                <p><strong>Length:</strong> {vehicle.length}</p>
                <p><strong>Cost in Credits:</strong> {vehicle.cost_in_credits}</p>
                <p><strong>Crew:</strong> {vehicle.crew}</p>
                <p><strong>Passengers:</strong> {vehicle.passengers}</p>
                <p><strong>Max Atmosphering Speed:</strong> {vehicle.max_atmosphering_speed}</p>
                <p><strong>Cargo Capacity:</strong> {vehicle.cargo_capacity}</p>
                <p><strong>Consumables:</strong> {vehicle.consumables}</p>
            </div>
        </div>
    );
};

export default VehicleDetail;