    
import Image from "next/image";

  

const Map = () => { 

  return (
    <section className="w-full  "  >
      <div className=" flex flex-col justify-center">
        
        <div>
           <Image src="/images/community-listing/map.jpg" alt="Map" width={1200} height={800} className="w-full"/>
        </div>
        
      </div>
    </section>
  );
};

export default Map;