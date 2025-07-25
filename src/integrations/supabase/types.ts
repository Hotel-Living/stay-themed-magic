export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          category: string | null
          created_at: string
          id: string
          level: number
          name: string
          parent_id: string | null
          sort_order: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          level?: number
          name: string
          parent_id?: string | null
          sort_order?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          level?: number
          name?: string
          parent_id?: string | null
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "activities_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_logs: {
        Row: {
          action: string
          admin_id: string
          created_at: string
          details: Json | null
          id: string
        }
        Insert: {
          action: string
          admin_id: string
          created_at?: string
          details?: Json | null
          id?: string
        }
        Update: {
          action?: string
          admin_id?: string
          created_at?: string
          details?: Json | null
          id?: string
        }
        Relationships: []
      }
      admin_messages: {
        Row: {
          created_at: string
          hotel_id: string | null
          id: string
          message: string
          status: string | null
          subject: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          hotel_id?: string | null
          id?: string
          message: string
          status?: string | null
          subject?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          hotel_id?: string | null
          id?: string
          message?: string
          status?: string | null
          subject?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_messages_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
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
      advertising_requests: {
        Row: {
          available_months: string[] | null
          contact_email: string
          contact_name: string
          created_at: string | null
          id: string
          terms_accepted: boolean
          user_id: string | null
        }
        Insert: {
          available_months?: string[] | null
          contact_email: string
          contact_name: string
          created_at?: string | null
          id?: string
          terms_accepted?: boolean
          user_id?: string | null
        }
        Update: {
          available_months?: string[] | null
          contact_email?: string
          contact_name?: string
          created_at?: string | null
          id?: string
          terms_accepted?: boolean
          user_id?: string | null
        }
        Relationships: []
      }
      agent_commissions: {
        Row: {
          agent_id: string
          booking_id: string | null
          commission_amount: number
          commission_rate: number
          created_at: string | null
          hotel_id: string | null
          id: string
          payment_date: string | null
          payment_status: string | null
          period_end: string
          period_start: string
          updated_at: string | null
        }
        Insert: {
          agent_id: string
          booking_id?: string | null
          commission_amount: number
          commission_rate: number
          created_at?: string | null
          hotel_id?: string | null
          id?: string
          payment_date?: string | null
          payment_status?: string | null
          period_end: string
          period_start: string
          updated_at?: string | null
        }
        Update: {
          agent_id?: string
          booking_id?: string | null
          commission_amount?: number
          commission_rate?: number
          created_at?: string | null
          hotel_id?: string | null
          id?: string
          payment_date?: string | null
          payment_status?: string | null
          period_end?: string
          period_start?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_commissions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_commissions_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_commissions_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_hotels: {
        Row: {
          agent_id: string
          contacted_date: string
          country: string
          created_at: string | null
          hotel_email: string
          hotel_name: string
          id: string
          registered_date: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          agent_id: string
          contacted_date: string
          country: string
          created_at?: string | null
          hotel_email: string
          hotel_name: string
          id?: string
          registered_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          agent_id?: string
          contacted_date?: string
          country?: string
          created_at?: string | null
          hotel_email?: string
          hotel_name?: string
          id?: string
          registered_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_hotels_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      agents: {
        Row: {
          agent_code: string
          bank_account: string
          created_at: string | null
          email: string
          full_name: string
          id: string
          is_active: boolean | null
          total_earned: number | null
          total_paid: number | null
          total_pending: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          agent_code: string
          bank_account: string
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          is_active?: boolean | null
          total_earned?: number | null
          total_paid?: number | null
          total_pending?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          agent_code?: string
          bank_account?: string
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          is_active?: boolean | null
          total_earned?: number | null
          total_paid?: number | null
          total_pending?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      api_usage_tracking: {
        Row: {
          created_at: string
          hour_key: string
          id: string
          requests_count: number
          service: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          hour_key: string
          id?: string
          requests_count?: number
          service: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          hour_key?: string
          id?: string
          requests_count?: number
          service?: string
          updated_at?: string
        }
        Relationships: []
      }
      availability_packages: {
        Row: {
          available_rooms: number
          created_at: string
          duration_days: number
          end_date: string
          hotel_id: string
          id: string
          start_date: string
          total_rooms: number
          updated_at: string
        }
        Insert: {
          available_rooms: number
          created_at?: string
          duration_days: number
          end_date: string
          hotel_id: string
          id?: string
          start_date: string
          total_rooms: number
          updated_at?: string
        }
        Update: {
          available_rooms?: number
          created_at?: string
          duration_days?: number
          end_date?: string
          hotel_id?: string
          id?: string
          start_date?: string
          total_rooms?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "availability_packages_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          check_in: string
          check_out: string
          created_at: string
          hotel_id: string | null
          id: string
          package_id: string | null
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
          package_id?: string | null
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
          package_id?: string | null
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
            foreignKeyName: "bookings_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "availability_packages"
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
      filter_value_mappings: {
        Row: {
          category: string
          created_at: string
          english_value: string
          id: string
          is_active: boolean
          portuguese_value: string | null
          romanian_value: string | null
          spanish_value: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          english_value: string
          id?: string
          is_active?: boolean
          portuguese_value?: string | null
          romanian_value?: string | null
          spanish_value: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          english_value?: string
          id?: string
          is_active?: boolean
          portuguese_value?: string | null
          romanian_value?: string | null
          spanish_value?: string
          updated_at?: string
        }
        Relationships: []
      }
      filters: {
        Row: {
          category: string
          created_at: string | null
          id: string
          is_active: boolean
          last_sync_at: string | null
          source_type: string
          value: string
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          is_active?: boolean
          last_sync_at?: string | null
          source_type?: string
          value: string
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          is_active?: boolean
          last_sync_at?: string | null
          source_type?: string
          value?: string
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
      hotel_associations: {
        Row: {
          association_code: string | null
          association_name: string
          country: string
          created_at: string
          email: string
          id: string
          responsible_person: string
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          association_code?: string | null
          association_name: string
          country: string
          created_at?: string
          email: string
          id?: string
          responsible_person: string
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          association_code?: string | null
          association_name?: string
          country?: string
          created_at?: string
          email?: string
          id?: string
          responsible_person?: string
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
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
      hotel_referrals: {
        Row: {
          additional_info: string | null
          city: string | null
          contact_email: string
          contact_name: string
          contact_phone: string | null
          created_at: string | null
          hotel_name: string
          id: string
          user_id: string | null
        }
        Insert: {
          additional_info?: string | null
          city?: string | null
          contact_email: string
          contact_name: string
          contact_phone?: string | null
          created_at?: string | null
          hotel_name: string
          id?: string
          user_id?: string | null
        }
        Update: {
          additional_info?: string | null
          city?: string | null
          contact_email?: string
          contact_name?: string
          contact_phone?: string | null
          created_at?: string | null
          hotel_name?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      hotel_referrals_submissions: {
        Row: {
          bank_country: string
          bank_name: string
          created_at: string
          full_name: string
          hotels: Json
          iban_account: string
          id: string
          status: string
          swift_bic: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          bank_country: string
          bank_name: string
          created_at?: string
          full_name: string
          hotels?: Json
          iban_account: string
          id?: string
          status?: string
          swift_bic?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          bank_country?: string
          bank_name?: string
          created_at?: string
          full_name?: string
          hotels?: Json
          iban_account?: string
          id?: string
          status?: string
          swift_bic?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
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
      hotel_translations: {
        Row: {
          auto_generated: boolean
          created_at: string
          hotel_id: string
          id: string
          language_code: string
          translated_atmosphere: string | null
          translated_description: string | null
          translated_ideal_guests: string | null
          translated_name: string | null
          translated_perfect_location: string | null
          translation_status: string
          updated_at: string
        }
        Insert: {
          auto_generated?: boolean
          created_at?: string
          hotel_id: string
          id?: string
          language_code: string
          translated_atmosphere?: string | null
          translated_description?: string | null
          translated_ideal_guests?: string | null
          translated_name?: string | null
          translated_perfect_location?: string | null
          translation_status?: string
          updated_at?: string
        }
        Update: {
          auto_generated?: boolean
          created_at?: string
          hotel_id?: string
          id?: string
          language_code?: string
          translated_atmosphere?: string | null
          translated_description?: string | null
          translated_ideal_guests?: string | null
          translated_name?: string | null
          translated_perfect_location?: string | null
          translation_status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "hotel_translations_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      hotels: {
        Row: {
          additional_data: Json | null
          address: string | null
          allow_stay_extensions: boolean | null
          atmosphere: string | null
          atmosphere_description: string | null
          available_months: string[] | null
          banking_info: Json | null
          category: number | null
          check_in_weekday: string | null
          city: string
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          country: string
          created_at: string
          description: string | null
          enable_price_increase: boolean | null
          enablepriceincrease: boolean | null
          faqs: Json[] | null
          features_hotel: Json | null
          features_room: Json | null
          id: string
          ideal_guests: string | null
          ideal_guests_description: string | null
          is_featured: boolean | null
          latitude: number | null
          laundry_service: Json | null
          location_address: string | null
          location_description: string | null
          location_highlight_description: string | null
          longitude: number | null
          main_image_url: string | null
          meal_plans: string[] | null
          meals_offered: string[] | null
          name: string
          owner_id: string | null
          pending_changes: Json | null
          perfect_location: string | null
          photos: string[] | null
          postal_code: string | null
          preferred: string | null
          preferredWeekday: string | null
          price_increase_cap: number | null
          price_per_month: number
          priceincreasecap: number | null
          pricingmatrix: Json | null
          property_style: string | null
          property_type: string | null
          rates: Json | null
          rejection_reason: string | null
          room_types: Json[] | null
          status: string | null
          stay_lengths: number[] | null
          style: string | null
          terms: string | null
          updated_at: string
        }
        Insert: {
          additional_data?: Json | null
          address?: string | null
          allow_stay_extensions?: boolean | null
          atmosphere?: string | null
          atmosphere_description?: string | null
          available_months?: string[] | null
          banking_info?: Json | null
          category?: number | null
          check_in_weekday?: string | null
          city: string
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          country: string
          created_at?: string
          description?: string | null
          enable_price_increase?: boolean | null
          enablepriceincrease?: boolean | null
          faqs?: Json[] | null
          features_hotel?: Json | null
          features_room?: Json | null
          id?: string
          ideal_guests?: string | null
          ideal_guests_description?: string | null
          is_featured?: boolean | null
          latitude?: number | null
          laundry_service?: Json | null
          location_address?: string | null
          location_description?: string | null
          location_highlight_description?: string | null
          longitude?: number | null
          main_image_url?: string | null
          meal_plans?: string[] | null
          meals_offered?: string[] | null
          name: string
          owner_id?: string | null
          pending_changes?: Json | null
          perfect_location?: string | null
          photos?: string[] | null
          postal_code?: string | null
          preferred?: string | null
          preferredWeekday?: string | null
          price_increase_cap?: number | null
          price_per_month: number
          priceincreasecap?: number | null
          pricingmatrix?: Json | null
          property_style?: string | null
          property_type?: string | null
          rates?: Json | null
          rejection_reason?: string | null
          room_types?: Json[] | null
          status?: string | null
          stay_lengths?: number[] | null
          style?: string | null
          terms?: string | null
          updated_at?: string
        }
        Update: {
          additional_data?: Json | null
          address?: string | null
          allow_stay_extensions?: boolean | null
          atmosphere?: string | null
          atmosphere_description?: string | null
          available_months?: string[] | null
          banking_info?: Json | null
          category?: number | null
          check_in_weekday?: string | null
          city?: string
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          country?: string
          created_at?: string
          description?: string | null
          enable_price_increase?: boolean | null
          enablepriceincrease?: boolean | null
          faqs?: Json[] | null
          features_hotel?: Json | null
          features_room?: Json | null
          id?: string
          ideal_guests?: string | null
          ideal_guests_description?: string | null
          is_featured?: boolean | null
          latitude?: number | null
          laundry_service?: Json | null
          location_address?: string | null
          location_description?: string | null
          location_highlight_description?: string | null
          longitude?: number | null
          main_image_url?: string | null
          meal_plans?: string[] | null
          meals_offered?: string[] | null
          name?: string
          owner_id?: string | null
          pending_changes?: Json | null
          perfect_location?: string | null
          photos?: string[] | null
          postal_code?: string | null
          preferred?: string | null
          preferredWeekday?: string | null
          price_increase_cap?: number | null
          price_per_month?: number
          priceincreasecap?: number | null
          pricingmatrix?: Json | null
          property_style?: string | null
          property_type?: string | null
          rates?: Json | null
          rejection_reason?: string | null
          room_types?: Json[] | null
          status?: string | null
          stay_lengths?: number[] | null
          style?: string | null
          terms?: string | null
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
      join_requests: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          motivation: string | null
          tier: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          motivation?: string | null
          tier: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          motivation?: string | null
          tier?: string
        }
        Relationships: []
      }
      join_us_files: {
        Row: {
          created_at: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          submission_id: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          submission_id: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "join_us_files_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "join_us_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      join_us_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          recipient_email: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          recipient_email?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          recipient_email?: string | null
        }
        Relationships: []
      }
      notification_logs: {
        Row: {
          created_at: string
          details: string | null
          id: string
          notification_type: string
          recipient_email: string
          status: string
          submission_id: string
        }
        Insert: {
          created_at?: string
          details?: string | null
          id?: string
          notification_type: string
          recipient_email: string
          status: string
          submission_id: string
        }
        Update: {
          created_at?: string
          details?: string | null
          id?: string
          notification_type?: string
          recipient_email?: string
          status?: string
          submission_id?: string
        }
        Relationships: []
      }
      password_reset_tokens: {
        Row: {
          created_at: string
          email: string
          expires_at: string
          id: string
          token: string
          used_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          expires_at: string
          id?: string
          token: string
          used_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          token?: string
          used_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          booking_id: string | null
          created_at: string | null
          hotel_id: string | null
          id: string
          method: string
          status: string
          transaction_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          booking_id?: string | null
          created_at?: string | null
          hotel_id?: string | null
          id?: string
          method: string
          status?: string
          transaction_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string | null
          created_at?: string | null
          hotel_id?: string | null
          id?: string
          method?: string
          status?: string
          transaction_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          admin_note: string | null
          avatar_url: string | null
          created_at: string
          email_verified: boolean
          first_name: string | null
          id: string
          is_active: boolean | null
          is_hotel_owner: boolean | null
          last_name: string | null
          phone: string | null
          preferred_language: string | null
          role: string
          updated_at: string
        }
        Insert: {
          admin_note?: string | null
          avatar_url?: string | null
          created_at?: string
          email_verified?: boolean
          first_name?: string | null
          id: string
          is_active?: boolean | null
          is_hotel_owner?: boolean | null
          last_name?: string | null
          phone?: string | null
          preferred_language?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          admin_note?: string | null
          avatar_url?: string | null
          created_at?: string
          email_verified?: boolean
          first_name?: string | null
          id?: string
          is_active?: boolean | null
          is_hotel_owner?: boolean | null
          last_name?: string | null
          phone?: string | null
          preferred_language?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          action_type: string
          attempt_count: number | null
          created_at: string | null
          first_attempt: string | null
          id: string
          identifier: string
          last_attempt: string | null
        }
        Insert: {
          action_type: string
          attempt_count?: number | null
          created_at?: string | null
          first_attempt?: string | null
          id?: string
          identifier: string
          last_attempt?: string | null
        }
        Update: {
          action_type?: string
          attempt_count?: number | null
          created_at?: string | null
          first_attempt?: string | null
          id?: string
          identifier?: string
          last_attempt?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          admin_note: string | null
          comment: string | null
          created_at: string
          hotel_id: string | null
          id: string
          is_flagged: boolean | null
          is_hidden: boolean | null
          is_notified: boolean | null
          rating: number
          response_text: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          admin_note?: string | null
          comment?: string | null
          created_at?: string
          hotel_id?: string | null
          id?: string
          is_flagged?: boolean | null
          is_hidden?: boolean | null
          is_notified?: boolean | null
          rating: number
          response_text?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          admin_note?: string | null
          comment?: string | null
          created_at?: string
          hotel_id?: string | null
          id?: string
          is_flagged?: boolean | null
          is_hidden?: boolean | null
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
      stay_extensions: {
        Row: {
          created_at: string
          id: string
          new_booking_id: string
          new_duration: number
          new_price: number
          original_booking_id: string
          original_duration: number
          original_price: number
          price_difference: number
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          new_booking_id: string
          new_duration: number
          new_price: number
          original_booking_id: string
          original_duration: number
          original_price: number
          price_difference: number
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          new_booking_id?: string
          new_duration?: number
          new_price?: number
          original_booking_id?: string
          original_duration?: number
          original_price?: number
          price_difference?: number
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      theme_translations: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          locale: string
          name: string
          theme_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          locale: string
          name: string
          theme_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          locale?: string
          name?: string
          theme_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "theme_translations_theme_id_fkey"
            columns: ["theme_id"]
            isOneToOne: false
            referencedRelation: "themes"
            referencedColumns: ["id"]
          },
        ]
      }
      themes: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          level: number
          name: string
          parent_id: string | null
          sort_order: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          level?: number
          name: string
          parent_id?: string | null
          sort_order?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          level?: number
          name?: string
          parent_id?: string | null
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "themes_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "themes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_affinities: {
        Row: {
          created_at: string | null
          id: string
          theme_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          theme_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          theme_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_affinities_theme_id_fkey"
            columns: ["theme_id"]
            isOneToOne: false
            referencedRelation: "themes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_notifications: {
        Row: {
          created_at: string | null
          hotel_id: string
          id: string
          is_active: boolean | null
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          hotel_id: string
          id?: string
          is_active?: boolean | null
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          hotel_id?: string
          id?: string
          is_active?: boolean | null
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string | null
          favorite_themes: string[] | null
          id: string
          language_preferences: string[] | null
          notification_bookings: boolean | null
          notification_messages: boolean | null
          notification_promotions: boolean | null
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
          notification_bookings?: boolean | null
          notification_messages?: boolean | null
          notification_promotions?: boolean | null
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
          notification_bookings?: boolean | null
          notification_messages?: boolean | null
          notification_promotions?: boolean | null
          preferred_countries?: string[] | null
          price_range_max?: number | null
          price_range_min?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_reports: {
        Row: {
          created_at: string | null
          hotel_id: string
          id: string
          reason: string
          reported_user_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          hotel_id: string
          id?: string
          reason: string
          reported_user_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          hotel_id?: string
          id?: string
          reason?: string
          reported_user_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_user_reports_hotel"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      user_rewards: {
        Row: {
          booking_id: string | null
          created_at: string
          id: string
          is_used: boolean | null
          quantity: number
          reward_type: string
          source: string
          updated_at: string
          used_at: string | null
          user_id: string
        }
        Insert: {
          booking_id?: string | null
          created_at?: string
          id?: string
          is_used?: boolean | null
          quantity?: number
          reward_type: string
          source: string
          updated_at?: string
          used_at?: string | null
          user_id: string
        }
        Update: {
          booking_id?: string | null
          created_at?: string
          id?: string
          is_used?: boolean | null
          quantity?: number
          reward_type?: string
          source?: string
          updated_at?: string
          used_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string | null
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string | null
          role: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string | null
          role?: string
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
      assign_dual_roles_to_user: {
        Args: { user_email: string }
        Returns: undefined
      }
      assign_user_role: {
        Args: { p_user_id: string; p_email: string; p_role: string }
        Returns: boolean
      }
      assign_user_role_clerk: {
        Args: { clerk_user_id: string; p_email: string; p_role: string }
        Returns: boolean
      }
      check_agent_hotel_eligibility: {
        Args: { p_hotel_id: string; p_agent_id: string }
        Returns: boolean
      }
      check_email_role_exists: {
        Args: { p_email: string }
        Returns: string
      }
      check_package_availability: {
        Args: { p_package_id: string; p_rooms_needed: number }
        Returns: boolean
      }
      check_package_availability_enhanced: {
        Args: { p_package_id: string; p_rooms_needed: number }
        Returns: boolean
      }
      check_rate_limit: {
        Args: {
          p_identifier: string
          p_action_type: string
          p_max_attempts?: number
          p_window_minutes?: number
        }
        Returns: boolean
      }
      create_password_reset_token: {
        Args: { p_email: string }
        Returns: string
      }
      generate_agent_code: {
        Args: { first_name: string; last_name: string }
        Returns: string
      }
      generate_association_code: {
        Args: { association_name: string }
        Returns: string
      }
      get_activities_with_counts: {
        Args: Record<PropertyKey, never>
        Returns: {
          activity_id: string
          activity_name: string
          hotel_count: number
        }[]
      }
      get_cities_by_country: {
        Args: { country_filter?: string }
        Returns: {
          city_name: string
          country_code: string
          hotel_count: number
        }[]
      }
      get_my_roles: {
        Args: Record<PropertyKey, never>
        Returns: {
          role: string
        }[]
      }
      get_price_distribution: {
        Args: Record<PropertyKey, never>
        Returns: {
          min_price: number
          max_price: number
          avg_price: number
          hotel_count: number
        }[]
      }
      get_themes_with_counts: {
        Args: Record<PropertyKey, never>
        Returns: {
          theme_id: string
          theme_name: string
          hotel_count: number
          level: number
        }[]
      }
      get_unique_countries: {
        Args: Record<PropertyKey, never>
        Returns: {
          country_code: string
          country_name: string
          hotel_count: number
        }[]
      }
      get_unique_property_styles: {
        Args: Record<PropertyKey, never>
        Returns: {
          property_style: string
          hotel_count: number
        }[]
      }
      get_unique_property_types: {
        Args: Record<PropertyKey, never>
        Returns: {
          property_type: string
          hotel_count: number
        }[]
      }
      has_role: {
        Args: { role_name: string }
        Returns: boolean
      }
      has_role_clerk: {
        Args: { clerk_user_id: string; role_name: string }
        Returns: boolean
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      is_admin_simple: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      reserve_package_rooms: {
        Args: { p_package_id: string; p_rooms_to_reserve: number }
        Returns: boolean
      }
      reserve_package_rooms_enhanced: {
        Args: { p_package_id: string; p_rooms_to_reserve: number }
        Returns: boolean
      }
      restore_package_availability: {
        Args: { p_package_id: string; p_rooms_to_restore: number }
        Returns: boolean
      }
      restore_package_availability_enhanced: {
        Args: { p_package_id: string; p_rooms_to_restore: number }
        Returns: boolean
      }
      validate_password_reset_token: {
        Args: { p_token: string }
        Returns: {
          user_id: string
          email: string
        }[]
      }
      validate_password_strength: {
        Args: { password: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
