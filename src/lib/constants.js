export const CATEGORIES = [
  { id: "olympiad", label: "Olympiad", dot: "#7C6CF6" },
  { id: "math", label: "Mathematics", dot: "#4C8DFF" },
  { id: "science", label: "Science", dot: "#12A5A5" },
  { id: "astronomy", label: "Astronomy", dot: "#9F7CFA" },
  { id: "space", label: "Space", dot: "#4056C7" },
  { id: "robotics", label: "Robotics", dot: "#F2622E" },
  { id: "coding", label: "Coding & AI", dot: "#556AF0" },
  { id: "hackathon", label: "Hackathon", dot: "#2EA46D" },
  { id: "innovation", label: "Innovation", dot: "#0FA5E9" },
  { id: "entrepreneurship", label: "Entrepreneurship", dot: "#0D9F6E" },
  { id: "environment", label: "Environment", dot: "#55A630" },
  { id: "mun", label: "MUN", dot: "#3B82D6" },
  { id: "debate", label: "Debate & Speaking", dot: "#E05B8E" },
  { id: "quiz", label: "Quiz", dot: "#EE9B1E" },
  { id: "essay", label: "Essay & Writing", dot: "#9A7B4F" },
  { id: "arts", label: "Arts & Design", dot: "#C557D6" },
  { id: "scholarship", label: "Scholarship", dot: "#C9A227" },
  { id: "sports", label: "Sports", dot: "#E5484D" },
  { id: "other", label: "Other", dot: "#8B93AB" },
];

export const MODES = [
  { id: "online", label: "Online" },
  { id: "offline", label: "Offline" },
  { id: "hybrid", label: "Hybrid" },
];

export const categoryById = (id) =>
  CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[CATEGORIES.length - 1];

export const CLOSING_SOON_DAYS = 7;
