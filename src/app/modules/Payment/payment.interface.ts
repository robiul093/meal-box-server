
export interface CreateCustomerInput {
  name: string;
  email: string;
  payment_method_id: string;
}

export interface PaymentInput {
  customerId: string;
  amount: number;
}
