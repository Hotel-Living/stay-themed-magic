
import { RoomType } from "../rooms/roomTypes/useRoomTypes";

export interface RoomTypeListProps {
  roomTypes: RoomType[];
  onRemoveRoomType: (id: string) => void;
}
