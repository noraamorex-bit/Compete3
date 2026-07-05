/**
 * Curated catalog of real, well-established competitions open to school
 * students in India (Classes 6–12), including international events Indian
 * students are eligible for.
 *
 * This is a static, easily-editable database: add/update entries here and
 * the Explore browser picks them up automatically.
 *
 * Field notes:
 * - classes: [min, max] class range (approximate for age-based events)
 * - mode: "online" | "offline" | "hybrid"
 * - regMonths: months (1–12) when registration is TYPICALLY open — used by
 *   the month filter and to suggest a tracking deadline. Exact dates vary
 *   by year; users should verify on the official site.
 * - annual: recurs every year, so tracked entries roll forward usefully.
 * - aliases: other names the same event is commonly saved under — used to
 *   de-duplicate against user-tracked items.
 */

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const monthSpan = (list) =>
  list.length > 1
    ? `${MONTH_NAMES[list[0] - 1].slice(0, 3)} – ${MONTH_NAMES[list[list.length - 1] - 1].slice(0, 3)}`
    : MONTH_NAMES[list[0] - 1].slice(0, 3);

export const CATALOG = [
  // ——— Olympiads & mathematics ———
  {
    id: "sof-nso",
    title: "SOF National Science Olympiad",
    aliases: ["National Science Olympiad", "NSO"],
    organizer: "Science Olympiad Foundation",
    category: "olympiad",
    classes: [1, 12],
    mode: "offline",
    location: "Own school (exam centre)",
    regMonths: [4, 5, 6, 7, 8, 9, 10],
    eventWindow: "Oct – Jan",
    website: "https://sofworld.org",
    description:
      "India's largest school science olympiad, written in your own school across two levels.",
    prize: "Medals, scholarships & international rank awards",
    annual: true,
    tags: ["science", "school-based", "national"],
  },
  {
    id: "sof-imo",
    title: "SOF International Mathematics Olympiad",
    organizer: "Science Olympiad Foundation",
    category: "math",
    classes: [1, 12],
    mode: "offline",
    location: "Own school (exam centre)",
    regMonths: [4, 5, 6, 7, 8, 9, 10],
    eventWindow: "Oct – Jan",
    website: "https://sofworld.org",
    description:
      "Two-level school mathematics olympiad testing reasoning and problem-solving.",
    prize: "Medals, cash awards & scholarships",
    annual: true,
    tags: ["maths", "school-based", "national"],
  },
  {
    id: "sof-nco",
    title: "SOF National Cyber Olympiad",
    organizer: "Science Olympiad Foundation",
    category: "coding",
    classes: [1, 10],
    mode: "offline",
    location: "Own school (exam centre)",
    regMonths: [4, 5, 6, 7, 8, 9],
    eventWindow: "Sep – Dec",
    website: "https://sofworld.org",
    description: "School olympiad on computers, IT concepts and logical reasoning.",
    prize: "Medals, scholarships & certificates",
    annual: true,
    tags: ["computers", "school-based"],
  },
  {
    id: "ioqm",
    title: "IOQM — Indian Olympiad Qualifier in Mathematics",
    organizer: "MTA & HBCSE (TIFR)",
    category: "math",
    classes: [8, 12],
    mode: "offline",
    location: "Exam centres across India",
    regMonths: [7, 8],
    eventWindow: "September",
    website: "https://olympiads.hbcse.tifr.res.in",
    description:
      "First stage of India's official maths olympiad pipeline leading to INMO and the International Mathematical Olympiad.",
    prize: "Qualification to INMO → IMO; certificates & camps",
    annual: true,
    tags: ["maths", "IMO pathway", "national"],
  },
  {
    id: "iapt-nse",
    title: "National Standard Examinations (NSEP / NSEC / NSEB / NSEA / NSEJS)",
    organizer: "IAPT",
    category: "olympiad",
    classes: [8, 12],
    mode: "offline",
    location: "Exam centres across India",
    regMonths: [8, 9],
    eventWindow: "November",
    website: "https://www.iapt.org.in",
    description:
      "Entry stage of India's science olympiad programme in physics, chemistry, biology, astronomy and junior science — the road to the international olympiads.",
    prize: "Qualification to Indian National Olympiads & international teams",
    annual: true,
    tags: ["physics", "chemistry", "biology", "astronomy", "olympiad pathway"],
  },
  {
    id: "nmtc",
    title: "NMTC — National Mathematics Talent Contest",
    organizer: "AMTI",
    category: "math",
    classes: [5, 12],
    mode: "offline",
    location: "Registered school centres",
    regMonths: [7, 8],
    eventWindow: "Aug – Oct (two stages)",
    website: "https://amtionline.com",
    description:
      "Classic talent contest by the Association of Mathematics Teachers of India, rewarding original problem-solving.",
    prize: "Cash prizes, medals & certificates",
    annual: true,
    tags: ["maths", "problem-solving"],
  },
  {
    id: "kangaroo-india",
    title: "International Kangaroo Mathematics Contest (India)",
    organizer: "Math Kangaroo India",
    category: "math",
    classes: [1, 12],
    mode: "offline",
    location: "Own school / open centres",
    regMonths: [11, 12, 1, 2],
    eventWindow: "March",
    website: "https://mathkangaroo.in",
    description:
      "World's largest math competition — fun, puzzle-style problems with 90+ participating countries.",
    prize: "Medals, certificates & international ranking",
    annual: true,
    tags: ["maths", "international"],
  },
  {
    id: "nstse",
    title: "NSTSE — National Level Science Talent Search Examination",
    organizer: "Unified Council",
    category: "science",
    classes: [2, 12],
    mode: "offline",
    location: "Own school / open centres",
    regMonths: [7, 8, 9, 10, 11],
    eventWindow: "Dec – Jan",
    website: "https://www.unifiedcouncil.com",
    description:
      "Diagnostic science & maths talent exam with detailed skill-wise feedback reports.",
    prize: "Cash awards, medals & performance reports",
    annual: true,
    tags: ["science", "maths", "national"],
  },

  // ——— Coding, computing & AI ———
  {
    id: "ico-zio",
    title: "Indian Computing Olympiad (ZIO / ZCO / INOI)",
    organizer: "IARCS",
    category: "coding",
    classes: [8, 12],
    mode: "offline",
    location: "Exam centres across India",
    regMonths: [9, 10, 11],
    eventWindow: "Dec – Jan",
    website: "https://www.iarcs.org.in",
    description:
      "India's official programming olympiad — algorithmic problem solving leading to the International Olympiad in Informatics.",
    prize: "Qualification to IOI training camp & Indian team",
    annual: true,
    tags: ["programming", "algorithms", "IOI pathway"],
  },
  {
    id: "bebras",
    title: "Bebras Computational Thinking Challenge",
    aliases: ["Bebras India Challenge"],
    organizer: "ACM India / CSpathshala (Bebras India)",
    category: "coding",
    classes: [3, 12],
    mode: "online",
    regMonths: [9, 10, 11],
    eventWindow: "November",
    website: "https://www.bebras.org",
    description:
      "Global computational-thinking challenge with playful logic tasks — no coding experience needed.",
    prize: "Certificates & national recognition",
    annual: true,
    tags: ["computational thinking", "international", "beginner-friendly"],
  },
  {
    id: "waicy",
    title: "WAICY — World Artificial Intelligence Competition for Youth",
    organizer: "ReadyAI",
    category: "coding",
    classes: [3, 12],
    mode: "hybrid",
    regMonths: [3, 4, 5, 6],
    eventWindow: "Jul – Aug (finals)",
    website: "https://www.waicy.org",
    description:
      "One of the largest AI competitions for school students — build and present AI-powered projects.",
    prize: "Trophies, certificates & global finals",
    annual: true,
    tags: ["AI", "projects", "international"],
  },

  // ——— Quiz & logic ———
  {
    id: "tcs-it-wiz",
    title: "TCS IT Wiz",
    organizer: "Tata Consultancy Services",
    category: "quiz",
    classes: [8, 12],
    mode: "hybrid",
    regMonths: [8, 9, 10],
    eventWindow: "Sep – Dec",
    website: "https://www.tcsitwiz.com",
    description:
      "India's biggest technology quiz for schools, running since 1999 — city rounds lead to a national final.",
    prize: "Trophies, gadgets & national title",
    annual: true,
    tags: ["technology", "teams of 2", "national"],
  },
  {
    id: "technothlon",
    title: "Technothlon",
    organizer: "IIT Guwahati (Techniche)",
    category: "quiz",
    classes: [9, 12],
    mode: "hybrid",
    regMonths: [5, 6, 7],
    eventWindow: "Jul (prelims) · Sep (mains at IIT Guwahati)",
    website: "https://technothlon.techniche.org.in",
    description:
      "International school championship of logic run by IIT Guwahati students — prelims in 200+ cities.",
    prize: "Trip to IIT Guwahati, trophies & goodies",
    annual: true,
    tags: ["logic", "teams of 2", "IIT"],
  },

  // ——— Science research, fairs & government ———
  {
    id: "vvm",
    title: "Vidyarthi Vigyan Manthan",
    organizer: "Vijnana Bharati (VIBHA) & NCERT",
    category: "science",
    classes: [6, 11],
    mode: "online",
    regMonths: [7, 8, 9, 10],
    eventWindow: "Oct – May (school → national)",
    website: "https://vvm.org.in",
    description:
      "India's largest digital science talent search, with state and national camps for toppers.",
    prize: "Cash awards, mentorship & ISRO/DRDO lab visits",
    annual: true,
    tags: ["science", "government-backed", "national"],
  },
  {
    id: "inspire-manak",
    title: "INSPIRE Awards — MANAK",
    organizer: "DST, Govt. of India & NIF",
    category: "innovation",
    classes: [6, 10],
    mode: "hybrid",
    regMonths: [4, 5, 6, 7, 8, 9],
    eventWindow: "District → national exhibitions through the year",
    website: "https://www.inspireawards-dst.gov.in",
    description:
      "Flagship government scheme: submit an original innovation idea through your school; selected students get funds to build it.",
    prize: "₹10,000 award & national exhibition",
    annual: true,
    tags: ["innovation", "government", "school-nominated"],
  },
  {
    id: "ncsc",
    title: "National Children's Science Congress",
    organizer: "NCSTC, Dept. of Science & Technology",
    category: "science",
    classes: [5, 12],
    mode: "offline",
    location: "District → state → national congress",
    regMonths: [7, 8, 9],
    eventWindow: "Oct – Dec",
    website: "http://www.ncsc.co.in",
    description:
      "Team research projects on a national focal theme, presented up to a national congress (ages 10–17).",
    prize: "National presentation & certificates",
    annual: true,
    tags: ["research", "teams", "government"],
  },
  {
    id: "iris-fair",
    title: "IRIS National Science Fair",
    organizer: "IRIS (Initiative for Research & Innovation in STEM)",
    category: "science",
    classes: [5, 12],
    mode: "hybrid",
    regMonths: [6, 7, 8, 9],
    eventWindow: "Nov – Jan (national fair)",
    website: "https://irisnationalfair.org",
    description:
      "India's biggest research-based science fair — winners represent India at Regeneron ISEF in the USA.",
    prize: "Trip to Regeneron ISEF (USA), awards & grants",
    annual: true,
    tags: ["research", "ISEF pathway", "projects"],
  },
  {
    id: "cbse-science-exhibition",
    title: "CBSE Science Exhibition",
    organizer: "CBSE",
    category: "science",
    classes: [6, 12],
    mode: "offline",
    location: "Regional & national venues (via school)",
    regMonths: [7, 8, 9],
    eventWindow: "Oct – Dec",
    website: "https://cbseacademic.nic.in",
    description:
      "Annual exhibition where CBSE school teams present working models on a national theme.",
    prize: "Regional & national recognition",
    annual: true,
    tags: ["models", "CBSE", "teams"],
  },
  {
    id: "atl-marathon",
    title: "ATL Marathon",
    organizer: "Atal Innovation Mission, NITI Aayog",
    category: "innovation",
    classes: [6, 12],
    mode: "online",
    regMonths: [9, 10, 11, 12],
    eventWindow: "Submissions in winter; bootcamps follow",
    website: "https://aim.gov.in",
    description:
      "National innovation challenge: student teams build solutions to community problems (open beyond ATL schools).",
    prize: "Top-100 internships & incubation support",
    annual: true,
    tags: ["innovation", "government", "teams"],
  },

  // ——— Robotics ———
  {
    id: "wro-india",
    title: "World Robot Olympiad — India",
    organizer: "India STEM Foundation",
    category: "robotics",
    classes: [3, 12],
    mode: "offline",
    location: "Regional & national rounds across India",
    regMonths: [4, 5, 6, 7],
    eventWindow: "Jul – Sep (nationals) · Nov (world final)",
    website: "https://wroindia.org",
    description:
      "India's qualifier for the World Robot Olympiad — design and program robots for themed challenges (ages 8–19).",
    prize: "National title & entry to WRO International Final",
    annual: true,
    tags: ["robotics", "teams", "international pathway"],
  },
  {
    id: "fll-challenge",
    title: "FIRST LEGO League Challenge (India)",
    organizer: "FIRST",
    category: "robotics",
    classes: [4, 10],
    mode: "offline",
    location: "Regional events across India",
    regMonths: [8, 9, 10, 11],
    eventWindow: "Dec – Mar (regionals → nationals)",
    website: "https://www.firstinspires.org",
    description:
      "Global robotics program (ages 9–16): build a LEGO robot and research an innovation project on the season theme.",
    prize: "Awards & advancement to international events",
    annual: true,
    tags: ["robotics", "LEGO", "teams", "international"],
  },

  // ——— Space & astronomy ———
  {
    id: "nasa-space-apps",
    title: "NASA International Space Apps Challenge",
    organizer: "NASA",
    category: "hackathon",
    classes: [6, 12],
    mode: "hybrid",
    regMonths: [8, 9, 10],
    eventWindow: "One weekend in October",
    website: "https://www.spaceappschallenge.org",
    description:
      "World's largest annual space hackathon — solve NASA's real challenges in local & virtual events (all ages, teams).",
    prize: "Global awards; winners invited to a NASA launch",
    annual: true,
    tags: ["space", "hackathon", "teams", "international"],
  },
  {
    id: "isro-yuvika",
    title: "ISRO YUVIKA — Young Scientist Programme",
    organizer: "ISRO",
    category: "space",
    classes: [9, 9],
    mode: "offline",
    location: "ISRO centres across India",
    regMonths: [2, 3],
    eventWindow: "Two weeks in May",
    website: "https://www.isro.gov.in",
    description:
      "Selective residential programme for Class 9 students: lectures, labs and facility visits at ISRO centres.",
    prize: "Fully-sponsored programme at ISRO",
    annual: true,
    tags: ["space", "ISRO", "government", "selective"],
  },
  {
    id: "nss-space-settlement",
    title: "NSS Space Settlement Contest",
    organizer: "National Space Society (USA)",
    category: "space",
    classes: [6, 12],
    mode: "online",
    regMonths: [10, 11, 12, 1, 2],
    eventWindow: "Results in spring; ISDC presentation",
    website: "https://nss.org",
    description:
      "Design an orbital space settlement — the classic NASA-Ames-born contest, hugely popular with Indian schools.",
    prize: "Certificates; winners present at the ISDC conference",
    annual: true,
    tags: ["space", "design", "research", "international"],
  },
  {
    id: "iaac",
    title: "International Astronomy & Astrophysics Competition",
    organizer: "IAAC",
    category: "astronomy",
    classes: [6, 12],
    mode: "online",
    regMonths: [1, 2, 3],
    eventWindow: "Qualification → final rounds, Mar – Aug",
    website: "https://iaac.space",
    description:
      "Online astronomy problem-solving competition with qualification, pre-final and final rounds.",
    prize: "Medals, certificates & cash awards",
    annual: true,
    tags: ["astronomy", "international", "online"],
  },

  // ——— Environment ———
  {
    id: "green-olympiad",
    title: "GREEN Olympiad",
    organizer: "TERI",
    category: "environment",
    classes: [4, 12],
    mode: "hybrid",
    regMonths: [4, 5, 6, 7, 8, 9],
    eventWindow: "Oct – Nov",
    website: "https://www.terigreenolympiad.com",
    description:
      "The Energy and Resources Institute's environment olympiad on sustainability, taken in 60+ countries.",
    prize: "Certificates, medals & GREEN scholar recognition",
    annual: true,
    tags: ["environment", "sustainability"],
  },
  {
    id: "wipro-earthian",
    title: "Wipro earthian",
    organizer: "Wipro Foundation",
    category: "environment",
    classes: [7, 10],
    mode: "online",
    regMonths: [6, 7, 8, 9, 10],
    eventWindow: "Awards early next year",
    website: "https://wiprofoundation.org",
    description:
      "India's largest school sustainability program — team submissions on water, waste and biodiversity themes.",
    prize: "₹1.5 lakh award for winning schools & mentorship",
    annual: true,
    tags: ["environment", "teams", "essays & projects"],
  },

  // ——— Debate, MUN & public speaking ———
  {
    id: "hmun-india",
    title: "Harvard Model United Nations India",
    aliases: ["Harvard MUN India", "HMUN India"],
    organizer: "Harvard University & Worldview",
    category: "mun",
    classes: [9, 12],
    mode: "offline",
    location: "Hyderabad (venue varies)",
    regMonths: [3, 4, 5, 6, 7],
    eventWindow: "August (4-day conference)",
    website: "https://hmunindia.org",
    description:
      "The Harvard-run MUN conference in India — committees chaired by Harvard students.",
    prize: "Best Delegate & committee awards",
    annual: true,
    tags: ["MUN", "public speaking", "international"],
  },
  {
    id: "frank-anthony-debate",
    title: "Frank Anthony Memorial All-India Inter-School Debate",
    organizer: "CISCE",
    category: "debate",
    classes: [9, 12],
    mode: "offline",
    location: "Regional & national rounds (via school)",
    regMonths: [7, 8],
    eventWindow: "Aug – Oct",
    website: "https://cisce.org",
    description:
      "Prestigious national debate for ICSE/ISC schools, running for decades.",
    prize: "National trophy & individual speaker awards",
    annual: true,
    tags: ["debate", "CISCE", "national"],
  },
  {
    id: "world-scholars-cup",
    title: "World Scholar's Cup",
    organizer: "World Scholar's Cup",
    category: "debate",
    classes: [4, 12],
    mode: "offline",
    location: "Regional rounds in Indian cities",
    regMonths: [1, 2, 3, 4],
    eventWindow: "Regionals spring · Globals Jun – Aug · finals at Yale",
    website: "https://scholarscup.org",
    description:
      "Team debate + quiz + writing celebration; regional winners advance to Global Rounds and Yale finals.",
    prize: "Medals galore & advancement to Yale finals",
    annual: true,
    tags: ["debate", "quiz", "writing", "teams", "international"],
  },

  // ——— Essay & creative writing ———
  {
    id: "commonwealth-essay",
    title: "The King's Commonwealth Essay Competition",
    organizer: "Royal Commonwealth Society",
    category: "essay",
    classes: [6, 12],
    mode: "online",
    regMonths: [3, 4, 5, 6],
    eventWindow: "Results in autumn",
    website: "https://www.royalcwsociety.org",
    description:
      "The world's oldest international schools' writing contest (since 1883), open to all under-18s in the Commonwealth.",
    prize: "Winners' week in London & certificates for all",
    annual: true,
    tags: ["writing", "international", "english"],
  },
  {
    id: "goi-peace-essay",
    title: "International Essay Contest for Young People",
    organizer: "Goi Peace Foundation (with UNESCO)",
    category: "essay",
    classes: [6, 12],
    mode: "online",
    regMonths: [2, 3, 4, 5, 6],
    eventWindow: "Results in October",
    website: "https://www.goipeace.or.jp",
    description:
      "UNESCO-supported global essay contest on peace and society themes; children's and youth categories.",
    prize: "¥100,000 first prize & Japan ceremony invitation",
    annual: true,
    tags: ["writing", "international", "peace"],
  },
  {
    id: "john-locke-essay",
    title: "John Locke Institute Essay Competition",
    organizer: "John Locke Institute",
    category: "essay",
    classes: [7, 12],
    mode: "online",
    regMonths: [4, 5, 6],
    eventWindow: "Results & Oxford ceremony in September",
    website: "https://www.johnlockeinstitute.com",
    description:
      "Rigorous essay prizes in philosophy, politics, economics, history, law and more, incl. a junior category (≤14).",
    prize: "Scholarships toward Institute programs & Oxford awards dinner",
    annual: true,
    tags: ["writing", "humanities", "international"],
  },
  {
    id: "shankars-competition",
    title: "Shankar's International Children's Competition",
    organizer: "Children's Book Trust",
    category: "arts",
    classes: [1, 11],
    mode: "hybrid",
    regMonths: [6, 7, 8, 9, 10],
    eventWindow: "Results the following year",
    website: "https://childrensbooktrust.com",
    description:
      "Historic painting and writing competition (since 1949) for children under 16 worldwide; entries submitted through schools or by post.",
    prize: "Cash awards, medals & publication",
    annual: true,
    tags: ["painting", "writing", "heritage"],
  },

  // ——— Arts & design ———
  {
    id: "doodle-for-google",
    title: "Doodle for Google (India)",
    organizer: "Google India",
    category: "arts",
    classes: [1, 10],
    mode: "online",
    regMonths: [7, 8, 9],
    eventWindow: "Winner doodle on google.co.in around Children's Day",
    website: "https://doodles.google",
    description:
      "Design a Google doodle on the year's theme — the national winner's art appears on Google's India homepage.",
    prize: "₹5 lakh college scholarship & tech package for school",
    annual: true,
    tags: ["art", "design", "scholarship"],
  },

  // ——— Innovation videos & science media ———
  {
    id: "breakthrough-junior",
    title: "Breakthrough Junior Challenge",
    organizer: "Breakthrough Prize Foundation",
    category: "science",
    classes: [8, 12],
    mode: "online",
    regMonths: [4, 5, 6],
    eventWindow: "Judging Jul – Nov",
    website: "https://breakthroughjuniorchallenge.org",
    description:
      "Explain a big science idea in a 2-minute video (ages 13–18) — judged by scientists worldwide.",
    prize: "$250,000 scholarship + $100,000 school lab + $50,000 for teacher",
    annual: true,
    tags: ["science communication", "video", "international", "scholarship"],
  },

  // ——— Entrepreneurship ———
  {
    id: "tie-tye",
    title: "TiE Young Entrepreneurs (TYE)",
    organizer: "TiE (city chapters)",
    category: "entrepreneurship",
    classes: [9, 12],
    mode: "hybrid",
    regMonths: [8, 9, 10, 11],
    eventWindow: "Program runs to global finals in spring",
    website: "https://tie.org",
    description:
      "Startup bootcamp for teens run by TiE chapters (Delhi, Mumbai, Bangalore…): build a company, pitch to VCs.",
    prize: "Seed prizes & TYE Global finals",
    annual: true,
    tags: ["startup", "pitching", "teams", "mentorship"],
  },
  {
    id: "conrad-challenge",
    title: "Conrad Challenge",
    organizer: "Conrad Foundation",
    category: "entrepreneurship",
    classes: [8, 12],
    mode: "online",
    regMonths: [8, 9, 10],
    eventWindow: "Innovation stages Nov – Apr; summit at Kennedy Space Center area",
    website: "https://www.conradchallenge.org",
    description:
      "Global innovation-entrepreneurship challenge (ages 13–18): design commercially viable solutions in energy, health, aerospace and more.",
    prize: "Scholarships, patent support & Innovation Summit",
    annual: true,
    tags: ["innovation", "startup", "teams", "international"],
  },

  // ——— Scholarships via competition/exam ———
  {
    id: "nmms",
    title: "NMMS — National Means-cum-Merit Scholarship Exam",
    organizer: "Ministry of Education, Govt. of India",
    category: "scholarship",
    classes: [8, 8],
    mode: "offline",
    location: "State-run exam centres",
    regMonths: [8, 9, 10],
    eventWindow: "Exam Nov – Dec (state-wise)",
    website: "https://scholarships.gov.in",
    description:
      "Government scholarship exam for Class 8 students from economically weaker families in govt./aided schools.",
    prize: "₹12,000 per year through Class 12",
    annual: true,
    tags: ["scholarship", "government", "class 8"],
  },
];

