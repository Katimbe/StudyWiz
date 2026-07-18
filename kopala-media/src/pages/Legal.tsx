import { SEO, breadcrumbLd } from "@/components/layout/SEO";
import { Breadcrumbs } from "@/components/layout/Layout";
import { PageHero } from "@/components/marketing/shared";
import { site } from "@/config/site";

/**
 * Legal pages — dated drafts marked for owner/professional review before
 * publication (§41). Owner-specific values (entity name, contact for privacy
 * inquiries) activate from src/config/site.ts when supplied.
 */

function LegalLayout({
  title,
  description,
  path,
  updated,
  children,
}: {
  title: string;
  description: string;
  path: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SEO
        title={`${title} | Kopala Media`}
        description={description}
        path={path}
        jsonLd={breadcrumbLd([{ name: "Home", path: "/" }, { name: title, path }])}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
      <PageHero eyebrow="Legal" title={title} description={description} />
      <section className="section-pad">
        <div className="container-x prose-measure">
          <p className="rounded-xl border border-amber-400/30 bg-amber-500/5 px-5 py-4 text-xs leading-relaxed text-amber-200/90">
            Last updated: {updated}. This document is a working draft provided for owner and
            professional legal review before final publication.
          </p>
          <div className="mt-8 flex flex-col gap-8 text-base leading-relaxed text-warmgray [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ivory [&_li]:ml-5 [&_li]:list-disc [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}

const UPDATED = "July 2026";

export function Privacy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      description="What information Kopala Media collects through this website, why, and how it is protected."
      path="/privacy"
      updated={UPDATED}
    >
      <section>
        <h2>1. Who we are</h2>
        <p>
          {site.name} is a digital transformation and business-growth systems company based in{" "}
          {site.city}, {site.state}. This policy explains what information we collect through this
          website, why we collect it, and how it is handled.
        </p>
      </section>
      <section>
        <h2>2. Information we collect</h2>
        <ul>
          <li>Information you submit through forms: name, business name, email, phone number, location, website, and the details you choose to share about your business and project.</li>
          <li>Technical information: pages visited, approximate referral source, and campaign parameters (UTM codes) used to understand how visitors find us.</li>
          <li>Consent records: the time at which you gave consent to be contacted.</li>
        </ul>
      </section>
      <section>
        <h2>3. How we use it</h2>
        <ul>
          <li>To respond to your inquiry, assessment, or booking request.</li>
          <li>To prepare recommendations and proposals you have asked for.</li>
          <li>To improve this website's content and performance.</li>
        </ul>
        <p>We do not sell, rent, or share your personal information with third parties for their marketing.</p>
      </section>
      <section>
        <h2>4. Analytics</h2>
        <p>
          This website records privacy-respecting usage events (such as button clicks and form
          completions) to understand what is useful to visitors. When third-party analytics are
          activated, they will be listed here with opt-out information.
        </p>
      </section>
      <section>
        <h2>5. Data retention</h2>
        <p>
          Inquiry and assessment records are kept for as long as needed to respond to you and manage
          our business relationship, and are reviewed periodically. You may ask us to delete your
          information at any time.
        </p>
      </section>
      <section>
        <h2>6. Your rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal information, or
          withdraw consent to be contacted, at any time by contacting us through the contact form on
          this website.
        </p>
      </section>
      <section>
        <h2>7. Contact about privacy</h2>
        <p>
          For privacy questions or requests, use the contact form at{" "}
          <a href="/contact" className="text-gold underline underline-offset-2">/contact</a>
          {site.email ? <> or email {site.email}</> : null}. A dedicated privacy contact address will
          be published here when confirmed.
        </p>
      </section>
    </LegalLayout>
  );
}

