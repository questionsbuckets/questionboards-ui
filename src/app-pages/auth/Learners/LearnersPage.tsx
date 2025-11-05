// "use client";

// import React from "react";
// import {
//   BookOpen,
//   Brain,
//   FlaskConical,
//   Globe2,
//   Layers,
//   Calculator,
//   Menu,
//   ChevronRight,
//   Pen,
//   Copy,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { cn } from "@/lib/utils";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import {
//   QBCopy,
//   QBCross,
//   QBExclaimed,
//   QBEyeIcon,
//   QBRetry,
//   QBStats,
//   QBTick,
// } from "@/utils/svgs";

// const subjects = [
//   { name: "Mathematics", icon: Calculator, active: true },
//   { name: "ELAR", icon: BookOpen },
//   { name: "Science", icon: FlaskConical },
//   { name: "English", icon: Globe2 },
//   { name: "Subject 4", icon: Layers },
//   { name: "Subject 5", icon: Layers },
//   { name: "Subject 6", icon: Layers },
//   { name: "Subject 7", icon: Layers },
//   { name: "Subject 8", icon: Layers },
// ];

// const grades = [
//   "Pre-K",
//   "Kindergarten",
//   "Grade 1",
//   "Grade 2",
//   "Grade 3",
//   "Grade 4",
//   "Grade 5",
//   "Grade 6",
//   "Grade 7",
//   "Grade 8",
//   "Grade 9",
//   "Grade 10",
//   "Grade 11",
//   "Grade 12",
// ];

// const topics = [
//   {
//     title: "A. Topic 1 Mention Here",
//     questions: Array.from({ length: 10 }, (_, i) => ({
//       id: i + 1,
//       text: `QB${i + 1}. Subtopic ${i + 1} Mention here`,
//       type: i % 2 === 0 ? "Live" : "Practice",
//     })),
//   },
//   {
//     title: "B. Topic 2 Mention Here",
//     questions: Array.from({ length: 10 }, (_, i) => ({
//       id: i + 1,
//       text: `QB${i + 1}. Subtopic ${i + 1} Mention here`,
//       type: i % 3 === 0 ? "Live" : "Practice",
//     })),
//   },
// ];

// const SubjectsNav = () => {
//   return (
//     <div className="w-full  border-b bg-white px-16 lg:px-6 py-2.5 flex items-center justify-between">
//       <div className="flex items-center gap-3 lg:gap-11 no-scrollbar w-full overflow-hidden overflow-x-scroll">
//         {subjects.map((subj) => (
//           <div
//             key={subj.name}
//             // variant={subj.active ? "default" : "ghost"}
//             className={cn(
//               "flex items-center gap-2 whitespace-nowrap cursor-pointer rounded-[14px] px-3 lg:px-6 py-2 lg:py-[15px] text-base lg:text-[21px] font-semibold transition-all",
//               subj.active
//                 ? "bg-background text-foreground hover:bg-background/80"
//                 : "hover:bg-muted"
//             )}
//           >
//             <subj.icon className="w-7 h-7" />
//             {subj.name}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const SidebarContent = () => (
//   <div className="h-full flex flex-col">
//     <div className="px-6 py-[18px] text-lg font-semibold border-b">GRADES</div>
//     <ScrollArea className="flex-1 h-[calc(100vh-60px)]">
//       <ul>
//         {grades.map((grade, idx) => (
//           <li
//             key={idx}
//             className={cn(
//               "px-6 py-[18px] text-sm rounded-md cursor-pointer hover:bg-emerald-50 hover:text-emerald-600 transition-all",
//               grade === "Kindergarten" && "bg-emerald-100 text-emerald-600"
//             )}
//           >
//             <span className="flex justify-between font-semibold">
//               {grade}
//               <ChevronRight className="w-4 h-4" />
//             </span>
//           </li>
//         ))}
//       </ul>
//     </ScrollArea>
//   </div>
// );

// const LearnersPage = () => {
//   return (
//     <div className="relative">
//       <SubjectsNav />
//       <div className="flex min-h-screen bg-[#FDEFDC]">
//         {/* Sidebar */}
//         <aside className="w-64 border-r bg-white hidden lg:block">
//           <SidebarContent />
//         </aside>

