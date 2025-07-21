const LoadingSpinner = ({ color = "#fff", size = 24 }) => {

  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={`animate-spin fill-transparent inline-block`}
    >
      <path
        d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612"
        stroke={color}
        strokeWidth="3.55556"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default LoadingSpinner;
