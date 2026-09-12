import CreatorForm from "@/components/admin/CreatorForm";
import { Sparkles } from "lucide-react";

export default function NewCreatorPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-dashed border-[#B80F0A] text-[#B80F0A] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>New Roster Entry</span>
        </div>
        <h1 className="font-anton text-3xl sm:text-5xl text-[#111111] uppercase tracking-tight">
          Add New Creator
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 font-medium">
          Create a verified creator profile in the VISTAR Maharashtra network.
        </p>
      </div>
      <CreatorForm />
    </div>
  );
}