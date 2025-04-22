
interface ErrorStateProps {
  error: string;
}

export const ErrorState = ({ error }: ErrorStateProps) => (
  <div className="text-center p-4">
    <div className="bg-red-100/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
      <span className="text-red-500 text-3xl">!</span>
    </div>
    <h3 className="text-xl font-semibold mb-2">Oops! Something went wrong.</h3>
    <p className="text-red-400">{error}</p>
    <p className="text-sm text-white/60 mt-2">See the JavaScript console for technical details.</p>
  </div>
);
