import type { PageDef } from "./pages";

const percentOf: PageDef = {
  slug: "percentage-of-a-number-calculator",
  kind: "calculator",
  mode: "percent-of",
  navLabel: "Percentage of a Number",
  title: "Percentage of a Number Calculator: What Is X% of Y?",
  description:
    "Free calculator to find a percentage of any number. See what 15% of 200 is, with the formula, step-by-step working and quick mental-math tricks.",
  h1: "Percentage of a Number Calculator",
  lead: "Find a percentage of any number, such as what is 15% of 200. Enter the percentage and the number, and the working is shown for you.",
  sections: [
    {
      h2: "What does “percentage of a number” mean?",
      blocks: [
        {
          t: "p",
          text: "“Percent” means “out of 100”. So 15% of 200 means 15 for every 100 in 200. Because 200 holds two hundreds, the answer is 2 × 15 = 30. Finding a percentage of a number is the most common percentage calculation, and it is behind tips, taxes, discounts, commissions and exam marks.",
        },
      ],
    },
    {
      h2: "Percentage of a number formula",
      blocks: [
        {
          t: "formula",
          lines: ["Percentage of a number = Number × Percentage ÷ 100"],
          note: "You can also turn the percentage into a decimal first, then multiply. 15% becomes 0.15, and 200 × 0.15 = 30.",
        },
      ],
    },
    {
      h2: "How to find a percentage of a number step by step",
      blocks: [
        {
          t: "ol",
          items: [
            "Write the percentage as a decimal by dividing it by 100.",
            "Multiply the number by that decimal.",
          ],
        },
        {
          t: "p",
          text: "Example: what is 35% of 80? 35 ÷ 100 = 0.35, and 80 × 0.35 = 28. So 35% of 80 is 28.",
        },
      ],
    },
    {
      h2: "Worked examples",
      blocks: [
        {
          t: "table",
          caption: "Percentage of a number examples",
          head: ["Percentage", "Number", "Result"],
          rows: [
            ["10", "250", "25"],
            ["15", "200", "30"],
            ["25", "80", "20"],
            ["5", "1,200", "60"],
            ["12.5", "64", "8"],
            ["150", "40", "60"],
            ["0.5", "2,000", "10"],
          ],
        },
        {
          t: "p",
          text: "A percentage can be more than 100. 150% of 40 is 60, because 150% means one and a half times the number.",
        },
      ],
    },
    {
      h2: "Mental-math shortcuts",
      blocks: [
        {
          t: "ul",
          items: [
            "50% is half. Half of 90 is 45.",
            "25% is a quarter. A quarter of 80 is 20.",
            "10% means moving the decimal point one place left. 10% of 250 is 25.",
            "1% means dividing by 100. 1% of 640 is 6.4.",
            "Build other percentages from these. For 35%, take 10% three times and add 5% (half of 10%). On 80 that is 8 + 8 + 8 + 4 = 28.",
          ],
        },
      ],
    },
    {
      h2: "Where you will use it",
      blocks: [
        {
          t: "ul",
          items: [
            "Tips and service charges on a bill.",
            "Sales tax or VAT on a price.",
            "Discounts. A 30% discount on 60 takes off 18.",
            "Commission. A 4% commission on a sale of 2,500 is 100.",
            "Marking and grades, when a test is worth a share of the final mark.",
          ],
        },
        {
          t: "p",
          text: "To add or take away the percentage from the number in one go, use the [increase or decrease a number by a percentage calculator](/increase-by-percentage-calculator). To go the other way and find what percent one number is of another, use the [what percent calculator](/what-percent-calculator).",
        },
      ],
    },
  ],
  faq: [
    {
      q: "What is 20% of 150?",
      a: "20 ÷ 100 = 0.2, and 150 × 0.2 = 30. So 20% of 150 is 30.",
    },
    {
      q: "How do I calculate 15% of a number?",
      a: "Multiply the number by 0.15. For example, 15% of 200 is 200 × 0.15 = 30.",
    },
    {
      q: "How can I work out 5% quickly in my head?",
      a: "Find 10% by moving the decimal point one place left, then halve it. 5% of 260 is half of 26, which is 13.",
    },
    {
      q: "Can a percentage of a number be bigger than the number?",
      a: "Yes, when the percentage is above 100%. 200% of 30 is 60.",
    },
  ],
  related: [
    "what-percent-calculator",
    "increase-by-percentage-calculator",
    "",
    "percentage-decrease-calculator",
  ],
};