/** Compact "Aug – Oct" style label for an entry's registration window. */
export const regWindowLabel = (entry) => monthSpan(entry.regMonths);

/**
 * Suggested tracking deadline: end of the last month of the typical
 * registration window, at its next occurrence.
 */
export function suggestedDeadline(regMonths, from = new Date()) {
  const last = regMonths[regMonths.length - 1];
  let year = from.getFullYear();
  let d = new Date(year, last, 0, 23, 59); // last day of month `last`
  if (d <= from) d = new Date(year + 1, last, 0, 23, 59);
  return d.toISOString();
}

/** Convert a catalog entry into a tracked competition (user still verifies dates). */
export function toCompetition(entry, { favorite = false } = {}) {
  return {
    id: crypto.randomUUID(),
    catalogId: entry.id,
    title: entry.title,
    organizer: entry.organizer,
    category: entry.category,
    deadline: suggestedDeadline(entry.regMonths),
    website: entry.website,
    registrationLink: entry.registrationLink ?? "",
    mode: entry.mode,
    location: entry.location ?? "",
    prize: entry.prize,
    notes: `${entry.description}\n\nEligibility: Classes ${entry.classes[0]}–${entry.classes[1]}. Typical registration: ${regWindowLabel(entry)}. Event: ${entry.eventWindow}. Dates vary each year — verify on the official website.`,
    favorite,
    repeatsYearly: Boolean(entry.annual),
    createdAt: new Date().toISOString(),
  };
}
