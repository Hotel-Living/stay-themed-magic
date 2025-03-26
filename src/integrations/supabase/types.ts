export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          check_in: string
          check_out: string
          created_at: string
          hotel_id: string | null
          id: string
          status: string | null
          total_price: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          check_in: string
          check_out: string
          created_at?: string
          hotel_id?: string | null
          id?: string
          status?: string | null
          total_price: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          check_in?: string
          check_out?: string
          created_at?: string
          hotel_id?: string | null
          id?: string
          status?: string | null
          total_price?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          created_at: string
          hotel_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          hotel_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          hotel_id?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      hotel_images: {
        Row: {
          created_at: string
          hotel_id: string | null
          id: string
          image_url: string
          is_main: boolean | null
        }
        Insert: {
          created_at?: string
          hotel_id?: string | null
          id?: string
          image_url: string
          is_main?: boolean | null
        }
        Update: {
          created_at?: string
          hotel_id?: string | null
          id?: string
          image_url?: string
          is_main?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "hotel_images_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      hotel_themes: {
        Row: {
          hotel_id: string | null
          id: string
          theme_id: string | null
        }
        Insert: {
          hotel_id?: string | null
          id?: string
          theme_id?: string | null
        }
        Update: {
          hotel_id?: string | null
          id?: string
          theme_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hotel_themes_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hotel_themes_theme_id_fkey"
            columns: ["theme_id"]
            isOneToOne: false
            referencedRelation: "themes"
            referencedColumns: ["id"]
          },
        ]
      }
      hotels: {
        Row: {
          address: string | null
          category: number | null
          city: string
          country: string
          created_at: string
          description: string | null
          id: string
          is_featured: boolean | null
          latitude: number | null
          longitude: number | null
          main_image_url: string | null
          name: string
          owner_id: string | null
          price_per_month: number
          property_type: string | null
          style: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          category?: number | null
          city: string
          country: string
          created_at?: string
          description?: string | null
          id?: string
          is_featured?: boolean | null
          latitude?: number | null
          longitude?: number | null
          main_image_url?: string | null
          name: string
          owner_id?: string | null
          price_per_month: number
          property_type?: string | null
          style?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          category?: number | null
          city?: string
          country?: string
          created_at?: string
          description?: string | null
          id?: string
          is_featured?: boolean | null
          latitude?: number | null
          longitude?: number | null
          main_image_url?: string | null
          name?: string
          owner_id?: string | null
          price_per_month?: number
          property_type?: string | null
          style?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "hotels_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email_verified: boolean
          first_name: string | null
          id: string
          is_hotel_owner: boolean | null
          last_name: string | null
          phone: string | null
          role: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email_verified?: boolean
          first_name?: string | null
          id: string
          is_hotel_owner?: boolean | null
          last_name?: string | null
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email_verified?: boolean
          first_name?: string | null
          id?: string
          is_hotel_owner?: boolean | null
          last_name?: string | null
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          hotel_id: string | null
          id: string
          is_notified: boolean | null
          rating: number
          response_text: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          hotel_id?: string | null
          id?: string
          is_notified?: boolean | null
          rating: number
          response_text?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          hotel_id?: string | null
          id?: string
          is_notified?: boolean | null
          rating?: number
          response_text?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      themes: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string | null
          favorite_themes: string[] | null
          id: string
          preferred_countries: string[] | null
          price_range_max: number | null
          price_range_min: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          favorite_themes?: string[] | null
          id?: string
          preferred_countries?: string[] | null
          price_range_max?: number | null
          price_range_min?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          favorite_themes?: string[] | null
          id?: string
          preferred_countries?: string[] | null
          price_range_max?: number | null
          price_range_min?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
