import { GiTrashCan } from "react-icons/gi";
import Button from "./Button";
import { removeUser } from "../store";
import { useThunk } from "../hooks/use-thunk";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";

function UsersListItem({ user }) {
    const [doRemoveUser, isLoading, error] = useThunk(removeUser);

    const handleClick = () => {
        doRemoveUser(user);
    };

    const header = <>
        <Button className="mr-3" isLoading={isLoading} onClick={handleClick}>
            <GiTrashCan />
        </Button>
        {error && <div className="text-red-500">Error deleting user...</div>}
        {user.name}
    </>

    return (
        <ExpandablePanel header={header}>
            <AlbumsList user={user}/>
        </ExpandablePanel>
    );
}

export default UsersListItem;