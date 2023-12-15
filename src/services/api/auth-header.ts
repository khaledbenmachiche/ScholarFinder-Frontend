interface User {
    "AccessToken": string;
    "user-type": string;
}
//TODO:recheck this
export default function authHeader() {
    const user: User | null = JSON.parse(localStorage.getItem('user') ?? '{}');

    return {
        Authorization: user?.AccessToken ? `Bearer ${user.AccessToken}` : undefined,
    };
}
