
interface SubmitButtonProps {
  isLoading: boolean;
  loadingText: string;
  text: string;
}

export function SubmitButton({ isLoading, loadingText, text }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full py-2 text-sm rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-colors disabled:opacity-70 mt-3"
    >
      {isLoading ? loadingText : text}
    </button>
  );
}
