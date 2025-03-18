import "./About.css"

const About = () => {
  // Team members data
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=150&width=150",
      bio: "Sarah founded Food Del with a vision to revolutionize food delivery in Uzbekistan.",
    },
    {
      name: "Michael Chen",
      role: "Head Chef",
      image: "/placeholder.svg?height=150&width=150",
      bio: "Michael brings 15 years of culinary expertise to ensure quality across all our partner restaurants.",
    },
    {
      name: "Alina Karimova",
      role: "Operations Manager",
      image: "/placeholder.svg?height=150&width=150",
      bio: "Alina oversees all delivery operations to ensure your food arrives hot and on time.",
    },
    {
      name: "David Kim",
      role: "Tech Lead",
      image: "/placeholder.svg?height=150&width=150",
      bio: "David leads our technology team to create the best food delivery experience in the market.",
    },
  ]

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>About Food Del</h1>
          <p>Delivering happiness, one meal at a time</p>
        </div>
      </div>

      <div className="about-section">
        <div className="about-story">
          <div className="about-story-content">
            <h2>Our Story</h2>
            <p>
              Founded in 2020, Food Del started with a simple mission: to connect people with their favorite restaurants
              and deliver delicious meals right to their doorstep. What began as a small startup in Tashkent has now
              grown into Uzbekistan's leading food delivery platform.
            </p>
            <p>
              We believe that good food brings people together, and we're passionate about making food delivery
              convenient, reliable, and enjoyable for everyone. Our platform partners with the best local restaurants to
              bring you a wide variety of cuisines, from traditional Uzbek dishes to international favorites.
            </p>
          </div>
          <div className="about-story-image">
            <img src="/placeholder.svg?height=400&width=600" alt="Food Del story" />
          </div>
        </div>
      </div>

      <div className="about-section about-mission">
        <div className="about-mission-content">
          <h2>Our Mission & Vision</h2>
          <div className="mission-cards">
            <div className="mission-card">
              <h3>Mission</h3>
              <p>
                To connect people with the food they love from their favorite local restaurants, delivered fast and
                fresh to their doorstep.
              </p>
            </div>
            <div className="mission-card">
              <h3>Vision</h3>
              <p>
                To be the most loved food delivery platform in Uzbekistan, known for exceptional service, quality, and
                innovation.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div className="team-member" key={index}>
              <div className="team-member-image">
                <img src={member.image || "/placeholder.svg"} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p className="team-member-role">{member.role}</p>
              <p className="team-member-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="about-section about-values">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-item">
            <div className="value-icon">🚀</div>
            <h3>Innovation</h3>
            <p>We constantly seek new ways to improve our service and technology.</p>
          </div>
          <div className="value-item">
            <div className="value-icon">⏱️</div>
            <h3>Reliability</h3>
            <p>We deliver on our promises, on time, every time.</p>
          </div>
          <div className="value-item">
            <div className="value-icon">❤️</div>
            <h3>Customer First</h3>
            <p>Our customers are at the heart of everything we do.</p>
          </div>
          <div className="value-item">
            <div className="value-icon">🤝</div>
            <h3>Community</h3>
            <p>We support local businesses and contribute to our communities.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