const whatPercent: PageDef = {
  slug: "what-percent-calculator",
  kind: "calculator",
  mode: "what-percent",
  navLabel: "What Percent Is X of Y",
  title: "What Percent Is X of Y? Percent Calculator With Steps",
  description:
    "Free calculator for “X is what percent of Y”. Enter a part and a total to get the percentage, with the formula and step-by-step working.",
  h1: "What Percent Is X of Y?",
  lead: "Enter a number and a total to see what percent the number is of the total, for example 30 out of 200.",
  sections: [
    {
      h2: "How to find what percent one number is of another",
      blocks: [
        {
          t: "p",
          text: "To see what percent one number is of another, divide the first number (the part) by the second (the whole), then multiply by 100. This is how you turn “45 out of 60” into 75%.",
        },
        {
          t: "formula",
          lines: ["Percentage = Part ÷ Whole × 100"],
          note: "The whole can’t be zero. The part can be larger than the whole, which gives a percentage above 100%.",
        },
      ],
    },
    {
      h2: "Step by step",
      blocks: [
        {
          t: "ol",
          items: [
            "Decide which number is the part and which is the whole. The whole is the “of” number.",
            "Divide the part by the whole.",
            "Multiply the result by 100.",
          ],
        },
        {
          t: "p",
          text: "Example: 30 is what percent of 200? 30 ÷ 200 = 0.15, and 0.15 × 100 = 15%.",
        },
      ],
    },
    {
      h2: "Worked examples",
      blocks: [
        {
          t: "table",
          caption: "What percent examples",
          head: ["Part", "Whole", "Percentage"],
          rows: [
            ["30", "200", "15%"],
            ["45", "60", "75%"],
            ["7", "20", "35%"],
            ["1", "8", "12.5%"],
            ["90", "60", "150%"],
            ["3", "4", "75%"],
            ["18", "72", "25%"],
          ],
        },
      ],
    },
    {
      h2: "Fractions as percentages",
      blocks: [
        {
          t: "table",
          caption: "Common fractions and their percentages",
          head: ["Fraction", "Percentage"],
          rows: [
            ["1/2", "50%"],
            ["1/3", "33.33%"],
            ["1/4", "25%"],
            ["1/5", "20%"],
            ["1/8", "12.5%"],
            ["2/3", "66.67%"],
            ["3/4", "75%"],
          ],
        },
      ],
    },
    {
      h2: "Everyday uses",
      blocks: [
        {
          t: "ul",
          items: [
            "Exam scores: 45 out of 60 is 75%.",
            "Budgets: rent of 900 from an income of 3,000 is 30% of income.",
            "Conversion rates: 36 purchases from 1,200 visits is 3%.",
            "Progress: 18 of 72 tasks done is 25% complete.",
          ],
        },
      ],
    },
    {
      h2: "A common mistake",
      blocks: [
        {
          t: "p",
          text: "Swapping the part and the whole is the usual slip. “30 is what percent of 200” is 15%, but “200 is what percent of 30” is 666.67%. The number after “of” is always the whole. If you want to go the other way and find 15% of 200, use the [percentage of a number calculator](/percentage-of-a-number-calculator). To measure how much a value has grown, use the [percentage increase calculator](/).",
        },
      ],
    },
  ],
  faq: [
    {
      q: "30 is what percent of 200?",
      a: "30 ÷ 200 = 0.15, and 0.15 × 100 = 15%. So 30 is 15% of 200.",
    },
    {
      q: "What percent is 45 out of 60?",
      a: "45 ÷ 60 = 0.75, so 45 out of 60 is 75%.",
    },
    {
      q: "Can the answer be more than 100%?",
      a: "Yes, when the part is bigger than the whole. 90 is 150% of 60.",
    },
    {
      q: "How do I turn a fraction into a percentage?",
      a: "Divide the top number by the bottom number and multiply by 100. For 3/4, 3 ÷ 4 = 0.75, which is 75%.",
    },
  ],
  related: [
    "percentage-of-a-number-calculator",
    "",
    "percentage-change-calculator",
    "increase-by-percentage-calculator",
  ],
};

