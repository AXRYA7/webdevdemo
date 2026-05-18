import { Outlet } from "react-router-dom";
import AppNav from "../components/AppNav";

export default function SiteLayout() {
  return (
    <div className="min-h-screen">
      <AppNav />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-3 pb-16 pt-4 md:px-4 lg:px-6">
        <Outlet />
      </main>
    </div>
  );
}
