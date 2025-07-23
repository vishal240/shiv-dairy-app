export interface ProductFormData {
  // Basic Information
  store_id: string;
  product_name: string;
  description: string;
  
  // Categories and Brand
  category_id: string;
  sub_category_id: string;
  brand_id: string;
  
  // B2B Pricing
  b2b_unit_price: number;
  b2b_min_batch_qty: number;
  b2b_batch_qty: number;
  b2b_discount_type: string;
  b2b_discount_percentage: number;
  b2b_tax_class: string;
  b2b_amount: number;
  
  // B2C Pricing
  b2c_unit_price: number;
  b2c_qty: number;
  b2c_discount_type: string;
  b2c_discount_percentage: number;
  b2c_tax_class: string;
  b2c_amount: number;
  
  // Media
  product_images?: FileList;
  product_videos?: FileList;
  
  // Status
  status: string;
  
  // Optional ID for editing
  product_id?: string;
}

export interface Store {
  _id: string;
  store_name: string;
}

export interface Category {
  _id: string;
  product_category_name: string;
  subcategories?: SubCategory[];
}

export interface SubCategory {
  _id: string;
  product_category_name: string;
}

export interface Brand {
  _id: string;
  brand_name: string;
}