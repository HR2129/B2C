import { notFound } from "next/navigation"
import Navbar from "@/components/navbar"
import ProductListing from "@/components/product-listing"
import productsData from "@/data/products.json"

export async function generateStaticParams() {
  return [{ category: "jewellery" }, { category: "readytoship" }, { category: "bridal" }]
}

export async function generateMetadata({ params }) {
  const { category } = params

  if (!productsData[category]) {
    return {
      title: "Category Not Found - Tyaani Jewellery",
    }
  }

  const categoryData = productsData[category]

  return {
    title: `${categoryData.title} - Tyaani Jewellery`,
    description: categoryData.description,
  }
}

export default function CategoryPage({ params }) {
  const { category } = params

  // Check if category exists in our data
  if (!productsData[category]) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-32">
        {" "}
        {/* Add padding to account for fixed navbar */}
        <ProductListing category={category} />
      </div>
    </div>
  )
}
