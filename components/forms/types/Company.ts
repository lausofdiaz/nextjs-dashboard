/*import { CompanyType } from './CompanyType'
import { Country } from './Country'

export type Company = {
  id: number
  corporateName: string
  contactName: string
  contactEmail: string
  phonePrefix: string
  phone: number
  isActive: boolean
  companyType: CompanyType
  campaigns: string[]
}
*/
export type Company = {
  id: number;
  companyName: string;
  nit: string;
  personContactName: string;
  personContactPhoneNumber: string;
  personContactEmail: string;
  address: string;
  bussinessSectorId:number; 
  contactUserId:string;
 }