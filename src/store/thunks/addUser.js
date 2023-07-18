import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from "@faker-js/faker";

const addUser = createAsyncThunk('users/add', async () => {
    const name = faker.person.fullName();
    const response = await axios.post('http://localhost:3005/users', {
        name: name
    });

    return response.data;
});

export { addUser };