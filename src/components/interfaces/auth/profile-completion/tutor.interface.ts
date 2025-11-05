
export interface ITutorProfile {
  profileImage: File | null;
  aboutMe: string;
  firstName: string;
  lastName: string;
  email: string;
  // contactNumber: string;
  // phoneCountryCode: string;
  country: any | null;
  zipCode: string;
  qualification: string;
  yearsOfExperience: string;
  skillArea: string;
  grade: any | null;
  subject: any | null;
  hourlyRate: string;
  setDay: { day: string; fromTime: string; toTime: string; available: false }[];
  documents: File | null;
}


export type TutorProfilePayload = Partial<ITutorProfile>;