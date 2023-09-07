export interface User {
    id: string,
    firstName: string,
    lastName: string,
}

export interface LoggedInUser extends User {
    roles: string[],
}
