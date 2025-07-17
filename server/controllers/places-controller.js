import HttpError from "../models/http-error.js";
import { v4 as uuidv4 } from "uuid";

const places = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    image: "https://images.pexels.com/photos/9608201/pexels-photo-9608201.jpeg",
    address: "20 W 34th St, New York, NY 10001, USA",
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Statue of Liberty",
    description: "One of the most famous monuments in the world!",
    image: "https://images.pexels.com/photos/9608201/pexels-photo-9608201.jpeg",
    address: "20 W 34th St, New York, NY 10001, USA",
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: "u1",
  },
];

const getPlaceById = (req, res) => {
  const placeId = req.params.pId;
  const place = places.find((place) => place.id === placeId);

  if (!place) {
    throw new HttpError("Could not find place for the provided id", 404);
  }

  res.json({ place });
};

const getPlacesByUserId = (req, res) => {
  const userId = req.params.uId;
  const userPlaces = places.filter((place) => place.creator === userId);

  if (!userPlaces || userPlaces.length === 0) {
    throw new HttpError("Could not find any places for the provided user", 404);
  }

  res.json({ userPlaces });
};

const createPlace = (req, res) => {
  const { title, description, coordinates, address, creator } = req.body;

  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    // image: "https://images.pexels.com/photos/9608201/pexels-photo-9608201.jpeg",
    address,
    location: coordinates,
    creator,
  };

  places.push(createdPlace);
  res.status(201).json({ place: createdPlace });
};

const patchPlace = (req, res) => {
  const placeId = req.params.pId;
  const { title, description } = req.body;

  const updatedPlace = { ...places.find((place) => place.id === placeId) };
  const index = places.findIndex((place) => place.id === placeId);

  if (!updatedPlace || index === -1) {
    throw new HttpError("Could not find place for the provided id", 404);
  }

  updatedPlace.title = title;
  updatedPlace.description = description;
  places[index] = updatedPlace;

  res.status(200).json({place: updatedPlace });
};

const deletePlace = (req, res) => {
  const placeId = req.params.pId;

  const placeIndex = places.findIndex((place) => place.id === placeId);

  if (placeIndex === -1) {
    throw new HttpError("Could not find place for the provided id", 404);
  }

  places.splice(placeIndex, 1);

  res.status(200).json({ message: "Deleted place." });
};

export {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  patchPlace,
  deletePlace,
};
