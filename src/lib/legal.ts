import type { PageDef } from "./pages";
import { SITE } from "./site";

const email = SITE.contactEmail;
const updated = SITE.lastUpdated;
const owner = SITE.ownerName;

const about: PageDef = {
  slug: "about",
  kind: "legal",
  navLabel: "About",
  title: "About Percentage Increase Calculator",
  description:
    "What this site is, how the calculators work, and how we keep every formula accurate. Free percentage tools with the working shown.",
  h1: "About this site",
  lead: "Percentage Increase Calculator is a free set of tools for working out percentage increase, decrease, change, difference and reverse percentages.",
  sections: [
    {
      h2: "What we do",
      blocks: [
        {
          t: "p",
          text: "Percentages come up in prices, pay, grades, business reports and everyday decisions. Most people don’t need a lecture. They need a correct answer fast, and a way to check how it was reached. Each calculator here gives you the result, the formula and every step of the working.",
        },
        {
          t: "p",
          text: "Start with the [percentage increase calculator](/), or pick another tool from the menu: [percentage decrease](/percentage-decrease-calculator), [percentage change](/percentage-change-calculator), [percentage difference](/percentage-difference-calculator), [increase a number by a percentage](/increase-by-percentage-calculator) and [reverse percentage](/reverse-percentage-calculator).",
        },
      ],
    },
    {
      h2: "How we keep the calculators accurate",
      blocks: [
        {
          t: "ul",
          items: [
            "Every formula on the site is covered by automated tests, including edge cases such as zero, negative numbers, decimals and very large values.",
            "Impossible calculations, like dividing by zero, show a clear message instead of a broken or misleading number.",
            "Results are rounded to at most six decimal places, and floating-point noise is removed so that 25 never shows up as 25.000000000000004.",
            "The worked examples in our guides are checked against the calculators.",
          ],
        },
      ],
    },
    {
      h2: "Your numbers stay private",
      blocks: [
        {
          t: "p",
          text: "The calculations run in your browser. The numbers you type are not sent to us or stored. You can read the details in our [privacy policy](/privacy-policy).",
        },
      ],
    },
    {
      h2: "How the site is funded",
      blocks: [
        {
          t: "p",
          text: "The tools are free to use. The site may show advertising to cover running costs. Ads are kept clear of the calculator and its results, and they never change what a calculator returns.",
        },
      ],
    },
    ...(owner
      ? [
          {
            h2: "Who runs this site",
            blocks: [
              {
                t: "p" as const,
                text: `${SITE.domain} is published and maintained by ${owner}${SITE.ownerLocation ? `, based in ${SITE.ownerLocation}` : ""}. You can reach us at ${email}.`,
              },
            ],
          },
        ]
      : []),
    {
      h2: "How we keep the content reliable",
      blocks: [
        {
          t: "p" as const,
          text: "Every page shows the date it was last updated. If a formula, example or explanation changes, we update the page and the date. Our [methodology page](/methodology) lists every formula we use and how we test it, and it explains how to report a mistake.",
        },
      ],
    },
    {
      h2: "Spotted a mistake?",
      blocks: [
        {
          t: "p",
          text: `If you find an error in a result or an explanation, please tell us at ${email}. Include the numbers you entered and what you expected, and we will look into it. You can also read how to reach us on the [contact page](/contact).`,
        },
      ],
    },
  ],
  related: ["", "contact", "privacy-policy"],
};

const contact: PageDef = {
  slug: "contact",
  kind: "legal",
  navLabel: "Contact",
  title: "Contact Us | Percentage Increase Calculator",
  description:
    "Get in touch about a calculation, a bug, a suggestion or a privacy question. Email address and what to include for a faster reply.",
  h1: "Contact us",
  lead: "Questions, bug reports and suggestions are welcome.",
  sections: [
    {
      h2: "Email",
      blocks: [
        {
          t: "p",
          text: `You can reach us at ${email}. We aim to reply within a few working days.`,
        },
      ],
    },
    {
      h2: "What to include for a faster reply",
      blocks: [
        {
          t: "ul",
          items: [
            "For a wrong result: the calculator you used and the exact numbers you entered.",
            "For a display problem: your device, your browser and what you saw on screen.",
            "For a privacy request: say what you would like us to do and where the data came from.",
          ],
        },
        {
          t: "p",
          text: "We can’t give personal financial, tax or legal advice. See our [disclaimer](/disclaimer) for details.",
        },
      ],
    },
    {
      h2: "Before you write",
      blocks: [
        {
          t: "p",
          text: "Many questions are answered in the guides. Try the [guides](/guides) or the [about page](/about).",
        },
      ],
    },
  ],
  related: ["about", "privacy-policy", ""],
};

