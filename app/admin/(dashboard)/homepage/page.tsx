import { getHomepageContentAction } from "@/actions/homepage.actions";
import HomepageEditorForm from "@/components/admin/HomepageEditorForm";

export const dynamic = "force-dynamic";

export default async function AdminHomepageEditorPage() {
  const content = await getHomepageContentAction();

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Homepage Content Editor
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Edit live public headings, subheadings, and badge text without touching code.
        </p>
      </div>

      <HomepageEditorForm initialData={content} />
    </div>
  );
}