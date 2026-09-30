"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { CheckboxField, FormBanner, FormSection } from "./FormParts";
import { createProperty, updateProperty, type PropertyActionState } from "@/lib/actions/properties";
import type { Property } from "@prisma/client";

type PropertyFormData = Omit<Property, "price"> & { price: string };

const CATEGORY = [
  { value: "RESIDENTIAL", label: "Residential" },
  { value: "COMMERCIAL", label: "Commercial" },
  { value: "LAND", label: "Land / Plot" },
];
const PROPERTY_TYPE = [
  { value: "APARTMENT", label: "Apartment" },
  { value: "FLAT", label: "Flat" },
  { value: "VILLA", label: "Villa" },
  { value: "INDEPENDENT_HOUSE", label: "Independent House" },
  { value: "BUILDER_FLOOR", label: "Builder Floor" },
  { value: "STUDIO", label: "Studio" },
  { value: "OFFICE", label: "Office" },
  { value: "SHOP", label: "Shop" },
  { value: "SHOWROOM", label: "Showroom" },
  { value: "WAREHOUSE", label: "Warehouse" },
  { value: "COMMERCIAL_BUILDING", label: "Commercial Building" },
  { value: "RESIDENTIAL_PLOT", label: "Residential Plot" },
  { value: "COMMERCIAL_PLOT", label: "Commercial Plot" },
  { value: "AGRICULTURAL_LAND", label: "Agricultural Land" },
];
const LISTING_TYPE = [
  { value: "SALE", label: "For Sale" },
  { value: "RENT", label: "For Rent" },
];
const STATUS = [
  { value: "AVAILABLE", label: "Available" },
  { value: "SOLD", label: "Sold" },
  { value: "RENTED", label: "Rented" },
  { value: "UNDER_OFFER", label: "Under Offer" },
  { value: "COMING_SOON", label: "Coming Soon" },
];
const AREA_UNIT = [
  { value: "", label: "Select unit" },
  { value: "SQFT", label: "Square feet" },
  { value: "SQYD", label: "Square yards" },
  { value: "ACRE", label: "Acres" },
];
const FURNISHING = [
  { value: "", label: "Not specified" },
  { value: "UNFURNISHED", label: "Unfurnished" },
  { value: "SEMI_FURNISHED", label: "Semi-furnished" },
  { value: "FULLY_FURNISHED", label: "Fully furnished" },
];

const initialState: PropertyActionState = {};

export function PropertyForm({ property }: { property?: PropertyFormData }) {
  const isEdit = property !== undefined;
  const [state, formAction, pending] = useActionState(isEdit ? updateProperty : createProperty, initialState);
  const err = (field: string) => state.fieldErrors?.[field];

  return (
    <form action={formAction} className="space-y-6">
      {isEdit && <input type="hidden" name="id" value={property.id} />}
      {state.error && <FormBanner tone="error">{state.error}</FormBanner>}
      {state.success && <FormBanner tone="success">Property saved.</FormBanner>}

      <FormSection title="Basic information">
        <div className="sm:col-span-2">
          <Input name="title" label="Title" placeholder="e.g. 3 BHK Independent House" defaultValue={property?.title} error={err("title")} required />
        </div>
        <div className="sm:col-span-2">
          <Textarea name="description" label="Description" placeholder="Describe the property, surroundings and highlights" defaultValue={property?.description} error={err("description")} rows={6} required />
        </div>
        <Select name="category" label="Category" options={CATEGORY} defaultValue={property?.category ?? "RESIDENTIAL"} error={err("category")} />
        <Select name="propertyType" label="Property type" options={PROPERTY_TYPE} defaultValue={property?.propertyType ?? "APARTMENT"} error={err("propertyType")} />
        <Select name="listingType" label="Sale or rent?" options={LISTING_TYPE} defaultValue={property?.listingType ?? "SALE"} error={err("listingType")} />
        <Select name="status" label="Availability" options={STATUS} defaultValue={property?.status ?? "AVAILABLE"} error={err("status")} />
      </FormSection>

      <FormSection title="Pricing">
        <Input name="price" type="number" min={0} step="any" label="Price (₹)" placeholder="e.g. 8500000" defaultValue={property?.price} error={err("price")} required />
        <Input name="priceLabel" label="Price label (optional)" placeholder="e.g. /month" defaultValue={property?.priceLabel ?? ""} error={err("priceLabel")} hint="Shown after the price, e.g. “/month” for rentals." />
      </FormSection>

      <FormSection title="Location">
        <div className="sm:col-span-2">
          <Input name="address" label="Street address (optional)" defaultValue={property?.address ?? ""} error={err("address")} />
        </div>
        <Input name="location" label="Area / locality" placeholder="e.g. Model Town" defaultValue={property?.location} error={err("location")} required />
        <Input name="city" label="City" placeholder="e.g. Karnal" defaultValue={property?.city} error={err("city")} required />
        <Input name="state" label="State" placeholder="e.g. Haryana" defaultValue={property?.state} error={err("state")} required />
        <Input name="pincode" label="Pincode (optional)" defaultValue={property?.pincode ?? ""} error={err("pincode")} />
        <Input name="latitude" type="number" step="any" label="Latitude (optional)" defaultValue={property?.latitude ?? ""} error={err("latitude")} />
        <Input name="longitude" type="number" step="any" label="Longitude (optional)" defaultValue={property?.longitude ?? ""} error={err("longitude")} />
      </FormSection>

      <FormSection title="Specifications" description="Fill in only what applies. Plots, for example, don't need bedrooms.">
        <Input name="bedrooms" type="number" min={0} label="Bedrooms" defaultValue={property?.bedrooms ?? ""} error={err("bedrooms")} />
        <Input name="bathrooms" type="number" min={0} label="Bathrooms" defaultValue={property?.bathrooms ?? ""} error={err("bathrooms")} />
        <Input name="balconies" type="number" min={0} label="Balconies" defaultValue={property?.balconies ?? ""} error={err("balconies")} />
        <Input name="yearBuilt" type="number" label="Year built" defaultValue={property?.yearBuilt ?? ""} error={err("yearBuilt")} />
        <Input name="area" type="number" min={0} step="any" label="Area" defaultValue={property?.area ?? ""} error={err("area")} />
        <Select name="areaUnit" label="Area unit" options={AREA_UNIT} defaultValue={property?.areaUnit ?? ""} error={err("areaUnit")} />
        <Select name="furnishing" label="Furnishing" options={FURNISHING} defaultValue={property?.furnishing ?? ""} error={err("furnishing")} />
        <div className="flex items-end pb-2">
          <CheckboxField name="parking" label="Parking available" defaultChecked={property?.parking} />
        </div>
      </FormSection>

      <FormSection title="Features">
        <div className="sm:col-span-2">
          <Input name="amenities" label="Amenities" placeholder="e.g. Lift, Power Backup, Garden" defaultValue={property?.amenities.join(", ") ?? ""} hint="Separate each amenity with a comma." />
        </div>
      </FormSection>

      <FormSection title="Publishing" description={isEdit ? "Images are managed in the section below." : "Save the property first, then you can upload images."}>
        <CheckboxField name="featured" label="Show as a featured property on the homepage" defaultChecked={property?.featured} />
      </FormSection>

      <div className="flex gap-3">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Saving…" : isEdit ? "Save changes" : "Create property"}
        </Button>
        <Button href="/admin/properties" variant="outline" size="lg">Cancel</Button>
      </div>
    </form>
  );
}
