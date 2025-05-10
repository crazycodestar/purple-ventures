import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex flex-col min-h-svh">
        <Nav />
        <Outlet />
        <Footer />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
