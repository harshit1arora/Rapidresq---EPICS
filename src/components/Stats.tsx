import { Heart, Users, Building2, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export const Stats = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Heart,
      value: "258,948+",
      label: t('stats.patientsServed'),
    },
    {
      icon: Users,
      value: "1,000+",
      label: t('stats.healthcareProviders'),
    },
    {
      icon: Building2,
      value: "100+",
      label: t('stats.clinicsDigitized'),
    },
    {
      icon: Clock,
      value: "24/7",
      label: t('stats.supportAvailable'),
    },
  ];

  return (
    <section className="py-8 -mt-8 relative z-10">
      <div className="container mx-auto px-4 lg:px-8">
        <Card className="bg-card shadow-xl border-border/50 backdrop-blur-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 lg:p-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-2">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </section>
  );
};
