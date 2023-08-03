import { useDeletePhotoMutation } from "../store";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import { GiTrashCan } from "react-icons/gi";

function PhotosListItem({ photo }) {
    const [doDeletePhoto, { isLoading: isDeletingPhoto }] = useDeletePhotoMutation();

    const handleClick = () => {
        doDeletePhoto(photo);
    };

    const header = <>
        <Button className="mr-2" isLoading={isDeletingPhoto} onClick={handleClick}><GiTrashCan /></Button>
        {photo.id}
    </>

    return <div onClick={handleClick} className="relative cursor-pointer m-2">
        <img className="h-20 w-20" src={photo.url} alt="random pic" />
        <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80"><GiTrashCan className="text-3xl" /></div>
    </div>;
}

export default PhotosListItem;