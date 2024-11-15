"use client";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CompLoading from "./CompLoading";
import useFileUpload from "./hooks/useFileUpload";

type Props = {
  uploadPreset: string;
  includeFolder?: boolean;
  imageSetter: (disp: string[]) => void;
};

export default function UploadWidget({
  uploadPreset,
  includeFolder,
  imageSetter,
}: Props) {
  const [
    handleFileUpload,
    handleFileLoad,
    loading,
    isButtonDisabled,
    uploadedFiles,
  ] = useFileUpload(uploadPreset, includeFolder);
  const [deactivate, isDeactivated] = useState<boolean>(false);
  useEffect(() => {
    imageSetter(uploadedFiles);
  }, [uploadedFiles]);

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
      {uploadedFiles.length ? (
        <p className="text-sm text-green-500">Imagenes subidas exitosamente</p>
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
