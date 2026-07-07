function DashboardCards({ tasks = [] }) {

    const totalTasks = tasks.length;

    const completed = tasks.filter(
        t => t.studyHours >= t.targetHours
    ).length;

    const pending = totalTasks - completed;

    const totalHours = tasks.reduce(
        (sum, t) => sum + t.studyHours,
        0
    );

    const cards = [

        {
            title: "Total Tasks",
            value: totalTasks,
            icon: "📚"
        },

        {
            title: "Completed",
            value: completed,
            icon: "✅"
        },

        {
            title: "Pending",
            value: pending,
            icon: "⏳"
        },

        {
            title: "Study Hours",
            value: totalHours.toFixed(1),
            icon: "⏱"
        }

    ];

    return (

        <div className="cards">

            {cards.map((card, index) => (

                <div className="card" key={index}>

                    <div className="card-icon">
                        {card.icon}
                    </div>

                    <h2>{card.value}</h2>

                    <p>{card.title}</p>

                </div>

            ))}

        </div>

    );

}

export default DashboardCards;