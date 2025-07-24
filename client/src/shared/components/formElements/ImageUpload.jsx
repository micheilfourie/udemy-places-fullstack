import { useEffect, useRef, useState } from "react";
import CirclePlusSvg from "../ui/CirclePlusSvg";

const ImageUpload = ({ id, form }) => {
  const inputRef = useRef();
  const [previewUrl, setPreviewUrl] = useState("");

  const formElement = form.formState["image"];
  const { updateValue, setFieldValidity, markTouched } = form;

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

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const sendEvent = {
        target: {
          files: event.dataTransfer.files,
        },
      };

      pickedFileHandler(sendEvent);
    }
  };

  const pickedFileHandler = (event) => {
    if (event.target.files && event.target.files.length === 1) {
      updateValue("image", event.target.files[0]);
      setFieldValidity("image", true);
    }

    if (formElement.value === "" || formElement.value) {
      return;
    }

    updateValue("image", "");
    setFieldValidity("image", false);
    setPreviewUrl("");
    return false;
  };

  const pickImageHandler = () => {
    inputRef.current.click();
    markTouched("image");
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
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`mb-2 flex h-[200px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border ${formElement.isTouched && !formElement.isValid ? "border-red-400 bg-red-50" : "border-neutral-200 bg-gray-100"} `}
        >
          <CirclePlusSvg />
          <p className="mt-2 text-neutral-400 uppercase">
            Drop Image Or Click Here
          </p>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={pickImageHandler}
          className="mb-2 cursor-pointer"
        >
          <div className="w-full overflow-hidden rounded-lg">
            <img
              src={previewUrl && previewUrl}
              alt="preview"
              className="aspect-square origin-center object-cover"
            />
          </div>
        </div>
      )}

      {formElement.isTouched && !formElement.isValid && (
        <p className="text-sm text-red-500">Please upload a valid image.</p>
      )}
    </div>
  );
};

export default ImageUpload;
