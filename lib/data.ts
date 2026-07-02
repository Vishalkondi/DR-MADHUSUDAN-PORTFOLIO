// All portfolio content in one place — edit here to update the site.
// Replace placeholder contact details, stats, and affiliations with real data.

export const CLINIC = {
  doctor: "Dr. Madhusudan Yemul",
  title: "Senior Interventional Cardiologist",
  creds: "MD · DM Cardiology · FSCAI · FACC",
  phone: "+91 00000 00000",
  phoneHref: "+910000000000",
  whatsapp: "https://wa.me/910000000000",
  email: "care@dryemul.in",
  clinicName: "Yemul Heart Clinic",
  address: "2nd Floor, Medicare Plaza, FC Road, Pune 411004",
  opd: "Mon–Sat · 10:00–14:00 & 17:00–20:00",
  mapQuery: "FC Road, Pune, Maharashtra 411004",
};

export const STATS = [
  { value: 25, label: "Years", plus: true, gold: false },
  { value: 12000, label: "Procedures", plus: true, gold: false },
  { value: 40000, label: "Patients", plus: true, gold: false },
  { value: 98, label: "Success", suffix: "%", gold: true },
];

export const AFFILIATIONS = [
  "Apollo Hospitals",
  "Fortis Heart Institute",
  "Society for Cardiovascular Angiography",
  "Cardiological Society of India",
  "American College of Cardiology",
];

export type Expertise = {
  title: string;
  desc: string;
  tint: string;
  color: string;
  icon: string; // lucide-react icon name
};

export const EXPERTISE: Expertise[] = [
  { title: "Interventional Cardiology", desc: "Catheter-based diagnosis and treatment of coronary artery disease with minimal recovery time.", tint: "rgba(200,50,58,.12)", color: "#c8323a", icon: "HeartPulse" },
  { title: "Preventive Cardiology", desc: "Risk profiling and lifestyle-led programs that stop heart disease before it starts.", tint: "rgba(18,128,92,.12)", color: "#12805c", icon: "ShieldPlus" },
  { title: "Emergency Cardiac Care", desc: "Rapid-response management of heart attacks and acute coronary events, 24×7.", tint: "rgba(200,50,58,.12)", color: "#c8323a", icon: "Activity" },
  { title: "Heart Failure Clinic", desc: "Structured long-term care to strengthen weakened hearts and restore quality of life.", tint: "rgba(18,128,92,.12)", color: "#12805c", icon: "HeartHandshake" },
  { title: "Pediatric Cardiology", desc: "Congenital and childhood heart conditions handled with specialist, gentle care.", tint: "rgba(176,141,87,.14)", color: "#b08d57", icon: "Baby" },
  { title: "Hypertension Management", desc: "Precise, medication-optimised control of blood pressure to protect every organ.", tint: "rgba(18,128,92,.12)", color: "#12805c", icon: "Gauge" },
  { title: "Diabetes & Heart Care", desc: "Integrated cardio-metabolic care for patients where diabetes meets heart risk.", tint: "rgba(176,141,87,.14)", color: "#b08d57", icon: "Droplet" },
];

export const PROCEDURES = [
  { no: "01", name: "Angiography", tag: "Coronary imaging" },
  { no: "02", name: "Angioplasty", tag: "Balloon widening" },
  { no: "03", name: "Stent Placement", tag: "Drug-eluting stents" },
  { no: "04", name: "Pacemaker Implant", tag: "Rhythm support" },
  { no: "05", name: "Echocardiography", tag: "Ultrasound scan" },
  { no: "06", name: "TMT", tag: "Treadmill stress test" },
  { no: "07", name: "Holter Monitoring", tag: "24-hr rhythm log" },
  { no: "08", name: "ASD Closure", tag: "Septal defect repair" },
  { no: "09", name: "VSD Closure", tag: "Ventricular repair" },
  { no: "10", name: "PDA Closure", tag: "Ductus repair" },
];

export const TIMELINE = [
  { year: "1998", title: "MBBS — Grant Medical College", detail: "Graduated with distinction and gold medal in general medicine." },
  { year: "2003", title: "MD (Internal Medicine)", detail: "Specialised training in internal and cardiovascular medicine." },
  { year: "2007", title: "DM Cardiology — Super-speciality", detail: "Completed doctorate in cardiology with a focus on interventional practice." },
  { year: "2010", title: "Interventional Fellowship, USA", detail: "Advanced fellowship in complex coronary and structural intervention." },
  { year: "2014", title: "Head of Cath Lab", detail: "Led one of the region's busiest catheterisation laboratories." },
  { year: "2024", title: "Founder — Yemul Heart Clinic", detail: "Established an independent centre for precision cardiac care in Pune." },
];

export const AWARDS = [
  { year: "2023", title: "Excellence in Cardiac Care", by: "Indian Medical Association" },
  { year: "2021", title: "Best Interventional Cardiologist", by: "Healthcare Leadership Awards" },
  { year: "2019", title: "Distinguished Research Fellow", by: "Cardiological Society of India" },
  { year: "2017", title: "Keynote Speaker", by: "Asia-Pacific Cardiology Summit" },
];

