import { create } from 'zustand';
import { getPhotos, getPhotoById, getPhotosByName } from '~/services/unplash.service';
import type { UnsplashStore } from "../types";
import { handleError, handleRateLimitError } from '~/hooks/useErrorHandler';

export const useUnplashStore = create<UnsplashStore>((set, get) => ({
    id: null,
    photos: [],
    photosByName: [],
    photo: null,
    loadingPhotos: false,
    loadingPhoto: false,
    pagePhotos: 1,
    pagePhotosByName: 1,
    query: null,

    getPhotos: async() => {
        try{
            set({ loadingPhotos: true });
            const { pagePhotos, photos } = get();
            const res = await getPhotos(pagePhotos);
            set({
                photos: [...photos, ...res.data],
                pagePhotos: pagePhotos + 1,
            });

        } catch (error){
            if (handleRateLimitError(error)) return;
            handleError(error);
        } finally{
            set({ loadingPhotos: false });
        }
    },

    getPhotoById: async (id: string) => {
        try{
            set({ loadingPhoto: true });
            const res = await getPhotoById(id);
            set({
                id: id,
                photo: res.data,
            })
        } catch (error){
            handleError(error);
        } finally{
            set({ loadingPhoto: false });
        }
    },

    getPhotosByName: async (query: string) => {
        try {
            const { pagePhotosByName, photosByName, query: storedQuery } = get();
            // Si cambia el texto de búsqueda se resetea
            const isNewSearch = storedQuery !== query;
            
            set({
                loadingPhotos: true,
                query,
                pagePhotosByName: isNewSearch ? 1 : pagePhotosByName,
                photosByName: isNewSearch ? [] : photosByName,
            });
            
            const currentPage = isNewSearch ? 1 : pagePhotosByName;
            const res = await getPhotosByName(currentPage, query);

            set({
                photosByName: isNewSearch
                    ? res.data.results
                    : [...photosByName, ...res.data.results],
                pagePhotosByName: currentPage + 1,
            });

        } catch (error:any) {
            if (handleRateLimitError(error)) return;
            handleError(error);
        } finally {
            set({ loadingPhotos: false });
        }
    }


}));