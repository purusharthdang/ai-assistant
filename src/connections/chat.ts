import Axios from "../utils/axios";

interface ChatQuestion {
  message: string;
  pdf_id: string;
}

const Chat = async (chat: ChatQuestion) => {
  return await Axios({
    method: "post",
    data: chat,
    url: "chat",
    headers: {
      Authorization: "Basic cmFnLWV4cGVyaW1lbnQ6ckBnZXhwZXJpbWVudA==",
    },
  })
    .then((response) => {
      //handle success
      return response.data;
    })
    .catch((err) => {
      //handle error
      throw Error(err);
    });
};

export default Chat;
