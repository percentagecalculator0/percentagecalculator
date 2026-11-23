import type { Section } from "./pages";

/** Extra sections appended (before the FAQ) to the existing pages, keyed by slug ("" = home). */
export const EXTRA_SECTIONS: Record<string, Section[]> = {
  "": [
    {
      h2: "Common percentage increases at a glance",
      blocks: [
        {
          t: "p",
          text: "Looking for a quick answer? This table shows the percentage increase for some of the jumps people look up most often. Type your own numbers into the calculator above for anything not listed.",
        },
        {
          t: "table",
          caption: "Common percentage increase examples",
          head: ["From", "To", "Increase", "Percentage increase"],
          rows: [
            ["10", "15", "5", "50%"],
            ["20", "30", "10", "50%"],
            ["25", "30", "5", "20%"],
            ["50", "75", "25", "50%"],
            ["100", "125", "25", "25%"],
            ["200", "250", "50", "25%"],
            ["500", "650", "150", "30%"],
            ["1,000", "1,100", "100", "10%"],
            ["40", "100", "60", "150%"],
            ["8", "10", "2", "25%"],
            ["60", "63", "3", "5%"],
          ],
        },
      ],
    },
    {
      h2: "How to read your result",
      blocks: [
        {
          t: "p",
          text: "A percentage increase of 100% means the value has doubled. An increase of 200% means it has tripled. It is easy to mix these up with “times” (a multiplier), so this table puts them side by side.",
        },
        {
          t: "table",
          caption: "Percentage increase as a multiplier",
          head: ["Percentage increase", "Multiplier", "What it means"],
          rows: [
            ["10%", "×1.1", "A tenth bigger"],
            ["50%", "×1.5", "One and a half times as big"],
            ["100%", "×2", "Doubled"],
            ["200%", "×3", "Tripled"],
            ["300%", "×4", "Four times as big"],
          ],
        },
        {
          t: "p",
          text: "To apply one of these multipliers to your own number, use the [increase a number by a percentage calculator](/increase-by-percentage-calculator).",
        },
      ],
    },
    {
      h2: "Percentage increase in real life: four worked scenarios",
      blocks: [
        {
          t: "ul",
          items: [
            "A coffee goes from 3.20 to 3.60. The increase is 0.40, and 0.40 ÷ 3.20 = 0.125, so the price rose by 12.5%.",
            "Rent goes from 900 to 990 a month. The increase is 90, and 90 ÷ 900 = 0.10, so rent rose by 10%.",
            "A website gets 12,500 visits one month and 18,750 the next. The increase is 6,250, and 6,250 ÷ 12,500 = 0.5, so traffic grew by 50%.",
            "A savings balance goes from 2,000 to 2,150 over a year. The increase is 150, and 150 ÷ 2,000 = 0.075, so the balance grew by 7.5% for the year.",
          ],
        },
        {
          t: "p",
          text: "The last example is a growth over one period. If growth happened over several years and you want the average per year, use the [growth rate calculator](/growth-rate-calculator). To see whether a pay rise really beat rising prices, try the [salary increase calculator](/salary-increase-calculator).",
        },
      ],
    },
    {
      h2: "A mental-math shortcut",
      blocks: [
        {
          t: "p",
          text: "To estimate a percentage increase without a calculator, find 10% of the old value by moving the decimal point one place to the left. Then see how many of those 10% chunks the increase contains. Going from 60 to 69, the increase is 9. Ten percent of 60 is 6, and 9 is one and a half times 6, so the increase is 15%.",
        },
      ],
    },
    {
      h2: "Use the formula in a spreadsheet, or practise it",
      blocks: [
        {
          t: "p",
          text: "To work out percentage increases for a whole column of numbers, see [how to calculate percentage increase in Excel and Google Sheets](/how-to-calculate-percentage-increase-in-excel). To test yourself, try the [percentage increase practice problems](/percentage-increase-practice-problems), which come with full answers.",
        },
      ],
    },
    {
      h2: "What if the starting value is zero or negative?",
      blocks: [
        {
          t: "p",
          text: "A starting value of zero has no percentage increase, because the formula divides by the starting value and dividing by zero has no answer. If something goes from 0 to 5, the honest description is “it appeared”, not a percentage.",
        },
        {
          t: "p",
          text: "A small starting value can also make a percentage look dramatic. Going from 1 to 10 is a 900% increase, even though the actual change is only 9. When the base is small, report the plain numbers alongside the percentage.",
        },
        {
          t: "p",
          text: "If the starting value is negative, this calculator divides by its absolute value so that a move upwards still shows as an increase. For example, going from −50 to −25 is a 50% increase, because the value moved 25 units in the positive direction, which is half the size of the starting value.",
        },
      ],
    },
    {
      h2: "Rounding and decimals",
      blocks: [
        {
          t: "p",
          text: "The calculator shows up to six decimal places and removes trailing zeros, so 25 shows as 25% and one third shows as 33.333333%. For prices, round your final answer to two decimals. For reports, one or two decimals is usually enough. Round only at the end, because rounding the middle steps can shift the final digit.",
        },
      ],
    },
  ],

  "percentage-decrease-calculator": [
    {
      h2: "Common percentage decreases at a glance",
      blocks: [
        {
          t: "table",
          caption: "Common percentage decrease examples",
          head: ["From", "To", "Decrease", "Percentage decrease"],
          rows: [
            ["100", "90", "10", "10%"],
            ["100", "75", "25", "25%"],
            ["100", "50", "50", "50%"],
            ["80", "60", "20", "25%"],
            ["200", "150", "50", "25%"],
            ["250", "200", "50", "20%"],
            ["1,000", "850", "150", "15%"],
            ["60", "24", "36", "60%"],
          ],
        },
      ],
    },
    {
      h2: "Percentage decrease in real life",
      blocks: [
        {
          t: "ul",
          items: [
            "A car’s fuel use drops from 8.0 to 6.8 litres per 100 km. The decrease is 1.2, and 1.2 ÷ 8 = 0.15, so fuel use fell by 15%.",
            "A newsletter shrinks from 2,400 to 2,016 subscribers. The decrease is 384, and 384 ÷ 2,400 = 0.16, so the list lost 16%.",
            "Someone goes from 90 kg to 81 kg. The decrease is 9, and 9 ÷ 90 = 0.10, so their weight fell by 10%.",
          ],
        },
      ],
    },
    {
      h2: "Two discounts in a row",
      blocks: [
        {
          t: "p",
          text: "Two percentage decreases don’t add up. Take 20% off 100 and you get 80. Take a further 10% off that and you get 72. The total decrease is 28%, not 30%, because the second 10% is taken from the smaller amount. The [discount guide](/how-to-calculate-discount-percentage) has a full table of stacked discounts.",
        },
      ],
    },
  ],

  "percentage-change-calculator": [
    {
      h2: "Percentage change in everyday life",
      blocks: [
        {
          t: "ul",
          items: [
            "A share price moves from 250 to 230. The change is −20, and −20 ÷ 250 = −0.08, so the price changed by −8%.",
            "A website goes from 4,000 to 5,200 visitors. The change is +1,200, and 1,200 ÷ 4,000 = 0.3, so traffic changed by +30%.",
            "An electricity bill falls from 120 to 96. The change is −24, and −24 ÷ 120 = −0.2, so the bill changed by −20%.",
          ],
        },
      ],
    },
    {
      h2: "Why a loss needs a bigger gain to recover",
      blocks: [
        {
          t: "p",
          text: "Percentage changes are measured against different starting points, so they aren’t symmetrical. If something falls by 50%, it has to rise by 100% to get back to where it started. 100 falls to 50, and 50 has to double to return to 100.",
        },
        {
          t: "table",
          caption: "Gain needed to recover from a loss",
          head: ["Loss", "Gain needed to get back to the start"],
          rows: [
            ["10%", "11.11%"],
            ["20%", "25%"],
            ["25%", "33.33%"],
            ["50%", "100%"],
            ["75%", "300%"],
          ],
        },
      ],
    },
  ],

  "percentage-difference-calculator": [
    {
      h2: "Percentage difference in real life",
      blocks: [
        {
          t: "ul",
          items: [
            "The same jacket costs 48 in one shop and 60 in another. The gap is 12 and the average is 54, so the percentage difference is 12 ÷ 54 × 100 = 22.22%.",
            "Two classes average 72 and 78 on a test. The gap is 6 and the average is 75, so the percentage difference is 8%.",
            "Two phones have 4,000 mAh and 5,000 mAh batteries. The gap is 1,000 and the average is 4,500, so the percentage difference is 22.22%.",
          ],
        },
      ],
    },
    {
      h2: "When percentage difference is the wrong tool",
      blocks: [
        {
          t: "p",
          text: "If one of the numbers is the “right” or starting value, don’t use percentage difference. Use [percentage change](/percentage-change-calculator) for something that moved over time. In science, comparing a measurement with a known true value uses percent error, which divides the gap by the true value instead of the average: |measured − true| ÷ |true| × 100.",
        },
      ],
    },
  ],

  "increase-by-percentage-calculator": [
    {
      h2: "Multipliers for common increases and decreases",
      blocks: [
        {
          t: "table",
          caption: "Multipliers for percentage increases and decreases",
          head: ["Change", "Multiplier"],
          rows: [
            ["+5%", "1.05"],
            ["+10%", "1.10"],
            ["+15%", "1.15"],
            ["+20%", "1.20"],
            ["+25%", "1.25"],
            ["−5%", "0.95"],
            ["−10%", "0.90"],
            ["−15%", "0.85"],
            ["−20%", "0.80"],
            ["−25%", "0.75"],
            ["−50%", "0.50"],
          ],
        },
      ],
    },
    {
      h2: "Adding a tip, tax or fee",
      blocks: [
        {
          t: "ul",
          items: [
            "A 15% tip on a bill of 80 is 12, so the total is 92.",
            "An 8% sales tax on 250 is 20, so the total is 270.",
            "A 20% discount followed by 10% tax on 100 gives 100 × 0.8 × 1.1 = 88. The order doesn’t matter, because multiplication gives the same answer either way round.",
          ],
        },
      ],
    },
  ],

  "reverse-percentage-calculator": [
    {
      h2: "Reverse percentage word problems",
      blocks: [
        {
          t: "ul",
          items: [
            "After a 5% raise, a salary is 52,500. The multiplier is 1.05, and 52,500 ÷ 1.05 = 50,000. The salary was 50,000 before the raise.",
            "A town’s population fell by 12% to 44,000. The multiplier is 0.88, and 44,000 ÷ 0.88 = 50,000. The population was 50,000 before the fall.",
            "A price including 18% tax is 2,360. The multiplier is 1.18, and 2,360 ÷ 1.18 = 2,000. The price before tax was 2,000.",
          ],
        },
      ],
    },
    {
      h2: "How much tax is inside a tax-inclusive price?",
      blocks: [
        {
          t: "p",
          text: "When a price already includes 18% tax, the tax is not 18% of the total. It is 18% of the price before tax. With a total of 1,180, the price before tax is 1,180 ÷ 1.18 = 1,000, so the tax is 180. Taking 18% of 1,180 would give 212.40, which is wrong.",
        },
      ],
    },
  ],

};

