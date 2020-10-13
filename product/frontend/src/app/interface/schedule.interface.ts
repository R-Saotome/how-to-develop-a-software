export interface Schedule {
  id?: any;
  is_all_day: boolean;
  start_date: Date;
  end_date: Date;
  title: string;
  note?: string;
  company?: {
    id: any;
    name: string;
  };
  person?: {
    id: any;
    first_name: string;
    last_name: string;
  };
  opportunity?: {
    id: any;
    name: string;
  };
  members: {
    id: any;
    first_name: string;
    last_name: string;
  }[];
}
