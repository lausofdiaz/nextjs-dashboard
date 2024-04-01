import { Company } from './Company'
import { Role } from './Role'

export type User = {

  id: number;
  email: string;
  lastName: string;
  firstName: string;
  position: string;
  company: {
    companyId: string,
    companyName: string
  };
  phoneNumber: string;
  isActive: boolean;
  roles: [
    string
  ];

}
