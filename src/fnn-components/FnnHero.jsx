function FnnHero() {
  return (
    <section className="relative right-1/2 left-1/2 -mx-[50vw] h-full w-screen">
      <div className="absolute inset-0 z-0 bg-[url(/images/products/bg-spring-2025-tiny.png)] bg-cover bg-center bg-no-repeat opacity-90" />

      <div className="absolute inset-0 z-0 bg-fuchsia-300 opacity-30" />

      <div className="relative z-10 container mx-auto grid h-full grid-cols-1 items-center gap-10 px-4 py-10 md:grid-cols-2">
        <div className="order-2 space-y-4 md:order-1">
          <h1 className="text-primary text-3xl font-medium md:text-5xl">
            Discover Our Japanese Fabrics
          </h1>

          <p className="text-base text-neutral-800 md:text-lg">
            Beautiful, authentic fabrics delivered to your door every month.
          </p>

          <button className="btn btn-primary">Shop Now</button>
        </div>

        <div className="rounded-box order-1 aspect-[4/3] h-full w-full bg-amber-300 md:order-2" />
      </div>
    </section>
  );
}

export default FnnHero;
