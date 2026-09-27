import { getStatisticsAction, createStatisticAction, deleteStatisticAction } from "@/actions/stat.actions";
import { BarChart3, Trash2, Plus } from "lucide-react";
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

export default async function AdminStatisticsPage() {
  const stats = await getStatisticsAction();

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        badge={
          <Badge variant="default" dot size="sm">
            Impact Metrics
          </Badge>
        }
        title={`Agency Statistics (${stats.length})`}
        description="Manage numerical proof points and dynamic key performance statistics shown across the agency website."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Add Metric Card */}
        <Card>
          <CardHeader className="border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2.5">
              <Plus className="w-4 h-4 text-[#00B8F0]" />
              <CardTitle className="text-base">Add Metric</CardTitle>
            </div>
            <CardDescription>Create a new statistical proof point for the website.</CardDescription>
          </CardHeader>

          <CardContent className="pt-5">
            <form action={createStatisticAction} className="space-y-4">
              <Input
                label="Metric Label"
                name="label"
                required
                placeholder="e.g. Creators Connected"
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Value"
                  name="value"
                  required
                  placeholder="200"
                />
                <Input
                  label="Suffix"
                  name="suffix"
                  placeholder="+"
                />
              </div>

              <Input
                label="Description / Context"
                name="description"
                placeholder="Active creators across Maharashtra"
              />

              <Input
                label="Display Order Priority"
                type="number"
                name="displayOrder"
                defaultValue={0}
              />

              <Button type="submit" className="w-full mt-2">
                Save Metric
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Statistics List */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2.5">
              <BarChart3 className="w-4 h-4 text-[#00B8F0]" />
              <CardTitle className="text-base">Active Statistics ({stats.length})</CardTitle>
            </div>
            <CardDescription>Live proof points displayed in trust banners and sections.</CardDescription>
          </CardHeader>

          <CardContent className="pt-5">
            {stats.length === 0 ? (
              <EmptyState
                icon={<BarChart3 className="w-6 h-6" />}
                title="No Statistics Configured"
                description="Use the form on the left to add your first statistical proof point."
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {stats.map((item: any) => (
                  <div
                    key={item._id}
                    className="p-4 rounded-lg bg-[#090D14] border border-white/10 hover:border-[#00B8F0]/30 flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold tracking-tight text-white">
                          {item.value}
                        </span>
                        <span className="text-lg font-bold text-[#00B8F0]">{item.suffix}</span>
                        <span className="text-[10px] font-mono text-slate-500 ml-1.5">
                          #{item.displayOrder}
                        </span>
                      </div>
                      <div className="font-semibold text-xs text-slate-200 truncate">{item.label}</div>
                      {item.description && (
                        <div className="text-[11px] text-slate-400 font-normal line-clamp-1">
                          {item.description}
                        </div>
                      )}
                    </div>

                    <form
                      action={async () => {
                        "use server";
                        await deleteStatisticAction(item._id);
                      }}
                    >
                      <button
                        type="submit"
                        title="Remove Metric"
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