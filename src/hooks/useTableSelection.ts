import { useState, useCallback } from 'react';

interface UseTableSelectionReturn {
  selectedRows: (string | number)[];
  isRowSelected: (rowId: string | number) => boolean;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  selectRow: (rowId: string | number) => void;
  selectAll: (rowIds: (string | number)[]) => void;
  deselectAll: () => void;
  toggleSelectAll: (rowIds: (string | number)[]) => void;
  getSelectedCount: () => number;
}

export const useTableSelection = (): UseTableSelectionReturn => {
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);

  const isRowSelected = useCallback((rowId: string | number) => {
    return selectedRows.includes(rowId);
  }, [selectedRows]);

  const selectRow = useCallback((rowId: string | number) => {
    setSelectedRows(prev => {
      if (prev.includes(rowId)) {
        return prev.filter(id => id !== rowId);
      } else {
        return [...prev, rowId];
      }
    });
  }, []);

  const selectAll = useCallback((rowIds: (string | number)[]) => {
    setSelectedRows(rowIds);
  }, []);

  const deselectAll = useCallback(() => {
    setSelectedRows([]);
  }, []);

  const toggleSelectAll = useCallback((rowIds: (string | number)[]) => {
    setSelectedRows(prev => {
      if (prev.length === rowIds.length) {
        return [];
      } else {
        return rowIds;
      }
    });
  }, []);

  const getSelectedCount = useCallback(() => {
    return selectedRows.length;
  }, [selectedRows]);

  const isAllSelected = useCallback((totalRows: number) => {
    return totalRows > 0 && selectedRows.length === totalRows;
  }, [selectedRows]);

  const isIndeterminate = useCallback((totalRows: number) => {
    return selectedRows.length > 0 && selectedRows.length < totalRows;
  }, [selectedRows]);

  return {
    selectedRows,
    isRowSelected,
    isAllSelected: isAllSelected(selectedRows.length),
    isIndeterminate: isIndeterminate(selectedRows.length),
    selectRow,
    selectAll,
    deselectAll,
    toggleSelectAll,
    getSelectedCount
  };
};