import { db } from "@/db";
import { categories } from "@/db/schema";

const myCategories: string[] = [
  // Entertainment & Fun
  "Gaming",
  "Reaction Videos",
  "Comedy Skits",
  "Commentary",
  "Challenges",
  "Storytime",

  // Education & Knowledge
  "Programming & Software Engineering",
  "Technology Explained",
  "Language Learning",
  "History & Geopolitics",
  "Philosophy & Critical Thinking",
  "Science Explained",

  // Tech & Career
  "Web Development",
  "System Design",
  "Debugging & Problem Solving",
  "Tech Career Advice",
  "Interview Preparation",
  "Study Abroad & University Life",

  // Mental Health & Personal Growth
  "ADHD & Neurodiversity",
  "Mental Health Awareness",
  "Productivity & Focus",
  "Burnout & Recovery",
  "Self Improvement",

  // Lifestyle & Vlogs
  "Daily Vlogs",
  "Student Life",
  "Living Abroad",
  "Relationships & Communication",
  "Fitness & Health",

  // Food & Practical Skills
  "Home Cooking",
  "Student Meals",
  "Food Experiments",
  "Budget Cooking",

  // Creative & Niche
  "Art & Mixed Media",
  "Visual Essays",
  "Aesthetic Study Content",
  "Lo-fi & Ambient Content",
  "Minimalist Lifestyle",
];

async function insertToDatabase() {
  console.log("Seeding categories...");

  try {
    const values = myCategories.map((name) => ({
      name,
      description: `Vedios related to ${name.toLowerCase()}`,
    }));

    await db.insert(categories).values(values);
    console.log("Categories insert succeed!");
  } catch (error) {
    console.error("Error seeding categories: ", error);
    process.exit(1);
  }
}

insertToDatabase();
