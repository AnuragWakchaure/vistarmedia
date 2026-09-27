import { getHomepageContentAction } from "@/actions/homepage.actions";
import HomepageEditorForm from "@/components/admin/HomepageEditorForm";
import { PageHeader } from "@/components/ui/PageHeader";

export const dynamic = "force-dynamic";

export default async function AdminHomepageEditorPage() {
  const content = await getHomepageContentAction();

  return (
    <div className="max-w-4xl space-y-6">
      <PageHeader
        badge="Visual Site Content"
        title="Homepage Content Editor"
        subtitle="Customize live public headings, subheadings, hero pills, and CTA button copy seamlessly."
      />
      <HomepageEditorForm initialData={content} />
    </div>
  );
}