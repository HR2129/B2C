"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Grid, List, Filter, ArrowUpDown } from "lucide-react"
import productsData from "../data/products.json"

export default function ProductListing({ category = "jewellery" }) {
  const [selectedCategory, setSelectedCategory] = useState(category)
  const [selectedSubCategory, setSelectedSubCategory] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [currentData, setCurrentData] = useState(productsData[category])
  const [visibleRows, setVisibleRows] = useState(5)

  useEffect(() => {
    setCurrentData(productsData[selectedCategory])
    setSelectedSubCategory("")
    setVisibleRows(5) // Reset visible rows when category changes
  }, [selectedCategory])

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory)
  }

  const handleSubCategoryFilter = (subCategory) => {
    setSelectedSubCategory(selectedSubCategory === subCategory ? "" : subCategory)
    setVisibleRows(5) // Reset visible rows when filtering
  }

  const handleShowMore = () => {
    setVisibleRows((prev) => prev + 5)
  }

  // Filter products based on selected subcategory (excluding promotional items for filtering)
  const filteredProducts = selectedSubCategory
    ? currentData.products.filter((product) => !product.isPromotional && product.category === selectedSubCategory)
    : currentData.products

  // Calculate products to show (3 products per row, 5 rows = 15 products per batch)
  const productsPerRow = 3
  const productsToShow = visibleRows * productsPerRow
  const visibleProducts = filteredProducts.slice(0, productsToShow)
  const hasMoreProducts = visibleProducts.length < filteredProducts.length

  // Count only non-promotional products for the styles count
  const totalProductCount = currentData.products.filter((product) => !product.isPromotional).length

  const renderPromotionalBanner = (promoData) => {
    return (
      <div key={promoData.id} className={`col-span-full ${promoData.backgroundColor} rounded-lg p-8 my-8`}>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden">
            <Image src={promoData.image || "/placeholder.svg"} alt={promoData.title} fill className="object-cover" />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl lg:text-3xl font-serif text-gray-800">{promoData.title}</h3>
            <p className="text-gray-600 text-lg">{promoData.subtitle}</p>
            <button className="bg-red-400 hover:bg-red-500 text-white px-8 py-3 rounded-full font-medium transition-colors duration-300">
              {promoData.buttonText}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderProductCard = (product) => {
    return (
      <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden group">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium">
              {product.badge}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-white/60 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 space-y-3">
          <h3 className="font-medium text-gray-800 line-clamp-2">{product.name}</h3>
          <p className="text-lg font-semibold text-gray-900">{product.price}</p>
          <button className="w-full border border-green-500 text-green-600 py-2 rounded-lg hover:bg-green-50 transition-colors duration-300 flex items-center justify-center space-x-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
            </svg>
            <span>GET BEST PRICE</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-4xl lg:text-5xl font-serif text-gray-900">{currentData.title}</h1>
            <span className="text-red-400 text-lg font-medium">{totalProductCount} Styles</span>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl">{currentData.description}</p>
        </div>

        {/* Sub-category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 mb-6">
            {currentData.categories.map((subCat) => (
              <button
                key={subCat}
                onClick={() => handleSubCategoryFilter(subCat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                  selectedSubCategory === subCat ? "bg-gray-800 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {subCat}
              </button>
            ))}
          </div>

          {/* View Controls */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex bg-white rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-gray-100" : ""}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-gray-100" : ""}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">
                <Filter className="w-4 h-4" />
                <span>FILTER</span>
              </button>
              <button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">
                <ArrowUpDown className="w-4 h-4" />
                <span>SORT</span>
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProducts.map((item, index) => {
            if (item.isPromotional) {
              return renderPromotionalBanner(item)
            }
            return renderProductCard(item)
          })}
        </div>

        {/* Show More Button */}
        {hasMoreProducts && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleShowMore}
              className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-full font-medium transition-colors duration-300"
            >
              SHOW MORE
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
