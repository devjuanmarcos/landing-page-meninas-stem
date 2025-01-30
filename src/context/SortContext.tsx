"use client";

import React, { createContext, useContext, useState, ReactNode, SetStateAction } from "react";

interface SortContextProps {
  sortValue: string;
  newSortValue: string;
  sortDirection: { [key: string]: "ASC" | "DESC" };
  newSortDirection: string;
  handleSortValue: (column: string) => void;
  deleteValues: () => void;
  pagination: {
    pageIndex: number;
    pageSize: number;
    totalItems?: number;
  };
  setPagination: React.Dispatch<
    React.SetStateAction<{
      pageIndex: number;
      pageSize: number;
    }>
  >;
  title: string;
  setTitle: React.Dispatch<SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<SetStateAction<string>>;
  startAndEndDate: {
    startDate: string;
    endDate: string;
  };
  setStartAndEndDate: React.Dispatch<
    SetStateAction<{
      startDate: string;
      endDate: string;
    }>
  >;
  resetPagination: () => void;
}

const SortContext = createContext<SortContextProps | undefined>(undefined);

export const SortProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sortValue, setSortValue] = useState<string>("");
  const [newSortValue, setNewSortValue] = useState<string>("");
  const [newSortDirection, setNewSortDirection] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<{
    [key: string]: "ASC" | "DESC";
  }>({});
  const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 8 });
  const [category, setCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const resetPagination = () => {
    setPagination({ pageIndex: 1, pageSize: 8 });
  };

  const [startAndEndDate, setStartAndEndDate] = useState<{
    startDate: string;
    endDate: string;
  }>({ startDate: "", endDate: "" });
  const handleSortValue = (column: string) => {
    const currentDirection = sortDirection[column];
    const newDirection = currentDirection === "ASC" ? "DESC" : "ASC";
    setSortDirection({ ...sortDirection, [column]: newDirection });
    setSortValue(`${column},${newDirection}`);
    setNewSortValue(`${column}`);
    setNewSortDirection(newDirection);
  };

  const deleteValues = () => {
    setSortValue("");
    setNewSortValue("");
    setNewSortDirection("");
    setTitle("");
    setStartAndEndDate({ startDate: "", endDate: "" });
  };

  return (
    <SortContext.Provider
      value={{
        sortValue,
        sortDirection,
        handleSortValue,
        deleteValues,
        newSortValue,
        newSortDirection,
        pagination,
        setPagination,
        resetPagination,
        category,
        setCategory,
        title,
        setTitle,
        startAndEndDate,
        setStartAndEndDate,
      }}
    >
      {children}
    </SortContext.Provider>
  );
};

export const useSort = () => {
  const context = useContext(SortContext);
  if (context === undefined) {
    throw new Error("useSort must be used within a SortProvider");
  }
  return context;
};