export const EXTRA_FAQ: Record<string, { q: string; a: string }[]> = {
  "": [
    {
      q: "What is the percentage increase from 50 to 75?",
      a: "The increase is 25, and 25 ÷ 50 = 0.5, so the percentage increase is 50%.",
    },
    {
      q: "How do I increase a number by 10 percent?",
      a: "Multiply the number by 1.1. For example, 250 increased by 10% is 250 × 1.1 = 275.",
    },
    {
      q: "How do I find the increase between two percentages?",
      a: "Subtract one from the other to get the change in percentage points. To get the percentage increase, divide that gap by the first percentage. A move from 4% to 6% is 2 percentage points, which is a 50% increase.",
    },
    {
      q: "Is percentage increase the same as growth rate?",
      a: "For a single period, yes. For growth over several periods, the average growth rate per period is calculated differently, using a root. The growth rate calculator on this site does that.",
    },
  ],
  "percentage-decrease-calculator": [
    {
      q: "What is the percentage decrease from 100 to 75?",
      a: "The decrease is 25, and 25 ÷ 100 = 0.25, so the percentage decrease is 25%.",
    },
    {
      q: "How do I find the new price after a 20% discount?",
      a: "Multiply the original price by 0.8. A 20% discount on 150 gives 150 × 0.8 = 120.",
    },
    {
      q: "How do two discounts combine?",
      a: "They don’t simply add up. A 20% discount followed by a 10% discount is a 28% discount in total, because 100 becomes 80 and then 72.",
    },
  ],
  "percentage-change-calculator": [
    {
      q: "What is the percentage change from 50 to 40?",
      a: "The change is −10, and −10 ÷ 50 = −0.2, so the percentage change is −20%.",
    },
    {
      q: "How much do I need to gain to recover a 50% loss?",
      a: "You need a gain of 100%. A value that falls from 100 to 50 has to double to get back to 100.",
    },
  ],
  "percentage-difference-calculator": [
    {
      q: "What is the percentage difference between 50 and 60?",
      a: "The gap is 10 and the average is 55, so the percentage difference is 10 ÷ 55 × 100, which is about 18.18%.",
    },
    {
      q: "Is percentage difference the same as percent error?",
      a: "No. Percent error compares a measured value with a known true value and divides by the true value. Percentage difference divides by the average of the two values.",
    },
  ],
  "increase-by-percentage-calculator": [
    {
      q: "How do I add 5% to a number?",
      a: "Multiply the number by 1.05. For example, 80 plus 5% is 84.",
    },
    {
      q: "How do I subtract 15% from a number?",
      a: "Multiply the number by 0.85. For example, 200 minus 15% is 170.",
    },
    {
      q: "Does the order of a discount and a tax matter?",
      a: "No. Both are multipliers, and multiplication gives the same answer in either order. 100 with a 20% discount and 10% tax is 88 either way.",
    },
  ],
  "reverse-percentage-calculator": [
    {
      q: "How do I find the price before 20% VAT or sales tax?",
      a: "Divide the tax-inclusive price by 1.2. A total of 120 means the price before tax was 100.",
    },
    {
      q: "Is the tax in a tax-inclusive price equal to the tax rate times the total?",
      a: "No. The tax is the rate times the price before tax. With 18% tax and a total of 1,180, the tax is 180, not 18% of 1,180.",
    },
  ],
};
