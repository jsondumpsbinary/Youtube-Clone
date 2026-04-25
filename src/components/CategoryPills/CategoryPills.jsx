import "./CategoryPills.css";

const CATEGORIES = [
  "All",
  "React",
  "JavaScript",
  "CSS",
  "Python",
  "Node.js",
  "DevOps",
  "Git",
  "TypeScript",
  "Web Design",
  "Data Science",
  "Machine Learning",
  "Algorithms",
  "System Design",
];

function CategoryPills({ activeCategory, onCategoryChange }) {
  return (
    <div className="category-pills">
      <div className="category-pills__scroll">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            className={`category-pills__pill ${
              activeCategory === category ? "category-pills__pill--active" : ""
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryPills;
