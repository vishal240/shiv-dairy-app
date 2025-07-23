export interface CustomerFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  primaryPhone: string;
  primaryEmail: string;
  secondaryPhone?: string;
  secondaryEmail?: string;
  country_code_primary: string;
  country_code: string;

  // Billing Address
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingCountry: string;
  billingZip: string;

  // Shipping Address
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingCountry: string;
  shippingZip: string;

  businessName: string;
  business_country_code: string;
  businessPhone: string;
  businessEmail: string;

  // Customer Image (optional)
  customerImage?: FileList;

  // Optional ID for editing
  customer_id?: string;
}

export interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  primaryPhone: string;
  primaryEmail: string;
  secondaryPhone?: string;
  secondaryEmail?: string;
  country_code_primary: string;
  country_code: string;
  billingAddress: {
    address: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
  businessName: string;
  business_country_code: string;
  businessPhone: string;
  businessEmail: string;
  customerImage?: string;
  created_on: string;
  is_deleted: boolean;
}
