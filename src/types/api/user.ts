// User API Types

export interface CheckEmailResponse {
  available: boolean;
}

export interface UserResponse {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  creditCardNumber: string;
  isRegularCustomer: boolean;
}

export interface SignupRequest {
  name: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  creditCardNumber: string;
}

