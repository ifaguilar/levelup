import { getJobs } from "../api/job";
import { getGenders } from "../api/gender";
import { getDepartments } from "../api/department";

const signupLoader = async () => {
  const jobData = await getJobs();
  const jobs = jobData.jobs;

  const genderData = await getGenders();
  const genders = genderData.genders;

  const departmentData = await getDepartments();
  const departments = departmentData.departments;

  return {
    jobs: jobs,
    genders: genders,
    departments: departments,
  };
};

export default signupLoader;
