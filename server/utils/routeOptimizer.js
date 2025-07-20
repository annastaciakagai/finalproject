import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const ORS_BASE_URL = 'https://api.openrouteservice.org/v2/directions/driving-car';

export const getOptimizedRoute = async (coordinates) => {
  try {
    const res = await axios.post(
      `${ORS_BASE_URL}/geojson`,
      { coordinates },
      {
        headers: {
          Authorization: process.env.ORS_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error('Route optimization error:', error.message);
    throw error;
  }
};
