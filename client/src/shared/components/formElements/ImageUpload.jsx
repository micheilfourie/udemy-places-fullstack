import { useEffect, useRef, useState } from "react";
import CirclePlusSvg from "../ui/CirclePlusSvg";

const ImageUpload = ({ id, form }) => {
  const inputRef = useRef();
  const [previewUrl, setPreviewUrl] = useState("");

  const formElement = form.formState["image"];
  const {updateValue, setFieldValidity, markTouched} = form;

  useEffect(() => {
    if (!formElement.value) {
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(formElement.value);
  }, [formElement]);

  const pickedFileHandler = (event) => {
    if (event.target.files && event.target.files.length === 1) {
      updateValue("image", event.target.files[0]);
      setFieldValidity("image", true);
      markTouched("image");
    } else {
      updateValue("image", {});
      setFieldValidity("image", false);
    }
  };

  const pickImageHandler = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-2 font-semibold">
        Image:
      </label>

      <input
        type="file"
        id={id}
        accept=".jpg, .jpeg, .png"
        className="hidden"
        ref={inputRef}
        onChange={pickedFileHandler}
      />

      {!previewUrl ? (
        <div
          onClick={pickImageHandler}
          className={`flex h-[200px] mb-2 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-neutral-200 bg-gray-100`}
        >
          <CirclePlusSvg />
          <p className="mt-2 text-neutral-400 uppercase">Upload Image</p>
        </div>
      ) : (
        <div onClick={pickImageHandler} className="mb-2 cursor-pointer">
          <div className=" w-full overflow-hidden rounded-lg">
            <img
              src={previewUrl && previewUrl}
              alt="preview"
              className="origin-center object-cover aspect-square"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
