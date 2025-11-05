"use client";
import { SearchInput } from "@/components/ui/common/CustomSearch";
import { DataTable } from "@/components/ui/common/CustomTable";
import { CustomButton } from "@/components/ui/common/CustomButton";
import { FilterIcon } from "@/utils/svgs";
import { Eye, Star } from "lucide-react";
import React, { useState } from "react";

// Type definition
type QuestionBoardDetail = {
  id: string;
  learnerName: string;
  learnerAvatar: string;
  startDate: string;
  status: string;
  score: string;
  stars: number;
};

// Sample data matching the image
const sampleData: QuestionBoardDetail[] = Array.from({ length: 10 }, (_, i) => ({
  id: "#1234",
  learnerName: "Learner Name",
  learnerAvatar: "L",
  startDate: "May 1, 2025",
  status: "Done",
  score: "85%",
  stars: 5,
}));

const QuestionBoardDetails = () => {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);

  // Column definitions matching the image
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      headerClassName: "text-gray-700 font-medium min-w-[80px]",
      cellClassName: "text-gray-900 font-medium min-w-[80px]",
    },
    {
      accessorKey: "learnerName",
      header: "Learner Name",
      headerClassName: "text-gray-700 font-medium min-w-[180px]",
      cellClassName: "min-w-[180px]",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white text-sm font-medium">
            {row.original.learnerAvatar}
          </div>
          <span className="text-gray-900">{row.original.learnerName}</span>
        </div>
      ),
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      headerClassName: "text-gray-700 font-medium min-w-[120px]",
      cellClassName: "text-gray-900 min-w-[120px]",
    },
    {
      accessorKey: "status",
      header: "Status",
      headerClassName: "text-gray-700 font-medium min-w-[100px]",
      cellClassName: "text-gray-900 min-w-[100px]",
    },
    {
      accessorKey: "score",
      header: "Score",
      headerClassName: "text-gray-700 font-medium min-w-[100px]",
      cellClassName: "text-gray-900 font-medium min-w-[100px]",
    },
    {
      accessorKey: "stars",
      header: "Stars",
      headerClassName: "text-gray-700 font-medium min-w-[140px]",
      cellClassName: "min-w-[140px]",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-1">
          {Array.from({ length: row.original.stars }).map((_, idx) => (
            <Star
              key={idx}
              className="w-5 h-5 fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Action",
      headerClassName: "text-gray-700 font-medium min-w-[80px]",
      cellClassName: "min-w-[80px]",
      cell: () => (
        <div className="flex items-center justify-center">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Eye className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      ),
    },
  ];

  const handleChangePage = (newPage: number) => {
    console.log("newPage", newPage);
    setPage(newPage);
  };

  return (
    <div className="bg-white h-full rounded-[14px] p-6 flex flex-col">
      <section className="flex justify-between flex-wrap gap-4 mb-6">
        <div className="text-2xl font-semibold text-gray-900">
          Question Board Details
        </div>

        <div className="flex gap-4 items-center">
          <SearchInput
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search Here"
          />

          <CustomButton
            label="Filter"
            className="h-12 px-9 text-lg font-semibold"
            startIcon={<FilterIcon />}
          />
        </div>
      </section>

      <div className="grow overflow-hidden">
        <DataTable
          columns={columns}
          data={sampleData}
          striped={true}
          headerBgClass="bg-teal-50"
          rowBgClass="bg-white"
          rowAltBgClass="bg-gray-50"
          page={page}
          handleChangePage={handleChangePage}
          total={100}
          limit={10}
        />
      </div>
    </div>
  );
};

export default QuestionBoardDetails;