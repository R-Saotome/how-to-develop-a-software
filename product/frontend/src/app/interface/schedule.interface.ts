import { SimpleCompany } from './company.interface';
import { SimpleOpportunity } from './opportunity.interface';
import { SimplePerson } from './person.interface';
import { SimpleUser } from './user.interface';

export interface Schedule {
  id?: any;
  is_all_day: boolean;
  start_date: Date;
  end_date: Date;
  title: string;
  note?: string;
  company?: SimpleCompany;
  person?: SimplePerson;
  opportunity?: SimpleOpportunity;
  members: SimpleUser[];
}
