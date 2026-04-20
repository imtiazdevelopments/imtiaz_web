import AboutJob from "./sections/AboutJob";
import CareerHero from "./sections/CareerHero";
import JobSpecifications from "./sections/JobSpecifications";
import {  jobDescription, jobSpecifications ,aboutJob} from "./data"; 

const Index = () => {
  return (
    <>
      <CareerHero jobDescription={jobDescription} />
      <JobSpecifications jobSpecs={jobSpecifications} />
      <AboutJob data={aboutJob} /> 
    </>
  );
};

export default Index;
