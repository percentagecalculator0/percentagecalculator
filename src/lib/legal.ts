import type { PageDef } from "./pages";
import { SITE } from "./site";

const email = SITE.contactEmail;
const updated = SITE.lastUpdated;

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
          text: "Many questions are answered in the guides. Try the [percentage increase formula guide](/percentage-increase-formula) or the [about page](/about).",
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

export const LEGAL_PAGES: PageDef[] = [about, contact, privacy, terms, disclaimer];
