import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import AlbumsListItem from "./AlbumsListItem";

function AlbumsList({ user }) {
    const { data, isLoading, isFetching, error } = useFetchAlbumsQuery(user);

    let content;
    if (isFetching) {
        content = <Skeleton className="h-10 w-full" times={3} />;
    } else if (error) {
        content = <div>Error fetching data...</div>;
    } else {
        content = data.map((album) => {
            return <AlbumsListItem key={album.id} album={album} />
        });
    }

    const [doAddAlbum, results] = useAddAlbumMutation();

    const handleAlbumAdd = () => {
        doAddAlbum(user);
    };

    return <div>
        <div className="m-2 flex flex-row items-center justify-between">
            <h3 className="text-lg font-bold">Albums for {user.name}</h3>
            <Button isLoading={results.isLoading} onClick={handleAlbumAdd}>+ Add Album</Button>
        </div>
        <div>{content}</div>
    </div>;
}

export default AlbumsList;