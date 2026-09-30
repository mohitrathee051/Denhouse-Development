"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { CheckboxField, FormBanner, FormSection } from "./FormParts";
import { createPGRoom, updatePGRoom, type PGActionState } from "@/lib/actions/pg";
import type { PGRoom } from "@prisma/client";

type PGRoomFormData = Omit<PGRoom, "monthlyRent" | "securityDeposit"> & {
  monthlyRent: string;
  securityDeposit: string | null;
};

const ROOM_TYPE = [
  { value: "SINGLE", label: "Single" },
  { value: "DOUBLE_SHARING", label: "Double Sharing" },
  { value: "TRIPLE_SHARING", label: "Triple Sharing" },
  { value: "OTHER", label: "Other" },
];
const GENDER = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "UNISEX", label: "Unisex" },
];
const AVAILABILITY = [
  { value: "AVAILABLE", label: "Available" },
  { value: "FULL", label: "Full" },
  { value: "COMING_SOON", label: "Coming Soon" },
];

const AMENITIES = [
  { name: "ac", label: "Air conditioning" },
  { name: "wifi", label: "WiFi" },
  { name: "food", label: "Food included" },
  { name: "laundry", label: "Laundry" },
  { name: "parking", label: "Parking" },
  { name: "housekeeping", label: "Housekeeping" },
] as const;

const initialState: PGActionState = {};

export function PGForm({ room }: { room?: PGRoomFormData }) {
  const isEdit = room !== undefined;
  const [state, formAction, pending] = useActionState(isEdit ? updatePGRoom : createPGRoom, initialState);
  const err = (field: string) => state.fieldErrors?.[field];

  return (
    <form action={formAction} className="space-y-6">
      {isEdit && <input type="hidden" name="id" value={room.id} />}
      {state.error && <FormBanner tone="error">{state.error}</FormBanner>}
      {state.success && <FormBanner tone="success">PG room saved.</FormBanner>}

      <FormSection title="Basic information">
        <div className="sm:col-span-2">
          <Input name="name" label="Name" placeholder="e.g. Premium Single Room" defaultValue={room?.name} error={err("name")} required />
        </div>
        <div className="sm:col-span-2">
          <Textarea name="description" label="Description" defaultValue={room?.description} error={err("description")} rows={5} required />
        </div>
        <Select name="roomType" label="Room type" options={ROOM_TYPE} defaultValue={room?.roomType ?? "SINGLE"} error={err("roomType")} />
        <Select name="gender" label="Suitable for" options={GENDER} defaultValue={room?.gender ?? "UNISEX"} error={err("gender")} />
      </FormSection>

      <FormSection title="Location">
        <Input name="location" label="Area / locality" defaultValue={room?.location} error={err("location")} required />
        <Input name="city" label="City" defaultValue={room?.city} error={err("city")} required />
      </FormSection>

      <FormSection title="Pricing">
        <Input name="monthlyRent" type="number" min={0} step="any" label="Monthly rent (₹)" defaultValue={room?.monthlyRent} error={err("monthlyRent")} required />
        <Input name="securityDeposit" type="number" min={0} step="any" label="Security deposit (₹, optional)" defaultValue={room?.securityDeposit ?? ""} error={err("securityDeposit")} />
      </FormSection>

      <FormSection title="Amenities">
        {AMENITIES.map((amenity) => (
          <CheckboxField key={amenity.name} name={amenity.name} label={amenity.label} defaultChecked={room?.[amenity.name]} />
        ))}
      </FormSection>

      <FormSection title="Publishing" description={isEdit ? "Images are managed in the section below." : "Save the room first, then you can upload images."}>
        <Select name="availability" label="Availability" options={AVAILABILITY} defaultValue={room?.availability ?? "AVAILABLE"} error={err("availability")} />
        <div className="flex items-end pb-2">
          <CheckboxField name="featured" label="Show as featured" defaultChecked={room?.featured} />
        </div>
      </FormSection>

      <div className="flex gap-3">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Saving…" : isEdit ? "Save changes" : "Create PG room"}
        </Button>
        <Button href="/admin/pg" variant="outline" size="lg">Cancel</Button>
      </div>
    </form>
  );
}
