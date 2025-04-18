
import React from "react";
import RoomTypeContent from "./RoomTypeContent";
import CollapsibleRoomTypeSection from "./CollapsibleRoomTypeSection";
import { useRoomTypeSection, RoomType as SectionRoomType } from "./useRoomTypeSection";
import { RoomType as ContentRoomType } from "./useRoomTypes"; // Renamed import to avoid conflict

interface RoomTypeSectionProps {
  onValidationChange: (isValid: boolean) => void;
  title?: string;
  fullWidth?: boolean;
  showHeader?: boolean;
}

export default function RoomTypeSection({ 
  onValidationChange,
  title = "ROOM TYPES",
  fullWidth = false,
  showHeader = true
}: RoomTypeSectionProps) {
  const {
    selectedUnit,
    roomTypes,
    dialogOpen,
    selectedStayLengths,
    setDialogOpen,
    handleAddRoomType,
    handleDeleteRoomType,
    setSelectedStayLengths
  } = useRoomTypeSection(onValidationChange);

  // We need to convert the room types to the format expected by RoomTypeContent
  // This is a temporary solution until we can unify the interfaces
  const convertedRoomTypes = roomTypes.map(rt => ({
    ...rt,
    size: rt.size || 0,
    baseRate: rt.baseRate || 0,
    images: rt.images || [], // Ensure images is always an array
  })) as unknown as ContentRoomType[];

  // Convert the handler function to accept the expected type
  const handleAddRoomTypeConverted = (roomType: ContentRoomType) => {
    // Convert ContentRoomType to SectionRoomType
    const convertedRoomType: SectionRoomType = {
      ...roomType,
      images: roomType.images || [], // Ensure images is always an array
      amenities: roomType.amenities || [], // Use amenities from roomType if available, otherwise empty array
    };
    handleAddRoomType(convertedRoomType);
  };

  const mainContent = (
    <RoomTypeContent
      roomTypes={convertedRoomTypes}
      selectedStayLengths={selectedStayLengths}
      selectedUnit={selectedUnit}
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      handleAddRoomType={handleAddRoomTypeConverted}
      handleDeleteRoomType={handleDeleteRoomType}
    />
  );

  if (!showHeader) {
    return <div className={`${fullWidth ? "w-full" : ""}`}>{mainContent}</div>;
  }

  return (
    <div className={`${fullWidth ? "w-full" : ""}`}>
      <CollapsibleRoomTypeSection title={title}>
        {mainContent}
      </CollapsibleRoomTypeSection>
    </div>
  );
}
