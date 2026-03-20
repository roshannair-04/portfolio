const skills = {
  Programming: ["Python", "C++", "SQL"],

  "AI/ML & CV": [
    "YOLOv8",
    "ArcFace",
    "InsightFace",
    "OpenCV"
  ],

  Libraries: [
    "NumPy",
    "Pandas",
    "Matplotlib",
    "Scikit-Learn"
  ],

  "Backend & Tools": [
    "FastAPI",
    "PostgreSQL",
    "Git"
  ],

  Domains: [
    "Computer Vision",
    "Identity Recognition",
    "Real-time Inference"
  ]
};

export default function Skills() {
  return (
    <section id="skills" className="min-h-screen px-8 md:px-20 py-20">
      
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-cyan-400">
        Skills
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(skills).map(([category, items]) => (
          <div
            key={category}
            className="border border-gray-800 p-6 rounded-xl hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10 transition duration-300"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">
              {category}
            </h3>

            <div className="flex flex-wrap gap-2">
              {items.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm border border-cyan-400 text-cyan-400 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}