const Avatar = ({ image, width = 50, name }) => {
  const charArr = [..."abcdefghijklmnopqrstuvwxyz"];

  const colorVariations = ["#BFDBFE", "#BBF7D0", "#E9D5FF"];
  const defaultColor = "#F3F4F6";

  const generateColor = (char) => {
    if (!char || typeof char !== "string") return defaultColor;

    const index = charArr.indexOf(char.toLowerCase());
    if (index === -1) return defaultColor;

    const colorIndex = index % colorVariations.length;
    return colorVariations[colorIndex];
  };

  return (
    <div>
      {!image || image === "" ? (
        <div
          className={`flex items-center justify-center rounded-full font-semibold text-neutral-800`}
          style={{
            width: `${width}px`,
            height: `${width}px`,
            fontSize: `${width / 3}px`,
            backgroundColor: generateColor(name[0]),
          }}
        >
          {name[0].toUpperCase()}
        </div>
      ) : (
        <img
          src={`http://localhost:5000/${image}`}
          alt=""
          className={`rounded-full object-cover`}
          style={{ width: `${width}px`, height: `${width}px` }}
        />
      )}
    </div>
  );
};

export default Avatar;
