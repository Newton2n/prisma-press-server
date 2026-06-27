export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  profilePhotoUrl?: string;
  bio?: string;
}
