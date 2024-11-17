const getPosts = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

const createPost = async (newPost) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });
    if (!response.ok) {
      throw new Error("Failed to create post");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating post:", error);
  }
};

export { getPosts, createPost };
