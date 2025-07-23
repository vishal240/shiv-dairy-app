import { useState, useEffect, useCallback } from "react";

interface UseApiPaginationProps {
  apiCall: (
    page: number,
    limit: number,
    search: string,
    startDate: string,
    endDate: string,
    store_id: string
  ) => Promise<any>;
  itemsPerPage?: number;
  initialPage?: number;
  dependencies?: any[];
  store_id?: string;
}

interface UseApiPaginationReturn {
  data: any[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  loading: boolean;
  error: string | null;
  goToSearch: (search: string) => void;
  goToDateSearch: (startDate: string, endDate: string) => void;
  goToPage: (page: number) => void;
  refresh: () => void;
}

export const useApiPagination = ({
  apiCall,
  itemsPerPage = 10,
  initialPage = 1,
  dependencies = [],
  store_id = "",
}: UseApiPaginationProps): UseApiPaginationReturn => {
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (
      page: number,
      limit: number,
      search: string,
      startDate: string,
      endDate: string,
      store_id: string
    ) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiCall(
          page,
          limit,
          search,
          startDate,
          endDate,
          store_id
        );
        const responseData = response.data || response;
        // console.log(response);
        setData(responseData.list || []);
        setTotalItems(responseData.pagination.total);
        setTotalPages(responseData.pagination.totalPages);
        setCurrentPage(page);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching data");
        console.error("API Pagination Error:", err);
      } finally {
        setLoading(false);
      }
    },
    [itemsPerPage, store_id]
  );

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages && page !== currentPage && !loading) {
        fetchData(page, itemsPerPage, "", "", "", store_id);
      }
    },
    [fetchData, totalPages, currentPage, loading]
  );

  const refresh = useCallback(() => {
    fetchData(currentPage, itemsPerPage, "", "", "", store_id);
  }, [fetchData, currentPage]);

  const goToSearch = useCallback(
    (search: string) => {
      fetchData(1, itemsPerPage, search, "", "", store_id);
    },
    [fetchData]
  );

  const goToDateSearch = useCallback(
    (startDate: string, endDate: string) => {
      fetchData(1, itemsPerPage, "", startDate, endDate, store_id);
    },
    [fetchData]
  );

  // Initial load and dependency changes
  useEffect(() => {
    fetchData(initialPage, itemsPerPage, "", "", "", store_id);
  }, [fetchData, initialPage, ...dependencies]);

  return {
    data,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    loading,
    error,
    goToPage,
    refresh,
    goToSearch,
    goToDateSearch,
  };
};
