import PlusSvg from "./PlusSvg";
import Card from "./Card";

const AddPlaceSkeleton = ({ action = () => {} }) => {
  return (
    <div
      onClick={action}
      className="flex h-full w-full cursor-pointer items-center justify-center group rounded-lg shadow-sm bg-white px-4 py-6 transition-opacity duration-300 ease-in-out"
    >
      <div className="flex flex-col items-center transition-opacity duration-300 ease-in-out">
        <PlusSvg width="50" color="oklch(55.9% 0 0)" />
        <h1 className="mt-2 text-xl text-neutral-500 uppercase font-semibold">Add Place</h1>
      </div>
    </div>
  );
};

export default AddPlaceSkeleton;
