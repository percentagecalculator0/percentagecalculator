import type { Section } from "./pages";

export const MORE_SECTIONS: Record<string, Section[]> = {
  "percentage-decrease-calculator": [
    {
      h2: "Percentage decrease in business and everyday numbers",
      blocks: [
        {
          t: "ul",
          items: [
            "Customer churn: a company starts the month with 500 customers and 25 leave. The decrease is 25, and 25 ÷ 500 = 0.05, so churn is 5%.",
            "Stock levels: a shop goes from 1,250 units in stock to 1,000. The decrease is 250, and 250 ÷ 1,250 = 0.2, so stock fell by 20%.",
            "Spending: a monthly bill drops from 80 to 68. The decrease is 12, and 12 ÷ 80 = 0.15, so the bill fell by 15%.",
          ],
        },
        {
          t: "p",
          text: "In a spreadsheet, with the old value in A2 and the new value in B2, the formula is =(A2-B2)/A2 formatted as a percentage. The [Excel guide](/how-to-calculate-percentage-increase-in-excel) explains how to format it and fix common errors.",
        },
      ],
    },
  ],

  "percentage-change-calculator": [
    {
      h2: "Month-on-month and year-on-year change",
      blocks: [
        {
          t: "p",
          text: "Reports often use percentage change with a fixed gap between the two values. Year-on-year (YoY) compares a figure with the same period one year earlier. If revenue was 80,000 last year and 92,000 this year, the change is 12,000, and 12,000 ÷ 80,000 = 0.15, so revenue grew 15% year-on-year. Month-on-month (MoM) compares with the previous month. A figure that rises from 20,000 to 21,000 grew 5% month-on-month.",
        },
        {
          t: "p",
          text: "Comparing with the same month last year removes seasonal effects, which is why YoY is common for shops, travel and energy figures.",
        },
      ],
    },
    {
      h2: "Common mistakes with percentage change",
      blocks: [
        {
          t: "ul",
          items: [
            "Dividing by the new value. Always divide by the old (starting) value.",
            "Adding percentage changes from different periods. +10% and then +10% is +21%, not +20%.",
            "Using percentage change on values that are already percentages without saying so. See [percentage vs percentage points](/percentage-vs-percentage-points).",
            "Ignoring the sign. A negative result is a fall, and the size of a fall is not the same as the gain needed to recover.",
          ],
        },
      ],
    },
  ],

  "percentage-difference-calculator": [
    {
      h2: "Same two numbers, three different answers",
      blocks: [
        {
          t: "p",
          text: "The numbers 80 and 100 give different percentages depending on the question you ask. This is the main reason people get confused, so it is worth seeing side by side.",
        },
        {
          t: "table",
          caption: "Same numbers, different questions",
          head: ["Question", "Answer"],
          rows: [
            ["Percentage change from 80 to 100", "+25%"],
            ["Percentage change from 100 to 80", "−20%"],
            ["Percentage difference between 80 and 100", "22.22%"],
          ],
        },
      ],
    },
    {
      h2: "Where percentage difference is used",
      blocks: [
        {
          t: "ul",
          items: [
            "Comparing two prices for the same item in different shops.",
            "Comparing the results of two groups, such as two classes or two test versions.",
            "Comparing two measurements of the same quantity taken with different methods or instruments.",
            "Comparing the size of two cities, two products or two years when neither is the reference.",
          ],
        },
        {
          t: "p",
          text: "Example with decimals: compare 12.5 and 17.5. The gap is 5, the average is 15, and 5 ÷ 15 = 0.3333, so the percentage difference is 33.33%.",
        },
      ],
    },
    {
      h2: "Mistakes to avoid",
      blocks: [
        {
          t: "ul",
          items: [
            "Dividing the gap by only one of the numbers. Percentage difference divides by the average of both.",
            "Using it when one value is clearly the starting point. In that case use percentage change.",
            "Expecting a negative result. Percentage difference is always zero or positive, because it uses the absolute gap.",
          ],
        },
        {
          t: "p",
          text: "If one of the values is zero, the percentage difference is 200%, which is the largest value it can take for non-negative numbers.",
        },
      ],
    },
  ],

  "reverse-percentage-calculator": [
    {
      h2: "Undoing more than one change",
      blocks: [
        {
          t: "p",
          text: "If a number went through several percentage changes, undo them by dividing by each multiplier in turn, or by their product. A price ends at 88 after a 10% increase and then a 20% decrease. The two multipliers are 1.1 and 0.8, and their product is 0.88. So the original price was 88 ÷ 0.88 = 100.",
        },
      ],
    },
    {
      h2: "In a spreadsheet",
      blocks: [
        {
          t: "p",
          text: "With the final value in A2 and the percentage in B2, formatted as a percentage, use these formulas:",
        },
        { t: "formula", lines: ["=A2/(1+B2)", "=A2/(1-B2)"] },
        {
          t: "p",
          text: "Use the first when the final value came after an increase, and the second when it came after a decrease.",
        },
      ],
    },
    {
      h2: "Mistakes to avoid",
      blocks: [
        {
          t: "ul",
          items: [
            "Taking the percentage off the final value. The percentage was calculated from the original, so you must divide by the multiplier.",
            "Using the wrong direction. After an increase, divide by 1 plus the percentage. After a decrease, divide by 1 minus the percentage.",
            "Rounding the multiplier too early. Keep all the digits until the last step.",
          ],
        },
        {
          t: "p",
          text: "Always check by going forward again. Apply the change to your answer with the [increase or decrease by a percentage calculator](/increase-by-percentage-calculator) and make sure you get back to the value you started with.",
        },
      ],
    },
  ],

  "increase-by-percentage-calculator": [
    {
      h2: "Increase then decrease by the same percentage",
      blocks: [
        {
          t: "p",
          text: "Raising a number by 20% and then lowering the result by 20% does not take you back to the start. 100 + 20% = 120, and 120 − 20% = 96. The second percentage is taken from a bigger number, so it removes more. To undo an increase exactly, use the [reverse percentage calculator](/reverse-percentage-calculator).",
        },
      ],
    },
    {
      h2: "Markup and margin are not the same",
      blocks: [
        {
          t: "p",
          text: "A shop buys an item for 80 and adds a 25% markup. The selling price is 80 × 1.25 = 100, a profit of 20. That profit is 25% of the cost, which is the markup. But it is only 20% of the selling price (20 ÷ 100), which is the margin. Mixing them up is a common reason for pricing errors. Use this calculator for the markup, and the [what percent calculator](/what-percent-calculator) for the margin.",
        },
      ],
    },
    {
      h2: "Mistakes to avoid",
      blocks: [
        {
          t: "ul",
          items: [
            "Typing 15 into a formula where 0.15 is needed. Convert the percentage to a decimal first, or let the calculator do it.",
            "Adding the percentage to the number, as in 200 + 15 = 215. A percentage is a share of the number, so 15% of 200 is 30.",
            "Applying the percentage to the wrong base, such as a tax rate to a price that already includes tax.",
          ],
        },
      ],
    },
  ],

  "percentage-of-a-number-calculator": [
    {
      h2: "Common percentages of the same number",
      blocks: [
        {
          t: "table",
          caption: "Common percentages of 240",
          head: ["Percentage", "Of 240"],
          rows: [
            ["10%", "24"],
            ["20%", "48"],
            ["25%", "60"],
            ["50%", "120"],
            ["75%", "180"],
          ],
        },
        {
          t: "p",
          text: "Because 20% is double 10% and 75% is 50% plus 25%, you can build most answers from a few easy ones.",
        },
      ],
    },
    {
      h2: "Worked scenarios",
      blocks: [
        {
          t: "ul",
          items: [
            "Tip: 12% of a 65 bill is 65 × 0.12 = 7.80.",
            "Sales tax: 8% of 130 is 130 × 0.08 = 10.40.",
            "Commission: 3.5% of a 4,000 sale is 4,000 × 0.035 = 140.",
            "Marks: if an exam is worth 40% of a final mark and you scored 85, it adds 85 × 0.4 = 34 marks.",
          ],
        },
      ],
    },
    {
      h2: "In a spreadsheet",
      blocks: [
        {
          t: "p",
          text: "Put the number in A2 and the percentage in B2, formatted as a percentage. The formula =A2*B2 gives the answer. If you type 15 in a cell that is formatted as a percentage, the spreadsheet reads it as 15%, so you don’t need to divide by 100.",
        },
      ],
    },
    {
      h2: "Mistakes to avoid",
      blocks: [
        {
          t: "ul",
          items: [
            "Multiplying by 15 instead of 0.15. 15% of 200 is 30, not 3,000.",
            "Mixing up “15% of 200” with “increase 200 by 15%”. The first gives 30. The second gives 230.",
            "Forgetting that a percentage of a number depends on which number you start from. 20% of 50 is not the same as 50% of 20, although, as it happens, both equal 10.",
          ],
        },
      ],
    },
    {
      h2: "More word problems",
      blocks: [
        {
          t: "ul",
          items: [
            "A shirt costs 40 and is 35% off. The discount is 40 × 0.35 = 14, so you pay 26.",
            "A salesperson earns 6% commission on 2,500 of sales: 2,500 × 0.06 = 150.",
            "A 7.5% tax on 80 is 80 × 0.075 = 6.",
            "In a class of 45, 20% are absent: 45 × 0.2 = 9 pupils.",
          ],
        },
      ],
    },
  ],

  "what-percent-calculator": [
    {
      h2: "Shares of a total",
      blocks: [
        {
          t: "p",
          text: "Percentages are a natural way to show how a total is split. Add up the parts, then work out each part’s share of the total. A monthly budget of 2,000 split four ways looks like this.",
        },
        {
          t: "table",
          caption: "Budget breakdown",
          head: ["Item", "Amount", "Share of 2,000"],
          rows: [
            ["Rent", "900", "45%"],
            ["Food", "450", "22.5%"],
            ["Transport", "150", "7.5%"],
            ["Everything else", "500", "25%"],
          ],
        },
        {
          t: "p",
          text: "The shares add up to 100%, which is a good way to check your sums.",
        },
      ],
    },
    {
      h2: "Ratios as percentages",
      blocks: [
        {
          t: "p",
          text: "If two groups are in the ratio 3 to 5, the first group is 3 out of 3 + 5 = 8 parts, which is 3 ÷ 8 = 37.5% of the total. The second group is 62.5%.",
        },
      ],
    },
    {
      h2: "In a spreadsheet",
      blocks: [
        {
          t: "p",
          text: "With the part in A2 and the whole in B2, use =A2/B2 and format the cell as a percentage. To work out each item’s share of a column total, lock the total cell with dollar signs, as in =A2/$A$10, so that it stays fixed when you copy the formula down.",
        },
      ],
    },
    {
      h2: "How to spot the part and the whole",
      blocks: [
        {
          t: "p",
          text: "In a sentence, the whole follows the word “of”. In “12 is what percent of 48?”, the whole is 48. In “what percent of 50 is 10?”, the whole is 50. Reading the question out loud and finding the word “of” avoids the most common mix-up.",
        },
      ],
    },
    {
      h2: "Word problems",
      blocks: [
        {
          t: "ul",
          items: [
            "In a survey, 42 of 150 people said yes. 42 ÷ 150 = 0.28, so 28% said yes.",
            "A player makes 18 of 24 free throws. 18 ÷ 24 = 0.75, so the success rate is 75%.",
            "A student answers 27 of 30 questions correctly. 27 ÷ 30 = 0.9, so the score is 90%.",
          ],
        },
        {
          t: "p",
          text: "When you report a percentage from a survey or a sample, also give the number of people it is based on. A result of 28% from 150 people is much more reliable than 28% from 7.",
        },
      ],
    },
    {
      h2: "“Is” a percent versus “increased by” a percent",
      blocks: [
        {
          t: "p",
          text: "Saying that 120 is 120% of 100 is correct, but it is not the same as saying that 120 is 120% more than 100. Compared with 100, the number 120 is 20% more. “Is X% of” compares the whole number with the total. “Is X% more than” compares only the extra amount. If you want to measure how much bigger one value is than another, use the [percentage increase calculator](/). If you want to know how much of a total something is, stay with this page.",
        },
        {
          t: "p",
          text: "A short test: if the question contains the word “of”, you are probably finding a share of a total, which is this calculator. If it contains “more than”, “less than”, “rose” or “fell”, you are measuring a change.",
        },
      ],
    },
  ],

  "growth-rate-calculator": [
    {
      h2: "Worked example: company revenue",
      blocks: [
        {
          t: "p",
          text: "A company’s revenue grew from 2.4 million to 3.9 million over 4 years. The ratio is 3.9 ÷ 2.4 = 1.625. The fourth root of 1.625 is about 1.129, so the growth rate is about 12.9% per year. The total increase over the 4 years is 62.5%, but the steady rate that produces it is 12.9% a year.",
        },
      ],
    },
    {
      h2: "Converting between monthly and yearly growth",
      blocks: [
        {
          t: "p",
          text: "A monthly rate can be turned into a yearly one by compounding it 12 times: yearly rate = (1 + monthly rate)^12 − 1. It is not simply 12 times the monthly rate.",
        },
        {
          t: "table",
          caption: "Monthly growth converted to yearly growth",
          head: ["Monthly growth", "Yearly growth"],
          rows: [
            ["0.5%", "6.17%"],
            ["1%", "12.68%"],
            ["2%", "26.82%"],
            ["3%", "42.58%"],
          ],
        },
      ],
    },
    {
      h2: "In a spreadsheet",
      blocks: [
        {
          t: "p",
          text: "With the starting value in A2, the final value in B2 and the number of periods in C2, use this formula and format the cell as a percentage:",
        },
        { t: "formula", lines: ["=(B2/A2)^(1/C2)-1"] },
        {
          t: "p",
          text: "Excel also has a function called RRI that does the same job: =RRI(C2,A2,B2).",
        },
      ],
    },
  ],

  "salary-increase-calculator": [
    {
      h2: "Raises compound over several years",
      blocks: [
        {
          t: "p",
          text: "Each yearly raise is applied to the already raised salary, so several raises add up to a little more than their sum. Three raises of 3% give 1.03 × 1.03 × 1.03 = 1.0927, an increase of 9.27%, not 9%.",
        },
        {
          t: "table",
          caption: "Raises compound over several years",
          head: ["Yearly raise", "Years", "Total increase"],
          rows: [
            ["2%", "3", "6.12%"],
            ["3%", "3", "9.27%"],
            ["5%", "3", "15.76%"],
            ["3%", "5", "15.93%"],
          ],
        },
        {
          t: "p",
          text: "To find the average yearly raise from a salary history, use the [growth rate calculator](/growth-rate-calculator).",
        },
      ],
    },
    {
      h2: "Gross pay and take-home pay",
      blocks: [
        {
          t: "p",
          text: "The percentage raise applies to the pay figure you enter, so use the same type of pay for both numbers, either gross (before tax) or net (after tax). Take-home pay may rise by a different percentage than gross pay, because taxes and deductions often change in steps as income grows. If you want to know how much a raise adds to your take-home pay, enter your before-raise and after-raise take-home figures instead.",
        },
      ],
    },
    {
      h2: "What to do with the result",
      blocks: [
        {
          t: "ul",
          items: [
            "If your real raise is positive, your pay buys more than before.",
            "If it is zero, your pay is keeping pace with prices.",
            "If it is negative, prices have grown faster than your pay, even though the number on your payslip went up.",
          ],
        },
      ],
    },
  ],

  "how-to-calculate-percentage-increase-in-excel": [
    {
      h2: "Year-over-year table with formulas",
      blocks: [
        {
          t: "p",
          text: "A typical report lists a year in column A, a figure in column B and the percentage change from the previous year in column C. In C3, the formula refers to the row above:",
        },
        { t: "formula", lines: ["=(B3-B2)/B2"] },
        {
          t: "p",
          text: "Leave C2 empty, because the first year has nothing to compare with. Then copy the formula down. Each row compares itself with the row directly above it.",
        },
      ],
    },
    {
      h2: "Colour increases green and decreases red",
      blocks: [
        {
          t: "ol",
          items: [
            "Select the cells with the percentage results.",
            "On the Home tab, choose Conditional Formatting, then Highlight Cells Rules, then Greater Than. Enter 0 and pick a green style.",
            "Repeat with Less Than 0 and a red style.",
          ],
        },
        {
          t: "p",
          text: "In Google Sheets, use Format, then Conditional formatting, and add one rule for greater than 0 and another for less than 0.",
        },
      ],
    },
    {
      h2: "Showing more or fewer decimals",
      blocks: [
        {
          t: "p",
          text: "The percentage format shows whole percentages by default. Use the Increase Decimal and Decrease Decimal buttons, or set a custom format such as 0.0% to always show one decimal. This changes only how the number is displayed. The cell still holds the full-precision value, so later calculations are not affected.",
        },
      ],
    },
    {
      h2: "Fill a whole column at once in Google Sheets",
      blocks: [
        {
          t: "p",
          text: "Instead of copying the formula down, you can fill the whole column with one array formula in C2. The IF part keeps empty rows blank:",
        },
        { t: "formula", lines: ['=ARRAYFORMULA(IF(A2:A="","",(B2:B-A2:A)/A2:A))'] },
        {
          t: "p",
          text: "To round the result, wrap the formula in ROUND with four decimals, as in =ROUND((B2-A2)/A2,4). With the percentage format, that displays two decimal places, such as 12.34%.",
        },
      ],
    },
  ],

  "percentage-vs-percentage-points": [
    {
      h2: "Percentage points and basis points",
      blocks: [
        {
          t: "p",
          text: "In finance, small changes in rates are often given in basis points. One percentage point equals 100 basis points, so a rise of 0.25 percentage points is 25 basis points. A rate that goes from 3.5% to 4.25% has risen by 75 basis points, which is 0.75 percentage points.",
        },
      ],
    },
    {
      h2: "Test yourself",
      blocks: [
        {
          t: "p",
          text: "Question 1. A rate goes from 3.5% to 4.25%. What is the change in percentage points, and what is the percent change? Answer: 4.25 − 3.5 = 0.75 percentage points. The percent change is 0.75 ÷ 3.5 × 100 = 21.43%.",
        },
        {
          t: "p",
          text: "Question 2. A party’s poll share falls from 30% to 24%. Answer: it fell by 6 percentage points, which is a percent change of −6 ÷ 30 × 100 = −20%.",
        },
        {
          t: "p",
          text: "Question 3. A tax rate rises from 10% to 12.5%. Answer: it rose by 2.5 percentage points, which is a 25% increase in the rate.",
        },
      ],
    },
    {
      h2: "A sentence template that stays clear",
      blocks: [
        {
          t: "p",
          text: "Write the old and the new rate first, then the change in points, then the relative change if it helps: “The rate rose from 4% to 6%, up 2 percentage points, or 50% higher than before.” Giving the starting and finishing rates means readers never have to guess which kind of change you mean.",
        },
      ],
    },
    {
      h2: "Headlines rewritten clearly",
      blocks: [
        {
          t: "ul",
          items: [
            "Unclear: “Unemployment rose 1%.” Clear: “Unemployment rose from 5% to 6%, up 1 percentage point.”",
            "Unclear: “Support fell 10%.” Clear: “Support fell from 50% to 40%, down 10 percentage points, or 20% in relative terms.”",
            "Unclear: “The tax went up 5%.” Clear: “The tax rose from 20% to 25%, up 5 percentage points, a 25% increase in the rate.”",
          ],
        },
      ],
    },
  ],

  "how-to-calculate-discount-percentage": [
    {
      h2: "Percent off or amount off?",
      blocks: [
        {
          t: "p",
          text: "A label that says “save 10” on a price of 40 is a 25% discount, because 10 ÷ 40 = 0.25. The same 10 off a price of 200 is only 5%. To compare offers fairly, turn each into a percentage of its original price.",
        },
      ],
    },
    {
      h2: "A discount on a whole basket",
      blocks: [
        {
          t: "p",
          text: "Three items cost 40, 25 and 60, a total of 125. A 15% discount on the whole basket takes 125 × 0.15 = 18.75 off, so you pay 106.25. You can also multiply once: 125 × 0.85 = 106.25.",
        },
      ],
    },
    {
      h2: "Discount percentage in Excel and Google Sheets",
      blocks: [
        {
          t: "p",
          text: "With the original price in A2 and the sale price in B2, use this formula and format the cell as a percentage:",
        },
        { t: "formula", lines: ["=(A2-B2)/A2"] },
        {
          t: "p",
          text: "To find the sale price from a discount in C2, use =A2*(1-C2).",
        },
      ],
    },
    {
      h2: "Common sale labels, decoded",
      blocks: [
        {
          t: "ul",
          items: [
            "“Up to 50% off” means only some items reach 50%. Most are discounted less.",
            "“Buy 2, get 1 free” means you pay for 2 items out of 3, so each item is one third (33.3%) cheaper.",
            "“Buy 1, get 1 half price” means you pay 1.5 prices for 2 items, a 25% saving overall.",
            "“Extra 20% off at checkout” usually stacks on the existing discount, so use the stacked-discount table above to find the real total.",
          ],
        },
      ],
    },
  ],

  "percentage-increase-practice-problems": [
    {
      h2: "Two more challenge problems",
      blocks: [
        {
          t: "p",
          text: "Problem 12. A price rises by 10% and then by another 10%. What is the overall increase? Answer: 1.1 × 1.1 = 1.21, so the overall increase is 21%, not 20%.",
        },
        {
          t: "p",
          text: "Problem 13. A town grows from 80,000 to 92,000 people. What is the percentage increase, and what would the population be next year if it grew by the same percentage? Answer: the increase is 12,000, and 12,000 ÷ 80,000 = 0.15, so the growth is 15%. Next year the population would be 92,000 × 1.15 = 105,800.",
        },
      ],
    },
  ],

  guides: [],
};

