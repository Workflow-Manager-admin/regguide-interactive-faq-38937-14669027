import React, { useState } from "react";

// PUBLIC_INTERFACE
function RegGuideFAQ() {
  /**
   * RegGuideFAQ is the main container component for the Interactive FAQ.
   * This redesign transforms it from a form-like flow into a welcoming, professional website experience
   * with a rich header, clear sectioning, branding, and polished business-friendly styles.
   *
   * Key features:
   * - Prominent site header (via App.js layout)
   * - Distinct content wrapper with light, bright, professional look
   * - Sectioned content: Introduction, Guided Q&A, FAQ Answers, Checklist, Issued Docs
   * - Brand colors: primary (#1A73E8), secondary (#F1F3F4), accent (#34A853)
   * - Ample whitespace, rounded cards, no "form" or survey appearance
   * - Friendly yet trustworthy design with wellness and clarity
   */

  // Guided questions
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

  // FAQ/Scenarios data
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
    // ... extend more as needed
  };

  // State: track answers and progression
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);

  function handleSelectAnswer(questionId, value) {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    if (step < QUESTIONS.length) {
      setStep(step + 1);
    }
  }

  function handleRestart() {
    setAnswers({});
    setStep(0);
  }

  // Derive scenario key for display
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

  // Layout main content wrapper and styles
  return (
    <div className="regguide-website" style={{
      background: "var(--secondary)",
      minHeight: "calc(100vh - 72px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: 56,
      paddingBottom: 60
    }}>
      {/* Hero Intro Section */}
      <section
        className="regguide-hero"
        style={{
          width: "100%",
          background: "linear-gradient(90deg, #f8fafc 60%, #eaf4ff 100%)",
          borderRadius: "1.5rem",
          boxShadow: "0 3px 24px rgba(26,115,232,0.08)",
          padding: "44px 0 32px 0",
          maxWidth: 950,
          margin: "0 auto 30px auto",
        }}
      >
        <div className="regguide-hero-contain" style={{textAlign: "center", width: "90%", margin: "0 auto"}}>
          <div style={{
            fontWeight: 800,
            color: "var(--primary)",
            fontSize: "2.1rem",
            letterSpacing: 0.03,
          }}>
            RegGuide Interactive Registration FAQ
          </div>
          <div style={{
            fontSize: "1.18rem",
            marginTop: 10,
            color: "#2365A2",
            maxWidth: 500,
            marginLeft: "auto",
            marginRight: "auto",
            fontWeight: 400,
            textShadow: "0 1px 6px rgba(38,132,223,0.03)"
          }}>
            Friendly, step-by-step guidance to help you successfully register your business or organization—see FAQs, documents,
            and requirements in one place for your unique case.
          </div>
        </div>
      </section>

      {/* Main Q&A and Results Flow */}
      <main style={{
        width: "100%",
        maxWidth: 950,
        background: "#fff",
        boxShadow: "0 3px 18px rgba(60,130,200,0.11)",
        borderRadius: "1.5rem",
        minHeight: 470,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "42px 22px 36px 22px"
      }}>
        {/* Section: Guided Q&A */}
        <section
          style={{
            width: "100%",
            maxWidth: 540,
            margin: "0 auto",
            marginBottom: step === QUESTIONS.length ? 38 : 18,
            paddingBottom: step < QUESTIONS.length ? 16 : 0,
            borderBottom: step === QUESTIONS.length ? "1.6px solid #e7eef7" : "none",
            transition: "border 0.25s"
          }}
        >
          <div style={{
            fontSize: "1.16rem",
            color: "#19457d",
            fontWeight: 700,
            marginBottom: step < QUESTIONS.length ? 24 : 8,
            letterSpacing: 0.07
          }}>
            {step < QUESTIONS.length
              ? "Guided Question Flow"
              : "Your Answers"}
          </div>
          {/* Show progressive/horizontal questions, not stacked vertically like a form */}
          <div>
            {QUESTIONS.slice(0, step + 1).map((q, idx) => (
              <div
                key={q.id}
                style={{
                  background: idx === step && step !== QUESTIONS.length ? "#f4f8fb" : "#fcfdff",
                  marginBottom: 28,
                  padding: "16px 22px",
                  borderRadius: 14,
                  border: idx === step && step !== QUESTIONS.length
                    ? "2px solid var(--primary)"
                    : "1.25px solid #d7e3f6",
                  boxShadow: idx === step
                    ? "0 2px 10px 0 rgba(26, 115, 232, 0.055)"
                    : "none",
                  position: "relative"
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "1.13rem",
                    color: "#19457d",
                    marginBottom: 13,
                  }}
                >
                  <span style={{
                    fontWeight: 900,
                    color: "#1b5acc",
                    background: "#e9f2fa",
                    borderRadius: "50%",
                    fontSize: "1.04em",
                    padding: "3px 11px",
                    marginRight: 10,
                  }}>{idx + 1}</span>
                  {q.question}
                </div>
                <div style={{ display: "flex", gap: 14 }}>
                  {q.options.map(opt => (
                    <button
                      key={opt.value}
                      className="regguide-choice-btn"
                      onClick={() => handleSelectAnswer(q.id, opt.value)}
                      disabled={
                        answers[q.id] !== undefined ||
                        idx !== step
                      }
                      style={{
                        background:
                          answers[q.id] === opt.value
                            ? "var(--primary)"
                            : "#f6faff",
                        color:
                          answers[q.id] === opt.value
                            ? "#fff"
                            : "#164060",
                        border: answers[q.id] === opt.value
                          ? "2px solid #1763ca"
                          : "1.5px solid #bbe5ff",
                        borderRadius: 10,
                        fontWeight: 600,
                        fontSize: "1.04rem",
                        padding: "10px 26px",
                        boxShadow: answers[q.id] === opt.value
                          ? "0 0 0 2.5px #1A73E8"
                          : undefined,
                        cursor:
                          answers[q.id] !== undefined || idx !== step
                            ? "not-allowed"
                            : "pointer",
                        opacity:
                          answers[q.id] !== undefined &&
                          answers[q.id] !== opt.value
                            ? 0.55
                            : 1,
                        transition: "all 0.14s"
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {/* When all answered, show chosen answer without extra UI */}
                {step === QUESTIONS.length && answers[q.id] && (
                  <div
                    style={{
                      marginTop: 9,
                      fontSize: "1.07rem",
                      color: "#28743f",
                      background: "#eaf7ed",
                      borderRadius: 7,
                      padding: "6px 12px",
                      display: "inline-block"
                    }}
                  >
                    <span style={{
                      marginRight: 8,
                      fontWeight: 600,
                      fontSize: "1.04em",
                    }}>
                      ✓
                    </span>
                    {q.options.find(opt => opt.value === answers[q.id]).label}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section: FAQ/Checklist/Results */}
        {step === QUESTIONS.length && (
          <section
            className="regguide-results"
            style={{
              width: "100%",
              maxWidth: 540,
              margin: "0 auto",
              background: "#f7fafb",
              borderRadius: 18,
              boxShadow: "0 2.5px 12px rgba(170,210,255,0.06)",
              padding: "28px 18px 18px 22px",
              marginTop: 24
            }}
          >
            {scenarioContent ? (
              <div>
                {/* FAQ Section */}
                <div style={{
                  fontSize: "1.03rem",
                  fontWeight: 800,
                  color: "var(--primary)",
                  marginBottom: 14,
                  letterSpacing: 0.04
                }}>
                  Key FAQ for Your Scenario
                </div>
                <div>
                  {scenarioContent.faq.map((faqItem, idx) => (
                    <CollapsibleFAQItem key={idx} q={faqItem.q} a={faqItem.a} />
                  ))}
                </div>
                {/* Checklist */}
                <div style={{
                  fontWeight: 800,
                  color: "#145b7a",
                  fontSize: "1.03rem",
                  marginTop: 32,
                  marginBottom: 11
                }}>
                  Document Checklist
                </div>
                <ul style={{
                  listStyle: "none",
                  paddingLeft: 0,
                  margin: 0
                }}>
                  {scenarioContent.checklist.map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 8,
                        fontSize: "1.045rem",
                        fontWeight: 500,
                        color: "#184c60",
                        gap: 13
                      }}
                    >
                      <span role="img" aria-label="doc-icon" style={{
                        fontSize: "1.18em"
                      }}>
                        {item.icon}
                      </span>
                      {item.label}
                    </li>
                  ))}
                </ul>
                {/* Issued Summary */}
                <div style={{
                  fontWeight: 800,
                  color: "var(--accent)",
                  fontSize: "1.03rem",
                  marginTop: 28,
                  marginBottom: 8
                }}>
                  What You'll Receive
                </div>
                <ul style={{
                  listStyle: "none",
                  paddingLeft: 0,
                  margin: 0
                }}>
                  {scenarioContent.issued.map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 8,
                        fontSize: "1.025rem",
                        fontWeight: 500,
                        color: "#247b42",
                        gap: 13
                      }}>
                      <span role="img" aria-label="issued-doc" style={{
                        fontSize: "1.15em"
                      }}>{item.icon}</span>
                      {item.label}
                    </li>
                  ))}
                </ul>
                {/* CTA */}
                <div style={{
                  display: 'flex', justifyContent: "center", marginTop: 34
                }}>
                  <button
                    className="btn"
                    style={{
                      background: "var(--accent)",
                      color: "#fff",
                      fontWeight: 700,
                      padding: "12px 36px",
                      borderRadius: 9,
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
                    padding: "12px 36px",
                    borderRadius: 9,
                    border: "none"
                  }}
                >
                  Choose Again
                </button>
              </div>
            )}
          </section>
        )}

        {/* Add a touch of extra whitespace below */}
        <div style={{ height: 12 }} />
      </main>
    </div>
  );
}

/**
 * Collapsible FAQ Item, business-style with subtle expansion
 * PUBLIC_INTERFACE
 */
function CollapsibleFAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: open ? "#e8f4fd" : "#fff",
        borderRadius: 10,
        marginBottom: 14,
        boxShadow: "0 1.5px 6px 0 rgba(26, 115, 232, 0.06)",
        border: open
          ? "1.6px solid var(--primary)"
          : "1px solid #cddbef",
        transition: "background 0.17s, border 0.17s"
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
          fontSize: "1.02rem",
          padding: open ? "14px 22px 8px 17px" : "13px 24px 13px 17px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 10,
          outline: "none",
          borderRadius: 10
        }}
      >
        <span
          style={{
            color: open ? "var(--primary)" : "#c0d1e6",
            fontSize: "1.17em",
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
            color: "#194368",
            background: "#f5fafc",
            borderTop: "1px solid #c5dbfa",
            fontSize: "1.03rem",
            lineHeight: 1.62,
            padding: "10px 17px 15px 32px",
            borderRadius: "0 0 10px 10px"
          }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

export default RegGuideFAQ;
