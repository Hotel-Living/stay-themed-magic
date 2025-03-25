
interface CompareErrorProps {
  message: string;
}

export function CompareError({ message }: CompareErrorProps) {
  return (
    <div className="glass-card rounded-xl p-6 mb-6 text-red-400">
      {message}
    </div>
  );
}