//         {/* Sidebar trigger and mobile sidebar */}
//         <div
//           className="lg:hidden absolute left-4 top-4 z-50"
//           aria-label="Open sidebar"
//         >
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="outline" size="icon" className="rounded-full">
//                 <Menu className="w-6 h-6" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent
//               side="left"
//               className="p-0 w-[208px] max-w-[80vw] border-none"
//             >
//               <SidebarContent />
//             </SheetContent>
//           </Sheet>
//         </div>

//         {/* Main Section */}
//         <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
//           <h1 className="font-semibold text-6xl text-primary-text">
//             Mathematics
//           </h1>
//           <p className="font-normal text-2xl mt-4 max-w-full">
//             Lorem Ipsum is simply dummy text of the printing and typesetting
//             industry. Lorem Ipsum has been the industry's standard dummy text
//             ever since the 1500s, when an unknown printer took a galley of type
//             and scrambled it to make a type specimen book.
//           </p>

//           {/* Tabs */}
//           <Tabs defaultValue="all" className="mt-12">
//             <TabsList className="flex bg-white rounded-full p-1 w-fit">
//               <TabsTrigger
//                 className=" data-[state=active]:bg-primary font-semibold text-lg data-[state=active]:text-white py-[9px] px-9 rounded-full cursor-pointer"
//                 value="all"
//               >
//                 All
//               </TabsTrigger>
//               <TabsTrigger
//                 className=" data-[state=active]:bg-primary font-semibold text-lg data-[state=active]:text-white py-[9px] px-9 rounded-full cursor-pointer"
//                 value="live"
//               >
//                 <div className="flex items-center gap-1">
//                   <span className="w-2 h-2 bg-red-500 rounded-full"></span>
//                   Live
//                 </div>
//               </TabsTrigger>
//               <TabsTrigger
//                 className=" data-[state=active]:bg-primary font-semibold text-lg data-[state=active]:text-white py-[9px] px-9 rounded-full cursor-pointer"
//                 value="practice"
//               >
//                 Practice
//               </TabsTrigger>
//             </TabsList>
//           </Tabs>

//           {/* Topic Cards */}

//           <div className="mt-6"></div>
//           <QBCard />
//           {/* <div className="mt-6 grid grid-cols-1 overflow-y-scroll sm:grid-cols-2 xl:grid-cols-3 gap-6">
//           {Array.from({ length: 6 }).map((_, cardIdx) => (
//             <Card key={cardIdx} className="shadow-sm border bg-white rounded-2xl">
//               <CardHeader className="flex items-center justify-between pb-2">
//                 <CardTitle className="text-sm font-semibold text-amber-600">
//                   A. Topic 1 Mention Here
//                 </CardTitle>
//                 <Button variant="link" className="text-emerald-600 text-sm p-0">
//                   View All
//                 </Button>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex flex-col gap-2">
//                   {topics[0].questions.map((q) => (
//                     <div
//                       key={q.id}
//                       className="flex items-center justify-between rounded-md border px-3 py-2 text-sm hover:bg-muted/40 transition-all"
//                     >
//                       <span>{q.text}</span>
//                       <span
//                         className={cn(
//                           "text-xs px-2 py-1 rounded-md font-medium",
//                           q.type === "Live"
//                             ? "bg-red-100 text-red-600"
//                             : "bg-emerald-100 text-emerald-600"
//                         )}
//                       >
//                         {q.type}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div> */}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default LearnersPage;

// const QBCard = () => {
//   const getIconFromStatus = (status: string) => {
//     switch (status) {
//       case "copy":
//         return <QBCopy />;
//       case "cross":
//         return <QBCross />;
//       case "exclaimed":
//         return <QBExclaimed />;
//       case "eye":
//         return <QBEyeIcon />;
//       case "retry":
//         return <QBRetry />;
//       case "stats":
//         return <QBStats />;
//       case "tick":
//         return <QBTick />;
//       case "complete":
//         return <QBTick />;
//       default:
//         return <QBCross />;
//     }
//   };

//   const getQBType = (type: string) => {
//     if (type === "live")
//       return (
//         <div className="text-[12px] font-semibold px-2 flex gap-2 items-center">
//           <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
//           Live
//         </div>
//       );

//     if (type === "practice")
//       return <div className="text-[12px] font-semibold px-2">Practice</div>;

