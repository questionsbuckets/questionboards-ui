"use client";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import { fetcher } from "@/lib/fetch";
import {
  AlertCircle,
  Cloud,
  File,
  Image,
  Loader2,
  Upload,
  Video,
  X,
  Zap,
} from "lucide-react";

import { useFormikContext, getIn } from "formik";
import CustomImage from "./CustomImage";
import CustomVideo from "./CustomVideo";
import { CloudDownloadIcon } from "@/utils/svgs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useHandleImageUpload, useHandleImageRemoval } from "@/hooks/queries/useHandleImageUploadAndRemoval";

// Local dialog/error controller
const useUploadUi = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return { isOpen, open, close, error, setError };
};

interface FormFileUploadProps {
  name: string;
  label: string;
  accept: string;
  type?: "image" | "video" | "file";
  className?: string;
  folder?: string;
  autoUpload?: boolean;
}

export const FormFileUpload = ({
  name,
  label,
  accept,
  type = "file",
  className,
  folder = "uploads",
  autoUpload = true,
}: FormFileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { values, setFieldValue, errors, touched } = useFormikContext<any>();
  const { mutateAsync: uploadImage, isPending: isUploading } = useHandleImageUpload();
  const { mutateAsync: removeImage, isPending: isRemoving } = useHandleImageRemoval();
  const { isOpen, open, close, error, setError } = useUploadUi();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const fieldValue = getIn(values, name);
  const getImageUrl = () => {
    const val = fieldValue;
    if (typeof val === "string") return val;
    return val?.url || val?.uploadedImageUrl || val?.imageUrl || "";
  };

  const handleFileSelect = async (file: File) => {
    if (autoUpload) {
      try {
        open();
        const formData = new FormData();
        formData.append("image", file);
        const result = await uploadImage(formData as any);
        if (typeof result === "string") setFieldValue(name, result);
        else if (result?.uploadedImageUrl) setFieldValue(name, result.uploadedImageUrl);
        else if (result?.imageUrl) setFieldValue(name, result.imageUrl);
        else if (result?.url) setFieldValue(name, result.url);
        else setFieldValue(name, result);
        setError(null);
      } catch (err) {
        console.error("Upload failed:", err);
        const msg = err instanceof Error ? err.message : "Upload failed";
        setError(msg);
      } finally {
        close();
      }
    }
  };

  const clearFile = async () => {
    try {
      const imageUrl = getImageUrl();
      if (imageUrl) {
        await removeImage({ imageUrl });
      }
    } catch (_) {
      // ignore remove errors
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
      setFieldValue(name, null);
    }
  };

  const getIcon = () => {
    switch (type) {
      case "image":
        return <Image className="h-8 w-8 text-muted-foreground" />;
      case "video":
        return <Video className="h-8 w-8 text-muted-foreground" />;
      default:
        return <File className="h-8 w-8 text-muted-foreground" />;
    }
  };

  return (
    <div className={cn("relative flex flex-col h-full", className)}>
      <label className="font-semibold text-lg mb-1" >{label}</label>
      <div className="space-y-3 h-full">
        <div
          className={cn(
            "border-2 border-dashed h-28 rounded-xl text-center transition-all bg-background duration-300 cursor-pointer group relative overflow-hidden",
            isDragging
              ? "border-primary bg-primary/5 scale-105 shadow-lg"
              : getIn(errors, name) && getIn(touched, name)
              ? "border-red-500 bg-red-50"
              : "border-border hover:border-primary/50 hover:bg-gradient-to-br hover:from-primary/5 hover:to-transparent hover:shadow-md"
          )}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const files = e.dataTransfer.files;
            if (files.length > 0) handleFileSelect(files[0]);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragging(false);
          }}
          onClick={() => {
            // Only trigger file picker when no image is present
            if (!getImageUrl()) fileInputRef.current?.click();
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
            }}
          />

          {getImageUrl() ? (
            <div
              className="relative z-10 w-full h-full cursor-zoom-in"
              onClick={(e) => {
                // don't open preview when clicking remove button
                const target = e.target as HTMLElement;
                if (target.closest("button")) return;
                setIsPreviewOpen(true);
              }}
            >
              {type === "image" ? (
                <CustomImage
                  src={getImageUrl()}
                  alt="Uploaded preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : type === "video" ? (
                <CustomVideo
                  src={getImageUrl()}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="flex items-center gap-2">
                    {getIcon()}
                    <span className="text-sm">File uploaded</span>
                  </div>
                </div>
              )}
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={(e) => { e.stopPropagation(); clearFile(); }}
                className="absolute top-2 right-2 h-7 w-7 p-0 shadow-md hover:shadow-lg"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="relative z-10 bg-background flex flex-col items-center justify-center space-y-2 h-full">
              <div className="relative" />
              <div className="flex items-center justify-center gap-3">
                <CloudDownloadIcon/>
                <p className="font-medium text-foreground">Upload File</p>
              </div>
            </div>
          )}
        </div>

        <Dialog open={isOpen || isUploading || isRemoving}>
          <DialogContent showCloseButton={false} className="sm:max-w-[420px]">
            <DialogHeader>
              <DialogTitle>{isRemoving ? "Removing image" : "Uploading image"}</DialogTitle>
            </DialogHeader>
            <div className="flex items-center gap-3 py-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="text-sm text-foreground">{isRemoving ? "Please wait while we remove your file…" : "Please wait while we upload your file…"}</span>
            </div>
          </DialogContent>
        </Dialog>

        {/* Fullscreen image preview dialog */}
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="sm:max-w-3xl p-3">
            <DialogHeader>
              <DialogTitle>Preview</DialogTitle>
            </DialogHeader>
            <div className="max-h-[80vh] overflow-auto rounded-md">
              {type === "image" ? (
                <img
                  src={getImageUrl()}
                  alt="Preview"
                  className="w-full h-auto rounded-md"
                />
              ) : (
                <video
                  src={getImageUrl()}
                  controls
                  className="w-full h-auto rounded-md"
                />
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Preview is rendered inline within the drop zone now */}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium text-red-800">
                Upload failed
              </span>
            </div>
            <p className="text-xs text-red-600 mt-1">{error}</p>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setError(null)}
              className="h-6 px-2 text-xs text-red-600 hover:text-red-800 mt-2"
            >
              Retry
            </Button>
          </div>
        )}
      </div>

      {getIn(errors, name) && getIn(touched, name) && (
        <p className="text-red-500 text-sm mt-1">{String(getIn(errors, name))}</p>
      )}
    </div>
  );
};
