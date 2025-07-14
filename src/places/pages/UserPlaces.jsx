import PlaceList from "../components/PlaceList"
import { useParams } from "react-router-dom"

const places = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        image: 'https://images.pexels.com/photos/9608201/pexels-photo-9608201.jpeg',
        address: '20 W 34th St, New York, NY 10001, USA',
        location: {
            lat: 40.7484405,
            lng: -73.9856644
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Statue of Liberty',
        description: 'One of the most famous Monuments in the world!',
        image: 'https://images.pexels.com/photos/356844/pexels-photo-356844.jpeg',
        address: 'New York, NY 10004, United States',
        location: {
            lat: 40.689424278216656,
            lng: -74.04445212241421
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Statue of Liberty',
        description: 'One of the most famous Monuments in the world!',
        image: 'https://images.pexels.com/photos/356844/pexels-photo-356844.jpeg',
        address: 'New York, NY 10004, United States',
        location: {
            lat: 40.689424278216656,
            lng: -74.04445212241421
        },
        creator: 'u2'
    },
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        image: 'https://images.pexels.com/photos/9608201/pexels-photo-9608201.jpeg',
        address: '20 W 34th St, New York, NY 10001, USA',
        location: {
            lat: 40.7484405,
            lng: -73.9856644
        },
        creator: 'u3'
    },
]

const UserPlaces = () => {
  
    const userId = useParams().userId
    const filteredPlaces = places.filter(place => place.creator === userId)
  
    return (
        <div className="bg-gray-100 min-h-screen pt-[75px]">
            <PlaceList items={filteredPlaces} />
        </div>
    
  )
}

export default UserPlaces
