export const fetchUserData = async (userId) => {
  const response = await fetch(`/api/user/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  const data = await response.json();
  return data;
};

export const updateUserData = async (userId, userData) => {
  const response = await fetch(`/api/user/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
};
