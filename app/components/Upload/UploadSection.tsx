import { UploadIcon, XIcon, ImageIcon, AlertCircleIcon } from 'lucide-react';
import { formatBytes, useFileUpload } from '@/hooks/use-file-upload';
import { Button } from '@/components/ui/button';
type UploadSectionProps = {
  title: string;
  uploadState: ReturnType<typeof useFileUpload>[0];
  actions: ReturnType<typeof useFileUpload>[1];
  maxSizeMB: number;
};

export default function UploadSection({
  title,
  uploadState,
  actions,
  maxSizeMB,
}: UploadSectionProps) {
  const { files, isDragging, errors } = uploadState;
  const {
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    openFileDialog,
    removeFile,
    clearFiles,
    getInputProps,
  } = actions;

  return (
    <div>
      <p className="font-semibold mb-2 text-center">{title}</p>
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        data-files={files.length > 0 || undefined}
        className="border-input data-[dragging=true]:bg-accent/50 bg-white has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-3xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]"
      >
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload files"
        />
        <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
          <div className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border">
            <ImageIcon className="size-4 opacity-60" />
          </div>
          <p className="mb-1.5 text-sm font-medium">Déposez vos fichiers ici</p>
          <p className="text-muted-foreground text-xs">(max. {maxSizeMB}MB)</p>
          <Button
            variant="outline"
            type="button"
            className="mt-4 p-6 px-8 bg-white/20 rounded-3xl"
            onClick={openFileDialog}
          >
            <UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
            Sélectionner les fichiers
          </Button>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="text-destructive flex items-center gap-1 text-xs mt-2">
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2 mt-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="bg-white flex items-center justify-between gap-2 rounded-3xl border p-2 pe-3"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="bg-accent aspect-square shrink-0 rounded">
                  <img
                    src={file.preview}
                    alt={file.file.name}
                    className="size-10 rounded-2xl object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="truncate text-[13px] font-medium">
                    {file.file.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {formatBytes(file.file.size)}
                  </p>
                </div>
              </div>

              <Button
                size="icon"
                type="button"
                variant="ghost"
                className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
                onClick={() => removeFile(file.id)}
                aria-label="Supprimer le fichier"
              >
                <XIcon aria-hidden="true" />
              </Button>
            </div>
          ))}
          {files.length > 1 && (
            <Button
              size="sm"
              type="button"
              variant="outline"
              onClick={clearFiles}
            >
              Supprimer tous les fichiers
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
