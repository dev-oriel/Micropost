import Post from "./Post";

const Feed = () => {
  const posts = [
    { username: "User1", content: "Hello, world!", timestamp: "2h ago" },
    {
      username: "User2",
      content: "Just posted my first microblog!",
      timestamp: "1h ago",
    },
  ];

  return (
    <div className="p-4">
      {posts.map((post, index) => (
        <Post
          key={index}
          username={post.username}
          content={post.content}
          timestamp={post.timestamp}
        />
      ))}
    </div>
  );
};

export default Feed;
