export interface Company {
  id?: any;
  name: string;
  field?: string;
  address?: string;
  tel?: string;
  fax?: string;
  email?: string;
  url?: string;
  correspondence?: {
    account_id: number;
    first_name: string;
    last_name: string;
  };
}

export interface SimpleCompany {
  id?: any;
  name: string;
}
