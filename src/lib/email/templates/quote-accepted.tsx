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

type QuoteAcceptedEmailProps = {
  quoteNumber: string;
  customerName: string;
  customerEmail: string;
  packageTier: string;
  totalPrice: number;
  depositPercent?: number;
  autoInvoiced?: boolean;
};

export function QuoteAcceptedEmail({
  quoteNumber,
  customerName,
  customerEmail,
  packageTier,
  totalPrice,
  depositPercent = 30,
  autoInvoiced = false,
}: QuoteAcceptedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Quote {quoteNumber} was accepted by {customerName}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Text style={header}>Pro Court Surfaces</Text>
          <Hr style={hr} />
          <Section>
            <Text style={heading}>Quote Accepted!</Text>
            <Text style={paragraph}>
              <strong>{quoteNumber}</strong> was accepted by{" "}
              <strong>{customerName}</strong>.
            </Text>
            <Section style={detailsBox}>
              <Text style={detailRow}>
                <strong>Customer:</strong> {customerName} ({customerEmail})
              </Text>
              <Text style={detailRow}>
                <strong>Package:</strong> {packageTier}
              </Text>
              <Text style={detailRow}>
                <strong>Total:</strong> ${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </Text>
              <Text style={detailRow}>
                <strong>Deposit ({depositPercent}%):</strong> ${((totalPrice * depositPercent) / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </Text>
            </Section>
            <Text style={paragraph}>
              {autoInvoiced
                ? `A Stripe invoice for the ${depositPercent}% deposit has been created and sent to the customer. Log in to the admin dashboard to view details.`
                : `ACTION NEEDED: Send the ${depositPercent}% deposit invoice to the customer manually. (Automatic invoicing is off.)`}
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

const heading = {
  fontSize: "20px",
  fontWeight: "bold" as const,
  color: "#1a5632",
  margin: "0 0 16px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#333333",
  margin: "16px 0",
};

const detailsBox = {
  backgroundColor: "#f9f9f9",
  padding: "16px 20px",
  borderRadius: "6px",
  margin: "16px 0",
};

const detailRow = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#333333",
  margin: "0",
};

const footer = {
  fontSize: "13px",
  color: "#999999",
  textAlign: "center" as const,
  margin: "0",
};
