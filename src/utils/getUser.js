import axiosClient from "./axiosClient";
const getUser = async () => {
  try {
    const response = await axiosClient.get("me");
    return response.data || undefined;
  } catch (error) {
    throw error;
  }
};

export default getUser;
