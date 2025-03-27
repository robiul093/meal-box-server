export interface TUser {
  name: string;
  email: string;
  phoneNumber?: string;
  password: string;
  role: 'customer' | 'provider';
  status: 'active' | 'blocked';
  isDeleted: boolean;
}
