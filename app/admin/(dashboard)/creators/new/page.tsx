import CreatorForm from "@/components/admin/CreatorForm";

export default function NewCreatorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Add New Creator</h1>
        <p className="text-xs text-slate-400 mt-1">
          Create a new creator profile in the VISTAR Maharashtra network.
        </p>
      </div>
      <CreatorForm />
    </div>
  );
}