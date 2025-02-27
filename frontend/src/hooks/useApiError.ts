import { useState } from "react";
import { AxiosError } from "axios";

export const useApiError = () => {
  const [error, setError] = useState<string | null>(null);

  const handleError = (error: unknown) => {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.error || error.message;
      setError(message);
    } else {
      setError("An unexpected error occurred");
    }
  };

  const clearError = () => setError(null);

  return { error, handleError, clearError };
};
