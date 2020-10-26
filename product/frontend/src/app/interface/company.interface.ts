import { SimpleUser } from './user.interface';

export interface Company {
  id?: any;
  name: string;
  field?: string;
  address?: string;
  tel?: string;
  fax?: string;
  email?: string;
  url?: string;
  correspondence?: SimpleUser;
}

export interface SimpleCompany {
  id?: any;
  name: string;
}
