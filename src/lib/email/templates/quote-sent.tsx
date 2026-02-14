import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Preview,
} from "@react-email/components";

type QuoteSentEmailProps = {
  customerName: string;
  quoteNumber: string;
  quoteUrl: string;
  coverNote?: string | null;
};

export function QuoteSentEmail({
  customerName,
  quoteNumber,
  quoteUrl,
  coverNote,
}: QuoteSentEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your quote from Pro Court Surfaces is ready</Preview>
      <Body style={body}>
        <Container style={container}>
          <Text style={header}>Pro Court Surfaces</Text>
          <Hr style={hr} />
          <Section>
            <Text style={greeting}>Hi {customerName},</Text>
            <Text style={paragraph}>
              Your quote <strong>{quoteNumber}</strong> is ready for review.
              Click the button below to view your quote, choose your preferred
              package, and accept online.
            </Text>
            {coverNote && (
              <Section style={noteBox}>
                <Text style={noteText}>{coverNote}</Text>
              </Section>
            )}
            <Section style={buttonSection}>
              <Button style={button} href={quoteUrl}>
                View Your Quote
              </Button>
            </Section>
            <Text style={paragraph}>
              If you have any questions, feel free to reply to this email or give
              us a call.
            </Text>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>Pro Court Surfaces — Austin, TX</Text>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: "#f6f6f6",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "32px",
  maxWidth: "600px",
  borderRadius: "8px",
};

const header = {
  fontSize: "24px",
  fontWeight: "bold" as const,
  color: "#1a5632",
  margin: "0 0 16px 0",
};

const hr = {
  borderColor: "#e5e5e5",
  margin: "20px 0",
};

const greeting = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#333333",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#333333",
  margin: "16px 0",
};

const noteBox = {
  backgroundColor: "#f9f9f9",
  borderLeft: "4px solid #1a5632",
  padding: "12px 16px",
  margin: "16px 0",
};

const noteText = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#555555",
  margin: "0",
  fontStyle: "italic" as const,
};

const buttonSection = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#1a5632",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold" as const,
  padding: "14px 32px",
  borderRadius: "6px",
  textDecoration: "none",
};

const footer = {
  fontSize: "13px",
  color: "#999999",
  textAlign: "center" as const,
  margin: "0",
};
