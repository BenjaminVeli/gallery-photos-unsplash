import { api } from "~/api/unplash";

export const getPhotos = (page = 1) =>
  api.get("/photos", {
    params: { page, per_page: 12 },
  });

export const getPhotoById = (id: string) =>
  api.get(`/photos/${id}`);

export const getPhotosByName = (page = 1, query: string|null) =>
  api.get("/search/photos/", {
    params: {page, query}
  });