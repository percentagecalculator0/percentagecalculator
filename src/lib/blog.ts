import type { PageDef } from "./pages";

const excel: PageDef = {
  slug: "how-to-calculate-percentage-increase-in-excel",
  kind: "post",
  mode: "increase",
  navLabel: "Percentage Increase in Excel",
  title: "Percentage Increase in Excel & Google Sheets: Formulas",
  description:
    "Step-by-step formulas for percentage increase, decrease and change in Excel and Google Sheets, with fixes for #DIV/0! and wrong-looking results.",
  h1: "How to Calculate Percentage Increase in Excel and Google Sheets",
  lead: "The exact formulas for percentage increase, decrease and change in a spreadsheet, how to format the result, and how to fix the usual errors. You can check any answer with the calculator below.",
  sections: [
    {
      h2: "The basic percentage increase formula",
      blocks: [
        {
          t: "p",
          text: "Put the old value in cell A2 and the new value in B2. In C2, type this formula:",
        },
        { t: "formula", lines: ["=(B2-A2)/A2"] },
        {
          t: "p",
          text: "Press Enter. The cell will probably show a decimal such as 0.25. That is correct. It just needs to be displayed as a percentage.",
        },
        {
          t: "ol",
          items: [
            "Select the cell with the result.",
            "On the Home tab in Excel, choose the Percent Style button (the % symbol). In Google Sheets, use Format, then Number, then Percent.",
            "The cell now shows 25%. Use the Increase Decimal button if you want 25.0%.",
          ],
        },
        {
          t: "p",
          text: "You don’t need to multiply by 100 in the formula. The percentage format does that for you. Multiplying by 100 and then applying the percentage format is the classic way to end up with 2500% instead of 25%.",
        },
      ],
    },
    {
      h2: "Copy the formula down a whole column",
      blocks: [
        {
          t: "p",
          text: "With the first formula in C2, double-click the small square at the bottom right corner of the cell, or drag it down. The row numbers update on their own, so C3 becomes =(B3-A3)/A3 and so on.",
        },
        {
          t: "table",
          caption: "Spreadsheet percentage increase examples",
          head: ["Old value (A)", "New value (B)", "Result in column C"],
          rows: [
            ["80", "100", "25%"],
            ["50", "60", "20%"],
            ["200", "150", "−25%"],
          ],
        },
        {
          t: "p",
          text: "A negative result in the third row means the value went down. It is a percentage decrease of 25%.",
        },
      ],
    },
    {
      h2: "Other percentage formulas you will need",
      blocks: [
        {
          t: "p",
          text: "Keep the percentage in its own cell and format that cell as a percentage. Here A2 holds the number and B2 holds the percentage, for example 15%.",
        },
        {
          t: "formula",
          title: "Increase a number by a percentage",
          lines: ["=A2*(1+B2)"],
        },
        {
          t: "formula",
          title: "Decrease a number by a percentage",
          lines: ["=A2*(1-B2)"],
        },
        {
          t: "formula",
          title: "Find the original number before an increase",
          lines: ["=A2/(1+B2)"],
        },
        {
          t: "formula",
          title: "Percentage of a number",
          lines: ["=A2*B2"],
        },
        {
          t: "formula",
          title: "What percent one cell is of the total of a range",
          lines: ["=B2/SUM($B$2:$B$10)"],
          note: "The dollar signs lock the range, so it doesn’t move when you copy the formula down.",
        },
      ],
    },
    {
      h2: "How to fix common errors",
      blocks: [
        {
          t: "p",
          text: "#DIV/0! appears when the old value is zero or empty, because the formula divides by it. A percentage increase from zero can’t be calculated. To hide the error and leave the cell empty instead, wrap the formula in IFERROR:",
        },
        { t: "formula", lines: ['=IFERROR((B2-A2)/A2,"")'] },
        {
          t: "ul",
          items: [
            "The result shows 0.25 instead of 25%: the cell is not formatted as a percentage. Apply Percent Style.",
            "The result shows 2500%: you multiplied by 100 and also formatted as a percentage. Remove the “*100”.",
            "The result is the wrong sign for negative starting values: use =(B2-A2)/ABS(A2) so the sign shows the direction of the move.",
            "The result looks like text or doesn’t calculate: the numbers may be stored as text. Re-enter them or use the Convert to Number option.",
          ],
        },
      ],
    },
    {
      h2: "Check your spreadsheet against a calculator",
      blocks: [
        {
          t: "p",
          text: "It is easy to point a formula at the wrong cell, and a wrong cell still produces a believable number. Check one or two rows with the [percentage increase calculator](/), which shows every step. That page also explains the formula in detail. For a result that can be either an increase or a decrease, see the [percentage change calculator](/percentage-change-calculator).",
        },
      ],
    },
  ],
  faq: [
    {
      q: "What is the percentage increase formula in Excel?",
      a: "With the old value in A2 and the new value in B2, use =(B2-A2)/A2 and format the cell as a percentage.",
    },
    {
      q: "How do I add a percentage to a number in Excel?",
      a: "Multiply the number by 1 plus the percentage. If A2 holds the number and B2 holds 15%, use =A2*(1+B2).",
    },
    {
      q: "Why does my Excel percentage show 2500% instead of 25%?",
      a: "You multiplied by 100 in the formula and also applied the percentage format. Remove the multiplication by 100.",
    },
    {
      q: "Do these formulas work in Google Sheets?",
      a: "Yes. Every formula on this page works the same way in Google Sheets.",
    },
  ],
  related: [
    "",
    "increase-by-percentage-calculator",
    "percentage-change-calculator",
    "percentage-increase-practice-problems",
  ],
};

