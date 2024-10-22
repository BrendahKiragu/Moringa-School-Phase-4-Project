import { useState, useCallback } from "react";

import { postTransactions } from "../api";
import { showErrorToast, showSuccessToast } from "../utils";

const useCreateTransaction = () => {
  const [transaction, setTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createTransaction = useCallback(async (userData) => {
    setError(null);
    setIsLoading(true);

    try {
      const serverData = await postTransactions(userData);
      setTransaction(serverData);
      showSuccessToast("Successfully bought book");
    } catch (error) {
      setError(error);
      showErrorToast(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { createTransaction, transaction, isLoading, error };
};

export { useCreateTransaction };