export const MORE_FAQ: Record<string, { q: string; a: string }[]> = {
  "percentage-decrease-calculator": [
    {
      q: "How do I calculate percentage decrease in Excel?",
      a: "With the old value in A2 and the new value in B2, use =(A2-B2)/A2 and format the cell as a percentage.",
    },
  ],
  "percentage-change-calculator": [
    {
      q: "What does year-on-year change mean?",
      a: "Year-on-year change compares a figure with the same period one year earlier, using the percentage change formula. Revenue that goes from 80,000 to 92,000 is up 15% year-on-year.",
    },
    {
      q: "Can I add two percentage changes together?",
      a: "No. Percentage changes from different periods multiply. A 10% rise followed by another 10% rise is a 21% rise overall.",
    },
  ],
  "percentage-difference-calculator": [
    {
      q: "Can percentage difference be negative?",
      a: "No. It uses the absolute gap between the two values, so it is always zero or positive.",
    },
    {
      q: "What is the percentage difference if one value is zero?",
      a: "It is 200%, because the gap equals the other value and the average is half of it.",
    },
  ],
  "increase-by-percentage-calculator": [
    {
      q: "What is the difference between markup and margin?",
      a: "Markup is the profit as a percentage of the cost. Margin is the profit as a percentage of the selling price. A 25% markup on a cost of 80 gives a price of 100 and a margin of 20%.",
    },
  ],
  "percentage-of-a-number-calculator": [
    {
      q: "How do I calculate a percentage of a number in Excel?",
      a: "Multiply the number by the percentage. With the number in A2 and the percentage in B2, formatted as a percentage, use =A2*B2.",
    },
    {
      q: "What is 12% of 65?",
      a: "65 × 0.12 = 7.8.",
    },
  ],
  "what-percent-calculator": [
    {
      q: "What percent of 50 is 10?",
      a: "10 ÷ 50 = 0.2, so 10 is 20% of 50.",
    },
    {
      q: "How do I turn a ratio such as 3:5 into percentages?",
      a: "Add the parts to get the total, then divide each part by the total. For 3:5, the total is 8, so the parts are 37.5% and 62.5%.",
    },
  ],
  "growth-rate-calculator": [
    {
      q: "How do I convert a monthly growth rate to a yearly one?",
      a: "Compound it 12 times: (1 + monthly rate)^12 − 1. A monthly rate of 1% is a yearly rate of about 12.68%.",
    },
    {
      q: "What is the CAGR formula in Excel?",
      a: "With the starting value in A2, the final value in B2 and the number of periods in C2, use =(B2/A2)^(1/C2)-1 and format the cell as a percentage.",
    },
  ],
  "salary-increase-calculator": [
    {
      q: "Do several raises add up to their sum?",
      a: "Not quite. Raises compound, so three yearly raises of 3% give 9.27% in total, not 9%.",
    },
  ],
};
