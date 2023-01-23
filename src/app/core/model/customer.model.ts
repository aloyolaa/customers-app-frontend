import { Invoice } from './invoice.mode';
import { Region } from './region.model';

export class Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  createDate: string;
  photo: string;
  region: Region;
  invoices: Invoice[] = [];
}
