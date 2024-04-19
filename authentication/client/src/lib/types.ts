export type USER_PROFILE_TYPE = {
  _id?: string;
  username: string;
  email: string;
  avatar?: File | null;
  bio?: string;
  accessToken?: string;
  refreshToken?: string;
};
export type AUTH_CONTEXT_TYPE = {
  user: USER_PROFILE_TYPE;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  singup: (
    username: string,
    email: string,
    password: string,
  ) => void;
  login: (username: string, password: string) => void;
  forget: (email: string) => void;
  logout: () => void;
  getCurrentUser: (userId: string) => void;
  uploadFile: (file: File) => void;
  uid: string | undefined;
  updateProfile: (data: any, avatar: File) => void;
};
