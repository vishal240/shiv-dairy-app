export interface ProfileFormData {
  // General Information
  admin_name: string;
  user_id: string;
  email: string;
  country_code: string;
  phone_number: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;

  // Change Password
  old_password?: string;
  new_password?: string;
  confirm_password?: string;

  // Profile Image
  profile_image?: FileList;

  // Optional ID
  admin_id?: string;
}

export interface AdminProfile {
  _id: string;
  admin_name: string;
  user_id: string;
  email: string;
  phone_number: string;
  address: {
    street_1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  profile_image_url: string;
  user_type: string;
  created_on: string;
}
