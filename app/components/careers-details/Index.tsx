import AboutJob from "./sections/AboutJob";
import BlogHero from "./sections/BlogHero";
import JobSpecifications from "./sections/JobSpecifications";
import {  jobDescription, jobSpecifications ,aboutJob} from "./data"; 

const Index = () => {
  return (
    <>
      <BlogHero jobDescription={jobDescription} />
      <JobSpecifications jobSpecs={jobSpecifications} />
      <AboutJob data={aboutJob} /> 
    </>
  );
};

export default Index;
