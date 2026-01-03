export interface CountryData {
  name: string;
  slug: string;
  region: "North America" | "Caribbean" | "Africa" | "Asia";
  currency: string;
  currencyCode: string;
  countryCode: string; // ISO 3166-1 alpha-2 code for flag
  flag: string; // Emoji fallback
  payoutMethods: string[];
  payoutTime: string;
  headline: string;
  description: string;
  metaDescription: string;
  features: string[];
  localContext: string;
}

// Flag image URL helper using flagcdn.com
export const getFlagUrl = (countryCode: string, size: "w20" | "w40" | "w80" | "w160" = "w40"): string => {
  return `https://flagcdn.com/${size}/${countryCode.toLowerCase()}.png`;
};

// For retina/high-res displays
export const getFlagSrcSet = (countryCode: string): string => {
  const code = countryCode.toLowerCase();
  return `https://flagcdn.com/w40/${code}.png 1x, https://flagcdn.com/w80/${code}.png 2x`;
};

export const countries: CountryData[] = [
  // Caribbean
  {
    name: "Jamaica",
    slug: "jamaica",
    region: "Caribbean",
    currency: "Jamaican Dollar",
    currencyCode: "JMD",
    countryCode: "JM",
    flag: "🇯🇲",
    payoutMethods: ["Local Bank Account", "Western Union"],
    payoutTime: "2-3 business days",
    headline: "Accept Card Payments in Jamaica",
    description: "Accept card payments from customers worldwide and get paid directly to your Jamaican bank account or Western Union. Perfect for businesses in Kingston, Montego Bay, and across Jamaica.",
    metaDescription: "Accept card payments in Jamaica with HandyPay. Get paid to your Jamaican bank account or Western Union in 2-3 days. QR codes, payment links, no POS machine needed.",
    features: [
      "Accept JMD and USD payments",
      "Payout to any Jamaican bank",
      "Western Union cash pickup available",
      "Works with NCB, Scotiabank, JMMB, and more"
    ],
    localContext: "Jamaica's growing digital economy needs modern payment solutions. Whether you're running a restaurant in Kingston, a tour company in Ocho Rios, or a craft business in Montego Bay, HandyPay helps you accept card payments without expensive POS machines."
  },
  {
    name: "Trinidad & Tobago",
    slug: "trinidad-and-tobago",
    region: "Caribbean",
    currency: "Trinidad and Tobago Dollar",
    currencyCode: "TTD",
    countryCode: "TT",
    flag: "🇹🇹",
    payoutMethods: ["Local Bank Account"],
    payoutTime: "2-3 business days",
    headline: "Accept Card Payments in Trinidad & Tobago",
    description: "Accept card payments and receive funds directly to your Trinidad & Tobago bank account. Ideal for businesses in Port of Spain, San Fernando, and across the islands.",
    metaDescription: "Accept card payments in Trinidad & Tobago with HandyPay. Get paid to your local bank account in 2-3 days. No POS machine required.",
    features: [
      "Accept TTD and USD payments",
      "Payout to local banks",
      "Works with Republic Bank, First Citizens, RBC, and more",
      "Perfect for Carnival vendors and tourism businesses"
    ],
    localContext: "Trinidad & Tobago's vibrant business community deserves modern payment solutions. From doubles vendors to professional services, HandyPay makes accepting card payments simple."
  },
  {
    name: "St. Lucia",
    slug: "st-lucia",
    region: "Caribbean",
    currency: "East Caribbean Dollar",
    currencyCode: "XCD",
    countryCode: "LC",
    flag: "🇱🇨",
    payoutMethods: ["Local Bank Account"],
    payoutTime: "2-3 business days",
    headline: "Accept Card Payments in St. Lucia",
    description: "Accept card payments from tourists and locals alike. Get paid directly to your St. Lucian bank account.",
    metaDescription: "Accept card payments in St. Lucia with HandyPay. Perfect for tourism businesses. Get paid to your local bank in 2-3 days.",
    features: [
      "Accept XCD and USD payments",
      "Ideal for tourism and hospitality",
      "Payout to local banks",
      "QR codes perfect for beach vendors"
    ],
    localContext: "St. Lucia's tourism-driven economy benefits from easy card payment acceptance. Tour operators, restaurants, and craft vendors can now accept cards without expensive equipment."
  },
  {
    name: "Antigua & Barbuda",
    slug: "antigua-and-barbuda",
    region: "Caribbean",
    currency: "East Caribbean Dollar",
    currencyCode: "XCD",
    countryCode: "AG",
    flag: "🇦🇬",
    payoutMethods: ["Local Bank Account"],
    payoutTime: "2-3 business days",
    headline: "Accept Card Payments in Antigua & Barbuda",
    description: "Accept card payments and grow your business in Antigua & Barbuda. Funds deposited directly to your local bank.",
    metaDescription: "Accept card payments in Antigua & Barbuda with HandyPay. Get paid to your local bank account. Perfect for tourism businesses.",
    features: [
      "Accept XCD and USD payments",
      "Perfect for yacht services and tourism",
      "Payout to local banks",
      "No monthly fees"
    ],
    localContext: "Antigua & Barbuda's sailing and tourism industry needs flexible payment solutions. Accept payments at the marina, beach bars, or anywhere your business takes you."
  },
  {
    name: "Bahamas",
    slug: "bahamas",
    region: "Caribbean",
    currency: "Bahamian Dollar",
    currencyCode: "BSD",
    countryCode: "BS",
    flag: "🇧🇸",
    payoutMethods: ["Local Bank Account"],
    payoutTime: "2-3 business days",
    headline: "Accept Card Payments in The Bahamas",
    description: "Accept card payments from visitors and locals in The Bahamas. Get paid to your Bahamian bank account quickly.",
    metaDescription: "Accept card payments in The Bahamas with HandyPay. Perfect for Nassau and island businesses. Get paid to your local bank in 2-3 days.",
    features: [
      "Accept BSD and USD payments",
      "Ideal for tourism and hospitality",
      "Works across all islands",
      "Payout to local banks"
    ],
    localContext: "The Bahamas welcomes millions of tourists yearly. Make it easy for them to pay you with card payments via QR codes and payment links."
  },
  {
    name: "Dominican Republic",
    slug: "dominican-republic",
    region: "Caribbean",
    currency: "Dominican Peso",
    currencyCode: "DOP",
    countryCode: "DO",
    flag: "🇩🇴",
    payoutMethods: ["Local Bank Account"],
    payoutTime: "2-3 business days",
    headline: "Accept Card Payments in Dominican Republic",
    description: "Accept card payments and receive funds to your Dominican bank account. Perfect for businesses in Santo Domingo, Punta Cana, and beyond.",
    metaDescription: "Accept card payments in Dominican Republic with HandyPay. Get paid to your local bank account in 2-3 days. No POS machine needed.",
    features: [
      "Accept DOP and USD payments",
      "Perfect for tourism businesses",
      "Payout to Dominican banks",
      "Works in resort areas and cities"
    ],
    localContext: "Dominican Republic's booming tourism industry needs modern payment solutions. From Punta Cana resorts to Santo Domingo shops, accept cards easily."
  },
  {
    name: "Guyana",
    slug: "guyana",
    region: "Caribbean",
    currency: "Guyanese Dollar",
    currencyCode: "GYD",
    countryCode: "GY",
    flag: "🇬🇾",
    payoutMethods: ["Local Bank Account"],
    payoutTime: "2-3 business days",
    headline: "Accept Card Payments in Guyana",
    description: "Accept card payments and get paid to your Guyanese bank account. Growing with Guyana's expanding economy.",
    metaDescription: "Accept card payments in Guyana with HandyPay. Get paid to your local bank account in 2-3 days. Perfect for Georgetown businesses.",
    features: [
      "Accept GYD and USD payments",
      "Payout to local banks",
      "Growing with Guyana's economy",
      "Works across the country"
    ],
    localContext: "Guyana's rapidly growing economy needs modern payment infrastructure. Be ready for the future with digital payment acceptance."
  },
  // Africa
  {
    name: "Nigeria",
    slug: "nigeria",
    region: "Africa",
    currency: "Nigerian Naira",
    currencyCode: "NGN",
    countryCode: "NG",
    flag: "🇳🇬",
    payoutMethods: ["Local Bank Account"],
    payoutTime: "2-3 business days",
    headline: "Accept Card Payments in Nigeria",
    description: "Accept international card payments and receive Naira directly to your Nigerian bank account. Perfect for freelancers, businesses, and creators in Lagos, Abuja, and across Nigeria.",
    metaDescription: "Accept card payments in Nigeria with HandyPay. Get paid in Naira to your Nigerian bank account. Perfect for freelancers and businesses.",
    features: [
      "Receive payments in NGN",
      "Accept international cards",
      "Perfect for freelancers and exporters",
      "Works with GTBank, Access, Zenith, and more"
    ],
    localContext: "Nigeria's creative economy is booming. Whether you're a tech freelancer in Lagos, an artist in Abuja, or running an e-commerce business, accept international payments easily."
  },
  {
    name: "Ghana",
    slug: "ghana",
    region: "Africa",
    currency: "Ghanaian Cedi",
    currencyCode: "GHS",
    countryCode: "GH",
    flag: "🇬🇭",
    payoutMethods: ["Local Bank Account"],
    payoutTime: "2-3 business days",
    headline: "Accept Card Payments in Ghana",
    description: "Accept card payments and receive Cedis directly to your Ghanaian bank account. Perfect for businesses in Accra and across Ghana.",
    metaDescription: "Accept card payments in Ghana with HandyPay. Get paid in Cedis to your Ghanaian bank account. Perfect for freelancers and businesses.",
    features: [
      "Receive payments in GHS",
      "Accept international cards",
      "Payout to local banks",
      "Works across Ghana"
    ],
    localContext: "Ghana's growing tech and creative industries need easy payment solutions. Accept payments from clients worldwide and get paid locally."
  },
  {
    name: "Gambia",
    slug: "gambia",
    region: "Africa",
    currency: "Gambian Dalasi",
    currencyCode: "GMD",
    countryCode: "GM",
    flag: "🇬🇲",
    payoutMethods: ["Local Bank Account"],
    payoutTime: "2-3 business days",
    headline: "Accept Card Payments in Gambia",
    description: "Accept card payments and receive funds to your Gambian bank account.",
    metaDescription: "Accept card payments in Gambia with HandyPay. Get paid to your local bank account in 2-3 days.",
    features: [
      "Accept international card payments",
      "Payout to local banks",
      "No expensive POS machines",
      "Works across the country"
    ],
    localContext: "Gambia's tourism and small business sector can now accept card payments easily without expensive equipment."
  },
  {
    name: "Namibia",
    slug: "namibia",
    region: "Africa",
    currency: "Namibian Dollar",
    currencyCode: "NAD",
    countryCode: "NA",
    flag: "🇳🇦",
    payoutMethods: ["Local Bank Account"],
    payoutTime: "2-3 business days",
    headline: "Accept Card Payments in Namibia",
    description: "Accept card payments from tourists and clients worldwide. Get paid to your Namibian bank account.",
    metaDescription: "Accept card payments in Namibia with HandyPay. Perfect for tourism businesses. Get paid to your local bank.",
    features: [
      "Accept NAD and international payments",
      "Perfect for safari and tourism",
      "Payout to local banks",
      "Works in remote areas"
    ],
    localContext: "Namibia's world-famous tourism industry deserves modern payment solutions. Accept payments at lodges, tour companies, and craft markets."
  },
  {
    name: "Tanzania",
    slug: "tanzania",
    region: "Africa",
    currency: "Tanzanian Shilling",
    currencyCode: "TZS",
    countryCode: "TZ",
    flag: "🇹🇿",
    payoutMethods: ["Local Bank Account"],
    payoutTime: "2-3 business days",
    headline: "Accept Card Payments in Tanzania",
    description: "Accept card payments and receive funds to your Tanzanian bank account. Perfect for tourism and export businesses.",
    metaDescription: "Accept card payments in Tanzania with HandyPay. Get paid to your local bank account. Perfect for Zanzibar and safari businesses.",
    features: [
      "Accept TZS and international payments",
      "Perfect for Zanzibar tourism",
      "Safari and tour operators",
      "Payout to local banks"
    ],
    localContext: "From the beaches of Zanzibar to the Serengeti, Tanzania's tourism industry can now accept card payments without expensive equipment."
  },
  {
    name: "Mauritius",
    slug: "mauritius",
    region: "Africa",
    currency: "Mauritian Rupee",
    currencyCode: "MUR",
    countryCode: "MU",
    flag: "🇲🇺",
    payoutMethods: ["Local Bank Account"],
    payoutTime: "2-3 business days",
    headline: "Accept Card Payments in Mauritius",
    description: "Accept card payments from tourists and international clients. Get paid to your Mauritian bank account.",
    metaDescription: "Accept card payments in Mauritius with HandyPay. Perfect for tourism and hospitality. Get paid to your local bank.",
    features: [
      "Accept MUR and international payments",
      "Perfect for luxury tourism",
      "Hospitality and services",
      "Payout to local banks"
    ],
    localContext: "Mauritius's luxury tourism and services sector can provide seamless payment experiences with QR codes and payment links."
  },
  {
    name: "Mozambique",
    slug: "mozambique",
    region: "Africa",
    currency: "Mozambican Metical",
    currencyCode: "MZN",
    countryCode: "MZ",
    flag: "🇲🇿",
    payoutMethods: ["Local Bank Account"],
    payoutTime: "2-3 business days",
    headline: "Accept Card Payments in Mozambique",
    description: "Accept card payments and receive funds to your Mozambican bank account.",
    metaDescription: "Accept card payments in Mozambique with HandyPay. Get paid to your local bank account in 2-3 days.",
    features: [
      "Accept MZN and international payments",
      "Payout to local banks",
      "Tourism and services",
      "No monthly fees"
    ],
    localContext: "Mozambique's growing economy needs modern payment solutions. Accept card payments from tourists and international clients."
  },
  // North America
  {
    name: "United States",
    slug: "united-states",
    region: "North America",
    currency: "US Dollar",
    currencyCode: "USD",
    countryCode: "US",
    flag: "🇺🇸",
    payoutMethods: ["Bank Account", "Debit Card"],
    payoutTime: "1-2 business days",
    headline: "Accept Card Payments in the United States",
    description: "Accept card payments from anywhere and receive USD directly to your US bank account. Fast payouts and low fees.",
    metaDescription: "Accept card payments in the United States with HandyPay. Get paid to your US bank account in 1-2 days. QR codes and payment links.",
    features: [
      "Fast 1-2 day payouts",
      "Accept all major cards",
      "Instant payouts available",
      "Works with any US bank"
    ],
    localContext: "American businesses and freelancers can accept card payments easily with QR codes and payment links. No expensive card readers needed."
  },
  {
    name: "Canada",
    slug: "canada",
    region: "North America",
    currency: "Canadian Dollar",
    currencyCode: "CAD",
    countryCode: "CA",
    flag: "🇨🇦",
    payoutMethods: ["Bank Account"],
    payoutTime: "2-3 business days",
    headline: "Accept Card Payments in Canada",
    description: "Accept card payments and receive CAD directly to your Canadian bank account. Perfect for businesses across Canada.",
    metaDescription: "Accept card payments in Canada with HandyPay. Get paid in CAD to your Canadian bank account. No POS machine needed.",
    features: [
      "Accept CAD and USD payments",
      "Payout to Canadian banks",
      "Works coast to coast",
      "Perfect for service businesses"
    ],
    localContext: "Canadian businesses from Vancouver to Toronto can accept card payments without expensive equipment. Great for markets, services, and freelancers."
  },
  // Asia
  {
    name: "Bangladesh",
    slug: "bangladesh",
    region: "Asia",
    currency: "Bangladeshi Taka",
    currencyCode: "BDT",
    countryCode: "BD",
    flag: "🇧🇩",
    payoutMethods: ["Local Bank Account"],
    payoutTime: "2-3 business days",
    headline: "Accept Card Payments in Bangladesh",
    description: "Accept international card payments and receive Taka to your Bangladeshi bank account. Perfect for freelancers and exporters.",
    metaDescription: "Accept card payments in Bangladesh with HandyPay. Get paid in Taka to your local bank account. Perfect for freelancers.",
    features: [
      "Receive payments in BDT",
      "Accept international cards",
      "Perfect for freelancers",
      "Payout to local banks"
    ],
    localContext: "Bangladesh's thriving freelance and IT export community can now receive international payments easily and get paid in Taka."
  }
];

export const getCountryBySlug = (slug: string): CountryData | undefined => {
  return countries.find(country => country.slug === slug);
};

export const getCountriesByRegion = (): Record<string, CountryData[]> => {
  return countries.reduce((acc, country) => {
    if (!acc[country.region]) {
      acc[country.region] = [];
    }
    acc[country.region].push(country);
    return acc;
  }, {} as Record<string, CountryData[]>);
};
