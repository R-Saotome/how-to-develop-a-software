import { SimpleCompany } from './company.interface';

export interface Person {
  id?: any;
  first_name: string;
  last_name: string;
  department?: string;
  position?: string;
  tel?: string;
  email?: string;
  company?: SimpleCompany;
  correspondence?: {
    account_id: number;
    first_name: string;
    last_name: string;
  };
}

export interface SimplePerson {
  id?: any;
  name: string;
}
