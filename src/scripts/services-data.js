// Categories for filtering
const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'sales', name: 'Sales' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'branding', name: 'Branding' },
    { id: 'client', name: 'Client Servicing' },
    { id: 'events', name: 'Events' }
];

// Services data array
const services = [
    {
        id: 1,
        title: "Sales Solutions",
        tagline: "Driving revenue growth through strategic sales initiatives",
        description: "Our comprehensive sales solutions are designed to help businesses increase their revenue and market share through targeted strategies and expert execution.",
        icon: "fa-handshake",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGV1fDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        categories: ['sales'],
        features: [
            {
                icon: "fa-chart-line",
                title: "Sales Strategy",
                description: "Custom sales strategies tailored to your business goals and target market."
            },
            {
                icon: "fa-users",
                title: "Team Training",
                description: "Comprehensive training programs to enhance your sales team's performance."
            },
            {
                icon: "fa-search-dollar",
                title: "Market Research",
                description: "In-depth market analysis to identify new opportunities and optimize sales approaches."
            },
            {
                icon: "fa-bullseye",
                title: "Lead Generation",
                description: "Targeted lead generation to build a robust sales pipeline."
            },
            {
                icon: "fa-hand-holding-usd",
                title: "Revenue Growth",
                description: "Proven strategies to accelerate your revenue growth and market expansion."
            }
        ],
        ctaText: "Boost Your Sales"
    },
    {
        id: 2,
        title: "Marketing Services",
        tagline: "Amplify your brand's reach and engagement",
        description: "Our comprehensive marketing solutions are designed to create meaningful connections with your target audience and drive business growth through innovative strategies.",
        icon: "fa-bullhorn",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGV1fDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        categories: ['marketing'],
        features: [
            {
                icon: "fa-hashtag",
                title: "Digital Marketing",
                description: "Comprehensive digital marketing strategies to enhance your online presence."
            },
            {
                icon: "fa-bullseye",
                title: "Targeted Campaigns",
                description: "Precision-targeted campaigns to reach your ideal customers."
            },
            {
                icon: "fa-line-chart",
                title: "Performance Analysis",
                description: "Data-driven insights to measure and optimize campaign performance."
            },
            {
                icon: "fa-users",
                title: "Audience Engagement",
                description: "Strategies to build and engage with your target audience."
            },
            {
                icon: "fa-lightbulb",
                title: "Creative Solutions",
                description: "Innovative marketing approaches to make your brand stand out."
            }
        ],
        ctaText: "Elevate Your Marketing"
    },
    {
        id: 3,
        title: "Branding Acquisition",
        tagline: "Building powerful brands that resonate with your audience",
        description: "Our branding acquisition services help businesses establish a strong, memorable brand identity that connects with customers and drives loyalty.",
        icon: "fa-trademark",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGV1fDB8fHx8&auto=format&fit=crop&w=1415&q=80",
        categories: ['branding'],
        features: [
            {
                icon: "fa-palette",
                title: "Brand Identity",
                description: "Creating distinctive visual and verbal brand elements."
            },
            {
                icon: "fa-chess-king",
                title: "Brand Strategy",
                description: "Developing a clear roadmap for your brand's growth."
            },
            {
                icon: "fa-eye",
                title: "Brand Recognition",
                description: "Ensuring your brand stands out in a crowded market."
            },
            {
                icon: "fa-comments",
                title: "Brand Messaging",
                description: "Crafting compelling messages that resonate with your audience."
            },
            {
                icon: "fa-chart-pie",
                title: "Brand Equity",
                description: "Building and measuring the value of your brand."
            }
        ],
        ctaText: "Build Your Brand"
    },
    {
        id: 4,
        title: "Client Servicing",
        tagline: "Exceptional service that builds lasting relationships",
        description: "Our client servicing approach ensures that your customers receive the highest level of support and attention, fostering loyalty and long-term relationships.",
        icon: "fa-headset",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGV1fDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        categories: ['client'],
        features: [
            {
                icon: "fa-comments",
                title: "Customer Support",
                description: "24/7 dedicated support to address your customers' needs."
            },
            {
                icon: "fa-handshake",
                title: "Account Management",
                description: "Dedicated account managers for personalized service."
            },
            {
                icon: "fa-tools",
                title: "Problem Resolution",
                description: "Quick and effective solutions to customer issues."
            },
            {
                icon: "fa-heart",
                title: "Customer Satisfaction",
                description: "Ensuring your customers are delighted with your service."
            },
            {
                icon: "fa-chart-line",
                title: "Retention Strategies",
                description: "Proactive approaches to keep your customers engaged."
            }
        ],
        ctaText: "Enhance Service"
    },
    {
        id: 5,
        title: "Mall Events & Road Trips",
        tagline: "Creating memorable brand experiences",
        description: "Our mall events and road trip activations create engaging, face-to-face interactions with your target audience, driving brand awareness and customer engagement.",
        icon: "fa-calendar-alt",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGV1fDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        categories: ['events'],
        features: [
            {
                icon: "fa-map-marker-alt",
                title: "Nationwide Coverage",
                description: "Events and activations across multiple locations."
            },
            {
                icon: "fa-users",
                title: "Audience Engagement",
                description: "Interactive experiences that captivate your audience."
            },
            {
                icon: "fa-bullhorn",
                title: "Brand Activation",
                description: "Creative concepts that bring your brand to life."
            },
            {
                icon: "fa-chart-bar",
                title: "ROI Tracking",
                description: "Comprehensive measurement of event success."
            },
            {
                icon: "fa-lightbulb",
                title: "Innovative Concepts",
                description: "Unique event ideas that make an impact."
            }
        ],
        ctaText: "Plan Your Event"
    },
    {
        id: 6,
        title: "Goodwill Reinforcement",
        tagline: "Strengthening your brand's reputation and community ties",
        description: "Our goodwill reinforcement services help build and maintain positive relationships with your community and stakeholders through meaningful initiatives.",
        icon: "fa-hands-helping",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGV1fDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        categories: ['events', 'branding'],
        features: [
            {
                icon: "fa-heart",
                title: "CSR Initiatives",
                description: "Corporate social responsibility programs that make a difference."
            },
            {
                icon: "fa-hand-holding-heart",
                title: "Community Engagement",
                description: "Building strong connections with local communities."
            },
            {
                icon: "fa-leaf",
                title: "Sustainability",
                description: "Environmentally responsible business practices."
            },
            {
                icon: "fa-medal",
                title: "Brand Reputation",
                description: "Enhancing your brand's image through positive actions."
            },
            {
                icon: "fa-handshake",
                title: "Stakeholder Relations",
                description: "Building trust and cooperation with all stakeholders."
            }
        ],
        ctaText: "Build Goodwill"
    }
];

// Export the services data and categories
export { categories };
export default services;
