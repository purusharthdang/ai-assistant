import Axios from "../utils/axios";

const UploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("pdf", file);
  return await Axios({
    method: "post",
    data: formData,
    url: "upload",
    headers: {
      Authorization: "Basic cmFnLWV4cGVyaW1lbnQ6ckBnZXhwZXJpbWVudA==",
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => {
      //handle success
      if (response.data?.pdf_id) {
        return response.data as { message: string; pdf_id: string };
      }
    })
    .catch((response) => {
      //handle error
      throw Error(response);
    });
};

export default UploadFile;
