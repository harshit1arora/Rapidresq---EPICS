import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import ambulanceImg from "@/assets/ambulance-night.png";

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-32 overflow-hidden bg-background">
      {/* Dynamic Mesh Gradient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[100px]" 
        />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-medical-blue-light/60 rounded-full blur-[120px]" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] left-[20%] w-[60%] h-[50%] bg-trust-green/10 rounded-full blur-[120px]" 
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm backdrop-blur-md border border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              24/7 Emergency Support Available
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold text-foreground leading-[1.1] tracking-tight">
              Rapid Emergency Response,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-destructive to-red-600">
                When Every Second Counts.
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">
              We dispatch the nearest ambulance and connect you with life-saving resources instantly with precision GPS tracking. Trust RapidResQ in your critical moments.
            </p>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link to="/sos">
                <Button 
                  size="lg" 
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold px-12 py-8 text-xl rounded-full shadow-[0_4px_20px_-5px_rgba(239,68,68,0.5)] transition-all flex items-center gap-3 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
                  DISPATCH AMBULANCE
                </Button>
              </Link>
            </motion.div>

            <div className="flex flex-wrap gap-6 items-center pt-6 border-t border-border/50">
              {[
                { text: t('hero.abdmCompliant') },
                { text: t('hero.isoCertified') },
                { text: t('hero.dataSecure') }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2 text-sm font-medium text-foreground/80"
                >
                  <CheckCircle2 className="w-5 h-5 text-trust-green drop-shadow-sm" />
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative lg:block"
          >
            <div className="relative z-10 w-full aspect-square md:aspect-[4/3] lg:aspect-square overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white/40 to-white/10 p-2 shadow-2xl backdrop-blur-3xl border border-white/20 dark:border-white/10">
              <img 
                src={ambulanceImg} 
                alt="Emergency ambulance responding" 
                className="w-full h-full object-cover rounded-[2rem] shadow-inner"
              />
              
              {/* Floating Glass Cards */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-white/90 dark:bg-black/60 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-xl flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-xl">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Avg. Response Time</p>
                  <p className="font-bold text-foreground">{'<'} 8 Minutes</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
