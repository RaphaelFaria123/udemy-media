import { useDeleteAlbumMutation } from "../store";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import { GiTrashCan } from "react-icons/gi";
import PhotosList from "./PhotosList";

function AlbumsListItem({ album }) {
    const [doDeleteAlbum, { isLoading: isDeletingAlbum }] = useDeleteAlbumMutation();

    const handleClick = () => {
        doDeleteAlbum(album);
    };

    const header = <>
        <Button className="mr-2" isLoading={isDeletingAlbum} onClick={handleClick}><GiTrashCan /></Button>
        {album.title}
    </>

    return <div>
        <ExpandablePanel key={album.id} header={header}>
            <PhotosList album={album} />
        </ExpandablePanel>
    </div>;
}

export default AlbumsListItem;