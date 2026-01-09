import { useEffect } from "react";
import { Link } from "react-router";
import { useUnplashStore } from "~/store/useUnsplashStore";
import SpinnerLoader from "./SpinnerLoader";

interface PhotoModalProps {
  open: boolean;
  photoId: string | null;
  onClose: () => void;
}

const PhotoModal = ({open, photoId, onClose}: PhotoModalProps) => {
    const { photo, getPhotoById, loadingPhoto } = useUnplashStore();
    
    useEffect(() => {
        if (open && photoId) {
            getPhotoById(photoId);
        }
    }, [open, photoId, getPhotoById]);

    // Bloquear el scroll de la pantalla principal
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    if (!open || !photo) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent-custom">
            <Link 
                to="/" 
                className="absolute inset-0"
                aria-label="Cerrar modal"
            />
            <div className="relative bg-white rounded-lg max-w-[1650px] max-h-[90vh] w-full overflow-y-auto shadow-2xl">
                {loadingPhoto ? (
                    <div className="flex items-center justify-center p-8">
                        <SpinnerLoader />
                    </div>
                ) : (
                    <div className="px-6 py-4">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex gap-2 items-center">
                                <img 
                                    src={photo.user.profile_image.small} 
                                    alt={photo.user.name} 
                                    className="w-10 h-10 rounded-full object-cover" 
                                />
                                <div>
                                    <p className="font-semibold text-gray-900">{photo.user.name}</p>
                                    {photo.user.username && (
                                        <p className="text-sm text-gray-500">@{photo.user.username}</p>
                                    )}
                                </div>
                            </div>
                            
                            <button
                                onClick={onClose}
                                className="p-2 cursor-pointer bg-green-custom hover:bg-green-customH rounded-full transition-colors"
                            >
                                <img 
                                    src="/close-x.svg" 
                                    alt="close" 
                                    className="w-6 h-6" 
                                />
                            </button>
                        </div>

                        {photo.alt_description && (
                            <h1 className="text-xl font-bold mb-4 text-gray-900">
                                {photo.alt_description}
                            </h1>
                        )}

                        <div className="mb-4 overflow-hidden rounded-lg">
                            <img 
                                src={photo.urls.small} 
                                alt={photo.alt_description || "Photo"} 
                                className="w-full h-auto max-h-[60vh] object-contain bg-gray-100" 
                            />
                        </div>

                        <div className="flex justify-between items-center px-6 pt-4 border-t">
                            <div className="grid grid-cols-3 gap-6">
                                <div>
                                    <h3 className="text-gray-500 text-sm">Views</h3>
                                    <span className="font-medium text-gray-900">{photo.views?.toLocaleString('en-US') || 'N/A'}</span>
                                </div>
                                <div>
                                    <h3 className="text-gray-500 text-sm">Downloads</h3>
                                    <span className="font-medium text-gray-900">{photo.downloads?.toLocaleString('en-US') || 'N/A'}</span>
                                </div>
                                <div>
                                    <h3 className="text-gray-500 text-sm">Featured in</h3>
                                    <span className="font-medium text-gray-900">{photo.topics?.[0]?.title || 'N/A'}</span>
                                </div>
                            </div>
                            
                            <a 
                                href={photo.links?.download} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                            >
                                Descargar
                            </a>
                        </div>

                        {photo.description && (
                            <div className="mt-4 px-6 pb-4">
                                <h3 className="text-sm font-semibold text-gray-900 mb-2">Descripción</h3>
                                <p className="text-gray-700">{photo.description}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhotoModal;