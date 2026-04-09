import Image from "next/image";

const Map = () => {
  return (
    <section data-header="dark" className="w-full py-120 3xl:py-160">
      <div className=" flex flex-col justify-center">
        <div>
          <Image
            src="/images/community-listing/map-2.jpg"
            alt="Map"
            width={2500}
            height={1400}
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Map;
