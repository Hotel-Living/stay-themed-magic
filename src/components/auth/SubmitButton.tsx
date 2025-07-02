interface SubmitButtonProps {
  isLoading: boolean;
  loadingText: string;
  text: string;
}
export function SubmitButton({
  isLoading,
  loadingText,
  text
}: SubmitButtonProps) {
  return <button type="submit" disabled={isLoading} className="w-full py-2 rounded-lg text-white font-medium transition-colors disabled:opacity-70 mt-3 bg-[#5d0083] text-base">
      {isLoading ? loadingText : text}
    </button>;
}