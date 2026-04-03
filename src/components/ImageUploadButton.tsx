import { useRef } from "react";

const ImageUploadButton = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    // Kendi butonumuza basıldığında gizli input'u tetikliyoruz
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Seçilen dosya:", file.name);
      // Burada dosyayı önizleme veya yükleme işlemlerini yapabilirsin
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Gizli Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*" // Sadece resim dosyalarına izin verir
      />

      {/* Görünecek Şık Buton */}
      <button
        onClick={handleButtonClick}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg 
                   transition-all duration-300 transform hover:scale-105 shadow-md
                   flex items-center gap-2"
      >
        Select Image
      </button>
    </div>
  );
};
export default ImageUploadButton;
