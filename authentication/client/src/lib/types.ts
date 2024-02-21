export type USER_PROFILE_TYPE = {
  username: string;
  email: string;
  avatar?: File | null;
  bio?: string;
  _id?: string;
  lastUpdated?: string
  provider?: string
};
export type AUTH_CONTEXT_TYPE = {
  user: USER_PROFILE_TYPE;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  singup: (username: string, email: string, password: string, avatar: File) => void;
  login: (email: string, password: string) => void;
  forget: (email: string) => void;
  logout: () => void;
  getCurrentUser: (userId: string) => void;
  uid: string | undefined;
};
