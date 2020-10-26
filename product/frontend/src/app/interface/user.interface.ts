export interface User {
  account_id?: any;
  first_name: string;
  last_name: string;
  department?: string;
  position?: string;
  tel?: string;
}

export interface SimpleUser {
  account_id: any;
  name: string;
}
