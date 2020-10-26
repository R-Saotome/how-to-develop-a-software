import { SimpleCompany } from './company.interface';
import { SimplePerson } from './person.interface';

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
  correspondence?: {
    account_id: number;
    first_name: string;
    last_name: string;
  };
}

export interface SimpleOpportunity {
  id?: any;
  name: string;
}
