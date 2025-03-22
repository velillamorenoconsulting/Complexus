"use client";
import { Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import CompLoading from "./CompLoading";
import useFileUpload from "./hooks/useFileUpload";

type Props = {
  uploadPreset: string;
  includeFolder?: boolean;
  currentImages: string[];
  imageSetter: (disp: string[]) => void;
};

export default function UploadWidget({
  uploadPreset,
  includeFolder,
  currentImages,
  imageSetter,
}: Props) {
  const [
    handleFileUpload,
    handleFileLoad,
    loading,
    isButtonDisabled,
    totalFiles,
    uploadedFiles,
  ] = useFileUpload(uploadPreset, includeFolder);
  const [deactivate, isDeactivated] = useState<boolean>(false);
  const [isCompleted, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (uploadedFiles.length && totalFiles === uploadedFiles.length) {
      setCompleted(true);
    }
    if (isCompleted) {
      imageSetter([...currentImages, ...uploadedFiles]);
    }
  }, [uploadedFiles, isCompleted]);

  return (
    <div className="w-full h-full font-raleway text-white flex flex-col gap-2 items-center justify-center relative">
      {loading && <CompLoading />}
      <p>Selecciona las imagenes que deseas subir</p>
      <Input
        type="file"
        className="dark font-raleway"
        onChange={handleFileLoad}
        multiple
        isDisabled={deactivate}
      />
      {uploadedFiles.length && uploadedFiles.length === totalFiles ? (
        <p className="text-sm text-green-500">Imagenes subidas exitosamente</p>
      ) : uploadedFiles.length ? (
        <p className="italic">Procesando imagenes...</p>
      ) : (
        <></>
      )}
      <Button
        onPress={() => {
          handleFileUpload();
          isDeactivated(true);
        }}
        isDisabled={isButtonDisabled}
        fullWidth
      >
        Subir
      </Button>
    </div>
  );
}
