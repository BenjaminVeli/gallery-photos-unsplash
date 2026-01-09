interface Props {
  photos: any[];
  onSelectPhoto: (id: string) => void;
}

export const PhotoList = ({ photos, onSelectPhoto }: Props) => {

    return(
        <section className="relative min-h-screen flex items-center pt-[4.25rem] sm:pt-6">
            <div className="container">
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
                    {photos.map((photo) => (
                        <button key={photo.id} onClick={() => onSelectPhoto(photo.id)}>
                            <div className="cursor-pointer mb-6 break-inside-avoid overflow-hidden">
                                <img src={photo.urls.small} alt={photo.alt_description} className="result_img"/>
                            </div>      
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
};

export default PhotoList