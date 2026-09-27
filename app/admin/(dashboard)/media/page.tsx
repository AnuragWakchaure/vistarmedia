import { getMediaAction, createMediaAction, deleteMediaAction } from "@/actions/media.actions";
import { Image as ImageIcon, Trash2, Plus } from "lucide-react";
import {
  PageHeader,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Select,
  Badge,
  EmptyState,
} from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const mediaList = await getMediaAction();

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        badge={
          <Badge variant="default" dot size="sm">
            Digital Asset Manager
          </Badge>
        }
        title={`Media Library (${mediaList.length})`}
        description="Store and manage image and video assets utilized across campaign case studies and creator profiles."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Add Asset Card */}
        <Card>
          <CardHeader className="border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2.5">
              <Plus className="w-4 h-4 text-[#00B8F0]" />
              <CardTitle className="text-base">Add Asset URL</CardTitle>
            </div>
            <CardDescription>Register a new image or video asset link.</CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            <form action={createMediaAction} className="space-y-4">
              <Input
                label="Asset Name"
                name="name"
                required
                placeholder="e.g. Hero Campaign Banner"
              />
              <Input
                label="Asset URL"
                name="url"
                required
                placeholder="https://..."
              />
              <Select label="Asset Type" name="type">
                <option value="IMAGE">Image</option>
                <option value="VIDEO">Video</option>
                <option value="LOGO">Logo</option>
              </Select>
              <Input
                label="Alt Text / Description"
                name="altText"
                placeholder="Brief visual description"
              />
              <Button type="submit" className="w-full mt-2">
                Save Media Asset
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Saved Assets Grid */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2.5">
              <ImageIcon className="w-4 h-4 text-[#00B8F0]" />
              <CardTitle className="text-base">Saved Assets ({mediaList.length})</CardTitle>
            </div>
            <CardDescription>All media referenced in campaigns and creator profiles.</CardDescription>
          </CardHeader>

          <CardContent className="pt-5">
            {mediaList.length === 0 ? (
              <EmptyState
                icon={<ImageIcon className="w-6 h-6" />}
                title="No Media Assets Saved"
                description="Use the form on the left to add your first asset URL."
              />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {mediaList.map((item: any) => (
                  <div
                    key={item._id}
                    className="rounded-lg bg-[#090D14] border border-white/10 overflow-hidden hover:border-[#00B8F0]/40 transition-colors group flex flex-col justify-between"
                  >
                    <div className="h-28 bg-[#080B11] relative overflow-hidden flex items-center justify-center">
                      {item.type === "IMAGE" || item.type === "LOGO" ? (
                        <img
                          src={item.url}
                          alt={item.altText || item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <div className="text-slate-500 font-mono text-xs flex flex-col items-center gap-1">
                          <ImageIcon className="w-6 h-6 text-slate-400" />
                          <span>Video Asset</span>
                        </div>
                      )}
                      <span className="absolute top-2 left-2">
                        <Badge variant="neutral" size="sm">
                          {item.type}
                        </Badge>
                      </span>
                    </div>

                    <div className="p-3 space-y-1.5 border-t border-white/[0.06]">
                      <div className="text-xs font-semibold text-white truncate">{item.name}</div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-mono text-[10px]">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                        <form
                          action={async () => {
                            "use server";
                            await deleteMediaAction(item._id);
                          }}
                        >
                          <button
                            type="submit"
                            title="Delete Asset"
                            className="text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      </div>
                    </div>
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