import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Img,
  Hr,
  Preview,
} from "@react-email/components";

interface LeadWelcomeEmailProps {
  firstName: string;
  leadId: string;
}

export function LeadWelcomeEmail({ firstName, leadId }: LeadWelcomeEmailProps) {
  const assessmentUrl = `https://www.procourtsurfaces.com/assessment/${leadId}`;

  return (
    <Html>
      <Head />
      <Preview>
        Thanks for reaching out, {firstName} - Pro Court Surfaces
      </Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={logoSection}>
            <Img
              src="https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto/v1767487583/pro_court_logo_full_color_no_bg_2_owjtqf.png"
              alt="Pro Court Surfaces"
              width={180}
              height={45}
            />
          </Section>

          <Section style={content}>
            <Text style={heading}>Hey {firstName},</Text>

            <Text style={paragraph}>
              Thanks for reaching out to Pro Court Surfaces! I got your info and
              will follow up personally within 24 hours.
            </Text>

            <Text style={paragraph}>
              For immediate or urgent quotes, give me a call anytime:
            </Text>

            <Text style={phoneNumber}>
              <Link href="tel:+15128930466" style={phoneLink}>
                (512) 893-0466
              </Link>
            </Text>

            <Hr style={divider} />

            <Text style={paragraph}>
              Want to speed things up? Fill out a quick court assessment so I can
              give you a more accurate estimate right away:
            </Text>

            <Section style={ctaSection}>
              <Link href={assessmentUrl} style={ctaButton}>
                Complete Court Assessment
              </Link>
            </Section>

            <Text style={smallText}>
              This step is totally optional — I can gather everything when we
              talk. But if you have 2 minutes, it helps me prep a better quote
              for you.
            </Text>

            <Hr style={divider} />

            <Text style={paragraph}>
              In the meantime, check out some of our recent work:
            </Text>

            <Text style={paragraph}>
              <Link
                href="https://www.procourtsurfaces.com/#portfolio"
                style={link}
              >
                View Our Portfolio →
              </Link>
            </Text>
          </Section>

          <Section style={signature}>
            <Text style={signatureName}>Patrick Johnson</Text>
            <Text style={signatureDetails}>
              Pro Court Surfaces — Founder
              <br />
              Austin, TX 78704
              <br />
              (512) 893-0466 |{" "}
              <Link
                href="mailto:patrick@procourtsurfaces.com"
                style={link}
              >
                patrick@procourtsurfaces.com
              </Link>
              <br />
              <Link href="https://www.procourtsurfaces.com" style={link}>
                www.procourtsurfaces.com
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "0",
  maxWidth: "580px",
  borderRadius: "8px",
  overflow: "hidden" as const,
};

const logoSection = {
  backgroundColor: "#003278",
  padding: "24px 40px",
  textAlign: "center" as const,
};

const content = {
  padding: "32px 40px 16px",
};

const heading = {
  fontSize: "20px",
  fontWeight: "600",
  color: "#2c2c2c",
  margin: "0 0 16px",
};

const paragraph = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#4a4a4a",
  margin: "0 0 16px",
};

const phoneNumber = {
  textAlign: "center" as const,
  margin: "8px 0 16px",
};

const phoneLink = {
  fontSize: "22px",
  fontWeight: "700",
  color: "#004AAD",
  textDecoration: "none",
};

const divider = {
  borderColor: "#e6e6e6",
  margin: "24px 0",
};

const ctaSection = {
  textAlign: "center" as const,
  margin: "24px 0",
};

const ctaButton = {
  backgroundColor: "#004AAD",
  color: "#ffffff",
  padding: "14px 32px",
  borderRadius: "8px",
  fontSize: "15px",
  fontWeight: "600",
  textDecoration: "none",
  display: "inline-block",
};

const smallText = {
  fontSize: "13px",
  color: "#888",
  lineHeight: "1.5",
  margin: "0 0 8px",
};

const link = {
  color: "#004AAD",
  textDecoration: "none",
};

const signature = {
  padding: "0 40px 32px",
};

const signatureName = {
  fontSize: "15px",
  fontWeight: "600",
  color: "#2c2c2c",
  margin: "0 0 4px",
};

const signatureDetails = {
  fontSize: "13px",
  lineHeight: "1.6",
  color: "#888",
  margin: "0",
};
