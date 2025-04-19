
import { RoomType as BaseRoomType } from "../rooms/roomTypes/useRoomTypes";

export type { BaseRoomType as RoomType };

export interface FormRoomType {
  name: string;
  description: string;
  maxOccupancy: number;
  baseRate: number;
  size: number;
  roomCount: number;
  rates: Record<number, number>;
  images: string[];
}
