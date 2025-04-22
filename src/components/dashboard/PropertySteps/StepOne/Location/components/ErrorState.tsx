
interface ErrorStateProps {
  error: string;
}

export const ErrorState = ({ error }: ErrorStateProps) => (
  <div className="text-center text-red-500">
    <p>{error}</p>
  </div>
);
