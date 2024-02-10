// Auth Types
export type AuthUserType = {
  username: string;
  email: string;
  _id: string;
  description?: string;
  profile_photo?: string;
  banner?: string;
  followers?: [];
  followings?: [];
  bookmarks?: [];
};

export type AuthContextType = {
  user: AuthUserType;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  singup: (username: string, email: string, password: string) => void;
  login: (email: string, password: string) => void;
  forget: (email: string) => void;
  logout: () => void;
  getCurrentUser: (userId: string) => void;
  uid: string | undefined;
};
