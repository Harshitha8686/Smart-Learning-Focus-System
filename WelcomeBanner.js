function WelcomeBanner() {

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 17) greeting = "Good Afternoon";

    return (

        <div className="welcome-banner">

            <div>

                <h1>
                    
                    👋 {greeting}, Student</h1>

                <p>
                    Stay focused. Stay consistent.
                    Every small step today builds tomorrow's success.
                </p>

            </div>

            <div className="rocket">
                🚀
            </div>

        </div>

    );

}

export default WelcomeBanner;