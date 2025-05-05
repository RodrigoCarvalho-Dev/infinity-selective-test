interface ProfileType {
  id: string;
  userId: string;
  full_name: string;
  username: string;
  followers: string[];
  following: string[];
  createdAt: Date;
  updatedAt: Date;
}

export { ProfileType };
