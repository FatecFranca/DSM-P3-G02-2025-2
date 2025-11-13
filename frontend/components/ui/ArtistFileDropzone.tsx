import React, { useCallback, useRef, useState } from 'react';
import { UploadCloud, X } from 'lucide-react';

interface DropzoneProps {
  title: string;
  description?: string;
  multiple?: boolean;
  accept?: string;
  maxFiles?: number;
  onFilesChange?: (files: File[]) => void;
}

const ArtistFileDropzone: React.FC<DropzoneProps> = ({
  title,
  description,
  multiple = true,
  accept = 'image/png,image/jpeg',
  maxFiles = 5,
  onFilesChange,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const emit = useCallback(
    (nextFiles: File[]) => {
      setFiles(nextFiles);
      onFilesChange?.(nextFiles);
    },
    [onFilesChange]
  );

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const list = Array.from(incoming);
    const merged = multiple ? [...files, ...list] : list.slice(0, 1);
    const limited = merged.slice(0, maxFiles);
    emit(limited);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleFiles(e.dataTransfer.files);
  };

  const onSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    // reset input to allow same file selection again
    if (inputRef.current) inputRef.current.value = '';
  };

  const removeFile = (index: number) => {
    const next = files.filter((_, i) => i !== index);
    emit(next);
  };

  return (
    <div>
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => e.preventDefault()}
        className="w-full h-full p-4 bg-white rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center"
      >
        <UploadCloud size={32} className="text-gray-400 mb-2" />
        <p className="text-sm font-semibold text-gray-700">{title}</p>
        {description && <p className="text-xs text-gray-500">{description}</p>}
        <div className="mt-2">
          <label className="text-xs text-blue-600 underline cursor-pointer">
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              multiple={multiple}
              onChange={onSelectFiles}
              className="hidden"
            />
            Selecionar arquivos
          </label>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-2 grid grid-cols-3 gap-2">
          {files.map((f, i) => {
            const url = URL.createObjectURL(f);
            return (
              <div key={i} className="relative bg-gray-100 rounded overflow-hidden">
                <img src={url} alt={f.name} className="w-full h-24 object-cover" />
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                >
                  <X size={14} />
                </button>
                <p className="text-xs p-1 truncate">{f.name}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ArtistFileDropzone;