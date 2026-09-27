import { getTestimonialsAction, createTestimonialAction, deleteTestimonialAction } from "@/actions/testimonial.actions";
import { MessageSquareQuote, Trash2, Plus, Quote } from "lucide-react";
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

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonialsAction();

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        badge={
          <Badge variant="default" dot size="sm">
            Social Proof & Endorsements
          </Badge>
        }
        title={`Client Testimonials (${testimonials.length})`}
        description="Manage verified brand endorsements and creator reviews shown in the homepage marquee track."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Add Testimonial Form */}
        <Card>
          <CardHeader className="border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2.5">
              <Plus className="w-4 h-4 text-[#00B8F0]" />
              <CardTitle className="text-base">Add Testimonial</CardTitle>
            </div>
            <CardDescription>Record client feedback or endorsement for the homepage.</CardDescription>
          </CardHeader>

          <CardContent className="pt-5">
            <form action={createTestimonialAction} className="space-y-4">
              <Input
                label="Executive / Client Name"
                name="personName"
                required
                placeholder="e.g. Anand Sharma"
              />

              <Input
                label="Designation / Title"
                name="designation"
                required
                placeholder="e.g. Head of Regional Marketing"
              />

              <Input
                label="Company / Brand"
                name="company"
                required
                placeholder="e.g. Mahindra Tractors"
              />

              <Input
                label="Photo URL (Optional)"
                name="photo"
                placeholder="https://..."
              />

              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-semibold text-slate-300">
                  Testimonial Quote <span className="text-rose-400 ml-0.5">*</span>
                </label>
                <textarea
                  name="testimonial"
                  required
                  rows={3}
                  placeholder="Working with VISTAR unlocked massive regional engagement..."
                  className="w-full bg-[#0E131E] border border-white/10 focus:border-[#00B8F0] focus:ring-1 focus:ring-[#00B8F0]/40 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none transition font-medium"
                />
              </div>

              <Button type="submit" className="w-full mt-2">
                Save Testimonial
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Testimonials List */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2.5">
              <MessageSquareQuote className="w-4 h-4 text-[#00B8F0]" />
              <CardTitle className="text-base">Published Endorsements ({testimonials.length})</CardTitle>
            </div>
            <CardDescription>Quotes showcased on the public marketing site.</CardDescription>
          </CardHeader>

          <CardContent className="pt-5">
            {testimonials.length === 0 ? (
              <EmptyState
                icon={<Quote className="w-6 h-6" />}
                title="No Testimonials Published"
                description="Add your first verified client testimonial using the form on the left."
              />
            ) : (
              <div className="space-y-3.5">
                {testimonials.map((item: any) => (
                  <div
                    key={item._id}
                    className="p-4 rounded-lg bg-[#090D14] border border-white/10 hover:border-[#00B8F0]/30 transition-colors flex items-start justify-between gap-4"
                  >
                    <div className="space-y-2 min-w-0">
                      <p className="text-xs text-slate-300 font-normal leading-relaxed italic">
                        &ldquo;{item.testimonial}&rdquo;
                      </p>

                      <div className="flex items-center gap-2.5 pt-1">
                        {item.photo ? (
                          <img
                            src={item.photo}
                            alt={item.personName}
                            className="w-8 h-8 rounded-full object-cover border border-white/10 shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-white/[0.08] text-white font-bold text-xs flex items-center justify-center shrink-0 border border-white/10">
                            {item.personName.charAt(0)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="font-semibold text-xs text-white truncate">{item.personName}</div>
                          <div className="text-[11px] text-slate-400 font-normal truncate">
                            {item.designation}, <span className="text-slate-300 font-medium">{item.company}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <form
                      action={async () => {
                        "use server";
                        await deleteTestimonialAction(item._id);
                      }}
                    >
                      <button
                        type="submit"
                        title="Remove Testimonial"
                        className="p-1.5 rounded-md text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0 mt-1"
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