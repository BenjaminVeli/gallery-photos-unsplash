import type { Route } from "./+types/home";
import { useEffect, useState } from "react";
import { useUnplashStore } from "../store/useUnsplashStore";
import PhotoList from "~/components/PhotoList";
import Search from "~/components/Search";
import PhotoModal from "~/components/PhotoModal";
import SpinnerLoader from "~/components/SpinnerLoader";
import { useInfiniteScroll } from "~/hooks/useInfiniteScroll";
import Hero from "~/components/hero";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Gallery Photos Unsplash" },
    { name: "description", content: "Explora y busca fotos e ilustraciones de alta calidad con nuestra galería impulsada por la API de Unsplash. Encuentra imágenes inspiradoras para tus proyectos." },
  ];
}

export default function Home() {
  const { photos, loadingPhotos, getPhotos } = useUnplashStore();
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);

  // Cargar fotos iniciales
  useEffect(() => {
    getPhotos();
  }, []);

  // Scroll infinito
  useInfiniteScroll(getPhotos, loadingPhotos);

  return (
    <>
      {loadingPhotos && <SpinnerLoader />}
      <Search/>
      <Hero />
      <PhotoList photos={photos} onSelectPhoto={setSelectedPhotoId}/>
      <PhotoModal
        open={!!selectedPhotoId}
        photoId={selectedPhotoId}
        onClose={() => setSelectedPhotoId(null)}
      />
    </>
  );
}