const points: PageDef = {
  slug: "percentage-vs-percentage-points",
  kind: "post",
  mode: "change",
  navLabel: "Percentage vs Percentage Points",
  title: "Percentage vs Percentage Points: What’s the Difference?",
  description:
    "Learn the difference between a percent change and a percentage-point change, with clear examples on interest rates, polls and market share.",
  h1: "Percentage vs Percentage Points",
  lead: "A rate that moves from 4% to 6% has risen by 2 percentage points, and also by 50%. Both are true, and they mean different things. Here is how to tell them apart.",
  sections: [
    {
      h2: "The short answer",
      blocks: [
        {
          t: "p",
          text: "A percentage point is the plain gap between two percentages. A percent change compares that gap with the starting percentage. When both of your numbers are already percentages, you can describe the move in either way, and you need to be clear which one you mean.",
        },
        {
          t: "formula",
          lines: [
            "Change in percentage points = New percentage − Old percentage",
            "Percent change = (New percentage − Old percentage) ÷ Old percentage × 100",
          ],
        },
      ],
    },
    {
      h2: "A worked example",
      blocks: [
        {
          t: "p",
          text: "A savings account rate goes from 4% to 6%. The change in percentage points is 6 − 4 = 2 points. The percent change is 2 ÷ 4 × 100 = 50%. So the rate rose by 2 percentage points, and it is 50% higher than before.",
        },
        {
          t: "table",
          caption: "Percentage points versus percent change",
          head: ["Old rate", "New rate", "Change in percentage points", "Percent change"],
          rows: [
            ["4%", "6%", "+2", "+50%"],
            ["5%", "4%", "−1", "−20%"],
            ["40%", "46%", "+6", "+15%"],
            ["20%", "25%", "+5", "+25%"],
            ["2%", "3%", "+1", "+50%"],
          ],
        },
        {
          t: "p",
          text: "Notice that a small move in points can be a big percent change when the starting rate is low. Going from 2% to 3% is only 1 point, but it is a 50% rise.",
        },
      ],
    },
    {
      h2: "Why the wording matters",
      blocks: [
        {
          t: "p",
          text: "Mixing the two up changes the meaning of a sentence a lot. “Unemployment rose by 1%” could mean it went from 5% to 5.05%, or from 5% to 6%. The second is a rise of 1 percentage point. Using the right term removes the doubt.",
        },
        {
          t: "ul",
          items: [
            "Interest rates: a central bank raising a rate from 3% to 3.5% is raising it by half a percentage point, not by half a percent.",
            "Polls: support moving from 40% to 46% is a 6-point gain, or a 15% relative increase.",
            "Market share: going from 20% to 25% share is a 5-point gain, or 25% growth.",
            "Taxes: a VAT rate rising from 18% to 20% is 2 percentage points, or about an 11.1% increase in the rate.",
          ],
        },
      ],
    },
    {
      h2: "Which one should I use?",
      blocks: [
        {
          t: "p",
          text: "Use percentage points when you want to describe the plain size of the gap between two rates. Use a percent change when you want to describe how big the move is relative to where the rate started. If you are unsure, give both: “from 4% to 6%, up 2 percentage points (a 50% increase)”.",
        },
      ],
    },
    {
      h2: "Calculate the percent change yourself",
      blocks: [
        {
          t: "p",
          text: "Enter the old and new rates as plain numbers in the calculator above. For 4% to 6%, type 4 and 6. The result of +50% is the percent change, and the gap in points is simply the difference between your two inputs. For more on percent changes, see the [percentage change calculator](/percentage-change-calculator) and the [percentage increase calculator](/).",
        },
      ],
    },
  ],
  faq: [
    {
      q: "What is a percentage point?",
      a: "A percentage point is the arithmetic difference between two percentages. Going from 10% to 12% is a rise of 2 percentage points.",
    },
    {
      q: "Is a 2 percentage point rise the same as a 2% rise?",
      a: "No. If a rate goes from 10% to 12%, that is 2 percentage points, but the percent change is 2 ÷ 10 × 100 = 20%.",
    },
    {
      q: "How do I convert percentage points to percent change?",
      a: "Divide the change in percentage points by the old percentage and multiply by 100.",
    },
  ],
  related: [
    "percentage-change-calculator",
    "",
    "percentage-increase-practice-problems",
  ],
};

