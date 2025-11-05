import { DropdownOption } from "../../common.interface";

export interface ParentProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  countryName: DropdownOption | null;
  stateName: DropdownOption | null;
  parentImage: File | null;
}
