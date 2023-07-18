import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";

function AlbumsList({ user }) {
    const { data, isLoading, error } = useFetchAlbumsQuery(user);

    let content;
    if (isLoading) {
        content = <Skeleton times={3} />;
    } else if (error) {
        content = <div>Error fetching data...</div>;
    } else {
        content = data.map((album) => {
            return <ExpandablePanel key={album.id} header={album.title} />
        });
    }

    const [doAddAlbum, results] = useAddAlbumMutation();

    const handleAlbumAdd = () => {
        doAddAlbum(user);
    };

    return <div>
        <Button onClick={handleAlbumAdd}>+ Add Album</Button>
        <div>Albums for {user.name}</div>
        <div>{content}</div>
        </div>;
}

export default AlbumsList;