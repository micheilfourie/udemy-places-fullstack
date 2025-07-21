const Avatar = ({ image, width = 50, name }) => {

  return (
    <div>
      {!image ? (
        <div
          className={`flex items-center justify-center text-xl font-semibold rounded-full bg-gray-200`}
          style={{ width: `${width}px`, height: `${width}px` }}
        >
          {name[0].toUpperCase()}
        </div>
      ) : (
        <img
          src={image}
          alt=""
          className={`rounded-full object-cover`}
          style={{ width: `${width}px`, height: `${width}px` }}
        />
      )}
    </div>
  );
};

export default Avatar;
