import PlaceList from "../components/PlaceList"
import { useParams } from "react-router-dom"
import places from '../../tempData.js';

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
