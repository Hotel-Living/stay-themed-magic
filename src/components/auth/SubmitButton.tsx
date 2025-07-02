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
  return <button type="submit" disabled={isLoading} className="w-full py-2 rounded-lg bg-primary text-primary-foreground font-medium transition-colors disabled:opacity-70 mt-3 text-base hover:bg-primary/90">
      {isLoading ? loadingText : text}
    </button>;
}