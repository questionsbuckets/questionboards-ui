"use client";
import { CustomButton } from "@/components/ui/common/CustomButton";
import { SearchInput } from "@/components/ui/common/CustomSearch";
import { DataTable } from "@/components/ui/common/CustomTable";
import { FilterIcon } from "@/utils/svgs";
import { Archive, Copy, Edit, Eye, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetAllQuestionBoards } from "@/hooks/queries/useGetAllQuestionBoards";
import { format } from "date-fns";
import { useDeleteQuestionBoard } from "@/hooks/mutations/useUpdateQuestionBoard";
import { useQueryClient } from "@tanstack/react-query";
import { DeleteConfirmationDialog } from "@/components/ui/common/DeleteConfirmationDialog";

const ManageQuestionBoards = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "approve" | "publish" | "published"
  >("approve");
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { mutate: deleteQB, isPending: isDeleting } = useDeleteQuestionBoard();

  console.log("searchValue", searchValue);

  const { data, isLoading, error } = useGetAllQuestionBoards({
    page,
    limit: 10,
    searchQuery: searchValue,
  });

  const dataArray = data?.data?.data;

  const tabs = [
    { id: "approve", label: "Approve QB’s" },
    { id: "publish", label: "Publish QB’s" },
    { id: "published", label: "Published QB’s" },
  ] as const;

  // Column definitions with ColumnDefWithClass type
  const columns = [
    {
      id: "index",
      header: "ID",
      headerClassName: "text-white font-semibold min-w-[80px]",
      cell: ({ row }: any) => (
        <span className="text-primary-text font-medium min-w-[80px]">
          #{row.index + 1}
        </span>
      ),
    },
    {
      accessorKey: "questionBoardTitle",
      header: "Question Board Name",
      headerClassName: "text-white font-semibold min-w-[150px]",
      cellClassName: "text-primary-text min-w-[150px]",
    },
    {
      accessorKey: "type",
      header: "Type",
      headerClassName: "text-white font-semibold min-w-[80px]",
      cellClassName: "min-w-[80px]",
      cell: ({ row }: any) => (
        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
          {row?.original?.type}
        </span>
      ),
    },
    {
      accessorKey: "userDetails.firstName",
      header: "Created By",
      headerClassName: "text-white font-semibold min-w-[120px]",
      cellClassName: "text-primary-text min-w-[120px]",
      cell: ({ row }: any) => {
        const firstName = row.original?.userDetails?.firstName;
        const lastName = row.original?.userDetails?.lastName;

        // If either is missing or empty, show "admin"
        if (!firstName || !lastName) return "admin";

        return `${firstName} ${lastName}`;
      },
    },

    {
      accessorKey: "role",
      header: "Source",
      headerClassName: "text-white font-semibold min-w-[100px]",
      cellClassName: "text-primary-text min-w-[100px]",
    },
    {
      accessorKey: "learners",
      header: "Learners",
      headerClassName: "text-white font-semibold min-w-[100px]",
      cellClassName: "min-w-[100px]",
      cell: ({ row }: any) => (
        <div className="flex -space-x-2">
          {row?.original?.learners?.map((learner: any, idx: number) => (
            <div
              key={idx}
              className={`w-8 h-8 rounded-full ${learner?.color} flex items-center justify-center text-white text-sm font-medium border-2 border-white`}
            >
              {learner?.initial}
            </div>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "grade",
      header: "Grade",
      headerClassName: "text-white font-semibold min-w-[100px]",
      cellClassName: "text-primary-text min-w-[100px]",
    },
    {
      accessorKey: "subject",
      header: "Subject",
      headerClassName: "text-white font-semibold min-w-[120px]",
      cellClassName: "text-primary-text min-w-[120px]",
    },
    {
      accessorKey: "topicName",
      header: "Topic",
      headerClassName: "text-white font-semibold min-w-[120px]",
      cellClassName: "text-primary-text min-w-[120px]",
    },
    {
      accessorKey: "subTopicName",
      header: "Subtopic",
      headerClassName: "text-white font-semibold min-w-[120px]",
      cellClassName: "text-primary-text min-w-[120px]",
    },
    {
      accessorKey: "createdDate",
      header: "Created Date",
      headerClassName: "text-white font-semibold min-w-[120px]",
      cellClassName: "text-primary-text min-w-[120px]",
      cell: ({ row }: any) => {
        const date = row?.original?.createdAt;
        if (!date) return "-";
        return format(new Date(date), "MMMM d, yyyy"); // e.g., May 1, 2025
      },
    },
    {
      id: "actions",
      header: "Action",
      headerClassName: "text-white font-semibold min-w-[140px]",
      cellClassName: "min-w-[140px]",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full  hover:bg-gray-100 cursor-pointer h-[30px] w-[30px] border border-background flex items-center justify-center transition-colors">
            <Eye className="w-4 h-4 text-gray-600" />
          </div>
          <div
            onClick={() => {
              router.push(
                "/admin/manage-question-boards/edit-question-board?questionBoardId=" +
                  row?.original?._id
              );
            }}
            className="p-2 rounded-full  hover:bg-gray-100 cursor-pointer h-[30px] w-[30px] border border-background flex items-center justify-center transition-colors"
          >
            <Edit className="w-4 h-4 text-gray-600" />
          </div>
          <div className="p-2 rounded-full  hover:bg-gray-100 cursor-pointer h-[30px] w-[30px] border border-background flex items-center justify-center transition-colors">
            <Archive className="w-4 h-4 text-gray-600" />
          </div>
          <div
            onClick={() => {
              setDeleteTargetId(row?.original?._id);
              setIsDeleteOpen(true);
            }}
            className="p-2 rounded-full  hover:bg-gray-100 cursor-pointer h-[30px] w-[30px] border border-background flex items-center justify-center transition-colors"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </div>
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
      <section className="flex justify-between flex-wrap gap-4 mb-4">
        <div className="flex rounded-[100px] p-1 border h-14">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-center px-3  rounded-[100px] w-[189px]  cursor-pointer font-semibold text-lg transition-colors duration-200
                ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground "
                    : "bg-white text-primary-text"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex gap-4 items-center">
          <SearchInput
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search Here"
          />

          <CustomButton
            label="Add Question Board"
            className="h-12 text-lg px-9 font-semibold"
            startIcon={<Plus />}
            onClick={() =>
              router.push("/admin/manage-question-boards/add-question-board")
            }
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
          data={dataArray || []}
          striped={true}
          headerBgClass="bg-primary"
          rowBgClass="bg-white"
          rowAltBgClass="bg-[#F6FAFE]"
          page={page}
          handleChangePage={handleChangePage}
          total={100}
          limit={10}
        />
      </div>

      <DeleteConfirmationDialog
        open={isDeleteOpen}
        title="Delete question board?"
        description="This action cannot be undone. Do you want to delete this question board?"
        loading={isDeleting}
        onCancel={() => {
          setIsDeleteOpen(false);
          setDeleteTargetId(null);
        }}
        onConfirm={() => {
          if (!deleteTargetId) return;
          deleteQB(
            { questionBoardId: deleteTargetId },
            {
              onSuccess: () => {
                setIsDeleteOpen(false);
                setDeleteTargetId(null);
                queryClient.invalidateQueries({
                  queryKey: ["allQuestionBoards"],
                });
              },
            }
          );
        }}
      />
    </div>
  );
};

export default ManageQuestionBoards;
