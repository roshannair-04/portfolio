const achievements = [
  {
    title: "3rd Prize in the Delloite Ideathon 2025-26",
    detail:
      "Selected for the Capstone project after being in the top 10 teams."
  },
  {
    title: "Red Hat Academy",
    detail:
      "Red Hat System Administration II (RH134-RHA) · Red Hat Academy · Apr 2025."
  },
  {
    title: "Specialization in Computer Vision",
    detail:
      "Focused on identity recognition, real-time inference, and AI system optimization."
  }
];

export default function Achievements() {
  return (
    <section id="achievements" className="min-h-screen px-8 md:px-20 py-20">
      
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-cyan-400">
        Achievements
      </h2>

      <div className="space-y-6">
        {achievements.map((item, index) => (
          <div
            key={index}
            className="border border-gray-800 p-6 rounded-xl hover:border-cyan-400 transition"
          >
            <h3 className="text-xl font-semibold mb-2">
              {item.title}
            </h3>

            <p className="text-gray-400">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}