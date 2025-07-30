import PlusSvg from "./PlusSvg";
import Card from "./Card";

const AddPlaceSkeleton = ({ action = () => {} }) => {
  return (
    <div
      onClick={action}
      className="flex h-full w-full cursor-pointer items-center justify-center group rounded-lg shadow-sm bg-white px-4 py-8 transition-opacity duration-300 ease-in-out"
    >
      <div className="flex flex-col items-center transition-opacity duration-300 ease-in-out">
        <PlusSvg width="50" color="oklch(60.9% 0 0)" />
        <h1 className="mt-2 text-lg text-neutral-500 uppercase">Add Place</h1>
      </div>
    </div>
  );
};

export default AddPlaceSkeleton;
