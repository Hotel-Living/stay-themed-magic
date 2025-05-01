// RUTA: src/components/dashboard/property/hooks/usePropertyUpdate.ts

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";

export function use
