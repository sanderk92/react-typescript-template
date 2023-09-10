export interface User {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
}

export interface LoggedInUser extends User {
    roles: string[],
}