export const RESEARCH = [
  { title: "Long-term outcomes of drug-eluting stents in diabetic patients", meta: "Indian Heart Journal · 2024 · DOI:10.1016/ihj.2024" },
  { title: "Radial vs femoral access in primary PCI: a regional cohort", meta: "JACC Case Reports · 2022 · DOI:10.1016/jacc.2022" },
  { title: "Early markers of subclinical coronary disease in South Asians", meta: "Circulation · 2020 · DOI:10.1161/circ.2020" },
  { title: "Cost-effective preventive screening in semi-urban India", meta: "BMJ Open · 2019 · DOI:10.1136/bmj.2019" },
];

export const GALLERY = [
  { label: "Cath Lab Suite", sub: "Where interventions happen", h: 230, img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=60" },
  { label: "APEX Cardiology Summit", sub: "Keynote address · 2024", h: 300, img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=60" },
  { label: "Clinic Reception", sub: "Yemul Heart Clinic", h: 200, img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=60" },
  { label: "Cardiology Team", sub: "The people behind the care", h: 262, img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=60" },
  { label: "Live Case Workshop", sub: "Teaching session · 2023", h: 210, img: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=800&q=60" },
  { label: "Community Heart Camp", sub: "Free screening drive", h: 250, img: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=800&q=60" },
];

export const TESTIMONIALS = [
  { quote: "Dr. Yemul walked me through my angioplasty step by step. I never once felt like a case number — I felt like a person he genuinely cared about.", name: "Rajesh M.", meta: "Angioplasty · 2025" },
  { quote: "My father's stent procedure was flawless and the follow-up care was extraordinary. The whole clinic runs with quiet, reassuring precision.", name: "Sneha K.", meta: "Family of patient · 2024" },
  { quote: "He caught an early blockage that two other doctors missed. Preventive, honest, and never pushed an unnecessary intervention. I trust him completely.", name: "Anil D.", meta: "Preventive cardiology · 2025" },
];

export const FAQS = [
  { q: "How do I prepare for an angiography?", a: "Fast for 4–6 hours before the procedure, continue essential medications unless told otherwise, and arrange for someone to accompany you home. Our team calls you the day before with personalised instructions." },
  { q: "Is angioplasty a major surgery?", a: "No. Angioplasty is a minimally-invasive, catheter-based procedure done through a small wrist or groin puncture. Most patients go home within 24–48 hours and resume light activity within days." },
  { q: "Do you accept insurance and cashless claims?", a: "Yes. The clinic is empanelled with all major insurers and TPAs for cashless treatment. Our front desk assists with pre-authorisation and paperwork end to end." },
  { q: "Can I get a second opinion on my reports?", a: "Absolutely. Share your existing angiography, ECG or echo reports and Dr. Yemul will give an honest, unhurried assessment — including whether intervention is genuinely needed." },
  { q: "What are the OPD and emergency timings?", a: "OPD runs Monday to Saturday, 10:00–14:00 and 17:00–20:00. Cardiac emergency support is available 24×7 via the emergency line." },
];

export const BLOG = [
  { cat: "Prevention", read: "5 min read", date: "Jun 2026", title: "Silent warning signs of heart disease you should never ignore", excerpt: "Fatigue, jaw pain and breathlessness can precede a cardiac event by weeks. Here is what to watch for.", img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=60" },
  { cat: "Procedures", read: "7 min read", date: "May 2026", title: "Angioplasty vs bypass: how we decide what is right for you", excerpt: "A plain-language guide to the two most common treatments for blocked coronary arteries.", img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=60" },
  { cat: "Lifestyle", read: "4 min read", date: "Apr 2026", title: "The Indian heart-healthy plate: eating well without giving up flavour", excerpt: "Practical, culturally-rooted diet changes that measurably lower cardiac risk.", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=60" },
];

export const CONCERNS = ["Consultation", "Angiography", "Angioplasty", "Second opinion", "Follow-up"];
export const SLOT_TIMES = ["10:00", "10:30", "11:00", "11:30", "12:00", "17:00", "17:30", "18:00", "18:30", "19:00"];

export const AI_SYSTEM_PROMPT = [
  "You are the AI Health Assistant for Dr. Madhusudan Yemul, a senior interventional cardiologist in Pune, India.",
  "Speak warmly, concisely (2-4 sentences), and professionally. You are a helpful front-desk + patient-education assistant, NOT a diagnostician.",
  `Clinic facts: ${CLINIC.clinicName}, ${CLINIC.address}. OPD ${CLINIC.opd}. Phone ${CLINIC.phone}. Cardiac emergency support 24x7. Cashless with all major insurers.`,
  "Dr. Yemul: 25 years experience, 12,000+ procedures, DM Cardiology, FSCAI, FACC. Expertise: interventional & preventive cardiology, angioplasty, stents, pacemakers, echo, TMT, Holter, ASD/VSD/PDA closure, heart failure, hypertension, diabetes-heart care.",
  "Encourage booking (the form is on the page) or calling for anything case-specific. NEVER give a personal diagnosis, dosage, or treatment plan.",
  "For any emergency symptom (severe chest pain, breathlessness, fainting), tell them to call the 24x7 emergency line or nearest ER immediately.",
].join(" ");
