import { ArrowRight, GraduationCap } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import SEOHead from "@/components/shared/SEOHead";
import records from "@/data/education-records.json";

const categories = [
  {
    title: "School & secondary education",
    description: "School qualifications and early education.",
  },
  {
    title: "Executive & professional education",
    description: "Executive education, professional certificates and specialist study.",
  },
  {
    title: "Entrepreneurship programs",
    description: "Founder and startup accelerator programs, listed separately from academic degrees.",
  },
  {
    title: "Independent learning",
    description: "Self-directed study.",
  },
];

export default function Education() {
  return (
    <main className="min-h-screen bg-black pb-24 pt-32 text-white">
      <SEOHead
        title="Education & Professional Programs"
        description="Education, school qualifications, executive education and professional programs listed for Muhammad Faisal Orakzai."
        path="/education"
        type="profile"
        keywords="Faisal Orakzai education, professional certificates, executive education, cybersecurity, machine learning, data science"
      />

      <section className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14 border-b border-[#F3BA2F]/15 pb-10"
        >
          <div className="mb-5 flex items-center gap-3">
            <GraduationCap className="h-5 w-5 text-[#F3BA2F]" aria-hidden="true" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#F3BA2F]">
              EDUCATION &amp; PROGRAMS
            </span>
          </div>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Learning, education
            <span className="block text-[#F3BA2F]">and professional programs</span>
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
            A record of school education, executive and professional study, and founder programs.
            Titles, dates and completion labels follow the supplied profile screenshots; certificates
            and accelerator programs are identified by type, not described as university degrees.
          </p>
        </motion.div>

        <div className="space-y-16">
          {categories.map((category, categoryIndex) => {
            const categoryRecords = records.filter(
              (record) => record.category === category.title,
            );
            if (categoryRecords.length === 0) return null;

            return (
              <section key={category.title} aria-labelledby={`education-${categoryIndex}`}>
                <div className="mb-6">
                  <h2
                    id={`education-${categoryIndex}`}
                    className="text-2xl font-semibold md:text-3xl"
                  >
                    {category.title}
                  </h2>
                  <p className="mt-2 text-sm text-white/40">{category.description}</p>
                </div>

                <div className="space-y-4">
                  {categoryRecords.map((record, index) => (
                    <motion.article
                      key={record.id}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.16) }}
                      viewport={{ once: true, amount: 0.1 }}
                      className="border border-white/10 bg-white/[0.025] p-5 md:p-7"
                    >
                      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                        <div>
                          <h3 className="text-lg font-semibold md:text-xl">{record.institution}</h3>
                          <p className="mt-1 text-sm leading-6 text-[#F3BA2F]">
                            {record.program}
                          </p>
                        </div>
                        {record.period && (
                          <p className="shrink-0 font-mono text-xs tracking-wide text-white/45">
                            {record.period}
                          </p>
                        )}
                      </div>

                      {record.focus && (
                        <p className="mt-4 text-sm leading-6 text-white/65">{record.focus}</p>
                      )}
                      {record.result && (
                        <p className="mt-3 text-xs leading-5 text-white/55">
                          <span className="font-semibold text-white/75">Result:</span> {record.result}
                        </p>
                      )}
                      {record.status && (
                        <p className="mt-2 text-xs leading-5 text-[#F3BA2F]/80">
                          <span className="font-semibold">Status:</span> {record.status}
                        </p>
                      )}
                      {record.activities && (
                        <p className="mt-2 text-xs leading-5 text-white/45">
                          <span className="font-semibold text-white/65">Activities:</span>{" "}
                          {record.activities}
                        </p>
                      )}
                      <p className="mt-3 text-sm leading-6 text-white/50">{record.description}</p>
                    </motion.article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-16 border-t border-[#F3BA2F]/15 pt-8">
          <Link
            href="/founder"
            className="inline-flex items-center gap-2 text-sm text-[#F3BA2F] transition-colors hover:text-white"
          >
            Read the founder biography
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
