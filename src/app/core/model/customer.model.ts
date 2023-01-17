import { Region } from './region.model';

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  createDate: string;
  photo: string;
  region: Region;
}
