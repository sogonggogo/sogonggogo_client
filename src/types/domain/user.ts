export interface UserInfo {
  email: string;
  password?: string;
  name?: string;
  phone?: string;
  address?: string;
  cardNumber?: string;
  isRegularCustomer: boolean; // 단골 고객 여부
}

