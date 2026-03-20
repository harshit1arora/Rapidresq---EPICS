export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          ambulance_number: string | null
          completed_at: string | null
          created_at: string
          current_location: Json | null
          destination_address: string | null
          destination_location: Json
          distance: number | null
          driver_name: string | null
          driver_phone: string | null
          estimated_time: number | null
          id: string
          pickup_address: string | null
          pickup_location: Json
          status: Database["public"]["Enums"]["booking_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          ambulance_number?: string | null
          completed_at?: string | null
          created_at?: string
          current_location?: Json | null
          destination_address?: string | null
          destination_location: Json
          distance?: number | null
          driver_name?: string | null
          driver_phone?: string | null
          estimated_time?: number | null
          id?: string
          pickup_address?: string | null
          pickup_location: Json
          status?: Database["public"]["Enums"]["booking_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          ambulance_number?: string | null
          completed_at?: string | null
          created_at?: string
          current_location?: Json | null
          destination_address?: string | null
          destination_location?: Json
          distance?: number | null
          driver_name?: string | null
          driver_phone?: string | null
          estimated_time?: number | null
          id?: string
          pickup_address?: string | null
          pickup_location?: Json
          status?: Database["public"]["Enums"]["booking_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      doctors: {
        Row: {
          available: boolean | null
          avatar_url: string | null
          consultation_fee: number
          created_at: string
          experience_years: number
          id: string
          languages: string[] | null
          name: string
          rating: number | null
          specialization: string
        }
        Insert: {
          available?: boolean | null
          avatar_url?: string | null
          consultation_fee?: number
          created_at?: string
          experience_years?: number
          id?: string
          languages?: string[] | null
          name: string
          rating?: number | null
          specialization: string
        }
        Update: {
          available?: boolean | null
          avatar_url?: string | null
          consultation_fee?: number
          created_at?: string
          experience_years?: number
          id?: string
          languages?: string[] | null
          name?: string
          rating?: number | null
          specialization?: string
        }
        Relationships: []
      }
      health_cards: {
        Row: {
          card_name: string
          card_number: string
          card_type: string
          created_at: string
          id: string
          is_active: boolean | null
          metadata: Json | null
          provider_name: string | null
          updated_at: string
          user_id: string
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          card_name: string
          card_number: string
          card_type: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          provider_name?: string | null
          updated_at?: string
          user_id: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          card_name?: string
          card_number?: string
          card_type?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          provider_name?: string | null
          updated_at?: string
          user_id?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      prescription_medicines: {
        Row: {
          created_at: string
          dosage: string
          duration: string
          frequency: string
          id: string
          instructions: string | null
          medicine_name: string
          prescription_id: string
        }
        Insert: {
          created_at?: string
          dosage: string
          duration: string
          frequency: string
          id?: string
          instructions?: string | null
          medicine_name: string
          prescription_id: string
        }
        Update: {
          created_at?: string
          dosage?: string
          duration?: string
          frequency?: string
          id?: string
          instructions?: string | null
          medicine_name?: string
          prescription_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prescription_medicines_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      prescriptions: {
        Row: {
          consultation_id: string | null
          created_at: string
          diagnosis: string
          doctor_id: string | null
          id: string
          notes: string | null
          patient_age: number | null
          patient_id: string
          patient_name: string
          updated_at: string
        }
        Insert: {
          consultation_id?: string | null
          created_at?: string
          diagnosis: string
          doctor_id?: string | null
          id?: string
          notes?: string | null
          patient_age?: number | null
          patient_id: string
          patient_name: string
          updated_at?: string
        }
        Update: {
          consultation_id?: string | null
          created_at?: string
          diagnosis?: string
          doctor_id?: string | null
          id?: string
          notes?: string | null
          patient_age?: number | null
          patient_id?: string
          patient_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "video_consultations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          ambulance_number: string | null
          blood_group: string | null
          created_at: string
          current_location: Json | null
          emergency_contact: string | null
          full_name: string | null
          id: string
          is_online: boolean | null
          phone: string | null
          role: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          ambulance_number?: string | null
          blood_group?: string | null
          created_at?: string
          current_location?: Json | null
          emergency_contact?: string | null
          full_name?: string | null
          id?: string
          is_online?: boolean | null
          phone?: string | null
          role?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          ambulance_number?: string | null
          blood_group?: string | null
          created_at?: string
          current_location?: Json | null
          emergency_contact?: string | null
          full_name?: string | null
          id?: string
          is_online?: boolean | null
          phone?: string | null
          role?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      uploaded_prescriptions: {
        Row: {
          created_at: string
          description: string | null
          doctor_name: string | null
          file_name: string
          file_url: string
          id: string
          is_active: boolean | null
          prescription_date: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          doctor_name?: string | null
          file_name: string
          file_url: string
          id?: string
          is_active?: boolean | null
          prescription_date?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          doctor_name?: string | null
          file_name?: string
          file_url?: string
          id?: string
          is_active?: boolean | null
          prescription_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_medicines: {
        Row: {
          created_at: string
          dosage: string | null
          frequency: string | null
          id: string
          is_active: boolean | null
          medicine_name: string
          notes: string | null
          reminder_time: string | null
          started_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          dosage?: string | null
          frequency?: string | null
          id?: string
          is_active?: boolean | null
          medicine_name: string
          notes?: string | null
          reminder_time?: string | null
          started_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          dosage?: string | null
          frequency?: string | null
          id?: string
          is_active?: boolean | null
          medicine_name?: string
          notes?: string | null
          reminder_time?: string | null
          started_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      video_consultations: {
        Row: {
          amount: number
          created_at: string
          doctor_id: string | null
          duration_minutes: number | null
          id: string
          notes: string | null
          payment_status: string | null
          scheduled_at: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          doctor_id?: string | null
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          payment_status?: string | null
          scheduled_at: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          doctor_id?: string | null
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          payment_status?: string | null
          scheduled_at?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_consultations_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "operator" | "admin" | "user"
      booking_status: "pending" | "active" | "completed" | "cancelled"
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
      app_role: ["operator", "admin", "user"],
      booking_status: ["pending", "active", "completed", "cancelled"],
    },
  },
} as const
