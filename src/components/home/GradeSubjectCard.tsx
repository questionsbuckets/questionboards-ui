// // "use client";

// // import React from "react";
// // import { ArrowRight, ChevronRight } from "lucide-react";

// // interface Skill {
// //   name: string;
// //   count: number;
// // }

// // interface GradeSubjectCardProps {
// //   grade: string;
// //   color: string;
// //   lightColor: string;
// //   description: string;
// //   skills: Skill[];
// // }

// // const GradeSubjectCard: React.FC<GradeSubjectCardProps> = ({
// //   grade,
// //   color,
// //   lightColor,
// //   description,
// //   skills,
// // }) => {
// //   return (
// //     <div className="w-full bg-white rounded-2xl p-4 sm:p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between border border-gray-100 min-h-[360px]">
// //   {/* Header */}
// //   <div className="flex items-center justify-between mb-4">
// //     <span
// //       className="h-12 min-w-24 px-2 flex items-center justify-center rounded-md text-lg font-semibold text-white"
// //       style={{ backgroundColor: color }}
// //     >
// //       {grade}
// //     </span>
// //     <ArrowRight className="text-foreground" />
// //   </div>

// //   {/* Middle content (description + skills) */}
// //   <div className="flex flex-col justify-between flex-grow">
// //     <p className="text-sm sm:text-base mb-4 line-clamp-3">{description}</p>

// //     <div className="grid grid-cols-2 gap-3 mt-auto">
// //       {skills.map((skill, index) => (
// //         <button
// //           key={index}
// //           className="flex justify-between items-center text-sm font-medium px-2 py-2 rounded-md border border-gray-100 truncate"
// //           style={{ backgroundColor: lightColor }}
// //         >
// //           <span className="truncate text-sm">{skill.name}</span>
// //           <span style={{ color }} className="text-sm flex items-center">{skill.count} skills <span><ChevronRight className="w-4 h-4 text-foreground" /></span> </span>
// //         </button>
// //       ))}
// //     </div>
// //   </div>
// // </div>

// //   );
// // };

// // export default GradeSubjectCard;
// "use client";

// import React from "react";
// import { ArrowRight, ChevronRight } from "lucide-react";

// interface Skill {
//   name: string;
//   count: number;
// }

// interface GradeSubjectCardProps {
//   grade: string;
//   color: string;
//   lightColor: string;
//   description: string;
//   skills: Skill[];
// }

// const GradeSubjectCard: React.FC<GradeSubjectCardProps> = ({
//   grade,
//   color,
//   lightColor,
//   description,
//   skills,
// }) => {
//   return (
//     <div className="w-full bg-white rounded-2xl p-4 sm:p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between border border-gray-100 min-h-[360px]">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <span
//           className="h-12 min-w-24 px-2 flex items-center justify-center rounded-md text-lg font-semibold text-white"
//           style={{ backgroundColor: color }}
//         >
//           {grade}
//         </span>
//         <ArrowRight className="text-foreground" />
//       </div>

//       {/* Middle content */}
//       <div className="flex flex-col justify-between flex-grow">
//         <p className="text-sm sm:text-base mb-4 line-clamp-3">{description}</p>

//         <div className="grid grid-cols-2 gap-3 mt-auto">
//           {skills.map((skill, index) => (
//             <button
//               key={index}
//               className="flex justify-between items-center text-sm font-medium px-3 py-2 rounded-md border border-gray-100 truncate transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
//               style={{ backgroundColor: lightColor }}
//             >
//               <span className="truncate text-sm">{skill.name}</span>
//               <span
//                 style={{ color }}
//                 className="text-sm flex items-center gap-1"
//               >
//                 {skill.count} skills
//                 <ChevronRight className="w-4 h-4 text-foreground" />
//               </span>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GradeSubjectCard;
"use client";

import React from "react";
import { ArrowRight, ChevronRight } from "lucide-react";

interface Skill {
  name: string;
  count: number;
}

interface GradeSubjectCardProps {
  grade: string;
  color: string;
  lightColor: string;
  description: string;
  skills: Skill[];
}

const GradeSubjectCard: React.FC<GradeSubjectCardProps> = ({
  grade,
  color,
  lightColor,
  description,
  skills,
}) => {
  return (
    <div className="w-full bg-white rounded-2xl p-4 sm:p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between border border-gray-100 min-h-[360px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="h-12 min-w-24 px-2 flex items-center justify-center rounded-md text-lg font-semibold text-white"
          style={{ backgroundColor: color }}
        >
          {grade}
        </span>
        <ArrowRight className="text-foreground" />
      </div>

      {/* Middle content */}
      <div className="flex flex-col justify-between flex-grow">
        <p className="text-sm sm:text-base mb-4 line-clamp-3">{description}</p>

        <div className="grid grid-cols-2 gap-3 mt-auto">
          {skills.map((skill, index) => (
            <button
              key={index}
              className="flex justify-between items-center text-sm font-medium px-3 py-2 rounded-md border border-gray-100 truncate transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              style={{
                backgroundColor: lightColor,
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = saturateColor(
                  lightColor,
                  1.2 // 20% more saturated
                );
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = lightColor;
              }}
            >
              <span className="truncate text-sm">{skill.name}</span>
              <span
                style={{ color }}
                className="text-sm flex items-center gap-1"
              >
                {skill.count} skills
                <ChevronRight className="w-4 h-4 text-foreground" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Utility: increase saturation of hex color by given factor
function saturateColor(hex: string, factor: number) {
  try {
    let col = hex.replace("#", "");
    if (col.length === 3) col = col.split("").map((c) => c + c).join("");

    const num = parseInt(col, 16);
    let r = (num >> 16) & 255;
    let g = (num >> 8) & 255;
    let b = num & 255;

    // Convert RGB → HSL
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    // Increase saturation
    s = Math.min(1, s * factor);

    // Convert back to RGB
    let r2, g2, b2;
    if (s === 0) {
      r2 = g2 = b2 = l; // gray
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r2 = hue2rgb(p, q, h + 1 / 3);
      g2 = hue2rgb(p, q, h);
      b2 = hue2rgb(p, q, h - 1 / 3);
    }

    return `rgb(${Math.round(r2 * 255)}, ${Math.round(g2 * 255)}, ${Math.round(
      b2 * 255
    )})`;
  } catch {
    return hex;
  }
}

export default GradeSubjectCard;
