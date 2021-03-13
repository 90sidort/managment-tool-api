const jobs = [
  {
    id: 1,
    personel: 10,
    location: {
      cid: 1,
      city: "Gorzów Wielkopolski",
      address: "Franklina D. Roosvelta 20/3",
      country: "Poland",
      postcode: "66-400",
    },
    title: "10 zbieraczy jabłek",
    rate: 100.0,
    currency: "PLN",
    description: "Poszukuję 10 zbieraczy jabłek do pracy w sadzie.",
    skills: [{ id: 1, name: "polish" }],
    agent: null,
    representative: {
      cid: 1,
      name: "Jan Andrzej Morsztyn",
      email: "morsztyn@test.com",
      phone: "+48555777666",
    },
    company: { id: 1, name: "Jabłex" },
    start: new Date(),
    end: new Date(),
    status: "New",
    created: new Date(),
  },
  {
    id: 2,
    personel: 1,
    location: {
      cid: 1,
      city: "Gorzów Wielkopolski",
      address: "Franklina D. Roosvelta 20/3",
      country: "Poland",
      postcode: "66-400",
    },
    title: "1 kierownik zbierania jabłek",
    rate: 150.0,
    currency: "PLN",
    description:
      "Poszukuję 1 kierownika do kierowania zespołem zbieraczy jabłek.",
    skills: [
      { id: 1, name: "polish" },
      { id: 2, name: "leadership" },
    ],
    agent: null,
    representative: {
      cid: 1,
      name: "Andrzej Bursztyn",
      email: "bursztyn@test.com",
      phone: "+48555666777",
    },
    company: { id: 1, name: "Jabłex" },
    start: new Date(),
    end: new Date(),
    status: "New",
    created: new Date(),
  },
];

const locations = [
  {
    cid: 1,
    city: "Gorzów Wielkopolski",
    address: "Franklina D. Roosvelta 20/3",
    country: "Poland",
    postcode: "66-400",
  },
  {
    cid: 2,
    city: "Bremen",
    address: "Hohentorstrasse 58-75",
    country: "Germany",
    postcode: "28199",
  },
  {
    cid: 3,
    city: "Szczecin",
    address: "aleja Bohaterów Warszawy 42",
    country: "Poland",
    postcode: "70-342",
  },
  {
    cid: 4,
    city: "Toruń",
    address: "Świętego Józefa 53-59",
    country: "Poland",
    postcode: "87-100",
  },
  {
    cid: 5,
    city: "The Hague",
    address: "ABC Westland 140",
    country: "Netherlands",
    postcode: "2685",
  },
];

const representative = [
  {
    cid: 1,
    name: "Jan Andrzej Morsztyn",
    email: "morsztyn@test.com",
    phone: "+48555777666",
  },
  {
    cid: 1,
    name: "Andrzej Bursztyn",
    email: "bursztyn@test.com",
    phone: "+48555666777",
  },
  {
    cid: 3,
    name: "Wałcaw Olsztyn",
    email: "olsztyn@test.com",
    phone: "+48777555666",
  },
];

const skills = [
  { id: 1, name: "manual labour" },
  { id: 2, name: "polish" },
  { id: 3, name: "construction experience" },
  { id: 4, name: "welder" },
  { id: 5, name: "carpenter" },
];

const companies = [
  { id: 1, name: `Sad Jabłek "Jelonek"` },
  { id: 2, name: `Obsługa Portu Szczecin Sp.z.o.o` },
  { id: 3, name: `Wnimijgen & sons` },
  { id: 4, name: `Haupfbman` },
];

module.exports = {
  jobs,
  locations,
  representative,
  skills,
  companies,
};
