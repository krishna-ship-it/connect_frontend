import { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";

const getCroppedImg = async (img, crop) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = URL.createObjectURL(img);
    console.log(image.src);
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        image,
        crop.x * scaleX, // sx: Adjusted x-coordinate of the top-left corner of the source rectangle
        crop.y * scaleY, // sy: Adjusted y-coordinate of the top-left corner of the source rectangle
        crop.width * scaleX, // sWidth: Adjusted width of the source rectangle
        crop.height * scaleY, // sHeight: Adjusted height of the source rectangle
        0, // dx: The x-coordinate on the canvas where the top-left corner of the source image will be drawn
        0, // dy: The y-coordinate on the canvas where the top-left corner of the source image will be drawn
        crop.width, // dWidth: The width of the drawn image on the canvas
        crop.height // dHeight: The height of the drawn image on the canvas
      );
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          reject(new Error("Canvas is empty"));
          return;
        }
        blob.name = Date.now();
        resolve(blob);
      }, "image/jpeg");
    };
  });
};

const Crop = ({ sourceImage, setCroppedImage }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = async (croppedArea, croppedAreaPixels) => {
    const data = await getCroppedImg(sourceImage[0], croppedAreaPixels);
    setCroppedImage()(data);
  };
  const [b, setB] = useState(null);
  useEffect(() => {
    if (sourceImage) setB(URL.createObjectURL(sourceImage[0]));
  }, [sourceImage]);
  return (
    <div className="relative w-[360px] h-[360px]  bg-purple-400 rounded-[25px]">
      <Cropper
        image={b}
        crop={crop}
        zoom={zoom}
        aspect={1 / 1}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        cropShape="round"
      />
    </div>
  );
};
export default Crop;
