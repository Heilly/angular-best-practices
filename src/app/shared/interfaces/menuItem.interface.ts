import { Roles } from "../../auth/interfaces";

export interface MenuItem {
    name: string,
    router: string,
    icon: string,
    color?: string, 
    description?: string,
    roles?: string[]
  }
  