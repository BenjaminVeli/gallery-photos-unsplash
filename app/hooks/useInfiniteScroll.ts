import { useEffect } from "react";

export function useInfiniteScroll(callback: () => void, isLoading: boolean) {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Si estamos a 200px del final y no está cargando
      if (scrollTop + windowHeight >= docHeight - 200 && !isLoading) {
        callback();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback, isLoading]); // Se vuelve a ejecutar si la función o el estado de carga cambian
}