const growth: PageDef = {
  slug: "growth-rate-calculator",
  kind: "calculator",
  mode: "growth",
  navLabel: "Growth Rate (CAGR)",
  title: "Growth Rate Calculator (CAGR) With Steps",
  description:
    "Free growth rate calculator. Find the average growth per period (CAGR) between a starting and final value, plus the total change, with steps.",
  h1: "Growth Rate Calculator (CAGR)",
  lead: "Find the average growth rate per period between a starting value and a final value, and see the total change over the whole time.",
  sections: [
    {
      h2: "What is the compound annual growth rate?",
      blocks: [
        {
          t: "p",
          text: "A percentage increase tells you the total change between two values. The compound growth rate, often called CAGR, tells you the steady rate per period that would produce that change if the growth were smooth and compounded each period. It lets you compare things that grew over different lengths of time.",
        },
        {
          t: "p",
          text: "A “period” can be a year, a month or any other unit, as long as you use the same unit for the number of periods. If you enter years, the answer is per year. If you enter months, it is per month.",
        },
      ],
    },
    {
      h2: "Growth rate formula",
      blocks: [
        {
          t: "formula",
          lines: ["Growth rate per period = (Final value ÷ Starting value)^(1 ÷ n) − 1"],
          note: "n is the number of periods. Multiply the result by 100 to show it as a percentage. The starting value must be above zero.",
        },
      ],
    },
    {
      h2: "How to calculate it step by step",
      blocks: [
        {
          t: "ol",
          items: [
            "Divide the final value by the starting value.",
            "Raise the result to the power of 1 divided by the number of periods. This is the same as taking the n-th root.",
            "Subtract 1, then multiply by 100.",
          ],
        },
        {
          t: "p",
          text: "Example: a value grows from 100 to 121 in 2 years. 121 ÷ 100 = 1.21. The square root of 1.21 is 1.1. Subtract 1 to get 0.1, which is 10% per year. Check: 100 × 1.1 × 1.1 = 121.",
        },
      ],
    },
    {
      h2: "Worked examples",
      blocks: [
        {
          t: "table",
          caption: "Growth rate examples",
          head: ["Starting value", "Final value", "Periods", "Average growth per period"],
          rows: [
            ["100", "121", "2", "10%"],
            ["1,000", "1,610.51", "5", "10%"],
            ["500", "800", "4", "12.47%"],
            ["2,000", "3,000", "3", "14.47%"],
            ["100", "50", "3", "−20.63%"],
          ],
        },
      ],
    },
    {
      h2: "Why you shouldn’t just average the yearly percentages",
      blocks: [
        {
          t: "p",
          text: "Suppose a value goes from 100 to 150 (+50%) and then back to 100 (−33.33%). The simple average of +50% and −33.33% is about +8.3%, yet the value has ended exactly where it started. The compound growth rate correctly says 0%.",
        },
        {
          t: "p",
          text: "That is why compound growth is the fair way to describe change over several periods. For a single period, it equals the ordinary [percentage increase](/).",
        },
      ],
    },
    {
      h2: "The rule of 72",
      blocks: [
        {
          t: "p",
          text: "A quick way to estimate how long something takes to double at a steady growth rate is to divide 72 by the rate. At 8% per period, doubling takes about 72 ÷ 8 = 9 periods. The table compares the estimate with the exact figure.",
        },
        {
          t: "table",
          caption: "Rule of 72 compared with the exact doubling time",
          head: ["Growth per period", "Rule of 72 estimate", "Exact doubling time"],
          rows: [
            ["2%", "36", "35.00"],
            ["4%", "18", "17.67"],
            ["6%", "12", "11.90"],
            ["8%", "9", "9.01"],
            ["12%", "6", "6.12"],
          ],
        },
      ],
    },
    {
      h2: "Limits of a growth rate",
      blocks: [
        {
          t: "p",
          text: "A compound growth rate smooths out ups and downs, so it can hide how bumpy the path was. It describes the past and does not predict the future. Figures about investments, in particular, are for illustration only and are not financial advice. See our [disclaimer](/disclaimer).",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Is CAGR the same as percentage increase?",
      a: "Only for one period. Percentage increase is the total change between two values. CAGR is the steady rate per period that would produce that total change over several periods.",
    },
    {
      q: "Can the growth rate be negative?",
      a: "Yes. If the final value is lower than the starting value, the rate is negative. Going from 100 to 50 over 3 periods is about −20.63% per period.",
    },
    {
      q: "Can I use months instead of years?",
      a: "Yes. Enter the number of months, and the answer is the average growth per month. Convert to a yearly figure by compounding: (1 + monthly rate)^12 − 1.",
    },
    {
      q: "Why must the starting value be above zero?",
      a: "The calculation divides by the starting value and then takes a root. A zero or negative start doesn’t give a meaningful growth rate.",
    },
  ],
  related: [
    "",
    "percentage-change-calculator",
    "salary-increase-calculator",
    "percentage-increase-practice-problems",
  ],
};

const salary: PageDef = {
  slug: "salary-increase-calculator",
  kind: "calculator",
  mode: "real-raise",
  navLabel: "Salary Increase",
  title: "Salary Increase Calculator With Inflation Adjustment",
  description:
    "Free salary increase calculator. Enter your old and new pay and the inflation rate to see your raise as a percentage and what it is worth after inflation.",
  h1: "Salary Increase Calculator",
  lead: "Enter your current salary, your new salary and the inflation rate. You see your raise as a percentage and what it is really worth after inflation.",
  sections: [
    {
      h2: "Two ways to look at a raise",
      blocks: [
        {
          t: "p",
          text: "A pay rise from 50,000 to 53,000 is a 6% raise. That is the headline number, and it is simple to work out. But if prices rose 3% over the same time, your pay buys only about 2.9% more than before. The second figure is your real raise, and it is the one that tells you whether you are actually better off.",
        },
        {
          t: "p",
          text: "This calculator gives you both, plus the salary you would have needed just to stand still.",
        },
      ],
    },
    {
      h2: "Salary raise formulas",
      blocks: [
        {
          t: "formula",
          lines: [
            "Raise % = (New salary − Current salary) ÷ Current salary × 100",
            "Real change = (New salary ÷ Current salary) ÷ (1 + Inflation ÷ 100) − 1",
            "Salary to keep up = Current salary × (1 + Inflation ÷ 100)",
          ],
          note: "Use the same time period for the raise and the inflation rate, for example the last 12 months.",
        },
      ],
    },
    {
      h2: "Worked example",
      blocks: [
        {
          t: "p",
          text: "Current salary 50,000, new salary 53,000, inflation 3%.",
        },
        {
          t: "ol",
          items: [
            "Raise: (53,000 − 50,000) ÷ 50,000 = 0.06, which is 6%.",
            "Inflation factor: 1 + 3 ÷ 100 = 1.03.",
            "Real change: (53,000 ÷ 50,000) ÷ 1.03 − 1 = 1.06 ÷ 1.03 − 1 = 0.0291, which is about 2.91%.",
            "Salary needed to keep the same buying power: 50,000 × 1.03 = 51,500.",
          ],
        },
        {
          t: "p",
          text: "The raise of 6% looks generous. Against 3% inflation it is worth roughly 2.9%.",
        },
      ],
    },
    {
      h2: "More examples",
      blocks: [
        {
          t: "table",
          caption: "Salary raise examples",
          head: ["Current salary", "New salary", "Inflation", "Real change in buying power"],
          rows: [
            ["50,000", "53,000", "3%", "+2.91%"],
            ["40,000", "42,000", "5%", "0%"],
            ["60,000", "63,000", "4%", "+0.96%"],
            ["30,000", "31,000", "6%", "−2.52%"],
            ["80,000", "88,000", "2%", "+7.84%"],
          ],
        },
        {
          t: "p",
          text: "The second row is a 5% raise during 5% inflation. The real change is zero, which means you are neither better nor worse off. The fourth row is a raise of about 3.3%, but inflation of 6% means a real pay cut of about 2.5%.",
        },
      ],
    },
    {
      h2: "Which inflation rate should I use?",
      blocks: [
        {
          t: "p",
          text: "Use the consumer price inflation rate published by your country’s statistics office for the same period as your raise. If your own costs, such as rent, rose faster than the headline figure, try a higher number to see how your own situation compares.",
        },
      ],
    },
    {
      h2: "Monthly and yearly pay",
      blocks: [
        {
          t: "p",
          text: "The percentage raise is the same whether you enter yearly or monthly pay, as long as you use the same period for both numbers. If you only know the percentage and want the new figure, use the [increase a number by a percentage calculator](/increase-by-percentage-calculator). To work backwards from a new salary and a raise, use the [reverse percentage calculator](/reverse-percentage-calculator).",
        },
        {
          t: "p",
          text: "This page is for general information and is not financial or employment advice. See the [disclaimer](/disclaimer).",
        },
      ],
    },
  ],
  faq: [
    {
      q: "How do I calculate my salary increase percentage?",
      a: "Subtract your old salary from your new salary, divide by your old salary, and multiply by 100. A raise from 50,000 to 53,000 is 3,000 ÷ 50,000 × 100 = 6%.",
    },
    {
      q: "What is a real raise?",
      a: "A real raise is your raise after taking inflation into account. It shows how much more your pay can buy, not just how many more units of currency you earn.",
    },
    {
      q: "How much do I need to earn to keep up with inflation?",
      a: "Multiply your current salary by 1 plus the inflation rate. With 3% inflation, 50,000 needs to become 51,500 to keep the same buying power.",
    },
    {
      q: "Can a raise still be a pay cut?",
      a: "Yes. If prices rise faster than your pay, your buying power falls even though your salary went up. A 3.3% raise during 6% inflation is a real pay cut of about 2.5%.",
    },
  ],
  related: [
    "increase-by-percentage-calculator",
    "",
    "growth-rate-calculator",
    "reverse-percentage-calculator",
  ],
};

export const NEW_CALCULATORS: PageDef[] = [percentOf, whatPercent, growth, salary];
