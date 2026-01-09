import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PhotoList from "~/components/PhotoList";
import PhotoModal from "~/components/PhotoModal";
import Search from "~/components/Search";
import SpinnerLoader from "~/components/SpinnerLoader";
import { useInfiniteScroll } from "~/hooks/useInfiniteScroll";
import { useUnplashStore } from "~/store/useUnsplashStore";

export default function PhotoName() {
  const { photosByName, loadingPhotos, getPhotosByName } = useUnplashStore();
  const { name } = useParams<{ name: string }>();
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);

  // Cargar fotos filtradas por nombre
  useEffect(() => {
    if (name) {
      getPhotosByName(name);
    }
  }, [name, getPhotosByName]);

  // Scroll infinito
  useInfiniteScroll(() => {
    if (name) getPhotosByName(name);
  }, loadingPhotos);

  return (
    <>
      {loadingPhotos && <SpinnerLoader />}
      <Search/>
      <PhotoList photos={photosByName} onSelectPhoto={setSelectedPhotoId}/>
      <PhotoModal
        open={!!selectedPhotoId}
        photoId={selectedPhotoId}
        onClose={() => setSelectedPhotoId(null)}
      />
    </>
  );
}