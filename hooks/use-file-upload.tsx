// hooks/use-file-upload.ts

import { useState, useRef, useCallback } from 'react';

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
  preview: string;
  url?: string;
}

interface FileUploadOptions {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  initialFiles?: UploadedFile[];
}

export function useFileUpload(options: FileUploadOptions) {
  const {
    accept = 'image/*',
    multiple = false,
    maxSize = Infinity,
    maxFiles = Infinity,
    initialFiles = [],
  } = options;

  const [files, setFiles] = useState<UploadedFile[]>(initialFiles);
  const [errors, setErrors] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const clearFiles = () => {
    setFiles([]);
    setErrors([]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const validateAndSetFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const newFiles: UploadedFile[] = [];
    const newErrors: string[] = [];

    Array.from(fileList).forEach((file) => {
      if (file.size > maxSize) {
        newErrors.push(`${file.name} est trop volumineux.`);
        return;
      }

      const id = `${file.name}-${Date.now()}`;
      const preview = URL.createObjectURL(file);

      newFiles.push({
        id,
        name: file.name,
        size: file.size,
        type: file.type,
        file,
        preview,
      });
    });

    const totalFiles = [...files, ...newFiles];

    if (totalFiles.length > maxFiles) {
      newErrors.push(`Vous ne pouvez envoyer que ${maxFiles} fichiers.`);
    } else {
      setFiles(totalFiles);
    }

    setErrors(newErrors);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    validateAndSetFiles(e.dataTransfer.files);
  };

  const getInputProps = () => ({
    type: 'file',
    accept,
    multiple,
    ref: inputRef,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      validateAndSetFiles(e.target.files),
  });

  return [
    { files, errors, isDragging },
    {
      openFileDialog,
      clearFiles,
      removeFile,
      handleDrop,
      handleDragEnter: () => setIsDragging(true),
      handleDragLeave: () => setIsDragging(false),
      handleDragOver: (e: React.DragEvent) => e.preventDefault(),
      getInputProps,
    },
  ] as const;
}
