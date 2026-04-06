export const cleanFileNime = (name: string) => {
  //*Text de en son noktayı bul
  const lastDotIndex = name.lastIndexOf(".");
  //*Bulduğun noktadan sonraki kısmı al
  const extension = name.substring(lastDotIndex);
  //*En baştan noktaya kadar al
  const newName = name.substring(0, lastDotIndex);

  const cleanName = newName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/[^a-z0-9-]/g, "");
  return `${Date.now()}-${cleanName}${extension}`;
};
