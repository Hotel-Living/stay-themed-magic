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
      activities: {
        Row: {
          category: string | null
          created_at: string
          id: string
          name: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          created_at: string
          id: string
        }
        Insert: {
          created_at?: string
          id: string
        }
        Update: {
          created_at?: string
          id?: string
        }
        Relationships: []
      }
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
      hotel_activities: {
        Row: {
          activity_id: string | null
          created_at: string
          hotel_id: string | null
          id: string
        }
        Insert: {
          activity_id?: string | null
          created_at?: string
          hotel_id?: string | null
          id?: string
        }
        Update: {
          activity_id?: string | null
          created_at?: string
          hotel_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hotel_activities_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hotel_activities_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      hotel_availability: {
        Row: {
          availability_date: string
          availability_month: string
          availability_year: number
          created_at: string | null
          hotel_id: string | null
          id: string
          is_full_month: boolean | null
          preferred_weekday: string
          updated_at: string | null
        }
        Insert: {
          availability_date: string
          availability_month: string
          availability_year: number
          created_at?: string | null
          hotel_id?: string | null
          id?: string
          is_full_month?: boolean | null
          preferred_weekday?: string
          updated_at?: string | null
        }
        Update: {
          availability_date?: string
          availability_month?: string
          availability_year?: number
          created_at?: string | null
          hotel_id?: string | null
          id?: string
          is_full_month?: boolean | null
          preferred_weekday?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hotel_availability_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
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
          available_months: string[] | null
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
          rejection_reason: string | null
          status: string | null
          style: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          available_months?: string[] | null
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
          rejection_reason?: string | null
          status?: string | null
          style?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          available_months?: string[] | null
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
          rejection_reason?: string | null
          status?: string | null
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
          language_preferences: string[] | null
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
          language_preferences?: string[] | null
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
          language_preferences?: string[] | null
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
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
