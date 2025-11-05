
export interface ISchoolProfile {
    // Personal / Owner Information
    profileImage: File | null;
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    phoneCountryCode: string;
    position: any|null;
    residentState: string;
  
    // School Information
    schoolLogo: File | null;
    schoolName: string;
    schoolISD: string;
    addressLine1: string;
    addressLine2: string;

    country: any | null;
    state: any | null;
    city: any | null;

    postalCode: string;
    schoolEmail: string;
    schoolContact: string;
    schoolPhoneCountryCode: string;
    documents: File | null;
  
    // Admin Contact (for the platform)
    adminFirstName: string;
    adminLastName: string;
    adminEmail: string;
    adminPosition: string;
    adminContact: string;
    adminPhoneCountryCode: string;
    password: string;
    confirmPassword: string;
  
    // Boards & Subjects
    board: any | null;
    subjects: any[];
    comments: string;
  }
  