const discount: PageDef = {
  slug: "how-to-calculate-discount-percentage",
  kind: "post",
  mode: "decrease",
  navLabel: "Discount Percentage",
  title: "How to Calculate Discount Percentage and Sale Price",
  description:
    "Work out a discount percentage, a sale price or an original price with simple formulas. Includes stacked discounts, tax and worked examples.",
  h1: "How to Calculate Discount Percentage and Sale Price",
  lead: "Find the discount percentage from two prices, the sale price from a discount, or the original price before a sale. Try your own prices in the calculator below.",
  sections: [
    {
      h2: "The discount percentage formula",
      blocks: [
        {
          t: "p",
          text: "A discount is a percentage decrease measured against the original price.",
        },
        {
          t: "formula",
          lines: ["Discount % = (Original price − Sale price) ÷ Original price × 100"],
        },
        {
          t: "p",
          text: "Example: a jacket was 120 and is now 90. You save 30, and 30 ÷ 120 = 0.25, so the discount is 25%.",
        },
      ],
    },
    {
      h2: "Worked examples",
      blocks: [
        {
          t: "table",
          caption: "Discount examples",
          head: ["Original price", "Sale price", "You save", "Discount"],
          rows: [
            ["80", "60", "20", "25%"],
            ["120", "90", "30", "25%"],
            ["250", "200", "50", "20%"],
            ["500", "425", "75", "15%"],
            ["40", "32", "8", "20%"],
            ["1,200", "900", "300", "25%"],
          ],
        },
      ],
    },
    {
      h2: "How to find the sale price",
      blocks: [
        {
          t: "p",
          text: "If you know the original price and the discount percentage, multiply the original price by 1 minus the discount as a decimal.",
        },
        {
          t: "formula",
          lines: ["Sale price = Original price × (1 − Discount ÷ 100)"],
          note: "A 30% discount on 60 gives 60 × 0.7 = 42. You save 18.",
        },
        {
          t: "p",
          text: "You can do this with the [increase or decrease a number by a percentage calculator](/increase-by-percentage-calculator) by choosing Decrease.",
        },
      ],
    },
    {
      h2: "How to find the original price",
      blocks: [
        {
          t: "p",
          text: "If you only know the sale price and the discount, divide the sale price by 1 minus the discount as a decimal. A coat now costs 75 after 25% off, so the original price was 75 ÷ 0.75 = 100. Taking 25% off 75 and adding it back would give the wrong answer, because the 25% was taken from the original, not from 75. The [reverse percentage calculator](/reverse-percentage-calculator) does this for you.",
        },
      ],
    },
    {
      h2: "Stacked discounts: why 20% + 10% isn’t 30%",
      blocks: [
        {
          t: "p",
          text: "When a shop takes a second discount off an already reduced price, the second percentage applies to the smaller amount. So the total saving is less than the two percentages added together. Take 20% off 100 to get 80, then 10% off 80 to get 72. The total discount is 28%.",
        },
        {
          t: "table",
          caption: "Total discount from two stacked discounts",
          head: ["First discount", "Second discount", "Total discount"],
          rows: [
            ["10%", "10%", "19%"],
            ["20%", "10%", "28%"],
            ["30%", "20%", "44%"],
            ["50%", "20%", "60%"],
            ["25%", "25%", "43.75%"],
          ],
        },
        {
          t: "p",
          text: "The order of the two discounts doesn’t change the total, because each one is just a multiplier. 0.8 × 0.9 gives the same as 0.9 × 0.8.",
        },
      ],
    },
    {
      h2: "Adding tax to a discounted price",
      blocks: [
        {
          t: "p",
          text: "Tax is also a multiplier, so the order doesn’t matter. A 20% discount and 10% tax on 100 gives 100 × 0.8 × 1.1 = 88, whether you apply the discount or the tax first. If you only know the tax-inclusive price, the [reverse percentage calculator](/reverse-percentage-calculator) removes the tax.",
        },
      ],
    },
    {
      h2: "How to tell if a sale is really a good deal",
      blocks: [
        {
          t: "ul",
          items: [
            "Compare the sale price with what other shops charge now, not with the “was” price on the label.",
            "Work out the unit price (per kilogram, litre or item) when pack sizes differ.",
            "Check whether the percentage applies to the full basket or only to some items.",
            "For “buy one, get one free”, you pay for one of two items, which is 50% off each item.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: "How do I calculate a discount percentage?",
      a: "Subtract the sale price from the original price, divide by the original price, then multiply by 100. A price drop from 80 to 60 is 20 ÷ 80 × 100 = 25%.",
    },
    {
      q: "How do I calculate the sale price after a 30% discount?",
      a: "Multiply the original price by 0.7. A 30% discount on 60 gives a sale price of 42.",
    },
    {
      q: "Is 20% off and then 10% off the same as 30% off?",
      a: "No. It is 28% off in total, because the second discount applies to the already reduced price.",
    },
    {
      q: "How do I find the original price from a sale price?",
      a: "Divide the sale price by 1 minus the discount as a decimal. A sale price of 75 after 25% off means an original price of 75 ÷ 0.75 = 100.",
    },
  ],
  related: [
    "percentage-decrease-calculator",
    "reverse-percentage-calculator",
    "increase-by-percentage-calculator",
    "percentage-of-a-number-calculator",
  ],
};

const practice: PageDef = {
  slug: "percentage-increase-practice-problems",
  kind: "post",
  mode: "increase",
  navLabel: "Practice Problems",
  title: "Percentage Increase Practice Problems With Answers",
  description:
    "Thirteen percentage increase and decrease practice problems with full worked answers, from easy price questions to reverse and compound problems.",
  h1: "Percentage Increase Practice Problems With Answers",
  lead: "Try each problem on paper first, then read the working. Use the calculator below to check your answers, or to see the steps.",
  sections: [
    {
      h2: "Before you start: the method",
      blocks: [
        {
          t: "formula",
          lines: ["Percentage increase = (New − Old) ÷ Old × 100"],
          note: "Always divide by the old (starting) value. If you want a refresher first, read the formula section on the [percentage increase calculator](/) page.",
        },
      ],
    },
    {
      h2: "Easy problems",
      blocks: [
        {
          t: "p",
          text: "Problem 1. A pair of trainers goes up in price from 40 to 50. What is the percentage increase? Answer: the increase is 10, and 10 ÷ 40 = 0.25, so the increase is 25%.",
        },
        {
          t: "p",
          text: "Problem 2. A class grows from 20 pupils to 26 pupils. What is the percentage increase? Answer: the increase is 6, and 6 ÷ 20 = 0.3, so the increase is 30%.",
        },
        {
          t: "p",
          text: "Problem 3. A monthly pay goes from 1,000 to 1,200. What is the percentage increase? Answer: the increase is 200, and 200 ÷ 1,000 = 0.2, so the increase is 20%.",
        },
      ],
    },
    {
      h2: "Medium problems",
      blocks: [
        {
          t: "p",
          text: "Problem 4. A phone’s battery life goes from 8 hours to 10 hours 30 minutes. What is the percentage increase? Answer: 10 hours 30 minutes is 10.5 hours. The increase is 2.5, and 2.5 ÷ 8 = 0.3125, so the increase is 31.25%.",
        },
        {
          t: "p",
          text: "Problem 5. A town’s population grows from 12,000 to 13,200. What is the percentage increase? Answer: the increase is 1,200, and 1,200 ÷ 12,000 = 0.1, so the increase is 10%.",
        },
        {
          t: "p",
          text: "Problem 6. A recipe needs more flour: 250 g becomes 325 g. What is the percentage increase? Answer: the increase is 75, and 75 ÷ 250 = 0.3, so the increase is 30%.",
        },
        {
          t: "p",
          text: "Problem 7. Rent of 800 goes up by 15%. What is the new rent? Answer: 15% of 800 is 120, so the new rent is 920. Or multiply: 800 × 1.15 = 920.",
        },
      ],
    },
    {
      h2: "Harder problems",
      blocks: [
        {
          t: "p",
          text: "Problem 8. After a 20% increase, a price is 90. What was the original price? Answer: divide by the multiplier. 90 ÷ 1.2 = 75. The original price was 75. Check: 75 × 1.2 = 90.",
        },
        {
          t: "p",
          text: "Problem 9. A share price rises by 50% and then falls by 50%. What is the overall change? Answer: start at 100. After the rise it is 150. After the fall it is 75. The overall change is −25%, a loss. The two percentages don’t cancel because the fall is taken from the larger amount.",
        },
        {
          t: "p",
          text: "Problem 10. A value grows from 200 to 242 in two years, with the same percentage increase each year. What is the yearly increase? Answer: 242 ÷ 200 = 1.21, and the square root of 1.21 is 1.1, so the yearly increase is 10%. Check: 200 × 1.1 × 1.1 = 242. The [growth rate calculator](/growth-rate-calculator) does this for any number of years.",
        },
        {
          t: "p",
          text: "Problem 11. Sales fall from 4,500 to 3,600. What is the percentage increase? Answer: this is a trick question. The value went down. The change is −900, and −900 ÷ 4,500 = −0.2, so it is a 20% decrease, not an increase. Use the [percentage decrease calculator](/percentage-decrease-calculator) for questions like this.",
        },
      ],
    },
    {
      h2: "What to do if you got one wrong",
      blocks: [
        {
          t: "ul",
          items: [
            "Dividing by the new value instead of the old value is the most common mistake. Always divide by the starting value.",
            "Forgetting to multiply by 100 gives a decimal such as 0.25 instead of 25%.",
            "Treating a drop as an increase. If the new number is smaller, the result is a decrease.",
            "Subtracting a percentage from the final value when asked for the original. Divide by the multiplier instead.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: "How do I solve percentage increase word problems?",
      a: "Find the amount of the increase by subtracting the old value from the new value. Divide it by the old value, then multiply by 100. Read the question carefully to see whether it asks for the percentage, the new value, or the original value.",
    },
    {
      q: "How do I find the new value after a percentage increase?",
      a: "Multiply the old value by 1 plus the percentage as a decimal. A 15% increase on 800 is 800 × 1.15 = 920.",
    },
    {
      q: "How do I find the original value after a percentage increase?",
      a: "Divide the new value by 1 plus the percentage as a decimal. After a 20% increase to 90, the original was 90 ÷ 1.2 = 75.",
    },
  ],
  related: [
    "",
    "reverse-percentage-calculator",
    "percentage-vs-percentage-points",
  ],
};

export const POSTS: PageDef[] = [excel, points, discount, practice];

/* ------------------------------------------------------------------ */
/* Hub pages                                                           */
/* ------------------------------------------------------------------ */

export const HUB_GROUPS: { heading: string; blurb: string; slugs: string[] }[] = [
  {
    heading: "Measure a change",
    blurb: "You have two numbers and want to know how much one differs from the other.",
    slugs: [
      "percentage-decrease-calculator",
      "percentage-change-calculator",
      "percentage-difference-calculator",
    ],
  },
  {
    heading: "Find a number or a share",
    blurb: "You know a percentage and want a number, or the other way round.",
    slugs: [
      "increase-by-percentage-calculator",
      "reverse-percentage-calculator",
      "percentage-of-a-number-calculator",
      "what-percent-calculator",
    ],
  },
  {
    heading: "Growth and money",
    blurb: "Compare growth over several periods, or see what a raise is really worth.",
    slugs: ["growth-rate-calculator", "salary-increase-calculator"],
  },
];

const calculatorsHub: PageDef = {
  slug: "calculators",
  kind: "hub",
  navLabel: "Calculators",
  title: "All Percentage Calculators (Free, With Steps)",
  description:
    "Every percentage calculator in one place: increase, decrease, change, difference, percentage of a number, reverse percentage, growth rate and salary raise.",
  h1: "Percentage calculators",
  lead: "The homepage is our percentage increase calculator. These nine others cover decreases, shares, reverse percentages, growth and pay. Each one shows the formula and every step of the working.",
  sections: [
    {
      h2: "Which calculator do I need?",
      blocks: [
        {
          t: "p",
          text: "Most percentage questions fall into a few types. If you are not sure where yours fits, match it to a row in the table. Looking for how much something has grown? That is the [percentage increase calculator](/) on the homepage.",
        },
        {
          t: "table",
          caption: "Match your question to a calculator",
          head: ["If you want to know…", "Use this calculator"],
          rows: [
            ["How much has a value grown?", "Percentage increase (homepage)"],
            ["How much has a value fallen?", "Percentage decrease"],
            ["Did it go up or down, and by how much?", "Percentage change"],
            ["How far apart are two values?", "Percentage difference"],
            ["What is a number after adding or taking a percentage?", "Increase or decrease by a percentage"],
            ["What was the number before the change?", "Reverse percentage"],
            ["What is 15% of 200?", "Percentage of a number"],
            ["30 is what percent of 200?", "What percent is X of Y"],
            ["What is the average growth per year?", "Growth rate (CAGR)"],
            ["Is my raise beating inflation?", "Salary increase"],
          ],
        },
      ],
    },
    {
      h2: "Percentage formulas at a glance",
      blocks: [
        {
          t: "table",
          caption: "Percentage formulas",
          head: ["What you want to find", "Formula"],
          rows: [
            ["Percentage increase", "(New − Old) ÷ Old × 100"],
            ["Percentage decrease", "(Old − New) ÷ Old × 100"],
            ["Percentage change", "(New − Old) ÷ |Old| × 100"],
            ["Percentage difference", "|A − B| ÷ ((A + B) ÷ 2) × 100"],
            ["New value after an increase", "Number × (1 + Percentage ÷ 100)"],
            ["New value after a decrease", "Number × (1 − Percentage ÷ 100)"],
            ["Original value before an increase", "Final ÷ (1 + Percentage ÷ 100)"],
            ["Percentage of a number", "Number × Percentage ÷ 100"],
            ["What percent one number is of another", "Part ÷ Whole × 100"],
            ["Average growth per period", "(Final ÷ Start)^(1 ÷ n) − 1"],
          ],
        },
      ],
    },
    {
      h2: "How these calculators work",
      blocks: [
        {
          t: "p",
          text: "Every calculator runs in your browser, so the numbers you type are not sent anywhere. Each one shows the formula and the working, handles problem inputs such as zero or negative numbers with a clear message, and is covered by automated tests. You can read the details on our [methodology page](/methodology).",
        },
        {
          t: "p",
          text: "If you want to learn the ideas as well as get the answer, our [blog](/blog) explains the formulas, common mistakes and spreadsheet versions in plain English.",
        },
      ],
    },
  ],
  related: ["blog", "methodology", "about"],
};

const blogHub: PageDef = {
  slug: "blog",
  kind: "hub",
  navLabel: "Blog",
  title: "Percentage Blog: Formulas, Examples and Practice",
  description:
    "Plain-English percentage articles with formulas, worked examples and practice problems: discounts, spreadsheets, percentage points and more.",
  h1: "Blog",
  lead: "Clear articles about percentages, with worked examples. Each post includes a calculator so you can try your own numbers.",
  sections: [
    {
      h2: "Start here",
      blocks: [
        {
          t: "p",
          text: "New to percentages? Begin with the [percentage increase calculator](/), which explains the formula and shows worked examples, then try the practice problems to check you have got it. The other posts cover discounts, spreadsheets and the difference between percent and percentage points.",
        },
      ],
    },
    {
      h2: "Which post should I read?",
      blocks: [
        {
          t: "ul",
          items: [
            "Working with a spreadsheet? Read [how to calculate percentage increase in Excel and Google Sheets](/how-to-calculate-percentage-increase-in-excel).",
            "Shopping or pricing? Read [how to calculate discount percentage](/how-to-calculate-discount-percentage).",
            "Reading news, polls or interest rates? Read [percentage vs percentage points](/percentage-vs-percentage-points).",
            "Studying for a test? Work through the [practice problems](/percentage-increase-practice-problems), then check your answers.",
          ],
        },
        {
          t: "p",
          text: "Every post is checked against our calculators, and the formulas are listed on the [methodology page](/methodology). If something is unclear or you spot a mistake, please [contact us](/contact).",
        },
      ],
    },
  ],
  related: ["calculators", "methodology", "about"],
};

export const HUBS: PageDef[] = [calculatorsHub, blogHub];
