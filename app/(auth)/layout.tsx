// app/(auth)/layout.tsx

import AuthSlider from "@/app/components/auth/AuthSlider";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-screen h-[98vh] overflow-hidden bg-white">

      {/* Left col — 48.4% */}
      <div className="relative h-full flex-shrink-0 w-[48.4%]">
        <AuthSlider />
      </div>

      {/* Right col — 51.6% */}
      <div className="relative flex items-center justify-center w-[51.6%] h-full bg-white">
        {children}
      </div>

    </div>
  );
}