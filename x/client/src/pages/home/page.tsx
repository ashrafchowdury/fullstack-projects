import PostComponent from "@/components/posts/post-component";
import PostShare from "@/components/posts/post-share";
import AppLayout from "@/components/layout/app";

const Home = () => {
  return (
    <AppLayout>
      <PostShare />

      <article className="mt-12">
        <PostComponent />
      </article>
    </AppLayout>
  );
};

export default Home;
