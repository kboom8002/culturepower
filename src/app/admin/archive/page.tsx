import { redirect } from "next/navigation"

export default function ArchiveIndexPage() {
  redirect("/admin/archive/events")
}
