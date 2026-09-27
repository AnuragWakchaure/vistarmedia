import { getServicesAction, createServiceAction, deleteServiceAction } from "@/actions/service.actions";
import { Layers, Trash2, Plus } from "lucide-react";
import {
  PageHeader,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Badge,
  EmptyState,
} from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const services = await getServicesAction();

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        badge={
          <Badge variant="default" dot size="sm">
            Agency Capabilities
          </Badge>
        }
        title={`Agency Services (${services.length})`}
        description="Manage agency marketing offerings, descriptions, and catalog items displayed on the public services page."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Add Service Card */}
        <Card>
          <CardHeader className="border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2.5">
              <Plus className="w-4 h-4 text-[#00B8F0]" />
              <CardTitle className="text-base">Add Service</CardTitle>
            </div>
            <CardDescription>Create a new agency service offering for the website.</CardDescription>
          </CardHeader>

          <CardContent className="pt-5">
            <form action={createServiceAction} className="space-y-4">
              <Input
                label="Service Title"
                name="title"
                required
                placeholder="e.g. Regional Influencer Marketing"
              />

              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-semibold text-slate-300">
                  Short Description <span className="text-rose-400 ml-0.5">*</span>
                </label>
                <textarea
                  name="shortDescription"
                  required
                  rows={3}
                  placeholder="Brief summary of deliverables..."
                  className="w-full bg-[#0E131E] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/40 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
                />
              </div>

              <Input
                label="Cover Image URL (Optional)"
                name="image"
                type="url"
                placeholder="https://images.unsplash.com/..."
              />

              <Input
                label="Display Order Priority"
                type="number"
                name="displayOrder"
                defaultValue={0}
              />

              <Button type="submit" className="w-full mt-2">
                Save Service Offering
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Services List */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-[#00B8F0]" />
              <CardTitle className="text-base">Active Services ({services.length})</CardTitle>
            </div>
            <CardDescription>Service offerings published on the public capabilities page.</CardDescription>
          </CardHeader>

          <CardContent className="pt-5">
            {services.length === 0 ? (
              <EmptyState
                icon={<Layers className="w-6 h-6" />}
                title="No Services Configured"
                description="Add your first service offering using the form on the left."
              />
            ) : (
              <div className="space-y-3">
                {services.map((srv: any) => (
                  <div
                    key={srv._id}
                    className="p-4 rounded-lg bg-[#090D14] border border-white/10 hover:border-[#00B8F0]/30 flex items-center justify-between gap-4 transition-colors"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {srv.image && (
                        <img
                          src={srv.image}
                          alt={srv.title}
                          className="w-12 h-12 rounded-lg object-cover border border-white/10 shrink-0"
                        />
                      )}
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm text-white truncate">{srv.title}</h4>
                          <span className="text-[10px] font-mono text-slate-500">
                            #{srv.displayOrder}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-normal line-clamp-1">
                          {srv.shortDescription}
                        </p>
                      </div>
                    </div>

                    <form
                      action={async () => {
                        "use server";
                        await deleteServiceAction(srv._id);
                      }}
                    >
                      <button
                        type="submit"
                        title="Remove Service"
                        className="p-1.5 rounded-md text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}