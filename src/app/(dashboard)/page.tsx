import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ShoppingBag, Package, TrendingUp, Users, Plus, Eye, Edit, BarChart3, Crown, Star } from "lucide-react";
import { IMAGES } from "@/constants/images";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const stats = {
    totalProducts: 248,
    totalOrders: 156,
    totalRevenue: 45230,
    totalCustomers: 89
  };

  const recentProducts = [
    { id: 1, name: "Summer Floral Dress", category: "Dresses", price: 89.99, stock: 15, image: "/api/placeholder/60/60" },
    { id: 2, name: "Designer Denim Jacket", category: "Jackets", price: 129.99, stock: 8, image: "/api/placeholder/60/60" },
    { id: 3, name: "Silk Evening Gown", category: "Formal", price: 299.99, stock: 3, image: "/api/placeholder/60/60" },
    { id: 4, name: "Casual Cotton T-Shirt", category: "T-Shirts", price: 24.99, stock: 45, image: "/api/placeholder/60/60" },
  ];

  const lowStockProducts = [
    { id: 1, name: "Premium Leather Boots", stock: 2, category: "Footwear" },
    { id: 2, name: "Vintage Blazer", stock: 1, category: "Blazers" },
    { id: 3, name: "Designer Handbag", stock: 3, category: "Accessories" },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {session.user?.name}!</p>
        </div>
        <div className="flex gap-3">
          <Link 
            href="/products"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={16} />
            Add Product
          </Link>
          <Link 
            href="/analytics"
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
          >
            <BarChart3 size={16} />
            Analytics
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-600 text-sm font-medium">+12% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-600 text-sm font-medium">+8% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-600 text-sm font-medium">+15% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Customers</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-600 text-sm font-medium">+5% from last month</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Products */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Products</h2>
                <Link 
                  href="/products"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View all
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        {/* <ShirtIcon className="h-6 w-6 text-gray-500" /> */}
                        <IMAGES.ICONS.shirt />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium text-gray-900">${product.price}</p>
                        <p className="text-sm text-gray-500">{product.stock} in stock</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Edit size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Low Stock Alert */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                Low Stock Alert
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {lowStockProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </div>
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {product.stock} left
                    </span>
                  </div>
                ))}
              </div>
              <Link 
                href="/inventory"
                className="block mt-4 text-center text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Manage Inventory
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <Link 
                  href="/products"
                  className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Plus className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-700">Add New Product</span>
                </Link>
                <Link 
                  href="/categories"
                  className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Package className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-700">Manage Categories</span>
                </Link>
                <Link 
                  href="/orders"
                  className="flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <ShoppingBag className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-700">View Orders</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white p-6">
            <div className="flex items-center gap-3 mb-3">
              <Star className="h-6 w-6" />
              <h3 className="font-semibold">Great Performance!</h3>
            </div>
            <p className="text-purple-100 text-sm mb-4">
              Your fashion store is performing 23% better than last month.
            </p>
            <Link 
              href="/analytics"
              className="inline-flex items-center text-sm font-medium text-white bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}