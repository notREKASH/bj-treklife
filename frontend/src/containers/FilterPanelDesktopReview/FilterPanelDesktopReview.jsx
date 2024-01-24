import FilterPanelReviewCategory from "@/components/FilterPanelReviewCategory/FilterPanelReviewCategory";
import "./FilterPanelDesktopReview.scss";

const equipmentFilter = [
  {
    name: "Sac à dos",
    filter: "Sac à dos",
  },
  {
    name: "Tente",
    filter: "Tente",
  },
  {
    name: "Duvet",
    filter: "Duvet",
  },
  {
    name: "Réchaud",
    filter: "Réchaud",
  },
  // {
  //   name: "Kit Popote",
  //   filter: "Kit Popote",
  // },
  // {
  //   name: "Matelas",
  //   filter: "Matelas",
  // },
];

const clothingFilter = [
  {
    name: "Chaussure",
    filter: "Chaussure",
  },
  // {
  //   name: "Polaire",
  //   filter: "Polaire",
  // },
  // {
  //   name: "Veste imperméable",
  //   filter: "Veste imperméable",
  // },
  {
    name: "Doudoune",
    filter: "Doudoune",
  },
  // {
  //   name: "Pantalon",
  //   filter: "Pantalon",
  // },
];

const accessoriesFilter = [
  {
    name: "Frontale",
    filter: "Frontale",
  },
  {
    name: "Filtre à eau",
    filter: "Filtre à eau",
  },
];

export default function FilterPanelDesktopReview() {
  return (
    <div className="desktop">
      <h3>Filtrer par catégorie</h3>
      <div className="desktop__container">
        <FilterPanelReviewCategory categoryName="Tous" />
        <FilterPanelReviewCategory
          categoryName="Equipements"
          subCategoryFilter={equipmentFilter}
        />
        <FilterPanelReviewCategory
          categoryName="Vêtements"
          subCategoryFilter={clothingFilter}
        />
        {/* <FilterPanelReviewCategory
          categoryName="Accessoires"
          subCategoryFilter={accessoriesFilter}
        /> */}
      </div>
    </div>
  );
}

// Uncomment comment for add more filter
