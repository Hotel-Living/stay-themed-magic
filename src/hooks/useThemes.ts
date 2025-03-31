
import { useQuery } from "@tanstack/react-query";
import { Theme, allThemes } from "@/utils/themes";

// Function to get all themes
const getThemes = async (): Promise<Theme[]> => {
  // In a real application, this would be an API call
  // For now, we'll just return the static themes data
  return Promise.resolve(allThemes);
};

// Custom hook to fetch themes
export const useThemes = () => {
  return useQuery({
    queryKey: ['themes'],
    queryFn: getThemes,
    staleTime: Infinity, // Since this is static data, we can set a long staleTime
    initialData: allThemes // Provide initial data to avoid loading state
  });
};
