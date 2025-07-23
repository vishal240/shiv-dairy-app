export interface Login {
  country_code: string;
  phone_number: string;
  user_type: string;
}

export interface Address {
  email: string;
  country_code: string;
  phone_number: string;
  fname: string;
  lname: string;
  street_1: string;
  city: string;
  zip: string;
  state: string;
  country: string;
}

export interface Businessdetails {
  business_id: string;
  business_name: string;
  business_email: string;
  business_country_code: string;
  business_phone: string;
  alternative_email?: string;
  alternative_country_code?: string;
  alternative_phone?: string;
  gstin: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  pan_card: FileList;
}
