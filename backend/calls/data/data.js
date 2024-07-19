const assurances = [
  {
    title: "Bureau local",
    subtitle: "Assurer les locaux",
    text: " Exercez votre activité en toute sérénité en bénéficiant d’une assurance en phase avec son temps. ",
    value: "bureau_local",
  },
  {
    title: "RC Pro",
    subtitle: "Responsabilité Civile",
    text: " Elle protège les constructeurs et les artisans du domaine de la construction pendant une durée de 10 ans. ",
    value: "rc_pro",
  },
];

const companies = [
  {
    siret: "12345678900000",
    nom_raison_sociale: "Tech Innovators SARL",
    code_activite: "6201Z",
    libelle_activite: "Programmation informatique",
    adresse: {
      numero_voie: "10",
      type_voie: "Rue",
      libelle_voie: "des Innovateurs",
      code_postal: "75001",
      libelle_commune: "Paris",
    },
    date_creation: "2010-05-15",
    owner_name: "Jean Dupont",
  },
  {
    siret: "98765432100000",
    nom_raison_sociale: "Gestion Conseil SA",
    code_activite: "7022Z",
    libelle_activite: "Conseil pour les affaires et autres conseils de gestion",
    adresse: {
      numero_voie: "20",
      type_voie: "Avenue",
      libelle_voie: "des Entrepreneurs",
      code_postal: "69002",
      libelle_commune: "Lyon",
    },
    date_creation: "2015-09-01",
    owner_name: "Marie Martin",
  },
  {
    siret: "13579246800001",
    nom_raison_sociale: "Eco Builders SAS",
    code_activite: "4120A",
    libelle_activite: "Construction de maisons individuelles",
    adresse: {
      numero_voie: "15",
      type_voie: "Boulevard",
      libelle_voie: "des Constructeurs",
      code_postal: "13001",
      libelle_commune: "Marseille",
    },
    date_creation: "2012-03-20",
    owner_name: "Pierre Lefevre",
  },
  {
    siret: "24681357900002",
    nom_raison_sociale: "Green Energy Solutions",
    code_activite: "3511Z",
    libelle_activite: "Production d'électricité",
    adresse: {
      numero_voie: "25",
      type_voie: "Chemin",
      libelle_voie: "des Energies",
      code_postal: "31000",
      libelle_commune: "Toulouse",
    },
    date_creation: "2018-07-11",
    owner_name: "Lucie Bernard",
  },
  {
    siret: "11223344556677",
    nom_raison_sociale: "Digital Marketing Experts",
    code_activite: "7311Z",
    libelle_activite: "Activités des agences de publicité",
    adresse: {
      numero_voie: "5",
      type_voie: "Allée",
      libelle_voie: "des Marketeurs",
      code_postal: "67000",
      libelle_commune: "Strasbourg",
    },
    date_creation: "2016-11-23",
    owner_name: "Sophie Dubois",
  },
];

const data = {
  assurances,
  companies,
};

export default data;
