import { SimpleCompany } from './company.interface';
import { SimpleUser } from './user.interface';

export interface Person {
  id?: any;
  first_name: string;
  last_name: string;
  department?: string;
  position?: string;
  tel?: string;
  email?: string;
  company?: SimpleCompany;
  correspondence?: SimpleUser;
}

export interface SimplePerson {
  id?: any;
  name: string;
}
