import { redirect } from "next/navigation"

export default function ProductsPage() {
  // Redirect to jewellery by default
  redirect("/products/jewellery")
}
