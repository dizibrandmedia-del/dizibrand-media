import React from 'react';
import { HeroSection } from '@/components/website/hero-section';
import {
  SectionGlobalPositioning,
  SectionOnePartner,
  SectionDigitalExecs,
  SectionTeamExpertise,
  SectionMarketing,
  SectionTechnology,
  SectionAIAutomation,
  SectionDataAnalytics,
  SectionBuildYourTeam,
  SectionIndustries,
  SectionCaseStudies,
  SectionEngagementModels,
  SectionInternationalClients,
  SectionWhyDiziBrand,
  SectionTeam,
  SectionInsights,
  SectionFinalCTA,
} from '@/components/website/homepage-sections';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Global positioning / trust */}
      <SectionGlobalPositioning />

      {/* 3. One Partner / Multiple Capabilities */}
      <SectionOnePartner />

      {/* 4. Digital CMO / Digital CTO */}
      <SectionDigitalExecs />

      {/* 5. Strong Team / Expertise */}
      <SectionTeamExpertise />

      {/* 6. Marketing */}
      <SectionMarketing />

      {/* 7. Technology */}
      <SectionTechnology />

      {/* 8. AI Automation */}
      <SectionAIAutomation />

      {/* 9. Data Analytics */}
      <SectionDataAnalytics />

      {/* 10. Build Your Team */}
      <SectionBuildYourTeam />

      {/* 11. Industries */}
      <SectionIndustries />

      {/* 12. Case Studies */}
      <SectionCaseStudies />

      {/* 13. Engagement Models */}
      <SectionEngagementModels />

      {/* 14. International Clients */}
      <SectionInternationalClients />

      {/* 15. Why DiziBrand */}
      <SectionWhyDiziBrand />

      {/* 16. Team */}
      <SectionTeam />

      {/* 17. Insights */}
      <SectionInsights />

      {/* 18. Final CTA */}
      <SectionFinalCTA />
    </div>
  );
}
