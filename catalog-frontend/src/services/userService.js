import axios from 'axios';

export default async function getAllUsers() {
    try {
        console.log('Chamando getAllUsers()');
        const users = await axios.get('http://localhost:5000/api/allUsers', {
            withCredentials: true,
        });
        return users.data.allUsers;
    } catch (error) {
        console.error(error);
    }
}
