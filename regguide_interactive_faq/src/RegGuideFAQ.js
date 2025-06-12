import React, { useState } from "react";

// PUBLIC_INTERFACE
function RegGuideFAQ() {
  /**
   * RegGuideFAQ is the main container component for the RegGuide Interactive FAQ.
   * It implements a guided, step-by-step FAQ for business/company registration,
   * revealing answers and checklists tailored to user choices.
   *
   * Color Scheme: #1A73E8 (primary), #F1F3F4 (secondary), #34A853 (accent)
   * Theme: Light, minimalist, ample white space, conversational step UI.
   */
  // Demo static data for questions, FAQ, documents (in real use, might be fetched from backend)
  const QUESTIONS = [
    {
      id: "type",
      question: "What type of registration are you interested in?",
      options: [
        { value: "company", label: "Company" },
        { value: "partnership", label: "Partnership" },
        { value: "ngo", label: "Nonprofit / NGO" }
      ]
    },
    {
      id: "location",
      question: "Is your business local or overseas?",
      options: [
        { value: "local", label: "Local" },
        { value: "overseas", label: "Overseas" }
      ]
    },
    {
      id: "businessType",
      question: "Please choose your business activity",
      options: [
        { value: "trading", label: "Trading" },
        { value: "consultancy", label: "Consultancy" },
        { value: "manufacturing", label: "Manufacturing" }
      ]
    }
  ];

  // Example: Decision tree logic for FAQ and documents
  const FAQ_DATA = {
    "company-local-trading": {
      faq: [
        {
          q: "What forms do I need?",
          a: "You need Form A1 (registration), Memorandum of Association, and proof of address."
        },
        {
          q: "How long does registration take?",
          a: "Typically 3-5 business days if all documents are complete."
        }
      ],
      checklist: [
        { label: "Completed Form A1", icon: "📝" },
        { label: "Memorandum of Association (signed)", icon: "📄" },
        { label: "Directors' partnership agreement", icon: "🤝" },
        { label: "Proof of registered business address", icon: "🏢" }
      ],
      issued: [
        { label: "Certificate of Incorporation", icon: "🎫" }
      ]
    },
    "company-local-consultancy": {
      faq: [
        {
          q: "What are the minimum requirements?",
          a: "At least one director, proof of address, and completed application form."
        }
      ],
      checklist: [
        { label: "Company Application Form", icon: "📝" },
        { label: "Identity Documents for director(s)", icon: "🆔" },
        { label: "Office Lease/Utility Bill", icon: "🏢" }
      ],
      issued: [
        { label: "Certificate of Incorporation", icon: "🎫" },
        { label: "Tax Identification Number", icon: "🧾" }
      ]
    },
    "company-overseas-trading": {
      faq: [
        {
          q: "Do I need a local address?",
          a: "Yes, all overseas companies must maintain a local registered address."
        }
      ],
      checklist: [
        { label: "Overseas Incorporation Certificate", icon: "🏷️" },
        { label: "Local Registered Address Proof", icon: "🏢" }
      ],
      issued: [
        { label: "Branch Licence", icon: "🏛️" }
      ]
    },
    "ngo-local-trading": {
      faq: [
        {
          q: "How do I register an NGO for trading activities?",
          a: "You must include a detailed business plan and board resolution."
        }
      ],
      checklist: [
        { label: "NGO Registration Form", icon: "📝" },
        { label: "Board Resolution", icon: "📋" },
        { label: "Detailed Business Plan", icon: "📊" }
      ],
      issued: [
        { label: "NGO Registration Certificate", icon: "📜" }
      ]
    }
    // ... add more scenarios here as needed
  };

  // State: answers for each question step, completion status
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);

  // Helper: handle answer selection
  function handleSelectAnswer(questionId, value) {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    if (step < QUESTIONS.length) {
      setStep(step + 1);
    }
  }

  // Helper: reset all to start again
  function handleRestart() {
    setAnswers({});
    setStep(0);
  }

  // Compose key for FAQ_DATA lookup based on all answered questions
  function getScenarioKey() {
    if (
      answers.type &&
      answers.location &&
      answers.businessType
    ) {
      return `${answers.type}-${answers.location}-${answers.businessType}`;
    }
    return null;
  }
  const scenarioKey = getScenarioKey();
  const scenarioContent = scenarioKey && FAQ_DATA[scenarioKey];

  // UI Custom styles (as inline to match color requirements and theme if CSS not updated)
  const styleVars = {
    "--primary": "#1A73E8",
    "--secondary": "#F1F3F4",
    "--accent": "#34A853"
  };

  // PUBLIC_INTERFACE
  return (
    <div className="regguide-faq-root" style={styleVars}>
      {/* Main centered card/modal */}
      <div
        className="regguide-faq-card"
        style={{
          margin: "64px auto",
          background: "var(--secondary)",
          maxWidth: 480,
          borderRadius: 18,
          boxShadow:
            "0 4px 28px 0 rgba(26, 115, 232, 0.12), 0 2px 12px 0 rgba(60,64,67,0.05)",
          padding: "40px 28px 32px 28px",
          minHeight: 360,
          border: "1.5px solid #e0e5eb"
        }}
      >
        <h2
          style={{
            color: "var(--primary)",
            fontWeight: 800,
            fontSize: "2.3rem",
            marginBottom: 14,
            letterSpacing: 0.2,
            textShadow: "0 1px 4px rgba(26,115,232,0.08)"
          }}
        >
          RegGuide Interactive FAQ
        </h2>
        <div style={{ color: "#244b66", marginBottom: 24, fontWeight: 500 }}>
          Guided business registration help—find exact requirements for your case.
        </div>
        {/* Question Flow */}
        {step < QUESTIONS.length && (
          <div>
            {QUESTIONS.slice(0, step + 1).map((q, idx) => (
              <div
                key={q.id}
                style={{
                  marginBottom: 30,
                  borderLeft: "4px solid var(--primary)",
                  paddingLeft: 18,
                  background: idx === step ? "var(--secondary)" : "#fbfcfd",
                  borderRadius: 9,
                  transition: "background 0.2s",
                  border: idx === step ? "1.5px solid var(--primary)" : "1px solid #d7e3f6",
                  boxShadow:
                    idx === step
                      ? "0 2px 8px 0 rgba(26, 115, 232, 0.07)"
                      : "none"
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "1.18rem",
                    marginBottom: 12,
                    color: "#19457d"
                  }}
                >
                  {q.question}
                </div>
                <div>
                  {q.options.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelectAnswer(q.id, opt.value)}
                      disabled={
                        answers[q.id] !== undefined || idx !== step
                      }
                      style={{
                        background:
                          answers[q.id] === opt.value
                            ? "var(--primary)"
                            : "#edf2fa",
                        color:
                          answers[q.id] === opt.value
                            ? "#fff"
                            : "#19457d",
                        padding: "9px 22px",
                        marginRight: 16,
                        marginBottom: 6,
                        border: answers[q.id] === opt.value
                          ? "2px solid #1763ca"
                          : "1.5px solid #b1caee",
                        borderRadius: 7,
                        boxShadow: answers[q.id] === opt.value
                          ? "0 0 0 1.5px #1A73E8"
                          : undefined,
                        cursor:
                          answers[q.id] !== undefined || idx !== step
                            ? "not-allowed"
                            : "pointer",
                        fontWeight: 600,
                        fontSize: "1rem",
                        opacity: answers[q.id] !== undefined && answers[q.id] !== opt.value ? 0.67 : 1,
                        transition: "all 0.15s"
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {/* FAQ and Checklist after all questions are answered */}
        {step === QUESTIONS.length && (
          <div style={{ marginTop: 10 }}>
            {scenarioContent ? (
              <div>
                {/* Dynamic FAQ Section */}
                <h3
                  style={{
                    fontWeight: 800,
                    color: "var(--primary)",
                    fontSize: "1.27rem",
                    marginBottom: 12,
                    marginTop: 20,
                    letterSpacing: 0.05
                  }}
                >
                  Frequently Asked for Your Registration
                </h3>
                <div>
                  {scenarioContent.faq.map((faqItem, idx) => (
                    <CollapsibleFAQItem key={idx} q={faqItem.q} a={faqItem.a} />
                  ))}
                </div>
                {/* Document Checklist */}
                <h3
                  style={{
                    fontWeight: 800,
                    color: "#164995",
                    fontSize: "1.13rem",
                    marginTop: 38,
                    marginBottom: 10,
                    letterSpacing: 0.01
                  }}
                >
                  Document Checklist
                </h3>
                <ul style={{ paddingLeft: 0 }}>
                  {scenarioContent.checklist.map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 9,
                        fontSize: "1.03rem",
                        fontWeight: 500,
                        gap: 12,
                        listStyle: "none",
                        color: "#214368"
                      }}
                    >
                      <span role="img" aria-label="doc-icon" style={{fontSize: "1.16em"}}>
                        {item.icon}
                      </span>
                      {item.label}
                    </li>
                  ))}
                </ul>
                {/* Issued Documents Summary */}
                <h3
                  style={{
                    fontWeight: 800,
                    color: "var(--accent)",
                    fontSize: "1.13rem",
                    marginTop: 34,
                    marginBottom: 10,
                    letterSpacing: 0.01
                  }}
                >
                  What You'll Get
                </h3>
                <ul style={{ paddingLeft: 0 }}>
                  {scenarioContent.issued.map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 9,
                        fontSize: "1.025rem",
                        fontWeight: 500,
                        gap: 12,
                        listStyle: "none",
                        color: "#28743f"
                      }}
                    >
                      <span role="img" aria-label="issued-doc" style={{fontSize: "1.16em"}}>
                        {item.icon}
                      </span>
                      {item.label}
                    </li>
                  ))}
                </ul>
                {/* Call to Action / Restart */}
                <div style={{ textAlign: "center", marginTop: 32 }}>
                  <button
                    className="btn"
                    style={{
                      background: "var(--accent)",
                      color: "#fff",
                      fontWeight: 700,
                      padding: "12px 32px",
                      borderRadius: 7,
                      border: "none"
                    }}
                    onClick={handleRestart}
                  >
                    Start Over
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: 40, textAlign: "center" }}>
                <div style={{ color: "#d45613", fontWeight: 600, marginBottom: 20, fontSize: "1.1rem" }}>
                  Sorry, we couldn't find a tailored FAQ for your scenario.
                </div>
                <button
                  className="btn"
                  onClick={handleRestart}
                  style={{
                    background: "var(--primary)",
                    color: "#fff",
                    fontWeight: 700,
                    padding: "12px 32px",
                    borderRadius: 7,
                    border: "none"
                  }}
                >
                  Choose Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Minimal extra space for white-space look */}
      <div style={{ height: 36 }} />
    </div>
  );
}

