
import { useState } from "react";
import { User } from "./useUserData";

export function useUserFiltering(users: User[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = users.filter(user => {
    // Global search across multiple fields
    const searchText = searchTerm.toLowerCase();
    const firstName = user.first_name?.toLowerCase() || "";
    const lastName = user.last_name?.toLowerCase() || "";
    const fullName = `${firstName} ${lastName}`.toLowerCase();
    const email = user.email?.toLowerCase() || "";
    const userId = user.id?.toLowerCase() || "";
    const userType = user.is_hotel_owner ? "hotel owner" : "user";
    const role = user.role?.toLowerCase() || "";

    // Check hotel-related fields if the user has hotels data
    let hotelMatches = false;
    if (user.hotels && Array.isArray(user.hotels)) {
      hotelMatches = user.hotels.some((hotel: any) => 
        (hotel.name?.toLowerCase() || "").includes(searchText) ||
        (hotel.city?.toLowerCase() || "").includes(searchText)
      );
    } else if (user.hotels) {
      // Single hotel object
      hotelMatches = 
        (user.hotels.name?.toLowerCase() || "").includes(searchText) ||
        (user.hotels.city?.toLowerCase() || "").includes(searchText);
    }

    // Combined search across all fields
    const matchesSearch = 
      searchTerm === "" || 
      firstName.includes(searchText) ||
      lastName.includes(searchText) ||
      fullName.includes(searchText) ||
      email.includes(searchText) ||
      userId.includes(searchText) ||
      userType.includes(searchText) ||
      role.includes(searchText) ||
      hotelMatches;

    // Apply role filter after search
    const matchesRole =
      roleFilter === "all" ||
      (roleFilter === "owner" && user.is_hotel_owner) ||
      (roleFilter === "guest" && !user.is_hotel_owner);

    return matchesSearch && matchesRole;
  });

  return {
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    filteredUsers
  };
}