const privacy: PageDef = {
  slug: "privacy-policy",
  kind: "legal",
  navLabel: "Privacy Policy",
  title: "Privacy Policy | Percentage Increase Calculator",
  description:
    "How percentageincreasecalculator.net handles your data. The calculators run in your browser, and we explain cookies, hosting and advertising.",
  h1: "Privacy Policy",
  lead: `Last updated: ${updated}. This policy explains what happens to your information when you use ${SITE.domain}.`,
  sections: [
    {
      h2: "The short version",
      blocks: [
        {
          t: "ul",
          items: [
            "The numbers you type into a calculator are processed in your browser. They are not sent to our servers and we don’t store them.",
            "You don’t need an account, and we don’t ask for your name or email address to use the calculators.",
            "The site may show ads from Google AdSense, which can use cookies. You can control this as described below.",
          ],
        },
      ],
    },
    {
      h2: "Information we receive",
      blocks: [
        {
          t: "p",
          text: "Like any website, our hosting provider, Cloudflare, processes technical information when your browser requests a page. This can include your IP address, browser type, device type, the page requested and the time of the request. It is used to deliver the site, keep it secure and protect it from abuse and attacks.",
        },
        {
          t: "p",
          text: `If you email us, we receive your email address and whatever you put in the message. We use it only to reply and to look into the issue you raised. Our contact address is ${email}.`,
        },
      ],
    },
    {
      h2: "Cookies and advertising",
      blocks: [
        {
          t: "p",
          text: "The calculators and pages themselves don’t need cookies to work. When advertising is switched on, Google and its advertising partners may use cookies or similar technologies to show and measure ads. This can include ads based on your earlier visits to this and other websites.",
        },
        {
          t: "p",
          text: "You can manage personalised advertising in your Google account’s Ads Settings, and you can opt out of many third-party ad networks through the Digital Advertising Alliance opt-out tool. You can also block or delete cookies in your browser settings. If you do, some ads may be less relevant, but the calculators will keep working.",
        },
        {
          t: "p",
          text: "Where the law requires it, for example for visitors in the European Economic Area, the United Kingdom and Switzerland, a consent message lets you choose whether ads may use cookies and similar technologies before any such ads are shown.",
        },
      ],
    },
    {
      h2: "Third-party services",
      blocks: [
        {
          t: "ul",
          items: [
            "Cloudflare provides hosting, delivery and security for the site.",
            "Google AdSense provides advertising when it is enabled. Google’s use of data is described in Google’s own privacy policy.",
          ],
        },
        {
          t: "p",
          text: "These providers handle information under their own privacy policies. This site doesn’t link to other websites.",
        },
      ],
    },
    {
      h2: "Your rights",
      blocks: [
        {
          t: "p",
          text: `Depending on where you live, you may have the right to ask what personal information we hold about you, to have it corrected or deleted, to object to how it is used, and not to be discriminated against for exercising these rights. Because the calculators don’t store personal information, the main data we may hold is any email you sent us. Write to ${email} and we will respond.`,
        },
      ],
    },
    {
      h2: "Children",
      blocks: [
        {
          t: "p",
          text: "This site is a general-purpose maths tool and is not directed at children under 13. We don’t knowingly collect personal information from children.",
        },
      ],
    },
    {
      h2: "Changes to this policy",
      blocks: [
        {
          t: "p",
          text: "If we change how the site handles information, for example by adding analytics, we will update this page and the date at the top. See also our [terms of use](/terms-of-use) and [disclaimer](/disclaimer).",
        },
      ],
    },
  ],
  related: ["terms-of-use", "disclaimer", "contact"],
};

