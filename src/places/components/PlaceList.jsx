import PlaceItem from "./PlaceItem";

const PlaceList = ({ items }) => {

  if (items.length === 0) {
    return <h1 className="text-2xl font-semibold text-center pt-4">No places found</h1>;
  }

  return (
    
    <div className="mx-auto max-w-screen-xl p-4">
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((place) => (
          <PlaceItem
            key={place.id}
            id={place.id}
            title={place.title}
            image={place.image}
            address={place.address}
            description={place.description}
            creatorId={place.creator}
            coordinates={place.location}
          />
        ))}
      </ul>
    </div>
    
    
  );
};

export default PlaceList;
