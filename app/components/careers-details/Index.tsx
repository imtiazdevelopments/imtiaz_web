import AboutJob from "./sections/AboutJob";
import CareerHero from "./sections/CareerHero";
import JobSpecifications from "./sections/JobSpecifications";
import {  jobDescription, jobSpecifications ,aboutJob, CareerDetailsResponse} from "./data"; 
import { CareersPageResponse } from "../careers/data";

const Index = ({data}:{data:CareerDetailsResponse['data']}) => {
  const jobDescription = {
    title:data.job_title,
    description:data.job_caption
  }

const jobSpecifications = {
  title: data?.job_specification_title,
  specs: [
    {
      key: "Job Title",
      value: data?.job_title,
    },
    {
      key: "Department",
      value: data?.department,
    },
    {
      key: "Location",
      value: data?.job_location,
    },
    {
      key: "Employment Type",
      value: data?.job_type,
    },
  ],
};

  return (
    <>
      <CareerHero jobDescription={jobDescription} />
      <JobSpecifications jobSpecs={jobSpecifications} />
      <AboutJob data={data} overviewTitle={data?.job_overview_title}/> 
    </>
  );
};

export default Index;
