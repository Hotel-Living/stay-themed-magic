
import { AdminUserRolesForm } from "@/components/dashboard/admin/AdminUserRolesForm";
import { AdminRoute } from "@/components/auth/AdminRoute";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";

export default function AdminRolesPage() {
  return (
    <AdminRoute>
      <div className="min-h-screen flex flex-col">
        <HotelStarfield />
        <Navbar />
        
        <main className="flex-1 pt-16">
          <div className="container max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Role Management</h1>
              <p className="text-muted-foreground">
                Assign and manage user roles for administrative access
              </p>
            </div>
            
            <AdminUserRolesForm />
          </div>
        </main>
        
        <Footer />
      </div>
    </AdminRoute>
  );
}
