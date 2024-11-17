const getPosts = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`);
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }
    return await response.json(); // Returns an array of posts
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return [];
  }
};

const createPost = async (newPost) => {
  try {
    if (!newPost || typeof newPost !== "object") {
      throw new Error("Invalid post data. Expected an object.");
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create post");
    }

    return await response.json(); // Returns the created post
  } catch (error) {
    console.error("Error creating post:", error.message);
    return null;
  }
};

export { getPosts, createPost };
