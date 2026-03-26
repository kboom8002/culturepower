import { redirect } from "next/navigation"

export default function PublishingIndexPage() {
  redirect("/admin/publishing/queue")
}
