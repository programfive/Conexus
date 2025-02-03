import { FeatureIcons } from "@/components/utils/feature-icon";
import { features } from "../constants";
import { H2, H3, P } from "@/components/ui/typography";

export function Feature(){
    return (
        <section className="py-24 bg-background" id="features">
                  <div className="container px-4 md:px-6">
                    <div className="text-center max-w-[900px] mx-auto mb-20">
                      <H2 className="mb-4">Everything you need for perfect communication</H2>
                      <P >
                        Powerful features that make Conexus the best choice for your team
                      </P>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {features.map((feature, i) => (
                        <div
                          key={i}
                          className="group relative overflow-hidden rounded-2xl border bg-card p-6 hover:shadow-lg transition-shadow"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12">{FeatureIcons[feature.icon as keyof typeof FeatureIcons]}</div>
                            <H3 className="font-semibold">{feature.title}</H3>
                          </div>
                          <P className="mt-3 text-muted-foreground text-sm">{feature.description}</P>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}