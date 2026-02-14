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

type BalanceDueEmailProps = {
  customerName: string;
  quoteNumber: string;
  balanceAmount: number;
  invoiceUrl: string;
};

export function BalanceDueEmail({
  customerName,
  quoteNumber,
  balanceAmount,
  invoiceUrl,
}: BalanceDueEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Remaining balance due for quote {quoteNumber}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Text style={header}>Pro Court Surfaces</Text>
          <Hr style={hr} />
          <Section>
            <Text style={greeting}>Hi {customerName},</Text>
            <Text style={paragraph}>
              The remaining balance for quote <strong>{quoteNumber}</strong> is
              now due. Please click the button below to complete your payment.
            </Text>
            <Section style={amountBox}>
              <Text style={amountLabel}>Balance Due</Text>
              <Text style={amountValue}>
                ${balanceAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </Text>
            </Section>
            <Section style={buttonSection}>
              <Button style={button} href={invoiceUrl}>
                Pay Now
              </Button>
            </Section>
            <Text style={paragraph}>
              If you have any questions about this invoice, please don&apos;t
              hesitate to reach out.
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

const amountBox = {
  backgroundColor: "#fef9f0",
  border: "1px solid #d4a056",
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
  color: "#d4a056",
  margin: "0",
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
