import type { NextPage } from "next";
import { useEffect, useState } from "react";
import HomeComponent from "../components/Home";
import Install from "../components/Install";
import Layout from "../components/Layout";

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

const Home: NextPage = () => {
  const [hasMetamask, setHasMetamask] = useState(false);

  useEffect(() => {
    setHasMetamask(window.ethereum);
  }, []);

  if (hasMetamask)
    return (
      <Layout>
        <HomeComponent />
      </Layout>
    );
  return (
    <Layout>
      <Install />
    </Layout>
  );
};

export default Home;
