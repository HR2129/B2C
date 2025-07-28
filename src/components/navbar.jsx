"use client"
import { useState, useEffect, useRef } from "react" // Import useRef
import { Search, Heart, User, ShoppingBag, Phone, ChevronDown } from "lucide-react"

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const dropdownTimeoutRef = useRef(null) // Ref to store the timeout ID

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false)
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(true)
        }

        setLastScrollY(currentScrollY)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar)
      return () => {
        window.removeEventListener("scroll", controlNavbar)
      }
    }
  }, [lastScrollY])

  const handleMouseEnter = (dropdown) => {
    // Clear any existing timeout to prevent it from closing
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setActiveDropdown(dropdown)
  }

  const handleMouseLeave = () => {
    // Set a timeout to close the dropdown after a short delay
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150) // 150ms delay
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 p-10 transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="backdrop-blur-md bg-white/10 border-b border-white/20 px-4 py-3 rounded-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-red-400">
              <div className="text-sm font-semibold tracking-wider">INDIAN</div>
              <div className="text-xs text-black text-center">B2C</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Jewellery Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("jewellery")}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href="#"
                className="text-black hover:text-red-400 text-sm font-medium transition-colors flex items-center"
              >
                JEWELLERY
                
              </a>
              {activeDropdown === "jewellery" && (
                <div className="absolute top-8 left-96 transform -translate-x-1/2 mt-2 w-screen max-w-7xl backdrop-blur-md bg-white/95 rounded-lg shadow-lg p-6 border border-white/20">
                  <div className="grid grid-cols-5 gap-8">
                    {/* NECKLACES */}
                    <div>
                      <h3 className="text-red-400 font-semibold mb-4 text-sm">NECKLACES</h3>
                      <ul className="space-y-3">
                        <li className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
                          </div>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                            Beaded Chokers
                          </a>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <div className="w-3 h-5 border-2 border-gray-400 rounded-b-full"></div>
                          </div>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                            Beaded Pendants
                          </a>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <div className="w-5 h-2 border-2 border-gray-400 rounded-full"></div>
                          </div>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                            Chokers
                          </a>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-gray-400 rounded-full border-b-transparent"></div>
                          </div>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                            U Necklaces
                          </a>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <div className="w-2 h-6 border-2 border-gray-400 rounded-full"></div>
                          </div>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                            Long Necklaces
                          </a>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <div className="w-3 h-4 bg-gray-400 rounded-full"></div>
                          </div>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                            Pendants
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* EARRINGS */}
                    <div>
                      <h3 className="text-red-400 font-semibold mb-4 text-sm">EARRINGS</h3>
                      <ul className="space-y-3">
                        <li className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-gray-400 rounded-full relative">
                              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 border border-gray-400 rounded-full"></div>
                            </div>
                          </div>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                            Chandbalis
                          </a>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <div className="w-3 h-5 border-2 border-gray-400 rounded-b-full border-t-0"></div>
                          </div>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                            Jhumkas
                          </a>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <div className="w-2 h-6 border-2 border-gray-400 rounded-full"></div>
                          </div>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                            Long Earrings
                          </a>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                          </div>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                            Tops
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* ACCESSORIES */}
                    <div>
                      <h3 className="text-red-400 font-semibold mb-4 text-sm">ACCESSORIES</h3>
                      <ul className="space-y-3">
                        <li className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
                          </div>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                            Bangles
                          </a>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-gray-400 rounded-full relative">
                              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-gray-400"></div>
                            </div>
                          </div>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                            Maangtikas
                          </a>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-gray-400 rounded-full relative">
                              <div className="absolute inset-1 bg-gray-400 rounded-full"></div>
                            </div>
                          </div>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                            Rings
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* JEWELLERY SETS */}
                    <div>
                      <h3 className="text-red-400 font-semibold mb-4 text-sm">JEWELLERY SETS</h3>
                      <ul className="space-y-3">
                        <li>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors block">
                            Bead Choker Sets
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors block">
                            Choker Sets
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors block">
                            Necklace Sets
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors block">
                            Long Necklace Sets
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* SHOP BY PRICE */}
                    <div>
                      <h3 className="text-red-400 font-semibold mb-4 text-sm">SHOP BY PRICE</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-2">Necklaces</p>
                          <ul className="space-y-1">
                            <li>
                              <a href="#" className="text-gray-700 hover:text-red-400 text-xs transition-colors">
                                Necklaces under Rs. 1,50,000
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-gray-700 hover:text-red-400 text-xs transition-colors">
                                Necklaces under Rs. 2,00,000
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-gray-700 hover:text-red-400 text-xs transition-colors">
                                Necklaces under Rs. 3,50,000
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-2">Earrings</p>
                          <ul className="space-y-1">
                            <li>
                              <a href="#" className="text-gray-700 hover:text-red-400 text-xs transition-colors">
                                Earrings under Rs. 1,50,000
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-gray-700 hover:text-red-400 text-xs transition-colors">
                                Earrings under Rs. 2,50,000
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-gray-700 hover:text-red-400 text-xs transition-colors">
                                Earrings under Rs. 3,50,000
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-2">Accessories</p>
                          <ul className="space-y-1">
                            <li>
                              <a href="#" className="text-gray-700 hover:text-red-400 text-xs transition-colors">
                                Accessories under Rs. 1,00,000
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-gray-700 hover:text-red-400 text-xs transition-colors">
                                Accessories under Rs. 2,00,000
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-gray-700 hover:text-red-400 text-xs transition-colors">
                                Accessories under Rs. 3,50,000
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("readytoship")}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href="#"
                className="text-black hover:text-red-400 text-sm font-medium transition-colors flex items-center"
              >
                READY TO SHIP
                
              </a>
              {activeDropdown === "readytoship" && (
                <div className="absolute top-8 left-60 transform -translate-x-1/2 mt-2 w-screen max-w-7xl backdrop-blur-md bg-white/95 rounded-lg shadow-lg p-6 border border-white/20">
                  <div className="grid grid-cols-3 gap-8">
                    {/* Left side - Navigation Links */}
                    <div className="col-span-1">
                      <h3 className="text-red-400 font-semibold mb-4 text-sm">READY TO SHIP</h3>
                      <ul className="space-y-3">
                        <li>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors block">
                            Necklaces
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors block">
                            Earrings
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors block">
                            Bangles
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors block">
                            Rings
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors block">
                            Accessories
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors block">
                            Jewelry Sets
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* Right side - Images */}
                    <div className="col-span-2 grid grid-cols-2 gap-4">
                      <div className="relative group cursor-pointer">
                        <div className="aspect-square bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg overflow-hidden">
                          <img
                            src="/placeholder.svg?height=300&width=300"
                            alt="Ready to Ship Necklaces"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="absolute bottom-4 left-4 text-black">
                          <h4 className="font-semibold text-lg">NECKLACES</h4>
                          <p className="text-sm opacity-90">Ready to Ship</p>
                        </div>
                      </div>
                      <div className="relative group cursor-pointer">
                        <div className="aspect-square bg-gradient-to-br from-rose-100 to-rose-200 rounded-lg overflow-hidden">
                          <img
                            src="/placeholder.svg?height=300&width=300"
                            alt="Ready to Ship Earrings"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="absolute bottom-4 left-4 text-black">
                          <h4 className="font-semibold text-lg">EARRINGS</h4>
                          <p className="text-sm opacity-90">Ready to Ship</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bridal Dropdown */}
            <div className="relative" onMouseEnter={() => handleMouseEnter("bridal")} onMouseLeave={handleMouseLeave}>
              <a
                href="#"
                className="text-black hover:text-red-400 text-sm font-medium transition-colors flex items-center"
              >
                BRIDAL
                
              </a>
              {activeDropdown === "bridal" && (
                <div className="absolute top-8 left-36 transform -translate-x-1/2 mt-2 w-screen max-w-7xl backdrop-blur-md bg-white/95 rounded-lg shadow-lg p-6 border border-white/20">
                  <div className="grid grid-cols-3 gap-8">
                    {/* Left side - Navigation Links */}
                    <div className="col-span-1">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-red-400 font-semibold mb-3 text-sm">BRIDAL SETS</h3>
                          <ul className="space-y-2">
                            <li>
                              <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                                Sets Under Rs. 4,00,000
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                                Sets Under Rs. 8,00,000
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                                Sets Under Rs. 15,00,000
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-red-400 font-semibold mb-3 text-sm">BRIDAL OCCASIONS</h3>
                          <ul className="space-y-2">
                            <li>
                              <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                                Engagement
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                                Mehndi & Sangeet
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                                The Big Day
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-red-400 font-semibold mb-3 text-sm">SHOP BY CATEGORY</h3>
                          <ul className="space-y-2">
                            <li>
                              <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                                Necklaces
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                                Earrings
                              </a>
                            </li>
                            <li>
                              <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                                Accessories
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* Right side - Images */}
                    <div className="col-span-2 grid grid-cols-2 gap-4">
                      <div className="relative group cursor-pointer">
                        <div className="aspect-square bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg overflow-hidden">
                          <img
                            src="/placeholder.svg?height=300&width=300"
                            alt="Bridal Necklace Sets"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="absolute bottom-4 left-4 text-black">
                          <h4 className="font-semibold text-lg">U NECKLACE</h4>
                          <p className="text-sm opacity-90">Bridal Collection</p>
                        </div>
                      </div>
                      <div className="relative group cursor-pointer">
                        <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg overflow-hidden">
                          <img
                            src="/placeholder.svg?height=300&width=300"
                            alt="Bridal Necklace Set"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="absolute bottom-4 left-4 text-black">
                          <h4 className="font-semibold text-lg">U NECKLACE SET</h4>
                          <p className="text-sm opacity-90">Bridal Collection</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Collections Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("collections")}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href="#"
                className="text-black hover:text-red-400 text-sm font-medium transition-colors flex items-center"
              >
                COLLECTIONS
                
              </a>
              {activeDropdown === "collections" && (
                <div className="absolute top-8 left-0 mt-2 w-[250px] backdrop-blur-md bg-white/95 rounded-lg shadow-lg p-4 border border-white/20">
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors block">
                        Lumia by Tyaani
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors block">
                        Aurora by Tyaani
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors block">
                        Inaayt
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors block">
                        Bestsellers
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors block">
                        Gifting
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <a href="#" className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
              SALE
            </a>

            <a href="#" className="text-black hover:text-red-400 text-sm font-medium transition-colors">
              GIFT CARD
            </a>

            {/* Stores Dropdown */}
            <div className="relative" onMouseEnter={() => handleMouseEnter("stores")} onMouseLeave={handleMouseLeave}>
              <a
                href="#"
                className="text-black hover:text-red-400 text-sm font-medium transition-colors flex items-center"
              >
                STORES
                
              </a>
              {activeDropdown === "stores" && (
                <div className="absolute top-8 left-0 mt-2 w-[300px] backdrop-blur-md bg-white/95 rounded-lg shadow-lg p-4 border border-white/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-red-400 font-semibold mb-3 text-sm">INDIA</h3>
                      <ul className="space-y-2">
                        <li>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                            Mumbai
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                            Delhi
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                            Bangalore
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                            Hyderabad
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-red-400 font-semibold mb-3 text-sm">INTERNATIONAL</h3>
                      <ul className="space-y-2">
                        <li>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                            Dubai
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                            London
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors">
                            New York
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Forces of Tyaani Dropdown */}
            <div className="relative" onMouseEnter={() => handleMouseEnter("forces")} onMouseLeave={handleMouseLeave}>
              <a
                href="#"
                className="text-black hover:text-red-400 text-sm font-medium transition-colors flex items-center"
              >
                FORCES OF TYAANI
                
              </a>
              {activeDropdown === "forces" && (
                <div className="absolute top-8 left-0 mt-2 w-[250px] backdrop-blur-md bg-white/95 rounded-lg shadow-lg p-4 border border-white/20">
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors block">
                        Maheep Kapoor
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors block">
                        Bhavana Pandey
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors block">
                        Seema Sajdeh
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors block">
                        Neelam Kothari
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-700 hover:text-red-400 text-sm transition-colors block">
                        Brand Ambassadors
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button className="text-black hover:text-gray-300 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Right side icons */}
          <div className="hidden lg:flex items-center space-x-4">
            <span className="text-black text-sm font-medium">INR</span>
            <Phone className="w-5 h-5 text-black hover:text-gray-300 transition-colors cursor-pointer" />
            <Search className="w-5 h-5 text-black hover:text-gray-300 transition-colors cursor-pointer" />
            <Heart className="w-5 h-5 text-black hover:text-gray-300 transition-colors cursor-pointer" />
            <User className="w-5 h-5 text-black hover:text-gray-300 transition-colors cursor-pointer" />
            <ShoppingBag className="w-5 h-5 text-black hover:text-gray-300 transition-colors cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  )
}
