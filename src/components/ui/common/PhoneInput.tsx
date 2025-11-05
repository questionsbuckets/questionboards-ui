"use client";

import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface PhoneNumberInputProps {
  label?: string;
  value?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange: (phone: string, dialCode: string) => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  label,
  value = "",
  required = false,
  error,
  placeholder = "Enter phone number",
  disabled,
  onChange,
}) => {
  const [phone, setPhone] = useState(value);
  const [countryIso, setCountryIso] = useState("us");

  useEffect(() => {
    if (value !== phone) setPhone(value);
  }, [value, phone]);

  const handleChange = (phone: string, countryData: any) => {
    const cleanPhone = phone.trim().replace(/\s+/g, "");
    setPhone(cleanPhone);
    setCountryIso(countryData.countryCode);
    onChange(cleanPhone, "+" + countryData.dialCode);
  };

  return (
    <div className="flex flex-col w-full space-y-1 relative">
      {label && (
        <Label className="flex items-center gap-1">
          {label}
          {required && <span className="text-primary">*</span>}
        </Label>
      )}
      <div className={cn("w-full rounded-md bg-[var(--input)]")}>
        <PhoneInput
          country={countryIso}
          value={phone || undefined}
          onChange={handleChange}
          onlyCountries={["us", "in"]}
          enableSearch={false}
          inputClass={cn(
            "!w-full !border-none !bg-[var(--input)] !text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:!outline-none focus:!ring-0 px-3 py-2"
          )}
          containerClass="!w-full"
          disabled={disabled}
          searchClass="!text-sm"
          inputProps={{
            placeholder,
          }}
          copyNumbersOnly
        />
      </div>
      {error && (
        <span className="text-sm text-[var(--destructive)]">{error}</span>
      )}
    </div>
  );
};

export default PhoneNumberInput;
