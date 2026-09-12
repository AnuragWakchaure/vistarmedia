import { getHomepageContentAction } from "@/actions/homepage.actions";
import HomepageEditorForm from "@/components/admin/HomepageEditorForm";
import { Home } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminHomepageEditorPage() {
  const content = await getHomepageContentAction();

  return (
    <div className="max-w-4xl space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-dashed border-[#B80F0A] text-[#B80F0A] text-xs font-bold uppercase tracking-wider">
          <Home className="w-3.5 h-3.5" />
          <span>Visual Site Content</span>
        </div>
        <h1 className="font-anton text-3xl sm:text-5xl text-[#111111] uppercase tracking-tight">
          Homepage Content Editor
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 font-medium">
          Customize live public headings, subheadings, hero pills, and CTA button text seamlessly.
        </p>
      </div>

      <HomepageEditorForm initialData={content} />
    </div>
  );
}