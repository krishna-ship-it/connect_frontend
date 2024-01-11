import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

const getCroppedImg = async (imageSrc, crop, zoom) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set the canvas size to the desired output size
  const outputSize = {
    width: Math.round(crop.width * zoom),
    height: Math.round(crop.height * zoom),
  };
  canvas.width = outputSize.width;
  canvas.height = outputSize.height;
  const temp = await createImageBitmap(imageSrc);
  ctx.drawImage(
    temp,
    crop.x * zoom,
    crop.y * zoom,
    crop.width * zoom,
    crop.height * zoom,
    0,
    0,
    outputSize.width,
    outputSize.height
  );

  // Convert the canvas content to a base64 data URL
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        resolve(reader.result);
      };
    }, "image/jpeg");
  });
};

const Crop = ({ sourceImage, setCroppedImage }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = async (croppedArea, croppedAreaPixels) => {
    console.log(sourceImage);
    const data = await getCroppedImg(sourceImage, crop, zoom);
    console.log(data);
  };

  return (
    <div className="relative w-[80%] h-[80%]">
      <Cropper
        image={sourceImage}
        crop={crop}
        zoom={zoom}
        aspect={4 / 3}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
    </div>
  );
};
export default Crop;
