import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Preview,
} from "@react-email/components";

type DepositPaidEmailProps = {
  customerName: string;
  quoteNumber: string;
  depositAmount: number;
};

export function DepositPaidEmail({
  customerName,
  quoteNumber,
  depositAmount,
}: DepositPaidEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Payment received for quote {quoteNumber}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Text style={header}>Pro Court Surfaces</Text>
          <Hr style={hr} />
          <Section>
            <Text style={greeting}>Hi {customerName},</Text>
            <Text style={paragraph}>
              We&apos;ve received your deposit payment for quote{" "}
              <strong>{quoteNumber}</strong>. Thank you!
            </Text>
            <Section style={amountBox}>
              <Text style={amountLabel}>Deposit Paid</Text>
              <Text style={amountValue}>
                ${depositAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </Text>
            </Section>
            <Text style={heading}>What&apos;s Next?</Text>
            <Text style={paragraph}>
              Our team will be in touch shortly to schedule your project. If you
              have any questions in the meantime, feel free to reply to this
              email or give us a call.
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

const heading = {
  fontSize: "18px",
  fontWeight: "bold" as const,
  color: "#1a5632",
  margin: "24px 0 8px 0",
};

const amountBox = {
  backgroundColor: "#f0faf4",
  border: "1px solid #1a5632",
  borderRadius: "8px",
  padding: "20px",
  textAlign: "center" as const,
  margin: "24px 0",
};

const amountLabel = {
  fontSize: "14px",
  color: "#555555",
  margin: "0 0 4px 0",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
};

const amountValue = {
  fontSize: "32px",
  fontWeight: "bold" as const,
  color: "#1a5632",
  margin: "0",
};

const footer = {
  fontSize: "13px",
  color: "#999999",
  textAlign: "center" as const,
  margin: "0",
};
