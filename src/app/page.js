import Banner from "./components/Banner";
import Detail from "./components/Detail";
import FAQ from "./components/FAQ";
import Hero from "./components/Hero";
import Procedure from "./components/Procedure";

export default function Home() {
  return (
    <>
      <Hero />
      <Banner />
      <Procedure />
      <FAQ />
      <Detail />
    </>
  );
}
