"use client";
import Login from "@/components/auth/Login";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams()
  return (
    <Login comingFrom={searchParams.get('route') ? searchParams.get('route') : null} service_id={searchParams.get('service_id') ? searchParams.get('service_id') : null} location_id={searchParams.get('location_id') ? searchParams.get('location_id') : null} />
  )
}