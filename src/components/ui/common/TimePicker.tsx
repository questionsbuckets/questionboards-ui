"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Clock } from "lucide-react";

interface TimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
  disabled?: boolean;
  label?: string;
  error?: string;
  placeholder?: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  disabled = false,
  placeholder = "Select time",
  label,
  error,
}) => {
  const initial = value ? new Date(`1970-01-01T${value}`) : new Date();
  const [time, setTime] = useState<Date>(initial);

  const handleTimeChange = (type: "hour" | "minute" | "ampm", val: string) => {
    const newTime = new Date(time);

    if (type === "hour") {
      const hour = parseInt(val, 10);
      const isPM = newTime.getHours() >= 12;
      newTime.setHours(isPM ? (hour % 12) + 12 : hour % 12);
    } else if (type === "minute") {
      newTime.setMinutes(parseInt(val, 10));
    } else if (type === "ampm") {
      const hours = newTime.getHours();
      if (val === "AM" && hours >= 12) newTime.setHours(hours - 12);
      if (val === "PM" && hours < 12) newTime.setHours(hours + 12);
    }

    setTime(newTime);
    onChange?.(format(newTime, "HH:mm"));
  };

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="font-medium text-gray-700">{label}</label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-between font-normal  hover:bg-background",
              !value && "text-muted-foreground"
            )}
          >
            {value ? format(new Date(`1970-01-01T${value}`), "hh:mm aa") :  placeholder}
            <Clock className="w-4 h-4 text-gray-400" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <div className="flex divide-x">
            {/* Hours */}
            <ScrollArea className="h-48 w-16">
              <div className="flex flex-col p-1">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                  <Button
                    key={hour}
                    size="sm"
                    variant={
                      time.getHours() % 12 === hour % 12 ? "default" : "ghost"
                    }
                    onClick={() => handleTimeChange("hour", hour.toString())}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
            </ScrollArea>

            {/* Minutes */}
            <ScrollArea className="h-48 w-16">
              <div className="flex flex-col p-1">
                {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                  <Button
                    key={minute}
                    size="sm"
                    variant={
                      time.getMinutes() === minute ? "default" : "ghost"
                    }
                    onClick={() => handleTimeChange("minute", minute.toString())}
                  >
                    {minute.toString().padStart(2, "0")}
                  </Button>
                ))}
              </div>
            </ScrollArea>

            {/* AM/PM */}
            <ScrollArea className="h-48 w-16">
              <div className="flex flex-col p-1">
                {["AM", "PM"].map((ampm) => (
                  <Button
                    key={ampm}
                    size="sm"
                    variant={
                      (ampm === "AM" && time.getHours() < 12) ||
                      (ampm === "PM" && time.getHours() >= 12)
                        ? "default"
                        : "ghost"
                    }
                    onClick={() => handleTimeChange("ampm", ampm)}
                  >
                    {ampm}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </PopoverContent>
      </Popover>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
