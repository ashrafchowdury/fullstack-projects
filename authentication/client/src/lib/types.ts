export type USER_PROFILE_TYPE = {
  username: string;
  email: string;
  avatar?: File | null;
  bio?: string;
  _id?: string;
};
export type AUTH_CONTEXT_TYPE = {
  user: USER_PROFILE_TYPE;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  singup: (
    username: string,
    email: string,
    password: string,
    avatar: File
  ) => void;
  login: (email: string, password: string) => void;
  forget: (email: string) => void;
  logout: () => void;
  getCurrentUser: (userId: string) => void;
  update_avatar: (file: File) => void;
  uid: string | undefined;
};
