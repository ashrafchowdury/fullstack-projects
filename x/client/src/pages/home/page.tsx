import ShareLink from "@/components/link/share-link";
import PostComponent from "@/components/posts/post-component";
import PostShare from "@/components/posts/post-share";

const Home = () => {
  return (
    <>
      <main className="lg:w-[1025px] mx-auto border-x min-h-screen max-h-max px-3 py-5">
        <PostShare />

        <article className="mt-12">
          <PostComponent />
        </article>

 
      </main>
    </>
  );
};

export default Home;
