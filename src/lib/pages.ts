import { EXTRA_FAQ, EXTRA_SECTIONS } from "./extras";
import { MORE_FAQ, MORE_SECTIONS } from "./extras2";
import { POSTS, HUBS } from "./blog";
import { NEW_CALCULATORS } from "./pages-new";
import type { Mode } from "./solve";

export type Block =
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "formula"; title?: string; lines: string[]; note?: string }
  | { t: "table"; caption: string; head: string[]; rows: string[][] };

export type Section = { h2: string; blocks: Block[] };

export type PageDef = {
  slug: string; // "" for home
  kind: "calculator" | "post" | "legal" | "hub";
  mode?: Mode;
  title: string;
  description: string;
  h1: string;
  lead: string;
  sections: Section[];
  faq?: { q: string; a: string }[];
  related: string[]; // slugs ("" = home)
  navLabel: string;
  /** Optional per-page wording for the calculator fields, keyed by field key (a, b, p, n). */
  labels?: Record<string, { label?: string; placeholder?: string }>;
};

export const pathOf = (slug: string) => (slug === "" ? "/" : `/${slug}`);

/* ------------------------------------------------------------------ */

const home: PageDef = {
  slug: "",
  kind: "calculator",
  mode: "increase",
  navLabel: "Percentage Increase",
  title: "Percentage Increase Calculator (Free, With Steps)",
  description:
    "Free percentage increase calculator. Enter the old and new value to get the % increase instantly, with the formula and every step of the working.",
  h1: "Percentage Increase Calculator",
  lead: "Enter the starting value and the final value. You get the percentage increase, the formula, and every step of the working.",
  sections: [
    {
      h2: "What is a percentage increase?",
      blocks: [
        {
          t: "p",
          text: "A percentage increase tells you how much a number has grown compared with where it started, written as a share of that starting number. If a price rises from 80 to 100, it has gone up by 20. Measured against the original 80, that is a 25% increase.",
        },
        {
          t: "p",
          text: "Percentages make growth easy to compare. A raise of 20 means something very different on a salary of 400 than on a salary of 40,000, but “25%” and “0.05%” tell you straight away how big each change really is.",
        },
      ],
    },
    {
      h2: "Percentage increase formula",
      blocks: [
        {
          t: "formula",
          lines: ["Percentage increase = (New value − Old value) ÷ Old value × 100"],
          note: "The old value must not be zero. If the answer is negative, the value went down, so it is a decrease.",
        },
        {
          t: "p",
          text: "The same formula covers every example on this page, from a small price rise to a company’s yearly growth. Scroll down for a table of common increases, a mental-math shortcut and worked real-life scenarios.",
        },
      ],
    },
    {
      h2: "How to calculate percentage increase step by step",
      blocks: [
        {
          t: "ol",
          items: [
            "Subtract the old value from the new value. This is the amount of the increase.",
            "Divide that amount by the old value.",
            "Multiply the result by 100 and add a % sign.",
          ],
        },
        {
          t: "p",
          text: "Example: a salary goes from 40,000 to 46,000. The increase is 46,000 − 40,000 = 6,000. Then 6,000 ÷ 40,000 = 0.15, and 0.15 × 100 = 15%. The salary rose by 15%.",
        },
      ],
    },
    {
      h2: "Worked examples",
      blocks: [
        {
          t: "table",
          caption: "Percentage increase examples",
          head: ["Old value", "New value", "Increase", "Percentage increase"],
          rows: [
            ["50", "60", "10", "20%"],
            ["80", "100", "20", "25%"],
            ["75", "99", "24", "32%"],
            ["2,000", "2,300", "300", "15%"],
            ["12", "30", "18", "150%"],
          ],
        },
        {
          t: "p",
          text: "Notice the last row. A percentage increase can be larger than 100% whenever the new value is more than double the old one.",
        },
      ],
    },
    {
      h2: "Where percentage increase is used",
      blocks: [
        {
          t: "ul",
          items: [
            "Prices: how much more something costs than it did last year.",
            "Pay: the size of a raise compared with your old salary.",
            "Business: growth in sales, orders, subscribers or website visits from one period to the next.",
            "Population and statistics: how fast a group is growing.",
            "School and fitness: improvement in a test score, a lift or a running time.",
          ],
        },
        {
          t: "p",
          text: "If the number went down instead, use the [percentage decrease calculator](/percentage-decrease-calculator). If you are not sure which way it went, the [percentage change calculator](/percentage-change-calculator) tells you either way.",
        },
      ],
    },
    {
      h2: "Common mistakes to avoid",
      blocks: [
        {
          t: "ul",
          items: [
            "Dividing by the new value. Always divide by the old (starting) value.",
            "Mixing up percent and percentage points. If an interest rate moves from 4% to 5%, that is 1 percentage point, but a 25% increase.",
            "Assuming an increase and a decrease of the same percentage cancel out. They don’t: 100 increased by 20% is 120, and 120 decreased by 20% is 96.",
            "Working backwards the wrong way. To find the number you started with, use the [reverse percentage calculator](/reverse-percentage-calculator) instead of subtracting the percentage.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: "How do I calculate percentage increase?",
      a: "Subtract the old value from the new value, divide the result by the old value, then multiply by 100. For example, going from 80 to 100 gives (100 − 80) ÷ 80 × 100 = 25%.",
    },
    {
      q: "Can a percentage increase be more than 100%?",
      a: "Yes. Any time the new value is more than double the old value, the increase is above 100%. For example, going from 20 to 70 is an increase of 250%.",
    },
    {
      q: "What does a negative result mean?",
      a: "A negative result means the value went down, so it is a percentage decrease. The calculator tells you when this happens and shows the size of the decrease.",
    },
    {
      q: "Why can’t the starting value be zero?",
      a: "A percentage increase is measured against the starting value, and dividing by zero has no answer. Growth from zero can’t be written as a percentage.",
    },
    {
      q: "How do I work out percentage increase in Excel or Google Sheets?",
      a: "If the old value is in A2 and the new value is in B2, type =(B2-A2)/A2 in another cell and format that cell as a percentage.",
    },
    {
      q: "What is the difference between percentage increase and percentage change?",
      a: "Percentage increase describes growth only. Percentage change covers both directions: a positive result is an increase and a negative result is a decrease.",
    },
  ],
  related: [
    "percentage-decrease-calculator",
    "percentage-change-calculator",
    "increase-by-percentage-calculator",
    "reverse-percentage-calculator",
    "how-to-calculate-percentage-increase-in-excel",
    "percentage-increase-practice-problems",
  ],
};

/* ------------------------------------------------------------------ */

const decrease: PageDef = {
  slug: "percentage-decrease-calculator",
  kind: "calculator",
  mode: "decrease",
  navLabel: "Percentage Decrease",
  title: "Percentage Decrease Calculator (Free, With Steps)",
  description:
    "Free percentage decrease calculator. Enter the old and new value to see how much a number has fallen as a percentage, with the formula and steps.",
  h1: "Percentage Decrease Calculator",
  lead: "Enter the starting value and the final value. You get the percentage decrease, the formula, and every step of the working.",
  sections: [
    {
      h2: "What is a percentage decrease?",
      blocks: [
        {
          t: "p",
          text: "A percentage decrease shows how much a number has fallen compared with where it started, written as a share of the starting number. If a price drops from 100 to 80, it has gone down by 20, which is 20% of the original 100.",
        },
        {
          t: "p",
          text: "It is the opposite of a [percentage increase](/). The method is almost the same, but you subtract the new value from the old one instead.",
        },
      ],
    },
    {
      h2: "Percentage decrease formula",
      blocks: [
        {
          t: "formula",
          lines: ["Percentage decrease = (Old value − New value) ÷ Old value × 100"],
          note: "The old value must not be zero. If the answer is negative, the value actually went up.",
        },
      ],
    },
    {
      h2: "How to calculate percentage decrease step by step",
      blocks: [
        {
          t: "ol",
          items: [
            "Subtract the new value from the old value. This is the amount of the decrease.",
            "Divide that amount by the old value.",
            "Multiply the result by 100 and add a % sign.",
          ],
        },
        {
          t: "p",
          text: "Example: a jacket was 1,200 and is now 900. The decrease is 1,200 − 900 = 300. Then 300 ÷ 1,200 = 0.25, and 0.25 × 100 = 25%. The price fell by 25%.",
        },
      ],
    },
    {
      h2: "Worked examples",
      blocks: [
        {
          t: "table",
          caption: "Percentage decrease examples",
          head: ["Old value", "New value", "Decrease", "Percentage decrease"],
          rows: [
            ["100", "80", "20", "20%"],
            ["60", "45", "15", "25%"],
            ["840", "714", "126", "15%"],
            ["500", "450", "50", "10%"],
            ["40", "10", "30", "75%"],
          ],
        },
      ],
    },
    {
      h2: "Where percentage decrease is used",
      blocks: [
        {
          t: "ul",
          items: [
            "Shopping: how big a discount is compared with the original price.",
            "Budgeting: how much you cut a monthly expense.",
            "Health and fitness: weight lost compared with your starting weight.",
            "Business: a drop in sales, traffic or customers between two periods.",
            "Markets: how far a price has fallen from an earlier level.",
          ],
        },
        {
          t: "p",
          text: "Need the sale price instead of the percentage? Use the [increase or decrease by a percentage calculator](/increase-by-percentage-calculator). Need the full price before a discount? Try the [reverse percentage calculator](/reverse-percentage-calculator).",
        },
      ],
    },
    {
      h2: "Common mistakes to avoid",
      blocks: [
        {
          t: "ul",
          items: [
            "Dividing by the new value. Going from 100 to 80 is a 20% decrease (20 ÷ 100), not 25% (20 ÷ 80).",
            "Expecting a drop and a rise of the same size to cancel out. 100 decreased by 50% is 50, but 50 increased by 50% is only 75.",
            "Mixing up percent and percentage points. A rate that falls from 8% to 6% has dropped 2 percentage points, which is a 25% decrease.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: "How do I calculate percentage decrease?",
      a: "Subtract the new value from the old value, divide the result by the old value, then multiply by 100. For example, going from 100 to 80 gives (100 − 80) ÷ 100 × 100 = 20%.",
    },
    {
      q: "Can a percentage decrease be more than 100%?",
      a: "For positive numbers it can’t, because a value can’t fall below zero. A decrease of exactly 100% means the value dropped to zero.",
    },
    {
      q: "What if my result says increase instead of decrease?",
      a: "That means the final value is higher than the starting value. The calculator switches the label for you and shows the size of the increase.",
    },
    {
      q: "Is a discount the same as a percentage decrease?",
      a: "Yes. A discount is a percentage decrease measured against the original price. A 25% discount on 1,200 takes 300 off and leaves 900.",
    },
    {
      q: "Why can’t the starting value be zero?",
      a: "A percentage decrease is measured against the starting value, and dividing by zero has no answer.",
    },
  ],
  related: [
    "",
    "percentage-change-calculator",
    "increase-by-percentage-calculator",
    "reverse-percentage-calculator",
    "percentage-difference-calculator",
  ],
};

/* ------------------------------------------------------------------ */

const change: PageDef = {
  slug: "percentage-change-calculator",
  kind: "calculator",
  mode: "change",
  navLabel: "Percentage Change",
  title: "Percentage Change Calculator (Increase or Decrease)",
  description:
    "Free percentage change calculator. See whether a value went up or down and by what percentage, with the formula and clear step-by-step working.",
  h1: "Percentage Change Calculator",
  lead: "Enter the starting value and the final value. A positive result is an increase and a negative result is a decrease.",
  sections: [
    {
      h2: "What is percentage change?",
      blocks: [
        {
          t: "p",
          text: "Percentage change compares a new value with an old one and expresses the gap as a percentage of the old value. It works in both directions, so one formula covers growth and decline.",
        },
        {
          t: "p",
          text: "If you already know which way the number moved, you can use the dedicated [percentage increase calculator](/) or [percentage decrease calculator](/percentage-decrease-calculator). Use this page when you are not sure, or when you want a signed result.",
        },
      ],
    },
    {
      h2: "Percentage change formula",
      blocks: [
        {
          t: "formula",
          lines: ["Percentage change = (New value − Old value) ÷ |Old value| × 100"],
          note: "A positive answer is an increase. A negative answer is a decrease. The old value must not be zero.",
        },
        {
          t: "p",
          text: "The bars around the old value mean “absolute value”, which simply ignores a minus sign. For ordinary positive numbers you can read the formula without them. They matter only when the starting value is negative, because dividing by the plain negative number would flip the sign of the answer.",
        },
      ],
    },
    {
      h2: "Worked examples",
      blocks: [
        {
          t: "table",
          caption: "Percentage change examples",
          head: ["Old value", "New value", "Change", "Percentage change"],
          rows: [
            ["80", "100", "+20", "+25%"],
            ["100", "80", "−20", "−20%"],
            ["45", "27", "−18", "−40%"],
            ["15", "18", "+3", "+20%"],
            ["1,000", "1,075", "+75", "+7.5%"],
          ],
        },
        {
          t: "p",
          text: "The first two rows use the same two numbers in opposite order. Going from 80 to 100 is +25%, but going back from 100 to 80 is only −20%. The change is the same size (20), but each percentage is measured against a different starting point.",
        },
      ],
    },
    {
      h2: "Percentage change vs percentage points",
      blocks: [
        {
          t: "p",
          text: "When the numbers you compare are already percentages, be careful with wording. If an unemployment rate goes from 4% to 5%, it has risen by 1 percentage point. The percentage change is 25%, because 1 is a quarter of 4.",
        },
      ],
    },
    {
      h2: "When to use percentage change",
      blocks: [
        {
          t: "ul",
          items: [
            "Comparing a price, bill or salary at two points in time.",
            "Tracking monthly or yearly figures such as revenue, traffic or expenses.",
            "Reporting results in a school project, lab report or business summary.",
          ],
        },
        {
          t: "p",
          text: "If neither number is the “original” and you just want to compare two values, use the [percentage difference calculator](/percentage-difference-calculator) instead.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "How do I calculate percentage change?",
      a: "Subtract the old value from the new value, divide by the old value, then multiply by 100. A positive result is an increase and a negative result is a decrease.",
    },
    {
      q: "Why is the change from 80 to 100 not the same as from 100 to 80?",
      a: "Both changes are 20 units, but percentages are measured against the starting value. 20 is 25% of 80, and 20 is 20% of 100.",
    },
    {
      q: "What is the difference between percentage change and percentage difference?",
      a: "Percentage change measures movement from an old value to a new value. Percentage difference compares two values without treating either one as the starting point.",
    },
    {
      q: "What happens if the old value is negative?",
      a: "The calculator divides by the absolute value of the old value, so the sign of the answer still shows whether the number moved up or down.",
    },
  ],
  related: [
    "",
    "percentage-decrease-calculator",
    "percentage-difference-calculator",
    "increase-by-percentage-calculator",
    "percentage-vs-percentage-points",
  ],
};

/* ------------------------------------------------------------------ */

const difference: PageDef = {
  slug: "percentage-difference-calculator",
  kind: "calculator",
  mode: "difference",
  navLabel: "Percentage Difference",
  title: "Percentage Difference Calculator (Free, With Steps)",
  description:
    "Free percentage difference calculator. Compare two numbers as a percentage of their average, with the formula and step-by-step working.",
  h1: "Percentage Difference Calculator",
  lead: "Enter any two values. You get the percentage difference between them, and the result is the same whichever order you type them in.",
  sections: [
    {
      h2: "What is percentage difference?",
      blocks: [
        {
          t: "p",
          text: "Percentage difference compares two values when neither one is the “original”. Instead of measuring against a starting point, it measures the gap against the average of the two numbers. That is why swapping the numbers never changes the answer.",
        },
      ],
    },
    {
      h2: "Percentage difference formula",
      blocks: [
        {
          t: "formula",
          lines: ["Percentage difference = |A − B| ÷ ((A + B) ÷ 2) × 100"],
          note: "A and B are the two values. The bars mean absolute value, so the result is never negative.",
        },
      ],
    },
    {
      h2: "How to calculate percentage difference step by step",
      blocks: [
        {
          t: "ol",
          items: [
            "Find the gap between the two values and ignore any minus sign.",
            "Find the average of the two values by adding them and dividing by 2.",
            "Divide the gap by the average.",
            "Multiply by 100 and add a % sign.",
          ],
        },
        {
          t: "p",
          text: "Example: compare 80 and 100. The gap is 20. The average is (80 + 100) ÷ 2 = 90. Then 20 ÷ 90 = 0.2222, so the percentage difference is about 22.22%.",
        },
      ],
    },
    {
      h2: "Worked examples",
      blocks: [
        {
          t: "table",
          caption: "Percentage difference examples",
          head: ["Value A", "Value B", "Gap", "Average", "Percentage difference"],
          rows: [
            ["50", "70", "20", "60", "33.33%"],
            ["10", "30", "20", "20", "100%"],
            ["200", "220", "20", "210", "9.52%"],
            ["45", "55", "10", "50", "20%"],
            ["1,000", "1,500", "500", "1,250", "40%"],
          ],
        },
      ],
    },
    {
      h2: "Percentage difference vs percentage change",
      blocks: [
        {
          t: "p",
          text: "Use percentage change when something moved from an old value to a new value over time, such as a price last month versus this month. Use percentage difference when you are comparing two things side by side, such as the same product in two shops or the results of two groups.",
        },
        {
          t: "p",
          text: "The two can give different answers for the same numbers. For 80 and 100, the [percentage change](/percentage-change-calculator) is 25%, while the percentage difference is 22.22%.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "How do I calculate percentage difference?",
      a: "Divide the gap between the two values by their average, then multiply by 100. For 80 and 100, the gap is 20, the average is 90, and 20 ÷ 90 × 100 is about 22.22%.",
    },
    {
      q: "Does the order of the two numbers matter?",
      a: "No. The gap and the average are the same either way round, so the percentage difference is identical.",
    },
    {
      q: "What is the biggest possible percentage difference?",
      a: "For two non-negative numbers it is 200%, which happens when one of the values is zero.",
    },
    {
      q: "Why is my answer different from the percentage change?",
      a: "Percentage change divides by the starting value, while percentage difference divides by the average of both values. Different denominators give different percentages.",
    },
  ],
  related: [
    "percentage-change-calculator",
    "",
    "percentage-decrease-calculator",
    "increase-by-percentage-calculator",
  ],
};

/* ------------------------------------------------------------------ */

const reverse: PageDef = {
  slug: "reverse-percentage-calculator",
  kind: "calculator",
  mode: "reverse",
  navLabel: "Reverse Percentage",
  title: "Reverse Percentage Calculator: Find the Original Value",
  description:
    "Free reverse percentage calculator. Find the original number before a percentage increase or decrease, with the formula and step-by-step working.",
  h1: "Reverse Percentage Calculator",
  lead: "You know the value after a percentage increase or decrease. Enter it with the percentage and get the number you started with.",
  sections: [
    {
      h2: "What is a reverse percentage?",
      blocks: [
        {
          t: "p",
          text: "A reverse percentage works backwards. Instead of adding or taking away a percentage from a number, you start with the result and work out what the original number must have been. It is useful for finding a price before a discount or before tax was added.",
        },
      ],
    },
    {
      h2: "Reverse percentage formula",
      blocks: [
        {
          t: "formula",
          lines: [
            "Original value = Final value ÷ (1 + Percentage ÷ 100)   (for an increase)",
            "Original value = Final value ÷ (1 − Percentage ÷ 100)   (for a decrease)",
          ],
          note: "The part in brackets is the multiplier. A 20% increase has a multiplier of 1.2, and a 25% decrease has a multiplier of 0.75.",
        },
      ],
    },
    {
      h2: "How to find the original value step by step",
      blocks: [
        {
          t: "ol",
          items: [
            "Turn the percentage into a multiplier. Add it to 1 for an increase, or take it away from 1 for a decrease.",
            "Divide the value you have by that multiplier.",
          ],
        },
        {
          t: "p",
          text: "Example: after a 20% increase, a price is 120. The multiplier is 1.2, and 120 ÷ 1.2 = 100. The original price was 100.",
        },
        {
          t: "p",
          text: "Example with a decrease: a coat costs 75 after 25% off. The multiplier is 0.75, and 75 ÷ 0.75 = 100. The full price was 100.",
        },
      ],
    },
    {
      h2: "Worked examples",
      blocks: [
        {
          t: "table",
          caption: "Reverse percentage examples",
          head: ["Value after the change", "Change applied", "Original value"],
          rows: [
            ["120", "+20%", "100"],
            ["75", "−25%", "100"],
            ["1,180", "+18%", "1,000"],
            ["90", "−10%", "100"],
            ["330", "+10%", "300"],
          ],
        },
      ],
    },
    {
      h2: "A very common mistake",
      blocks: [
        {
          t: "p",
          text: "Many people take 20% off 120 and get 96. That is wrong, because the 20% was added to the original number, not to 120. The right answer is 100. Dividing by the multiplier undoes the original change exactly.",
        },
        {
          t: "p",
          text: "To check any answer, run it forward with the [increase or decrease by a percentage calculator](/increase-by-percentage-calculator). Starting from 100 and adding 20% gives 120 again.",
        },
      ],
    },
    {
      h2: "When to use a reverse percentage",
      blocks: [
        {
          t: "ul",
          items: [
            "Finding the price before tax from a price that already includes tax.",
            "Finding the full price from a sale price and the discount.",
            "Finding a salary or rent before a raise.",
            "Finding last year’s figure from this year’s figure and the growth rate.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: "How do I find the original price after a discount?",
      a: "Divide the sale price by 1 minus the discount as a decimal. If a coat costs 75 after 25% off, the original price is 75 ÷ 0.75 = 100.",
    },
    {
      q: "How do I remove a percentage that was added, such as tax?",
      a: "Divide the total by 1 plus the rate as a decimal. If a price including 18% tax is 1,180, the price before tax is 1,180 ÷ 1.18 = 1,000.",
    },
    {
      q: "Why can’t I just subtract the percentage from the final value?",
      a: "Because the percentage was calculated from the original number, not from the final one. Subtracting it from the final value uses the wrong base and gives a wrong answer.",
    },
    {
      q: "Why does a 100% decrease give an error?",
      a: "A 100% decrease leaves zero, and every original value leads to the same result. The original can’t be worked out from it.",
    },
  ],
  related: [
    "increase-by-percentage-calculator",
    "",
    "percentage-decrease-calculator",
    "percentage-change-calculator",
  ],
};

/* ------------------------------------------------------------------ */

const addPercent: PageDef = {
  slug: "increase-by-percentage-calculator",
  kind: "calculator",
  mode: "add-percent",
  navLabel: "Increase a Number by %",
  title: "Increase or Decrease a Number by a Percentage",
  description:
    "Free calculator to add or subtract a percentage from any number. Get the new value and the change amount, with the formula and steps.",
  h1: "Increase or Decrease a Number by a Percentage",
  lead: "Enter a number and a percentage, choose increase or decrease, and see the new value with the working shown.",
  sections: [
    {
      h2: "How to increase a number by a percentage",
      blocks: [
        {
          t: "p",
          text: "To increase a number by a percentage, work out that percentage of the number and add it on. A shortcut is to multiply by 1 plus the percentage written as a decimal.",
        },
        {
          t: "formula",
          lines: [
            "Increase: New value = Number × (1 + Percentage ÷ 100)",
            "Decrease: New value = Number × (1 − Percentage ÷ 100)",
          ],
        },
        {
          t: "p",
          text: "Example: increase 200 by 15%. 15% of 200 is 30, so the answer is 200 + 30 = 230. With the shortcut, 200 × 1.15 = 230.",
        },
      ],
    },
    {
      h2: "Worked examples",
      blocks: [
        {
          t: "table",
          caption: "Increase and decrease by a percentage",
          head: ["Number", "Change", "New value"],
          rows: [
            ["200", "+15%", "230"],
            ["80", "+50%", "120"],
            ["1,500", "+8%", "1,620"],
            ["500", "−12%", "440"],
            ["250", "−40%", "150"],
          ],
        },
      ],
    },
    {
      h2: "Quick mental maths",
      blocks: [
        {
          t: "p",
          text: "Ten percent of a number is easy: move the decimal point one place to the left. Build other percentages from it. For 15% of 200, take 10% (20) and half of that (10) for 5%, then add them to get 30.",
        },
      ],
    },
    {
      h2: "Repeated increases don’t simply add up",
      blocks: [
        {
          t: "p",
          text: "Two increases of 10% in a row are not a 20% increase. Starting from 100, the first gives 110 and the second gives 121, so the total rise is 21%. Each new percentage is applied to the latest value, not the original. This is the idea behind compound growth.",
        },
        {
          t: "p",
          text: "To measure the overall change between a start and an end value, use the [percentage change calculator](/percentage-change-calculator).",
        },
      ],
    },
    {
      h2: "When to use this calculator",
      blocks: [
        {
          t: "ul",
          items: [
            "Adding a markup or margin to a cost price.",
            "Working out a salary after a raise.",
            "Adding a tax or service charge to a bill.",
            "Finding a sale price after a discount.",
            "Projecting rent, fees or costs after a planned increase.",
          ],
        },
        {
          t: "p",
          text: "Going the other way? If you know the final price and the percentage, the [reverse percentage calculator](/reverse-percentage-calculator) finds the starting number.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "How do I increase a number by 10%?",
      a: "Multiply it by 1.1. For example, 250 increased by 10% is 250 × 1.1 = 275.",
    },
    {
      q: "How do I decrease a number by a percentage?",
      a: "Multiply it by 1 minus the percentage as a decimal. To take 40% off 250, multiply by 0.6 to get 150.",
    },
    {
      q: "How do I add 20% to a price?",
      a: "Multiply the price by 1.2. A price of 50 becomes 60.",
    },
    {
      q: "Do two 10% increases make a 20% increase?",
      a: "No. They make a 21% increase, because the second 10% is applied to the already increased value.",
    },
  ],
  related: [
    "reverse-percentage-calculator",
    "",
    "percentage-decrease-calculator",
    "percentage-change-calculator",
  ],
};

/* ------------------------------------------------------------------ */

function withExtras(page: PageDef): PageDef {
  const sections = [...page.sections, ...(EXTRA_SECTIONS[page.slug] ?? []), ...(MORE_SECTIONS[page.slug] ?? [])];
  const faq = [...(page.faq ?? []), ...(EXTRA_FAQ[page.slug] ?? []), ...(MORE_FAQ[page.slug] ?? [])];
  return { ...page, sections, faq: faq.length ? faq : undefined };
}

const BASE = [home, decrease, change, difference, addPercent, reverse].map(withExtras);

/** Every calculator page, in the order they appear in menus. */
export const TOOL_PAGES: PageDef[] = [
  ...BASE,
  ...NEW_CALCULATORS.map(withExtras),
];

/** Every blog post, in the order they appear in menus. */
export const POST_PAGES: PageDef[] = POSTS.map(withExtras);

export const HUB_PAGES: PageDef[] = HUBS;

/** Calculators and blog posts together (pages that show a calculator). */
export const CALCULATOR_PAGES: PageDef[] = [...TOOL_PAGES, ...POST_PAGES];

export function getPage(slug: string): PageDef | undefined {
  return CALCULATOR_PAGES.find((p) => p.slug === slug);
}
