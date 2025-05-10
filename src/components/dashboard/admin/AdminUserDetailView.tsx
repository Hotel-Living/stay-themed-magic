
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AdminDashboardLayout from "./AdminDashboardLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Edit, UserX } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function AdminUserDetailView() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [themes, setThemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    is_hotel_owner: false,
    is_active: true
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);
        
        // Initialize edit form with user data
        setEditForm({
          first_name: profileData.first_name || "",
          last_name: profileData.last_name || "",
          phone: profileData.phone || "",
          is_hotel_owner: profileData.is_hotel_owner || false,
          is_active: profileData.is_active !== false // Default to true if field doesn't exist
        });

        // Fetch user bookings with proper join syntax
        const { data: bookingsData, error: bookingsError } = await supabase
          .from("bookings")
          .select(`
            *,
            hotel:hotels(name, country, city)
          `)
          .eq("user_id", id);

        if (bookingsError) throw bookingsError;
        setBookings(bookingsData || []);

        // Updated favorites query with proper join
        const { data: favoritesData, error: favoritesError } = await supabase
          .from("favorites")
          .select(`
            id,
            created_at,
            hotel:hotels(name, country, city)
          `)
          .eq("user_id", id);

        if (favoritesError) throw favoritesError;
        setFavorites(favoritesData || []);

        // Fetch user preferences with themes
        const { data: prefsData, error: prefsError } = await supabase
          .from("user_preferences")
          .select("favorite_themes")
          .eq("user_id", id)
          .single();

        if (prefsData && prefsData.favorite_themes && prefsData.favorite_themes.length > 0) {
          // Fetch theme names based on IDs
          const { data: themesData, error: themesError } = await supabase
            .from("themes")
            .select("id, name")
            .in("id", prefsData.favorite_themes);

          if (themesError) throw themesError;
          setThemes(themesData || []);
        }

      } catch (error: any) {
        console.error("Error fetching user data:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to fetch user data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id, toast]);

  const handleSaveUserDetails = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: editForm.first_name,
          last_name: editForm.last_name,
          phone: editForm.phone,
          is_hotel_owner: editForm.is_hotel_owner,
          is_active: editForm.is_active
        })
        .eq("id", id);

      if (error) throw error;

      // Update the local profile state with the edited data
      setProfile({
        ...profile,
        ...editForm
      });
      
      setEditing(false);
      toast({
        title: "Success",
        description: "User information updated successfully",
      });
    } catch (error: any) {
      console.error("Error updating user:", error);
      toast({
        title: "Error updating user",
        description: error.message || "Failed to update user information",
        variant: "destructive"
      });
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Users
          </Button>
          <h2 className="text-2xl font-bold">User Details</h2>
        </div>

        {loading ? (
          <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
            Loading user details...
          </div>
        ) : profile ? (
          <div className="space-y-6">
            {/* User Profile */}
            <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h3 className="text-xl font-semibold">Basic Information</h3>
                {editing ? (
                  <Button 
                    variant="outline" 
                    onClick={handleSaveUserDetails}
                    className="flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save Changes
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" /> Edit User
                  </Button>
                )}
              </div>

              {editing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      value={editForm.first_name}
                      onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      value={editForm.last_name}
                      onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center space-x-2 mt-6">
                    <Checkbox
                      id="is_hotel_owner"
                      checked={editForm.is_hotel_owner}
                      onCheckedChange={(checked) => 
                        setEditForm({ ...editForm, is_hotel_owner: checked === true })
                      }
                    />
                    <Label htmlFor="is_hotel_owner">Hotel Owner</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="is_active"
                        checked={editForm.is_active}
                        onCheckedChange={(checked) => 
                          setEditForm({ ...editForm, is_active: checked })
                        }
                      />
                      <Label htmlFor="is_active">User Active</Label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">First Name</p>
                    <p className="font-medium">{profile.first_name || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Last Name</p>
                    <p className="font-medium">{profile.last_name || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="font-medium">{profile.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Hotel Owner</p>
                    <p className="font-medium">{profile.is_hotel_owner ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email Verified</p>
                    <p className="font-medium">{profile.email_verified ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Role</p>
                    <p className="font-medium capitalize">{profile.role || "guest"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">User ID</p>
                    <p className="font-medium font-mono text-xs">{profile.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Joined</p>
                    <p className="font-medium">{new Date(profile.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Status</p>
                    <p className="font-medium">{profile.is_active !== false ? "Active" : "Inactive"}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bookings */}
            <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2">Bookings History</h3>
              
              {bookings.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hotel</TableHead>
                      <TableHead>Check In</TableHead>
                      <TableHead>Check Out</TableHead>
                      <TableHead>Total Price</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.hotel?.name || "Unknown Hotel"}</TableCell>
                        <TableCell>{new Date(booking.check_in).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(booking.check_out).toLocaleDateString()}</TableCell>
                        <TableCell>${booking.total_price}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {booking.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-center py-4">No bookings found for this user.</p>
              )}
            </div>

            {/* Favorite Hotels */}
            <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2">Favorite Hotels</h3>
              
              {favorites.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hotel</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Added On</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {favorites.map((favorite) => (
                      <TableRow key={favorite.id}>
                        <TableCell>{favorite.hotel?.name || "Unknown Hotel"}</TableCell>
                        <TableCell>
                          {favorite.hotel?.city}, {favorite.hotel?.country}
                        </TableCell>
                        <TableCell>{new Date(favorite.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-center py-4">No favorite hotels found for this user.</p>
              )}
            </div>

            {/* Preferred Themes */}
            <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2">Preferred Affinities/Themes</h3>
              
              {themes.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {themes.map((theme) => (
                    <span key={theme.id} className="px-3 py-1 bg-purple-900/30 rounded-full text-xs">
                      {theme.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-center py-4">No preferred themes found for this user.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-xl p-6 bg-white/5 backdrop-blur-sm">
            <p className="text-center">User not found.</p>
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}
