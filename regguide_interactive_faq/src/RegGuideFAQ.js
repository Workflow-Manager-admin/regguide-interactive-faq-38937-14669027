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
          borderRadius: 14,
          boxShadow:
            "0 2px 16px 0 rgba(26, 115, 232, 0.10), 0 1.5px 8px 0 rgba(60,64,67,0.04)",
          padding: "32px 24px 28px 24px",
          minHeight: 360
        }}
      >
        <h2
          style={{
            color: "var(--primary)",
            fontWeight: 700,
            fontSize: "2rem",
            marginBottom: 16,
            letterSpacing: 0.2
          }}
        >
          RegGuide Interactive FAQ
        </h2>
        <div style={{ color: "#70757A", marginBottom: 24 }}>
          Guided business registration help—find exact requirements for your case.
        </div>
        {/* Question Flow */}
        {step < QUESTIONS.length && (
          <div>
            {QUESTIONS.slice(0, step + 1).map((q, idx) => (
              <div
                key={q.id}
                style={{
                  marginBottom: 28,
                  borderLeft: "4px solid var(--primary)",
                  paddingLeft: 18,
                  background: idx === step ? "var(--secondary)" : "#fff",
                  borderRadius: 6,
                  transition: "background 0.2s"
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "1.17rem",
                    marginBottom: 12
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
                            : "#e0e9f9",
                        color:
                          answers[q.id] === opt.value
                            ? "#fff"
                            : "var(--primary)",
                        padding: "8px 18px",
                        marginRight: 16,
                        border: "none",
                        borderRadius: 6,
                        cursor:
                          answers[q.id] !== undefined || idx !== step
                            ? "not-allowed"
                            : "pointer",
                        fontWeight: 500,
                        transition: "all 0.18s"
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
                    fontWeight: 700,
                    color: "var(--primary)",
                    fontSize: "1.2rem",
                    marginBottom: 10,
                    marginTop: 16
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
                    fontWeight: 700,
                    color: "var(--primary)",
                    fontSize: "1.07rem",
                    marginTop: 32,
                    marginBottom: 8
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
                        marginBottom: 7,
                        fontSize: "1rem",
                        gap: 10,
                        listStyle: "none"
                      }}
                    >
                      <span role="img" aria-label="doc-icon">
                        {item.icon}
                      </span>
                      {item.label}
                    </li>
                  ))}
                </ul>
                {/* Issued Documents Summary */}
                <h3
                  style={{
                    fontWeight: 700,
                    color: "var(--accent)",
                    fontSize: "1.07rem",
                    marginTop: 32,
                    marginBottom: 8
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
                        marginBottom: 7,
                        fontSize: "1rem",
                        gap: 10,
                        listStyle: "none"
                      }}
                    >
                      <span role="img" aria-label="issued-doc">
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
              <div style={{ marginTop: 32, textAlign: "center" }}>
                <div style={{ color: "#EF6C00", fontWeight: 500, marginBottom: 18 }}>
                  Sorry, we couldn't find a tailored FAQ for your scenario.
                </div>
                <button className="btn" onClick={handleRestart}>
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
        background: "#fff",
        borderRadius: 7,
        marginBottom: 14,
        boxShadow: "0 0.5px 3px 0 rgba(26, 115, 232, 0.04)",
        border: "1px solid #e3e8f5",
        padding: 0
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
          color: "var(--primary)",
          fontWeight: 600,
          fontSize: "1rem",
          padding: "12px 18px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8
        }}
      >
        {open ? "▼" : "▶"} {q}
      </button>
      {open && (
        <div
          style={{
            color: "#244b66",
            background: "#f6f7fa",
            borderTop: "1px solid #e3e8f5",
            fontSize: "0.97rem",
            padding: "12px 18px 15px 32px"
          }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

export default RegGuideFAQ;
