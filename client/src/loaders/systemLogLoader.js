import { getSystemLogs } from "../api/systemLog";

const systemLogLoader = async () => {
  try {
    const { systemLogs } = await getSystemLogs();

    return {
      systemLogs: systemLogs,
    };
  } catch (error) {
    return { systemLogs: [] };
  }
};

export default systemLogLoader;
