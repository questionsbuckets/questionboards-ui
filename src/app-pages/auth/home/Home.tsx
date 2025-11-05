import React from "react";
import QuestionBoard from "./QuestionBoard";
import FreeWorksheet from "./FreeWorksheet";
import SearchByGrade from "./SearchByGrade";

import StudyFeatures from "./StudyFeatures";
import SubjectBoardsSection from "./SubjectBoardsSection";
import EducationOpportunities from "./EducationOpportunities";
import WhatIsFortyADaySectiont from "./WhatIsFortyADaySectiont";
import OurMissionSection from "./OurMissionSection";
import UnlockAccountSection from "./UnlockAccountSection";
import OurTestimonials from "./OurTestimonials";
import FortyADayPlanSection from "./FortyADayPlanSection";
import QuestionBoardsSection from "./QuestionBoardsSection";

const Home = () => {
  return (
    <>
      <QuestionBoard />
      <FreeWorksheet />
      <SearchByGrade />
      <StudyFeatures />
      <SubjectBoardsSection />
      <EducationOpportunities />
      <WhatIsFortyADaySectiont />
      <FortyADayPlanSection />
      <QuestionBoardsSection />
      <OurMissionSection />
      <OurTestimonials />
      <UnlockAccountSection />
    </>
  );
};

export default Home;
