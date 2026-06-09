import DsaDashboard from "@/components/Dashboard/DsaDashboard";

export default function StringsPage() {
  return (
    <main className="py-8">
      <DsaDashboard stepIdFilter={["step-3", "step-7"]} />
    </main>
  );
}
