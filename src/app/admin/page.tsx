import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

function page() {
  return (
    <>
      <div>Admin Dashboard Testing !!! </div>
      <div>
        <Button>Click me</Button>
      </div>

      {/* <Card className="w-full max-w-sm p-4 mt-5">
        <Input />

        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            className="bg-background"
            id="email"
            placeholder="Email"
          />
        </div>
      </Card> */}
    </>
  );
}

export default page;