//     return null; // optional fallback
//   };

//   return (
//     <div className="rounded-[24px] p-6 bg-white">
//       <section className="flex justify-between">
//         <span className="font-semibold text-[#F39317] text-lg">
//           A. Topic 1 Mention Here
//         </span>
//         <span className="text-base font-semibold">View All</span>
//       </section>

//       <section className="mt-4 flex flex-col gap-2">
//         <div className="border border-[#FDEFDC] rounded-[7px] py-2 px-3 flex justify-between">
//           <section className="flex gap-2 justify-center items-center">
//             {getIconFromStatus("complete")}
//             <span className="text-base">
//               <span className="font-semibold">QB1.</span> Subtopic 1 Mention
//               here
//             </span>
//           </section>
//           <section className="flex gap-2">
//             <CommonWrapper children={<Pen className="w-3 h-3" />} />
//             <CommonWrapper children={<Copy className="w-3 h-3" />} />
//             <CommonWrapper children={getQBType("live")} />

//             <ChevronRight className="w-4 h-4" />
//           </section>
//         </div>
//       </section>
//     </div>
//   );
// };

// // ✅ Fixed CommonWrapper component
// const CommonWrapper = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <div className="bg-[#FDEFDC] h-6 min-w-6 rounded-[7px] flex items-center justify-center">
//       {children}
//     </div>
//   );
// };
"use client";

import React from "react";
import {
  BookOpen,
  Brain,
  FlaskConical,
  Globe2,
  Layers,
  Calculator,
  Menu,
  ChevronRight,
  Pen,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  QBCopy,
  QBCross,
  QBExclaimed,
  QBEyeIcon,
  QBRetry,
  QBStats,
  QBTick,
} from "@/utils/svgs";

// Subjects/Grades config
const subjects = [
  { name: "Mathematics", icon: Calculator, active: true },
  { name: "ELAR", icon: BookOpen },
  { name: "Science", icon: FlaskConical },
  { name: "English", icon: Globe2 },
  { name: "Subject 4", icon: Layers },
  { name: "Subject 5", icon: Layers },
  { name: "Subject 6", icon: Layers },
  { name: "Subject 7", icon: Layers },
  { name: "Subject 8", icon: Layers },
];

const grades = [
  "Pre-K",
  "Kindergarten",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
];

// ----- YOUR TOPICS ARRAY -----
const topics = Array.from({ length: 9 }, (_, i) => ({
  title: `${String.fromCharCode(65 + i)}. Topic ${i + 1} Mention Here`,
  questions: Array.from({ length: 10 }, (__, j) => ({
    id: j + 1,
    text: `QB${j + 1}. Subtopic ${j + 1} Mention here`,
    type: j % 2 === 0 ? "live" : "practice",
    status:
      j % 3 === 0 ? "complete" : j % 4 === 0 ? "cross" : "tick",
  })),
}));

// ----- SIDEBAR CONFIG -----
const SubjectsNav = () => (
  <div className="w-full border-b bg-white px-16 lg:px-6 py-2.5 flex items-center justify-between">
    <div className="flex items-center gap-3 lg:gap-11 no-scrollbar w-full overflow-hidden overflow-x-scroll">
      {subjects.map((subj) => (
        <div
          key={subj.name}
          className={cn(
            "flex items-center gap-2 whitespace-nowrap cursor-pointer rounded-[14px] px-3 lg:px-6 py-2 lg:py-[15px] text-base lg:text-[21px] font-semibold transition-all",
            subj.active
              ? "bg-background text-foreground hover:bg-background/80"
              : "hover:bg-muted"
          )}
        >
          <subj.icon className="w-7 h-7" />
          {subj.name}
        </div>
      ))}
    </div>
  </div>
);

const SidebarContent = () => (
  <div className="h-full flex flex-col">
    <div className="px-6 py-[18px] text-lg font-semibold border-b">GRADES</div>
    <ScrollArea className="flex-1 h-[calc(100vh-60px)]">
      <ul>
        {grades.map((grade, idx) => (
          <li
            key={idx}
            className={cn(
              "px-6 py-[18px] text-sm rounded-md cursor-pointer hover:bg-emerald-50 hover:text-emerald-600 transition-all",
              grade === "Kindergarten" && "bg-emerald-100 text-emerald-600"
            )}
          >
            <span className="flex justify-between font-semibold">
              {grade}
              <ChevronRight className="w-4 h-4" />
            </span>
          </li>
        ))}
      </ul>
    </ScrollArea>
  </div>
);

