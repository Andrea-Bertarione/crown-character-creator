class UserState {
    loggedIn: boolean = false;
    name: string = '';
    email: string = '';
    token: string = '';
    role: string = '';
    avatar: string = '';
}

export const userState = new UserState();