import Feed from "../components/Feed";

const Home = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to MicroPost!</h1>
      <Feed />
    </div>
  );
};

export default Home;
