export interface UnsplashStore {
    id: string | null;
    query: string | null;
    photos: any[];
    photosByName: any[];
    loadingPhotos: boolean;
    loadingPhoto: boolean;
    pagePhotos: number;
    pagePhotosByName: number;
    photo: any | null;
}