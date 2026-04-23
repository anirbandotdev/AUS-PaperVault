import { motion } from "framer-motion";
import {
  Heart,
  Copy,
  CheckCircle2,
  QrCode,
  Smartphone,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import QRCode from "qrcode";
import { pageVariants, pageTransition } from "../lib/animations";
import "./DonatePage.css";

// ─── UPDATE THESE WITH YOUR REAL DETAILS ───
const UPI_ID = import.meta.env.VITE_UPI_ID;
const UPI_NAME = import.meta.env.VITE_UPI_NAME;
// ────────────────────────────────────────────

export default function DonatePage() {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState(null);

  useEffect(() => {
    if (!UPI_ID) return;
    const upiUrl = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(UPI_NAME || "AUS PaperVault")}`;
    QRCode.toDataURL(upiUrl, {
      width: 280,
      margin: 2,
      color: { dark: "#000000", light: "#ffffff" },
      errorCorrectionLevel: "H",
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error("QR generation failed:", err));
  }, []);

  const handleCopyUPI = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      toast.success("UPI ID copied!", { description: "Paste it in your payment app." });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <motion.div
      className="page-enter"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="container-vault donate-wrapper">
        {/* ── Title ── */}
        <div className="donate-title-section">
          <div className="donate-badge">
            <Heart size={14} />
            Support Us
          </div>
          <h1 className="donate-title">Help Keep PaperVault Running</h1>
          <p className="donate-subtitle">
            AUS PaperVault is completely free. Your donation helps us cover
            server costs, maintain the platform, and keep building new features
            for everyone.
          </p>
        </div>

        {/* ── Cards ── */}
        <div className="donate-grid">
          {/* QR Code Card */}
          <div className="donate-card glass-card">
            <div className="donate-card-header">
              <QrCode size={18} />
              <h2>Scan QR Code</h2>
            </div>
            <p className="donate-card-desc">
              Open any UPI app (GPay, PhonePe, Paytm) and scan this code to
              donate.
            </p>
            <div className="donate-qr-container">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="UPI QR Code"
                  className="donate-qr-image"
                />
              ) : (
                <div className="donate-qr-loading">
                  Generating QR...
                </div>
              )}
            </div>
          </div>

          {/* UPI ID Card */}
          <div className="donate-card glass-card">
            <div className="donate-card-header">
              <Smartphone size={18} />
              <h2>Pay via UPI ID</h2>
            </div>
            <p className="donate-card-desc">
              Copy the UPI ID below and paste it in your payment app to send
              any amount you'd like.
            </p>

            <div className="donate-upi-box">
              <span className="donate-upi-label">UPI ID</span>
              <div className="donate-upi-row">
                <code className="donate-upi-id">
                  {UPI_ID
                    ? UPI_ID.replace(/^(.{4})(.*)(@.*)$/, (_, start, middle, domain) =>
                        start + "•".repeat(Math.min(middle.length, 8)) + domain
                      )
                    : "Not configured"}
                </code>
                <button
                  onClick={handleCopyUPI}
                  className="donate-copy-btn"
                  title="Copy UPI ID"
                >
                  {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            <div className="donate-upi-name">
              <span>Payee:</span>
              <strong>{UPI_NAME}</strong>
            </div>

            <div className="donate-steps">
              <h3>How to pay</h3>
              <ol>
                <li>Open any UPI app (GPay, PhonePe, Paytm, etc.)</li>
                <li>Select "Send Money" or "Pay"</li>
                <li>Enter the UPI ID above</li>
                <li>Enter any amount and send</li>
              </ol>
            </div>
          </div>
        </div>

        {/* ── Footer Note ── */}
        <div className="donate-footer-note">
          <Heart size={14} />
          <span>
            Every contribution, big or small, makes a difference. Thank you for
            supporting AUS PaperVault!
          </span>
        </div>
      </div>
    </motion.div>
  );
}