export function Terms() {
  return (
    <LegalLayout
      title="Terms of Use"
      description="The terms governing use of the Kopala Media website."
      path="/terms"
      updated={UPDATED}
    >
      <section>
        <h2>1. Acceptance</h2>
        <p>
          By using this website you agree to these terms. If you do not agree, please do not use the
          website. These terms govern website use only; client projects are governed by individual
          written proposals and agreements.
        </p>
      </section>
      <section>
        <h2>2. Information on this website</h2>
        <p>
          Content is provided for general information. Prices shown are starting points; final
          investment is confirmed in a written proposal based on scope, integrations, content
          requirements, timeline and complexity. Descriptions of services do not constitute a binding
          offer.
        </p>
      </section>
      <section>
        <h2>3. Intellectual property</h2>
        <p>
          The Kopala Media name, logo, and website content are the property of {site.name} and may
          not be reproduced without written permission. Client work shown is displayed with client
          awareness.
        </p>
      </section>
      <section>
        <h2>4. Acceptable use</h2>
        <ul>
          <li>Do not misuse forms, attempt to disrupt the website, or submit false or misleading information.</li>
          <li>Do not scrape, copy, or republish content without permission.</li>
        </ul>
      </section>
      <section>
        <h2>5. Limitation of liability</h2>
        <p>
          This website is provided "as is". To the maximum extent permitted by law, {site.name} is
          not liable for indirect or consequential damages arising from use of this website.
        </p>
      </section>
      <section>
        <h2>6. Changes</h2>
        <p>
          We may update these terms; the "last updated" date above shows the current version.
          Continued use after changes constitutes acceptance.
        </p>
      </section>
    </LegalLayout>
  );
}

export function SmsTerms() {
  return (
    <LegalLayout
      title="SMS Terms & Consent"
      description="Terms governing SMS/text message communication from Kopala Media — applies only when SMS messaging is activated."
      path="/sms-terms"
      updated={UPDATED}
    >
      <section>
        <h2>Status of this page</h2>
        <p>
          Kopala Media does not currently send SMS/text message marketing or notifications. These
          terms are published in advance and take effect only if and when SMS communication is
          activated. When activated, SMS will always require separate, explicit opt-in consent.
        </p>
      </section>
      <section>
        <h2>1. Consent</h2>
        <p>
          SMS messages are sent only to individuals who have explicitly opted in — for example by
          checking a distinct SMS-consent box on a form. Consent to receive SMS is never a condition
          of purchasing services.
        </p>
      </section>
      <section>
        <h2>2. Message types and frequency</h2>
        <p>
          Messages may include appointment confirmations, reminders, and follow-up related to your
          inquiry or project. Frequency varies by interaction; we do not send high-volume marketing
          sequences.
        </p>
      </section>
      <section>
        <h2>3. Opt-out and help</h2>
        <p>
          Reply STOP to any message to opt out at any time. Reply HELP for assistance. After opting
          out you may still receive non-SMS communication related to an active project.
        </p>
      </section>
      <section>
        <h2>4. Costs and carriers</h2>
        <p>
          Message and data rates may apply depending on your mobile plan. Carriers are not liable for
          delayed or undelivered messages.
        </p>
      </section>
      <section>
        <h2>5. Privacy</h2>
        <p>
          Mobile numbers are handled per our <a href="/privacy" className="text-gold underline underline-offset-2">Privacy Policy</a> and
          are never sold or shared for third-party marketing.
        </p>
      </section>
    </LegalLayout>
  );
}

export function Accessibility() {
  return (
    <LegalLayout
      title="Accessibility Statement"
      description="Kopala Media's commitment to an accessible website, and how to report barriers."
      path="/accessibility"
      updated={UPDATED}
    >
      <section>
        <h2>Our commitment</h2>
        <p>
          {site.name} is committed to a website that is usable by everyone, including people using
          screen readers, keyboard navigation, voice control, or assistive technology. We design and
          build toward WCAG 2.2 Level AA practices.
        </p>
      </section>
      <section>
        <h2>Measures in place</h2>
        <ul>
          <li>Semantic HTML with logical heading structure and skip-navigation link</li>
          <li>Full keyboard operability, visible focus indicators, and focus management in menus and dialogs</li>
          <li>Labeled form fields with error summaries and screen-reader announcements</li>
          <li>Color contrast checked against WCAG AA ratios</li>
          <li>Reduced-motion support for users who prefer it</li>
          <li>Touch targets sized for mobile use and responsive layouts across devices</li>
          <li>Meaningful alternative text for images</li>
        </ul>
      </section>
      <section>
        <h2>Known limitations</h2>
        <p>
          Accessibility is ongoing work. If any third-party embeds are added in future (scheduling,
          maps, video), we will assess and document their accessibility here.
        </p>
      </section>
      <section>
        <h2>Feedback</h2>
        <p>
          If you encounter a barrier on this website, tell us through{" "}
          <a href="/contact" className="text-gold underline underline-offset-2">the contact form</a>{" "}
          with the page address and a description of the problem. We take accessibility reports
          seriously and aim to respond within 1–2 business days.
        </p>
      </section>
    </LegalLayout>
  );
}
