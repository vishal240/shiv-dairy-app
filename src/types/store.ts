export interface StoreFormData {
  // General Business Information
  storeName: string;
  storeDescription: string;
  countryCode: string;
  countryCodePrimary: string;
  primaryPhone: string;
  primaryEmail: string;
  secondaryPhone?: string;
  secondaryEmail?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;

  // Documents
  // aadharCard?: FileList;
  // gstCertificate?: FileList;
  // panCard?: FileList;

  // Owner Information
  // ownerName: string;
  // ownerEmail: string;
  // ownerPhone: string;
  // ownerAddress: string;
  // ownerCity: string;
  // ownerState: string;
  // ownerCountry: string;
  // ownerZipCode: string;

  // Login Information
  userId: string;
  password: string;
  confirmPassword: string;

  // Media
  storeImages?: FileList;
  bannerImages?: FileList;

  // Status
  status: string;
}
