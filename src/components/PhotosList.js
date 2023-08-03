import { useFetchPhotosQuery, useAddPhotoMutation } from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import PhotosListItem from "./PhotosListItem";

function PhotosList({ album }) {
    const { data, isLoading, isFetching, error } = useFetchPhotosQuery(album);

    let content;
    if (isFetching) {
        content = <Skeleton className="h-10 w-full" times={3} />;
    } else if (error) {
        content = <div>Error fetching data...</div>;
    } else {
        content = data.map((photo) => {
            return <PhotosListItem key={photo.id} photo={photo} />
        });
    }

    const [doAddPhoto, results] = useAddPhotoMutation();

    const handlePhotoAdd = () => {
        doAddPhoto(album);
    };

    return <div>
        <div className="m-2 flex flex-row items-center justify-between">
            <h3 className="text-lg font-bold">Photos In {album.title}</h3>
            <Button isLoading={results.isLoading} onClick={handlePhotoAdd}>+ Add Photo</Button>
        </div>
        <div className="mx-8 flex flex-row flex-wrap justify-center">{content}</div>
    </div>;
}

export default PhotosList;