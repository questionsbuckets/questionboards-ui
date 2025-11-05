"use client";

export const MainLoader = () => {
  return (
    <div
      className="h-screen flex justify-center items-center"
      style={{ background: "var(--background)" }}
    >
      <div className="w-32 h-32 relative flex items-center justify-center">
        {/* Soft glowing background */}
        <div
          className="absolute inset-0 rounded-2xl blur-xl animate-pulse"
          style={{ backgroundColor: "var(--primary)", opacity: 0.2 }}
        ></div>

        {/* Spinning gradient border */}
        <div className="w-full h-full relative flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-2xl blur-sm animate-spin"
            style={{
              background:
                "linear-gradient(90deg, var(--chart-1), var(--chart-4), var(--chart-5))",
            }}
          ></div>

          {/* Inner container with bouncing bars */}
          <div
            className="absolute inset-1 bg-card rounded-lg flex items-center justify-center overflow-hidden"
          >
            <div className="flex gap-1 items-center">
              {["--chart-1", "--chart-2", "--chart-4", "--chart-5"].map(
                (colorVar, i) => (
                  <div
                    key={i}
                    className="w-2 h-12 rounded-full animate-[bounce_1s_ease-in-out_infinite]"
                    style={{
                      backgroundColor: `var(${colorVar})`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  ></div>
                )
              )}
            </div>

            {/* Subtle gradient overlay */}
            <div
              className="absolute inset-0 animate-pulse"
              style={{
                background:
                  "linear-gradient(to top, transparent, var(--chart-2)/10, transparent)",
              }}
            ></div>
          </div>
        </div>

        {/* Decorative pinging dots */}
        <div
          className="absolute -top-1 -left-1 w-2 h-2 rounded-full animate-ping"
          style={{ backgroundColor: "var(--chart-1)" }}
        ></div>
        <div
          className="absolute -top-1 -right-1 w-2 h-2 rounded-full animate-ping delay-100"
          style={{ backgroundColor: "var(--chart-5)" }}
        ></div>
        <div
          className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full animate-ping delay-200"
          style={{ backgroundColor: "var(--chart-4)" }}
        ></div>
        <div
          className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full animate-ping delay-300"
          style={{ backgroundColor: "var(--chart-2)" }}
        ></div>
      </div>
    </div>
  );
};
