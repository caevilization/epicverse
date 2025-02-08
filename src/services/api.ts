interface MessagePayload {
  text: string;
  user: string;
}

export const sendMessage = async (text: string): Promise<any> => {
  try {
    const response = await fetch(
      "http://54.145.197.118:3000/c4d94237-417b-0fce-bda3-1d35803bfeea/message",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          user: "user",
        } as MessagePayload),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
