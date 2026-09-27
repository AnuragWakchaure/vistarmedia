import { getBrandsAction, createBrandAction, deleteBrandAction } from "@/actions/brand.actions";
import { Award, Trash2, Plus, Globe } from "lucide-react";
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

export default async function AdminBrandsPage() {
  const brands = await getBrandsAction();

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        badge={
          <Badge variant="default" dot size="sm">
            Brand Partnerships
          </Badge>
        }
        title={`Brand Partners (${brands.length})`}
        description="Manage enterprise brand logos, partners, and display order shown on the homepage ticker strip."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Brand Creation Form */}
        <Card>
          <CardHeader className="border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2.5">
              <Plus className="w-4 h-4 text-[#00B8F0]" />
              <CardTitle className="text-base">Add Brand Partner</CardTitle>
            </div>
            <CardDescription>Register a new partner logo for the homepage ticker.</CardDescription>
          </CardHeader>

          <CardContent className="pt-5">
            <form action={createBrandAction} className="space-y-4">
              <Input
                label="Brand Name"
                name="name"
                required
                placeholder="e.g. Mahindra Tractors"
              />

              <Input
                label="Logo URL / Path"
                name="logo"
                required
                placeholder="/images/brands/... or https://..."
              />

              <Input
                label="Website URL"
                name="website"
                placeholder="https://brand.com"
              />

              <Input
                label="Display Order Priority"
                type="number"
                name="displayOrder"
                defaultValue={0}
              />

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  name="featured"
                  id="featured"
                  defaultChecked
                  className="w-4 h-4 accent-[#00B8F0] rounded bg-[#090D14] border-white/10 cursor-pointer"
                />
                <label
                  htmlFor="featured"
                  className="text-xs text-slate-300 font-medium cursor-pointer"
                >
                  Featured on Homepage Marquee
                </label>
              </div>

              <Button type="submit" className="w-full mt-2">
                Save Brand Partner
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Brands List */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2.5">
              <Award className="w-4 h-4 text-[#00B8F0]" />
              <CardTitle className="text-base">Active Partners ({brands.length})</CardTitle>
            </div>
            <CardDescription>Brands displayed in the trusted partners marquee on the public website.</CardDescription>
          </CardHeader>

          <CardContent className="pt-5">
            {brands.length === 0 ? (
              <EmptyState
                icon={<Award className="w-6 h-6" />}
                title="No Brand Partners Registered"
                description="Add your first partner brand using the form on the left."
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {brands.map((brand: any) => (
                  <div
                    key={brand._id}
                    className="p-3.5 rounded-lg bg-[#090D14] border border-white/10 flex items-center justify-between gap-3 hover:border-[#00B8F0]/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-md bg-white p-1 flex items-center justify-center shrink-0 border border-white/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-xs text-white truncate">{brand.name}</div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                          {brand.website && (
                            <a
                              href={brand.website}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:text-[#00B8F0] transition-colors flex items-center gap-0.5 truncate"
                            >
                              <Globe className="w-3 h-3 shrink-0" />
                              <span className="truncate">Website</span>
                            </a>
                          )}
                          <span className="text-[10px] font-mono text-slate-500">
                            #{brand.displayOrder}
                          </span>
                        </div>
                      </div>
                    </div>

                    <form
                      action={async () => {
                        "use server";
                        await deleteBrandAction(brand._id);
                      }}
                    >
                      <button
                        type="submit"
                        title="Remove Brand"
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