import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Loader2 } from "lucide-react";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Services = lazy(() => import("@/pages/Services"));
const ServiceDetail = lazy(() => import("@/pages/ServiceDetail"));
const BusinessResponseSystem = lazy(() => import("@/pages/BusinessResponseSystem"));
const Packages = lazy(() => import("@/pages/Packages"));
const Industries = lazy(() => import("@/pages/Industries"));
const Work = lazy(() => import("@/pages/Work"));
const CaseStudyPage = lazy(() => import("@/pages/CaseStudyPage"));
const Process = lazy(() => import("@/pages/Process"));
const Assessment = lazy(() => import("@/pages/Assessment"));
const Book = lazy(() => import("@/pages/Book"));
const Contact = lazy(() => import("@/pages/Contact"));
const Faq = lazy(() => import("@/pages/Faq"));
const Admin = lazy(() => import("@/pages/Admin"));
const NotFound = lazy(() => import("@/pages/NotFound"));
import { Privacy, Terms, SmsTerms, Accessibility } from "@/pages/Legal";

function Fallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-label="Loading page">
      <Loader2 className="h-8 w-8 animate-spin text-gold" aria-hidden="true" />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="services/business-response-system" element={<BusinessResponseSystem />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="packages" element={<Packages />} />
          <Route path="industries" element={<Industries />} />
          <Route path="work" element={<Work />} />
          <Route path="work/:slug" element={<CaseStudyPage />} />
          <Route path="process" element={<Process />} />
          <Route path="assessment" element={<Assessment />} />
          <Route path="book" element={<Book />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<Faq />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="sms-terms" element={<SmsTerms />} />
          <Route path="accessibility" element={<Accessibility />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
