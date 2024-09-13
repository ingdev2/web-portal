import { useUploadFileMutation } from "@/redux/apis/upload_view_files/uploadViewFilesApi";

export const useProcessAndUploadFiles = () => {
  const [uploadFileToS3, { data, isLoading, isSuccess, isError, error }] =
    useUploadFileMutation({
      fixedCacheKey: "uploadFileToS3Data",
    });

  const uploadFiles = async (
    files: Array<Express.Multer.File>
  ): Promise<{ success: string[]; error: string | null }> => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append(
        "files",
        new Blob([file.buffer], { type: file.mimetype }),
        file.originalname
      );
    });

    try {
      let s3Response: any = await uploadFileToS3(formData);

      if (s3Response.error) {
        const errorMessage = s3Response.error?.data?.message;
        return {
          success: [],
          error: Array.isArray(errorMessage) ? errorMessage[0] : errorMessage,
        };
      }

      return { success: s3Response.data || [], error: null };
    } catch (error: any) {
      return {
        success: [],
        error: error.message || "Error desconocido al subir archivos",
      };
    }
  };

  return { uploadFiles, data, isLoading, isSuccess, isError, error };
};
