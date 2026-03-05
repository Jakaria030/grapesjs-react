const Header = (editor) => {

    // add header component
    editor.DomComponents.addType("header", {
        model: {
            defaults: {
                tagName: "header",
                draggable: true,
                droppable: true,
                attributes: { class: "header" },
                components: [
                    `<div id="logo">
                        <img src="/vite.svg" alt="Site Logo" />
                    </div>
                    <nav>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </nav>
                    
                    <div>
                        <button class="primary-btn">Get Started</button>
                        <button class="hamburger">☰</button>
                    </div>
                    `
                ],
            },
        },
    });

    // add CSS style
    editor.addStyle(`
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 30px;
            background-color: #333;
            color: #fff;
            font-family: Arial, sans-serif;
            position: relative;
        }

        .header #logo img {
            eight: 50px;
        }

        .header nav ul {
            list-style: none;
            display: flex;
            gap: 25px;
            margin: 0;
            padding: 0;
        }

        .header nav ul li a {
            text-decoration: none;
            color: #fff;
            font-weight: bold;
            transition: color 0.3s;
        }

        .header nav ul li a:hover {
            color: #1abc9c;
        }

        .header > div {
            display: flex;
            gap: 15px;
            align-items: center;
        }

        .header .primary-btn {
            background-color: #1abc9c;
            color: #fff;
            border: none;
            padding: 10px 18px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
            transition: background 0.3s;
        }

        .header .primary-btn:hover {
            background-color: #16a085;
        }

        .header .hamburger {
            font-size: 24px;
            background: none;
            border: none;
            color: #fff;
            cursor: pointer;
            display: none; 
        }

        /* Responsive: stack nav or hide nav for mobile */
        @media (max-width: 768px) {
            .header nav ul {
                display: none;
            }

            .header .hamburger {
                display: block;
            }
            
            .header .primary-btn {
                display: none;
            }
        }
    `);
};

export default Header;