import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        ReadTogether
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">
          A Community for Book Lovers
        </span>
      </h1>
      <p className="desc text-center">
        読書を通じて人々をつなげるアプリです。
        <br />
        読んだ本を簡単に共有し、新しい発見を得ることができます。
      </p>
      <Feed />
    </section>
  );
};

export default Home;
