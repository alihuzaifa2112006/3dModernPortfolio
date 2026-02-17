import React, { useState, useRef } from "react";

const Contact: React.FC = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "a5864414-6cc2-4399-aa8a-9caf9196ede2");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setResult("Message sent successfully!");
        formRef.current?.reset();
      } else {
        setResult("Failed to send message. Please try again.");
      }
    } catch {
      setResult("Something went wrong. Please try again.");
    }

    setLoading(false);
    setTimeout(() => setResult(""), 4000);
  };

  return (
    <section
      id="contact"
      className="bg-white px-6 py-20 text-black md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-16 lg:flex-row">

          {/* LEFT SIDE */}
          <div className="w-full lg:w-5/12">
            <p className="mb-3 text-sm font-semibold tracking-widest text-[#c5f82a] uppercase">
              Get In Touch
            </p>

            <h2 className="text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
              Let's Work <span className="text-[#7c5cfc]">Together</span>
            </h2>

            <p className="mt-6 text-base leading-relaxed text-[#666]">
              Have a project in mind? Let's discuss how we can bring your ideas to life.
            </p>

            <div className="mt-8 space-y-5">
              {[
                {
                  icon:
                    "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z",
                  icon2: "22,6 12,13 2,6",
                  label: "Email",
                  value: "alihuzaifa2112006@gmail.com",
                },
                {
                  icon:
                    "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
                  label: "Phone",
                  value: "03178386880",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c5f82a]">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"
                    >
                      <path d={item.icon} />
                      {item.icon2 && <polyline points={item.icon2} />}
                    </svg>
                  </div>

                  <div>
                    <p className="text-sm text-[#888]">{item.label}</p>
                    <p className="font-semibold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="w-full lg:w-7/12">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">

              <div className="flex flex-col gap-5 sm:flex-row">
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Your Name"
                  className="flex-1 rounded-xl border border-[#e5e5e5] bg-[#f5f5f5] px-5 py-4 text-sm outline-none focus:border-[#c5f82a]"
                />

                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Your Email"
                  className="flex-1 rounded-xl border border-[#e5e5e5] bg-[#f5f5f5] px-5 py-4 text-sm outline-none focus:border-[#c5f82a]"
                />
              </div>

              <input
                name="subject"
                type="text"
                placeholder="Subject"
                className="w-full rounded-xl border border-[#e5e5e5] bg-[#f5f5f5] px-5 py-4 text-sm outline-none focus:border-[#c5f82a]"
              />

              <textarea
                name="message"
                rows={6}
                required
                placeholder="Your Message"
                className="w-full resize-none rounded-xl border border-[#e5e5e5] bg-[#f5f5f5] px-5 py-4 text-sm outline-none focus:border-[#c5f82a]"
              />

              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-[#c5f82a] px-8 py-4 text-sm font-semibold text-black transition-all hover:bg-[#d4ff4a] disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {result && (
                <p className={`mt-3 text-sm font-semibold ${result.includes("successfully") ? "text-green-600" : "text-red-500"}`}>
                  {result}
                </p>
              )}

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
