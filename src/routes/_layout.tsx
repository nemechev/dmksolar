import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MessengersFAB } from "@/components/site/MessengersFAB";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/lib/i18n";

export const Route = createFileRoute("/_layout")({
  component: LayoutRoute,
});

function LayoutRoute() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <MessengersFAB />
        <Toaster position="top-right" richColors />
      </div>
    </LanguageProvider>
  );
}