/**
 * Collapsible FAQ Item: Small expand/collapse for each FAQ question/answer
 * (Progressive disclosure)
 */
function CollapsibleFAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  // PUBLIC_INTERFACE
  return (
    <div
      style={{
        background: open ? "#e8f0fe" : "#fff",
        borderRadius: 8,
        marginBottom: 16,
        boxShadow: "0 1.5px 7px 0 rgba(26, 115, 232, 0.06)",
        border: open
          ? "1.7px solid var(--primary)"
          : "1px solid #cddbef",
        transition: "background 0.13s, border 0.13s"
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          background: "none",
          border: "none",
          width: "100%",
          textAlign: "left",
          color: "#17417c",
          fontWeight: 600,
          fontSize: "1.03rem",
          padding: open ? "13px 22px 8px 16px" : "12px 22px 12px 16px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 9,
          outline: "none",
          borderRadius: 8
        }}
      >
        <span
          style={{
            color: open ? "var(--primary)" : "#b5bfd0",
            fontSize: "1.03em",
            marginRight: 1
          }}
        >
          {open ? "▼" : "▶"}
        </span>
        <span>{q}</span>
      </button>
      {open && (
        <div
          style={{
            color: "#1f364d",
            background: "#f5fafc",
            borderTop: "1px solid #c5dbfa",
            fontSize: "1.035rem",
            lineHeight: 1.62,
            padding: "11px 18px 15px 36px",
            borderRadius: "0 0 8px 8px"
          }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

export default RegGuideFAQ;
