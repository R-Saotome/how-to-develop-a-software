import { SimpleCompany } from './company.interface';
import { SimplePerson } from './person.interface';
import { SimpleUser } from './user.interface';

export interface Opportunity {
  id?: any;
  name: string;
  amount: number;
  progress: {
    id: any;
    name: string;
  };
  company: SimpleCompany;
  person: SimplePerson;
  correspondence?: SimpleUser;
}

export interface SimpleOpportunity {
  id?: any;
  name: string;
}
