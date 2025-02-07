import * as React from "react";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Id } from "../../convex/_generated/dataModel";
import { useOptimisticRemoveFile } from "../hooks/useOptimisticFiles";
import { DeleteFileDialog } from "./DeleteFileDialog";

type FileTooltipProps = {
  fileId: Id<"files">;
  name: string;
  size: number;
  type: string;
  onDelete?: () => void;
};

export const FileTooltip: React.FC<FileTooltipProps> = ({
  fileId,
  size,
  type,
  onDelete,
}) => {
  const removeFile = useOptimisticRemoveFile();
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  const handleDelete = () => {
    removeFile({ ids: [fileId] });
    setShowDeleteDialog(false);
    onDelete?.();
  };

  return (
    <>
      <div className="absolute left-1/2 -translate-x-1/2 -top-1 -translate-y-full pointer-events-auto flex flex-col items-center animate-popIn">
        <div className="bg-white rounded-lg shadow-lg p-3 border text-sm w-[200px]">
          <div className="flex flex-col">
            <div className="text-xs font-medium text-gray-500 mb-1">
              PROPERTIES
            </div>
            <div className="text-gray-600">
              Size: {(size / 1024).toFixed(1)} KB
            </div>
            <div className="text-gray-600">Type: {type || "Unknown"}</div>
            <div className=" bg-gray-200 -mx-3 my-2" />
            <div className="-mx-3 -mb-3 p-2 bg-gray-50 rounded-b-lg">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteDialog(true);
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
        {/* Triangle pointer */}
        <div
          className="w-0 h-0"
          style={{
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "8px solid white",
          }}
        />
      </div>

      <DeleteFileDialog
        fileCount={1}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
      />
    </>
  );
};
