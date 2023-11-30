import dynamic from "next/dynamic";

const DynamicGPXReader = dynamic(() => import("./GPXReader"), {
  ssr: false,
});

export default DynamicGPXReader;
