import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers } from "../store";
import { addUser } from "../store";
import Button from './Button'
import Skeleton from './Skeleton'
import { useThunk } from '../hooks/use-thunk'

function UsersList() {
    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
    const [doAddUser, isAddingUser, addingUserError] = useThunk(addUser);

    const { data } = useSelector((state) => state.users);

    useEffect(() => {
        doFetchUsers();
    }, [doFetchUsers]);

    const handleUserAdd = () => {
        doAddUser();
    };

    let content;
    if (isLoadingUsers) {
        content = <Skeleton times={5} className="h-10 w-full" />;
    } else if (loadingUsersError) {
        content = <div>Error fetching data...</div>;
    } else {
        content = data.map((user) => {
            return (
                <div key={user.id} className="mb-2 border rounded">
                    <div className="flex p-2 justify-between items-center cursor-pointer">{user.name}
                    </div>
                </div>
            )
        });
    }

    return (<div>

        <div className="flex flex-row justify-between items-center m-3">
            <h1 className="m-2 text-xl">Users</h1>
            {
                <Button isLoading={isAddingUser} onClick={() => handleUserAdd()}>+ Add User</Button>
            }
            {
                addingUserError ? <div>Error creating user...</div> : null
            }
        </div>

        {content}

    </div>
    )
}

export default UsersList;