import React, { useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const handleNavClick = (section) => {
    setActiveSection(section);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  // Consistent styling with black and white theme
  const containerStyle = {
    minHeight: "100vh",
    background: "#ffffff",
    fontFamily: "Arial, sans-serif",
    position: "relative",
    display: "flex",
    margin: "0",
    padding: "0"
  };

  const sidebarStyle = {
    position: "fixed",
    top: "0",
    left: sidebarOpen ? "0" : "-280px",
    height: "100vh",
    width: "280px",
    background: "#000000",
    boxShadow: "2px 0 15px rgba(0, 0, 0, 0.3)",
    transition: "left 0.3s ease",
    zIndex: "1000",
    paddingTop: "80px",
    overflow: "auto"
  };

  const navListStyle = {
    listStyle: "none",
    padding: "0",
    margin: "0"
  };

  const navItemStyle = {
    margin: "0",
    borderBottom: "1px solid #333333"
  };

  const navLinkStyle = {
    display: "flex",
    alignItems: "center",
    padding: "18px 25px",
    textDecoration: "none",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "500",
    transition: "all 0.2s ease",
    borderLeft: "4px solid transparent"
  };

  const activeLinkStyle = {
    ...navLinkStyle,
    background: "#ffffff",
    color: "#000000",
    borderLeftColor: "#000000"
  };

  const toggleButtonStyle = {
    position: "fixed",
    top: "25px",
    left: "25px",
    zIndex: "1100",
    background: "#000000",
    border: "2px solid #000000",
    borderRadius: "8px",
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "20px",
    color: "#ffffff",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)"
  };

  const overlayStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    zIndex: "999",
    display: sidebarOpen ? "block" : "none",
    transition: "opacity 0.3s ease"
  };

  const mainContentStyle = {
    flex: "1",
    marginLeft: "0",
    padding: "100px 30px 30px 30px",
    transition: "margin-left 0.3s ease",
    minHeight: "100vh"
  };

  const contentSectionStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    background: "#ffffff",
    border: "2px solid #000000",
    borderRadius: "12px",
    padding: "40px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    textAlign: "center"
  };

  const titleStyle = {
    fontSize: "32px",
    fontWeight: "600",
    color: "#000000",
    marginBottom: "20px",
    letterSpacing: "0.5px"
  };

  const subtitleStyle = {
    fontSize: "18px",
    color: "#000000",
    marginBottom: "30px",
    lineHeight: "1.6"
  };

  const featureGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginTop: "40px"
  };

  const featureCardStyle = {
    background: "#ffffff",
    border: "2px solid #000000",
    borderRadius: "8px",
    padding: "25px 20px",
    textAlign: "center",
    transition: "transform 0.2s ease, box-shadow 0.2s ease"
  };

  const iconStyle = {
    fontSize: "24px",
    marginRight: "10px",
    color: "#000000"
  };

  // Content for different sections
  const sectionContent = {
    home: {
      title: "Welcome to Our Website",
      subtitle: "Discover amazing features and elegant design",
      content: "This responsive sidebar navigation showcases modern web design principles with smooth animations and user-friendly interactions."
    },
    about: {
      title: "About Us",
      subtitle: "Learn more about our mission and values",
      content: "We create beautiful, functional web applications that provide exceptional user experiences across all devices."
    },
    services: {
      title: "Our Services",
      subtitle: "Professional web development solutions",
      content: "From responsive design to interactive applications, we deliver high-quality digital solutions tailored to your needs."
    },
    portfolio: {
      title: "Portfolio",
      subtitle: "Showcase of our best work",
      content: "Explore our collection of successful projects and see how we bring ideas to life through code and creativity."
    },
    contact: {
      title: "Contact Us",
      subtitle: "Get in touch with our team",
      content: "Ready to start your project? We'd love to hear from you and discuss how we can help bring your vision to reality."
    }
  };

  const currentContent = sectionContent[activeSection];

  return (
    <div style={containerStyle}>
      {/* Overlay for mobile */}
      <div
        style={overlayStyle}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Hamburger Toggle Button */}
      <button
        style={toggleButtonStyle}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        onMouseOver={(e) => {
          e.target.style.background = "#f8f9fa";
          e.target.style.borderColor = "#28a745";
        }}
        onMouseOut={(e) => {
          e.target.style.background = "#fff";
          e.target.style.borderColor = "#e9ecef";
        }}
        aria-label={sidebarOpen ? "Close menu" : "Open menu"}
      >
        {sidebarOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar Navigation */}
      <aside style={sidebarStyle}>
        <nav>
          <ul style={navListStyle}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <li key={link.label} style={navItemStyle}>
                  <a
                    href={link.href}
                    style={isActive ? activeLinkStyle : navLinkStyle}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href.substring(1));
                    }}
                    onMouseOver={(e) => {
                      if (!isActive) {
                        e.target.style.background = "#f8f9fa";
                        e.target.style.color = "#28a745";
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isActive) {
                        e.target.style.background = "transparent";
                        e.target.style.color = "#333";
                      }
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={mainContentStyle}>
        <div style={contentSectionStyle}>
          <h1 style={titleStyle}>{currentContent.title}</h1>
          <p style={subtitleStyle}>{currentContent.subtitle}</p>
          <p style={{ ...subtitleStyle, fontWeight: "normal", color: "#777" }}>
            {currentContent.content}
          </p>

          {activeSection === "home" && (
            <div style={featureGridStyle}>
              <div
                style={featureCardStyle}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-5px)";
                  e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                <h3 style={{ color: "#333", marginBottom: "10px" }}>📱 Responsive</h3>
                <p style={{ color: "#666", margin: "0" }}>Works perfectly on all devices</p>
              </div>
              <div
                style={featureCardStyle}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-5px)";
                  e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                <h3 style={{ color: "#333", marginBottom: "10px" }}>⚡ Fast</h3>
                <p style={{ color: "#666", margin: "0" }}>Optimized for performance</p>
              </div>
              <div
                style={featureCardStyle}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-5px)";
                  e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                <h3 style={{ color: "#333", marginBottom: "10px" }}>🎨 Modern</h3>
                <p style={{ color: "#666", margin: "0" }}>Clean and elegant design</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
