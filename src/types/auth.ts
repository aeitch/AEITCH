export interface AdminSessionPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
}

export interface AdminUserResponse {
  id: string;
  email: string;
  name: string;
  role: string;
  lastLoginAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
