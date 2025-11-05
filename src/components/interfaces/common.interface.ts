// country state city interfaces -----
export interface City {
  name: string;
}

export interface State {
  state_name: string;
  state_code: string;
  cities: City[];
}

export interface Country {
  common: string;
  official: string;
  flag: string;
  state: State[];
}

export interface DropdownOption {
  name: string;
  code: string;
}


