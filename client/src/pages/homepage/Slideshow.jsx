function SlideShow() {
  return (
    <main className="height: 100vh; background-size: cover !important; color: white; padding: 0 70px; display: flex; flex-direction: column; justify-content: center;">
      <div className="bg-[url('https://ld-wp73.template-help.com/wordpress/prod_29735/v1/wp-content/uploads/2020/09/slide-1-1024x432-1.jpg')] h-screen bg-cover text-white flex flex-col justify-center bg-no-repeat">
        <div className="p-12">
          <h1 className="text-6xl font-bold font-sans ">
            Inspiration, Innovation <br /> and Discovery.
          </h1>
          <p className="self-start font-bold text-left text-xl py-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci
            quis nisi porro ipsum nihil voluptatibus labore iste dignissimos
            consectetur quasi, accusamus sunt at fugit? Nobis veniam ratione
            ipsa fuga odit!
          </p>
          <div>
            <button className="bg-orange-400 border-2 border-orange-400 hover:text-orange-400 transition hover:bg-transparent px-8 py-2 uppercase rounded-sm mx-3 font-bold">
              view details
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
export default SlideShow;
