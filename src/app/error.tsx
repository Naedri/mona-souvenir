"use client";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div>
      <p>{error.message}</p>

      <button onClick={reset}>Retry</button>
    </div>
  );
}
