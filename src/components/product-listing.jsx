"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Filter, ArrowUpDown, ChevronDown } from "lucide-react"
import productsData from "../data/products.json"

export default function ProductListing({ category = "jewellery" }) {
  const [selectedSubCategory, setSelectedSubCategory] = useState("")
  const [currentData, setCurrentData] = useState(productsData[category])
  const [visibleProductsCount, setVisibleProductsCount] = useState(12)
  const [sortBy, setSortBy] = useState("default")
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  useEffect(() => {
    // Update data when category changes (URL change)
    if (productsData[category]) {
      setCurrentData(productsData[category])
      setSelectedSubCategory("") // Reset subcategory filter
      setVisibleProductsCount(12) // Reset visible products count
      setSortBy("default") // Reset sort
    }
  }, [category])

  const handleSubCategoryFilter = (subCategory) => {
    setSelectedSubCategory(selectedSubCategory === subCategory ? "" : subCategory)
    setVisibleProductsCount(12) // Reset visible products when filtering
  }

  const handleShowMore = () => {
    setVisibleProductsCount((prev) => prev + 12) // Load 12 more products
  }

  const handleSort = (sortOption) => {
    setSortBy(sortOption)
    setShowSortDropdown(false)
    setVisibleProductsCount(12) // Reset visible products when sorting
  }

  // Parse price string to number for sorting
  const parsePrice = (priceString) => {
    return Number.parseFloat(priceString.replace(/[$,]/g, ""))
  }

  // Sort products based on selected option
  const sortProducts = (products) => {
    const sortedProducts = [...products]

    switch (sortBy) {
      case "price-low-high":
        return sortedProducts.sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
      case "price-high-low":
        return sortedProducts.sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
      case "name-a-z":
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
      case "name-z-a":
        return sortedProducts.sort((a, b) => b.name.localeCompare(a.name))
      case "newest":
        return sortedProducts.sort((a, b) => {
          // Prioritize items with "New" badges
          const aIsNew = a.badge && (a.badge.includes("New") || a.badge.includes("Arrival"))
          const bIsNew = b.badge && (b.badge.includes("New") || b.badge.includes("Arrival"))
          if (aIsNew && !bIsNew) return -1
          if (!aIsNew && bIsNew) return 1
          return 0
        })
      case "popular":
        return sortedProducts.sort((a, b) => {
          // Prioritize items with "Popular" or "Best Seller" badges
          const aIsPopular = a.badge && (a.badge.includes("Popular") || a.badge.includes("Best Seller"))
          const bIsPopular = b.badge && (b.badge.includes("Popular") || b.badge.includes("Best Seller"))
          if (aIsPopular && !bIsPopular) return -1
          if (!aIsPopular && bIsPopular) return 1
          return 0
        })
      default:
        return sortedProducts // Default order
    }
  }

  // Filter products based on selected subcategory (excluding promotional items)
  const filteredProducts = selectedSubCategory
    ? currentData.products.filter((product) => !product.isPromotional && product.category === selectedSubCategory)
    : currentData.products.filter((product) => !product.isPromotional)

  // Apply sorting
  const sortedProducts = sortProducts(filteredProducts)

  const visibleProducts = sortedProducts.slice(0, visibleProductsCount)
  const hasMoreProducts = visibleProducts.length < sortedProducts.length

  // Count only non-promotional products for the styles count
  const totalProductCount = currentData.products.filter((product) => !product.isPromotional).length

  // Get category-specific styling and content
  const getCategoryConfig = () => {
    switch (category) {
      case "readytoship":
        return {
          headerColor: "text-green-600",
          accentColor: "bg-green-600 hover:bg-green-700",
          badgeColor: "bg-green-100 text-green-800",
          description: "Ready for immediate delivery - no waiting time required",
        }
      case "bridal":
        return {
          headerColor: "text-rose-600",
          accentColor: "bg-rose-600 hover:bg-rose-700",
          badgeColor: "bg-rose-100 text-rose-800",
          description: "Perfect for your special day and lifetime celebrations",
        }
      default:
        return {
          headerColor: "text-gray-900",
          accentColor: "bg-gray-900 hover:bg-red-400",
          badgeColor: "bg-amber-100 text-amber-800",
          description: "Exquisite craftsmanship meets timeless elegance",
        }
    }
  }

  const config = getCategoryConfig()

  // Sort options
  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "price-high-low", label: "Price: High to Low" },
    { value: "name-a-z", label: "Name: A to Z" },
    { value: "name-z-a", label: "Name: Z to A" },
    { value: "newest", label: "Newest First" },
    { value: "popular", label: "Most Popular" },
  ]

  const currentSortLabel = sortOptions.find((option) => option.value === sortBy)?.label || "Default"

  return (
    <section className="bg-white py-16 lg:py-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl lg:text-5xl font-light mb-4 ${config.headerColor}`}>{currentData.title}</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-2">{currentData.description}</p>
          <p className="text-sm text-gray-500 italic">{config.description}</p>
          <div className="mt-6">
            <span className="text-gray-500 text-sm">{totalProductCount} Products Available</span>
          </div>
        </div>

        {/* Sub-category Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => handleSubCategoryFilter("")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedSubCategory === ""
                  ? `${config.accentColor} text-white`
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {currentData.categories.map((subCat) => (
              <button
                key={subCat}
                onClick={() => handleSubCategoryFilter(subCat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedSubCategory === subCat
                    ? `${config.accentColor} text-white`
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {subCat}
              </button>
            ))}
          </div>

          {/* View Controls */}
          <div className="flex justify-center items-center">
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
                <Filter className="w-4 h-4" />
                <span>FILTER</span>
              </button>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
                >
                  <ArrowUpDown className="w-4 h-4" />
                  <span>SORT: {currentSortLabel}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${showSortDropdown ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Sort Dropdown Menu */}
                {showSortDropdown && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10 min-w-[200px]">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSort(option.value)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                          sortBy === option.value ? "text-gray-900 font-medium" : "text-gray-600"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
          {visibleProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Product Image */}
              <div className="relative aspect-square mb-6 overflow-hidden bg-gray-50">
                {/* Main Image */}
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-all duration-500 group-hover:opacity-0"
                />
                {/* Hover Image */}
                <Image
                  src={product.hoverImage || product.image || "/placeholder.svg"}
                  alt={`${product.name} hover`}
                  fill
                  className="object-cover opacity-0 group-hover:opacity-100 transition-all duration-500 absolute top-0 left-0"
                />

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className={`${config.badgeColor} px-3 py-1 rounded-full text-xs font-medium`}>
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Category-specific overlay badge */}
                {category === "readytoship" && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">READY</span>
                  </div>
                )}

                {category === "bridal" && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-rose-500 text-white px-2 py-1 rounded-full text-xs font-bold">BRIDAL</span>
                  </div>
                )}

                {/* Quick Action Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300">
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <button className="w-full bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 py-2 rounded-full text-sm font-medium transition-colors duration-300">
                      {category === "readytoship"
                        ? "Order Now"
                        : category === "bridal"
                          ? "Book Consultation"
                          : "Quick View"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="text-center space-y-2">
                <h3
                  className={`font-medium text-black text-base leading-tight group-hover:${config.headerColor.replace("text-", "text-")} transition-colors duration-300`}
                >
                  {product.name}
                </h3>
                <p className="text-gray-700 text-lg font-semibold">{product.price}</p>

                {/* Category-specific additional info */}
                {category === "readytoship" && (
                  <p className="text-green-600 text-xs font-medium">Ships within 24 hours</p>
                )}

                {category === "bridal" && (
                  <p className="text-rose-600 text-xs font-medium">Perfect for your special day</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {hasMoreProducts && (
          <div className="flex justify-center mt-16">
            <button
              onClick={handleShowMore}
              className={`${config.accentColor} text-white px-8 py-3 rounded-full font-medium transition-colors duration-300`}
            >
              LOAD MORE
            </button>
          </div>
        )}

        {/* Category-specific Bottom CTA */}
        <div className="text-center mt-20 pt-12 border-t border-gray-100">
          {category === "readytoship" ? (
            <>
              <h3 className="text-2xl font-light text-gray-900 mb-4">Need it even faster?</h3>
              <p className="text-gray-600 mb-6">Contact us for same-day delivery options in select cities.</p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-medium transition-colors duration-300 mr-4">
                SAME DAY DELIVERY
              </button>
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-8 py-3 rounded-full font-medium transition-colors duration-300">
                TRACK ORDER
              </button>
            </>
          ) : category === "bridal" ? (
            <>
              <h3 className="text-2xl font-light text-gray-900 mb-4">Planning your perfect day?</h3>
              <p className="text-gray-600 mb-6">
                Our bridal specialists are here to help you find the perfect pieces for your wedding.
              </p>
              <button className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-full font-medium transition-colors duration-300 mr-4">
                BOOK BRIDAL CONSULTATION
              </button>
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-8 py-3 rounded-full font-medium transition-colors duration-300">
                BRIDAL GUIDE
              </button>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-light text-gray-900 mb-4">Can't find what you're looking for?</h3>
              <p className="text-gray-600 mb-6">Our jewelry experts are here to help you find the perfect piece.</p>
              <button className="bg-red-400 hover:bg-red-500 text-white px-8 py-3 rounded-full font-medium transition-colors duration-300 mr-4">
                CONTACT US
              </button>
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-8 py-3 rounded-full font-medium transition-colors duration-300">
                BOOK CONSULTATION
              </button>
            </>
          )}
        </div>
      </div>

      {/* Click outside to close sort dropdown */}
      {showSortDropdown && <div className="fixed inset-0 z-5" onClick={() => setShowSortDropdown(false)} />}
    </section>
  )
}
