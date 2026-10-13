export interface Address {
  id: string;
  value: string;
}

export interface UserProfile {
  number: number;
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
  addresses: Address[];
  bonusPoints: number;
  discountPercent: number;
}