const terms: PageDef = {
  slug: "terms-of-use",
  kind: "legal",
  navLabel: "Terms of Use",
  title: "Terms of Use | Percentage Increase Calculator",
  description:
    "The rules for using percentageincreasecalculator.net, including acceptable use, content ownership and limits of liability.",
  h1: "Terms of Use",
  lead: `Last updated: ${updated}. By using ${SITE.domain} you agree to these terms.`,
  sections: [
    {
      h2: "Using the site",
      blocks: [
        {
          t: "p",
          text: "You may use the calculators and read the guides for personal, educational and business purposes. Please don’t use the site in a way that harms it or other visitors.",
        },
        {
          t: "ul",
          items: [
            "Don’t try to disrupt, overload, scan for weaknesses in or gain unauthorised access to the site.",
            "Don’t use automated tools to copy the site in bulk or to generate fake traffic or fake ad clicks.",
            "Don’t use the site for anything unlawful.",
          ],
        },
      ],
    },
    {
      h2: "Accuracy of results",
      blocks: [
        {
          t: "p",
          text: "We work hard to make the calculators correct and we test them. The results are provided for general information. Please check important figures yourself before relying on them. See the [disclaimer](/disclaimer).",
        },
      ],
    },
    {
      h2: "Ownership of content",
      blocks: [
        {
          t: "p",
          text: "The text, design and code of this site belong to the site owner or its licensors and are protected by copyright. You may quote short extracts with credit to the site. Please don’t republish whole pages or copy the site’s content in bulk without permission.",
        },
      ],
    },
    {
      h2: "No warranty and limit of liability",
      blocks: [
        {
          t: "p",
          text: "The site is provided “as is” and “as available”, without warranties of any kind. To the fullest extent permitted by law, we are not liable for any loss or damage that arises from using the site or relying on its results.",
        },
      ],
    },
    {
      h2: "Advertising",
      blocks: [
        {
          t: "p",
          text: "The site may display ads from third parties. We don’t control the content of those ads and we don’t endorse the products they promote. Our [privacy policy](/privacy-policy) explains how advertising works.",
        },
      ],
    },
    {
      h2: "Changes",
      blocks: [
        {
          t: "p",
          text: `We may update these terms from time to time. The date at the top shows when they last changed. If you have questions, write to ${email}.`,
        },
      ],
    },
  ],
  related: ["privacy-policy", "disclaimer", "about"],
};

const disclaimer: PageDef = {
  slug: "disclaimer",
  kind: "legal",
  navLabel: "Disclaimer",
  title: "Disclaimer | Percentage Increase Calculator",
  description:
    "Important notes about using percentageincreasecalculator.net. The tools are for information only and are not financial, tax or legal advice.",
  h1: "Disclaimer",
  lead: `Last updated: ${updated}.`,
  sections: [
    {
      h2: "For information only",
      blocks: [
        {
          t: "p",
          text: "The calculators, examples and guides on this site are for general information and education. They are not financial, investment, tax, legal, medical or accounting advice, and they don’t take your personal circumstances into account.",
        },
      ],
    },
    {
      h2: "Check important results",
      blocks: [
        {
          t: "p",
          text: "We test every formula, but no tool can promise that it is free of errors in every situation. Results are rounded for display. Before you rely on a number for a decision that matters, such as a contract, a tax return or an investment, check it yourself or ask a qualified professional.",
        },
      ],
    },
    {
      h2: "Examples are illustrations",
      blocks: [
        {
          t: "p",
          text: "The figures used in examples, such as prices, salaries and growth rates, are made up to explain how a formula works. They are not real data, forecasts or recommendations.",
        },
      ],
    },
    {
      h2: "Advertising",
      blocks: [
        {
          t: "p",
          text: "Any adverts shown on the site come from third-party ad networks. Their appearance doesn’t mean that we recommend or are connected to the advertiser.",
        },
      ],
    },
    {
      h2: "Contact",
      blocks: [
        {
          t: "p",
          text: `Questions about this disclaimer can be sent to ${email}. You can also read our [terms of use](/terms-of-use) and [privacy policy](/privacy-policy).`,
        },
      ],
    },
  ],
  related: ["terms-of-use", "privacy-policy", "about"],
};


