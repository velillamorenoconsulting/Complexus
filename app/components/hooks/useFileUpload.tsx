"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;

export default function useFileUpload(
  uploadPreset: string,
  includeFolder: boolean = false,
): [
  () => Promise<void>,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  boolean,
  boolean,
  number,
  string[],
] {
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [loading, isLoading] = useState<boolean>(false);
  const isButtonDisabled = files ? !files.length : true;
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const handleFileLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setFiles(files);
    setTotalFiles(files.length);
  };

  useEffect(() => {
    return () => setUploadedFiles([]);
  }, []);

  const handleFileUpload = async () => {
    if (!files) return;
    isLoading(true);
    const passUploadedFiles: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", uploadPreset);
      data.append("cloud_name", cloudName!);
      try {
        const { data: imageInfo } = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          data,
        );
        passUploadedFiles.push(
          `v${imageInfo.version}/${includeFolder ? `${imageInfo.asset_folder}/` : ""}${imageInfo.display_name}.${imageInfo.format}`,
        );
      } catch (e) {
        console.log(e);
      } finally {
        isLoading(false);
        setFiles(null);
        setUploadedFiles([...uploadedFiles, ...passUploadedFiles]);
      }
    }
  };

  return [
    handleFileUpload,
    handleFileLoad,
    loading,
    isButtonDisabled,
    totalFiles,
    uploadedFiles,
  ];
}