// ----- MAIN PAGE -----
const LearnersPage = () => {
  return (
    <div className="relative">
      <SubjectsNav />
      <div className="flex min-h-screen bg-[#FDEFDC]">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-white hidden lg:block">
          <SidebarContent />
        </aside>

        {/* Sidebar trigger and mobile sidebar */}
        <div
          className="lg:hidden absolute left-4 top-4 z-50"
          aria-label="Open sidebar"
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="p-0 w-[208px] max-w-[80vw] border-none"
            >
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </div>

        {/* Main Section */}
        <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
          <h1 className="font-semibold text-6xl text-primary-text">
            Mathematics
          </h1>
          <p className="font-normal text-2xl mt-4 max-w-full">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>

          {/* Tabs */}
          <Tabs defaultValue="all" className="mt-12">
            <TabsList className="flex bg-white rounded-full p-1 w-fit">
              <TabsTrigger
                className=" data-[state=active]:bg-primary font-semibold text-lg data-[state=active]:text-white py-[9px] px-9 rounded-full cursor-pointer"
                value="all"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                className=" data-[state=active]:bg-primary font-semibold text-lg data-[state=active]:text-white py-[9px] px-9 rounded-full cursor-pointer"
                value="live"
              >
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Live
                </div>
              </TabsTrigger>
              <TabsTrigger
                className=" data-[state=active]:bg-primary font-semibold text-lg data-[state=active]:text-white py-[9px] px-9 rounded-full cursor-pointer"
                value="practice"
              >
                Practice
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Topic Cards */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 h-[70vh] overflow-y-scroll overflow-hidden">
            {topics.map((topic, idx) => (
              <QBCard key={idx} title={topic.title} questions={topic.questions.slice(0, 5)} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default LearnersPage;

// ----- COMPONENTS ------

const QBCard = ({
  title,
  questions,
}: {
  title: string;
  questions: { id: number; text: string; type: string; status: string }[];
}) => {
  const getIconFromStatus = (status: string) => {
    switch (status) {
      case "copy":
        return <QBCopy />;
      case "cross":
        return <QBCross />;
      case "exclaimed":
        return <QBExclaimed />;
      case "eye":
        return <QBEyeIcon />;
      case "retry":
        return <QBRetry />;
      case "stats":
        return <QBStats />;
      case "tick":
        return <QBTick />;
      case "complete":
        return <QBTick />;
      default:
        return <QBCross />;
    }
  };

  const getQBType = (type: string) => {
    if (type === "live")
      return (
        <div className="text-[12px] font-semibold px-2 flex gap-2 items-center">
          <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
          Live
        </div>
      );

    if (type === "practice")
      return <div className="text-[12px] font-semibold px-2">Practice</div>;

    return null;
  };

  return (
    <div className="rounded-[24px] p-6 bg-white">
      <section className="flex justify-between">
        <span className="font-semibold text-[#F39317] text-lg">{title}</span>
        <span className="text-base font-semibold">View All</span>
      </section>

      <section className="mt-4 flex flex-col gap-2">
        {questions.map((item) => (
          <div
            key={item.id}
            className="border border-[#FDEFDC] rounded-[7px] py-2 px-3 flex justify-between"
          >
            <section className="flex gap-2 justify-center items-center">
              {getIconFromStatus(item.status)}
              <span className="text-base">
                <span className="font-semibold">{`QB${item.id}.`}</span>{" "}
                {item.text.replace(/^QB\d+\. /, "")}
              </span>
            </section>
            <section className="flex gap-2">
              <CommonWrapper children={<Pen className="w-3 h-3" />} />
              <CommonWrapper children={<Copy className="w-3 h-3" />} />
              <CommonWrapper children={getQBType(item.type)} />
              <ChevronRight className="w-4 h-4" />
            </section>
          </div>
        ))}
      </section>
    </div>
  );
};

const CommonWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#FDEFDC] h-6 min-w-6 rounded-[7px] flex items-center justify-center">
      {children}
    </div>
  );
};