const methodology: PageDef = {
  slug: "methodology",
  kind: "legal",
  navLabel: "How We Calculate",
  title: "Methodology: How Our Calculators Work and Are Tested",
  description:
    "The formulas behind every calculator on this site, how numbers are read and rounded, how we test them, and how to report a mistake.",
  h1: "How our calculators work",
  lead: `Last updated: ${updated}. This page explains the formulas we use, how inputs are handled, how we check the results, and how to tell us about a mistake.`,
  sections: [
    {
      h2: "Our standards",
      blocks: [
        {
          t: "ul",
          items: [
            "Show the working. Every result comes with the formula and each step, so you can check it yourself.",
            "Use standard definitions. The formulas are the ordinary definitions used in school mathematics and basic statistics.",
            "Say so when a calculation is impossible. We show a plain-language message instead of a wrong or empty answer.",
            "Keep your numbers private. Calculations run in your browser and are not sent to us.",
          ],
        },
      ],
    },
    {
      h2: "The formulas we use",
      blocks: [
        {
          t: "table",
          caption: "Formulas used on this site",
          head: ["Calculation", "Formula"],
          rows: [
            ["Percentage increase", "(New − Old) ÷ Old × 100"],
            ["Percentage decrease", "(Old − New) ÷ Old × 100"],
            ["Percentage change", "(New − Old) ÷ |Old| × 100"],
            ["Percentage difference", "|A − B| ÷ ((A + B) ÷ 2) × 100"],
            ["Increase or decrease by a percentage", "Number × (1 ± Percentage ÷ 100)"],
            ["Reverse percentage", "Final ÷ (1 ± Percentage ÷ 100)"],
            ["Percentage of a number", "Number × Percentage ÷ 100"],
            ["What percent one number is of another", "Part ÷ Whole × 100"],
            ["Growth rate per period (CAGR)", "(Final ÷ Start)^(1 ÷ n) − 1"],
            ["Real raise after inflation", "(New ÷ Current) ÷ (1 + Inflation ÷ 100) − 1"],
          ],
        },
      ],
    },
    {
      h2: "How numbers are read",
      blocks: [
        {
          t: "ul",
          items: [
            "Digits, a decimal point and a leading minus sign are accepted. A comma is accepted only as a thousands separator, as in 1,200.",
            "A value such as 1,2 is rejected with a message, because it could mean 1.2 or 12 depending on the country.",
            "Letters, symbols and scientific notation are rejected with a message that says what to fix.",
            "Numbers above one quadrillion (1,000,000,000,000,000) are rejected to avoid unreliable results.",
          ],
        },
      ],
    },
    {
      h2: "Rounding",
      blocks: [
        {
          t: "p",
          text: "Results are shown with up to six decimal places and trailing zeros removed. We also remove tiny floating-point errors that computers produce, so 25 is shown as 25 and not 25.000000000000004. Rounding is applied only to what is displayed, not between steps, so the final digit is as accurate as the computer allows.",
        },
      ],
    },
    {
      h2: "Special cases",
      blocks: [
        {
          t: "ul",
          items: [
            "A starting value of zero has no percentage change, so we say so.",
            "For a negative starting value, percentage change uses the absolute value of the starting value, so the sign of the result shows the direction of the move.",
            "Growth rate needs a positive starting value and a positive number of periods.",
            "A 100% decrease can’t be reversed, because every starting value leads to the same result.",
          ],
        },
      ],
    },
    {
      h2: "How we test",
      blocks: [
        {
          t: "p",
          text: "The calculation code is covered by automated tests that run every time the site is built. They check normal cases, boundary cases such as zero, negative numbers, decimals and very large values, and the inverse relationships between calculators, for example that the reverse percentage calculator undoes the increase calculator. The worked-example tables on our pages are also checked against the calculators automatically.",
        },
        {
          t: "p",
          text: "A separate check runs on the finished site and fails the build if any page links to another website or to a page that doesn’t exist.",
        },
      ],
    },
    {
      h2: "Corrections",
      blocks: [
        {
          t: "p",
          text: `If you believe a result or explanation is wrong, email ${email} with the calculator, the numbers you entered and what you expected. We look into every report, fix confirmed mistakes as soon as we can, and update the date on the page. See also our [about page](/about) and [disclaimer](/disclaimer).`,
        },
      ],
    },
  ],
  related: ["about", "calculators", "guides"],
};

export const LEGAL_PAGES: PageDef[] = [about, contact, privacy, terms, disclaimer, methodology];
