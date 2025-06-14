
import { ReactNode } from "react";

export interface DashboardTab {
  id: string;
  label: string | ReactNode;
  icon: ReactNode;
}
