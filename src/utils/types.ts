// Menu item type
export type MenuItemType = {
  label: string;
  value: string;
};

// User type
export type UserType = {
  id: string;
  name: string;
  email: string;
};

// API Response type
export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};
