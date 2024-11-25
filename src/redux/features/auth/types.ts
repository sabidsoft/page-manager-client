export interface Admin {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface InitialState {
    token: string | null;
    admin: Admin | null;
    isLoading: boolean;
}