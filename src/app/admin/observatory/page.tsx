import { redirect } from "next/navigation"

export default function ObservatoryIndexPage() {
  redirect("/admin/observatory/metrics")
}
