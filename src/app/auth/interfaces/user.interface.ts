
export interface User {
    _id:      string;
    email:    string;
    name:     string;
    isActive: boolean;
    roles:    string[];
    __v:      number;
}

export interface Roles {
    rol: string
}