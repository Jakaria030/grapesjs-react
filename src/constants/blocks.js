export const BLOCKS = [
    {
        id: 'text',
        label: 'Text',
        media: `<img src='/assets/format-text.png' draggable='false'/>`,
        content: '<p style="padding:8px;font-size:16px">Edit this text</p>',
    },
    {
        id: 'link',
        label: 'Link',
        media: `<img src='/assets/link-alt.png' draggable='false'/>`,
        content: '<a href="#" style="color:#5b6cff;text-decoration:underline">Click here</a>',
    },
    {
        id: 'image',
        label: 'Image',
        media: `<img src='/assets/image-block.png' draggable='false'/>`,
        content: '<img src="https://placehold.co/400x200" style="max-width:100%;display:block" />',
    },
    {
        id: 'video',
        label: 'Video',
        media: `<img src='/assets/handle-right.png' draggable='false'/>`,
        content: '<video controls style="max-width:100%;display:block;width:100%"><source src="" type="video/mp4"/></video>',
    },
    {
        id: 'map',
        label: 'Map',
        media: `<img src='/assets/map-check-outline.png' draggable='false'/>`,
        content: '<iframe src="https://maps.google.com/maps?q=new+york&output=embed" style="width:100%;height:300px;border:none"></iframe>',
    },
    {
        id: 'button',
        label: 'Button',
        media: `<img src='/assets/gesture-tap-button.png' draggable='false'/>`,
        content: '<button>Click Me</button>',
    },
    {
        id: 'heading',
        label: 'Heading',
        media: `<img src='/assets/bx-heading.png' draggable='false'/>`,
        content: {
            type: 'heading',
            content: 'Heading',
        },
    },
    {
        id: 'one-column',
        label: '1 Column',
        media: `<img src='/assets/rectangle.png' draggable='false'/>`,
        content: '<div style="padding:20px;background:#f0f0f0;border-radius:4px;min-height:80px">Column</div>',
    },
    {
        id: 'two-columns',
        label: '2 Columns',
        media: `<img src='/assets/columns-solid.png' draggable='false'/>`,
        content: '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:8px"><div style="background:#f0f0f0;padding:20px;border-radius:4px;min-height:80px">Column 1</div><div style="background:#f0f0f0;padding:20px;border-radius:4px;min-height:80px">Column 2</div></div>',
    },
    {
        id: 'three-columns',
        label: '3 Columns',
        media: `<img src='/assets/layout-three-columns.png' draggable='false'/>`,
        content: '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;padding:8px"><div style="background:#f0f0f0;padding:20px;border-radius:4px;min-height:80px">Column 1</div><div style="background:#f0f0f0;padding:20px;border-radius:4px;min-height:80px">Column 2</div><div style="background:#f0f0f0;padding:20px;border-radius:4px;min-height:80px">Column 3</div></div>',
    },
    {
        id: 'container',
        label: 'Container',
        media: `<img src='/assets/select-all.png' draggable='false'/>`,
        content: '<div style="max-width:1200px;margin:0 auto;padding:0 16px;min-height:100px"></div>',
    },
    {
        id: 'div',
        label: 'Div',
        media: `<img src='/assets/file-code.png' draggable='false'/>`,
        content: '<div style="padding:16px;min-height:60px"></div>',
    },
    {
        id: 'header',
        label: 'Header',
        media: `<img src='/assets/page-layout-header.png' draggable='false'/>`,
        content: `
<header class="hdr">
    <div class="hdr-wrap">
        <a href="#" class="hdr-logo">
            <div class="hdr-logo-mark">S</div>
            <span class="hdr-logo-text">Studio</span>
        </a>
        <nav class="hdr-nav-wrap">
            <ul class="hdr-nav">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
        <div class="hdr-right">
            <a href="#" class="hdr-btn">Get Started</a>
            <button class="hdr-hamburger" onclick="
                var m = document.querySelector('.hdr-mobile-nav');
                m.style.display = m.style.display === 'flex' ? 'none' : 'flex';
            ">
                <span></span><span></span><span></span>
            </button>
        </div>
    </div>
    <div class="hdr-mobile-nav">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
        <a href="#" class="hdr-btn hdr-mobile-btn">Get Started</a>
    </div>
</header>`,
    },
    {
        id: 'hero',
        label: 'Hero',
        media: `<img src='/assets/page-layout-body.png' draggable='false'/>`,
        content: `
<main class="hero">
    <div class="hero-bg-orb hero-orb-1"></div>
    <div class="hero-bg-orb hero-orb-2"></div>
    <div class="hero-bg-orb hero-orb-3"></div>
    <div class="hero-wrap">
        <div class="hero-badge">✦ Welcome to the future</div>
        <h1 class="hero-title">
            Build something<br/>
            <span class="hero-title-gradient">extraordinary</span>
        </h1>
        <p class="hero-desc">
            Craft stunning digital experiences with our powerful platform.
            Everything you need to launch, grow, and scale your vision.
        </p>
        <div class="hero-actions">
            <a href="#" class="hero-btn-primary">Get Started Free</a>
            <a href="#" class="hero-btn-secondary">
                <span class="hero-play">▶</span> Watch Demo
            </a>
        </div>
        <div class="hero-stats">
            <div class="hero-stat">
                <span class="hero-stat-num">10K+</span>
                <span class="hero-stat-label">Users</span>
            </div>
            <div class="hero-stat-divider"></div>
            <div class="hero-stat">
                <span class="hero-stat-num">99%</span>
                <span class="hero-stat-label">Satisfaction</span>
            </div>
            <div class="hero-stat-divider"></div>
            <div class="hero-stat">
                <span class="hero-stat-num">24/7</span>
                <span class="hero-stat-label">Support</span>
            </div>
        </div>
    </div>
</main>`,
    },
    {
        id: 'footer',
        label: 'Footer',
        media: `<img src='/assets/page-layout-footer.png' draggable='false'/>`,
        content: `
<footer class="ftr">
    <div class="ftr-wrap">
        <div class="ftr-top">
            <div class="ftr-brand">
                <a href="#" class="ftr-logo">
                    <div class="ftr-logo-mark">S</div>
                    <span class="ftr-logo-text">Studio</span>
                </a>
                <p class="ftr-tagline">Building the future,<br/>one pixel at a time.</p>
                <div class="ftr-socials">
                    <a href="#" class="ftr-social">𝕏</a>
                    <a href="#" class="ftr-social">in</a>
                    <a href="#" class="ftr-social">gh</a>
                </div>
            </div>
            <div class="ftr-links">
                <div class="ftr-col">
                    <span class="ftr-col-title">Product</span>
                    <a href="#">Features</a><a href="#">Pricing</a>
                    <a href="#">Changelog</a><a href="#">Roadmap</a>
                </div>
                <div class="ftr-col">
                    <span class="ftr-col-title">Company</span>
                    <a href="#">About</a><a href="#">Blog</a>
                    <a href="#">Careers</a><a href="#">Press</a>
                </div>
                <div class="ftr-col">
                    <span class="ftr-col-title">Legal</span>
                    <a href="#">Privacy</a><a href="#">Terms</a>
                    <a href="#">Cookies</a><a href="#">Licenses</a>
                </div>
            </div>
        </div>
        <div class="ftr-bottom">
            <span class="ftr-copy">© <span id="ftr-year"></span> Studio. All rights reserved.</span>
            <span class="ftr-made">Made with ♥</span>
        </div>
    </div>
</footer>
<script>document.getElementById('ftr-year').textContent = new Date().getFullYear();</script>`,
    },
    {
        id: 'countdown',
        label: 'Countdown',
        media: `<img src='/assets/stopwatch.png' draggable='false'/>`,
        content: `
<section class="cntd">
    <p class="cntd-label">Launch in</p>
    <div class="cntd-wrap">
        <div class="cntd-box"><span class="cntd-num" id="cntd-days">00</span><span class="cntd-unit">Days</span></div>
        <span class="cntd-sep">:</span>
        <div class="cntd-box"><span class="cntd-num" id="cntd-hours">00</span><span class="cntd-unit">Hours</span></div>
        <span class="cntd-sep">:</span>
        <div class="cntd-box"><span class="cntd-num" id="cntd-mins">00</span><span class="cntd-unit">Minutes</span></div>
        <span class="cntd-sep">:</span>
        <div class="cntd-box"><span class="cntd-num" id="cntd-secs">00</span><span class="cntd-unit">Seconds</span></div>
    </div>
</section>
<script>
(function() {
    var target = new Date();
    target.setDate(target.getDate() + 30);
    function update() {
        var diff = target - new Date().getTime();
        if (diff <= 0) return;
        var days  = Math.floor(diff / 86400000);
        var hours = Math.floor((diff % 86400000) / 3600000);
        var mins  = Math.floor((diff % 3600000) / 60000);
        var secs  = Math.floor((diff % 60000) / 1000);
        document.getElementById('cntd-days').textContent  = String(days).padStart(2,'0');
        document.getElementById('cntd-hours').textContent = String(hours).padStart(2,'0');
        document.getElementById('cntd-mins').textContent  = String(mins).padStart(2,'0');
        document.getElementById('cntd-secs').textContent  = String(secs).padStart(2,'0');
    }
    update(); setInterval(update, 1000);
})();
</script>`,
    },
    {
        id: 'image-slider',
        label: 'Image Slider',
        media: `<img src='/assets/sliders-h-solid.png' draggable='false'/>`,
        content: { type: 'image-slider' },
    },
    {
        id: 'blog-page',
        label: 'Blog Page',
        media: `<img src='/assets/pager.png' draggable='false'/>`,
        content: `
            <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ALBR - Blog Inner Page</title>

    <!-- CSS Link -->
    <!-- <link rel="stylesheet" href="style.css"> -->

    <style>
        /* Global style start */
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Marcellus&display=swap');

        :root {
            --font-inter: "Inter", sans-serif;
            --font-marcellus: "Marcellus", serif;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: var(--font-inter);
        }

        .container-wrapper {
            max-width: 1920px;
            margin: 0 auto;
        }

        /* Global style end */


        /* Header style start */
        .sticky-header {
            position: sticky;
            z-index: 999;
            top: 0;
        }

        .header-container {
            width: 100%;
            background-color: #002E30;
            color: #FFFFFF;
        }

        .header {
            height: 90px;
            padding: 0 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 40px;
        }

        .left-col {
            display: flex;
            align-items: center;
            gap: 40px;
            padding: 10px 0;
        }

        .left-col .hamburger-icon img {
            width: 50px;
            height: 50px;
        }

        .nav-items {
            display: flex;
            align-items: center;
            gap: 40px;
        }

        .left-col a {
            text-decoration: none;
            color: #FFFFFF;
            font-weight: 700;
            font-size: 16px;
            line-height: 20px;
            letter-spacing: 5%;
        }

        .left-col a img {
            width: 12px;
            height: auto;
        }

        .center-col img {
            cursor: pointer;
            max-width: 270px;
            height: auto;
        }

        .right-col {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
        }

        .contact-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
        }

        .vertical-divider {
            width: 1px;
            background-color: rgba(255, 255, 255, 0.2);
            height: 38px;
        }

        .search-item {
            height: 50px;
            width: auto;
            cursor: pointer;
        }

        .three-dots-item {
            display: none;
        }

        /* Header style end */


        /* Main style start */
        .main-container {
            padding: 80px 110px 100px;
            background-color: #DDFDFF;

            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 80px;
        }

        .main-left-col {
            flex: 8;
        }

        .article-author h2 {
            color: #005F63;
            font-size: 40px;
            font-family: var(--font-marcellus);
            font-weight: 400;
            line-height: 120%;
            letter-spacing: 0;
        }

        .author-divider {
            margin: 32px 0;
        }

        .divider {
            width: 100%;
            height: 1px;
            background-color: #C0E6E9;
        }

        .author-info-container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            gap: 30px;
        }

        .author-article-info {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 30px;
        }

        .author-info {
            display: flex;
            align-items: center;
            border: 2px solid #005F63;
            border-radius: 100px;
            padding: 8px 12px;
        }

        .author-info img {
            width: 46px;
            height: 46px;
            border-radius: 999px;
        }

        .author-info p {
            color: #005F63;
            font-size: 14px;
            font-weight: 600;
            line-height: 16px;
            margin-left: 16px;
        }

        .article-info {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            row-gap: 10px;
            column-gap: 20px;
        }

        .article-info p {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .article-info p span {
            color: #005F63;
            font-size: 14px;
            font-weight: 600;
            line-height: 16px;
        }

        .author-social {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 10px;
        }

        .author-social-icons {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 10px;
        }

        .author-social-icons div {
            width: 38px;
            height: 38px;
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #005F63;
            border-radius: 999px;
            cursor: pointer;
        }

        .author-social-icons .fb-icon {
            padding: 13px;
        }

        .author-social-icons img {
            width: 100%;
            height: auto;
        }

        .active-icon {
            background-color: #005F63;
        }

        .author-social p {
            color: #005F63;
            font-size: 14px;
            font-weight: 600;
            line-height: 16px;
        }

        .main-right-col {
            flex: 4;
            position: sticky;
            top: 100px;
            z-index: 99;
            height: fit-content;
        }


        .blog-section {
            padding: 50px;
            background-color: #FFFFFF;
            border: 1px solid #C0E6E9;
            border-radius: 15px;
        }

        .blog-section h2 {
            color: #222222;
            font-size: 30px;
            font-weight: 700;
            line-height: 120%;
            letter-spacing: 0;
        }

        .blog-section img {
            width: 100%;
            margin: 30px 0;
            border-radius: 15px;
        }

        .blog-section p {
            color: #6D6D6D;
            font-size: 16px;
            line-height: 160%;
            text-align: justify;
        }

        .blog-section p:last-child {
            margin-top: 30px;
        }

        .blog-section-image {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 25px;
        }

        .image-card {
            overflow: hidden;
            border-radius: 12px;
            position: relative;
            cursor: pointer;
        }

        .image-card img {
            width: 100%;
            object-fit: cover;
            display: block;
        }

        .image-card img {
            border-radius: 15px 0 0 15px;
        }

        .last-image-card img {
            border-radius: 0 15px 15px 0;
        }

        .blog-section ul {
            margin-top: 30px;
            list-style-position: inside;
        }

        .blog-section ul li {
            color: #6D6D6D;
            font-size: 16px;
            font-weight: 400;
            line-height: 160%;
        }

        .blog-section {
            margin-top: 30px;
        }

        .author-details p {
            color: #005F63;
            font-size: 20px;
            font-weight: 500;
            line-height: 130%;
        }

        .author-details span {
            color: #222222;
            font-size: 16px;
            font-weight: 400;
            line-height: 160%;
            letter-spacing: 0;
        }

        .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .tag {
            padding: 5px 15px;
            border-radius: 100px;
            text-align: center;
            background-color: #005F63;
            color: #FFFFFF;
            font-size: 16px;
            font-weight: 500;
        }

        /* Main style end */

        /* Related stories style start */

        .related-stories-container {
            background-color: #FFFFFF;
        }

        .related-stories {
            padding: 80px 110px 100px;
        }

        .stories-title {
            color: #222222;
            font-family: var(--font-marcellus);
            font-weight: 400;
            font-size: 55px;
            line-height: 120%;
            letter-spacing: 0;
        }

        .horizontal-divider {
            width: 100%;
            height: 1px;
            background-color: #DDDDDD;
            margin: 20px 0;
        }

        .stories-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
        }

        .story-col {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 0;
            box-shadow: rgba(178, 178, 178, 0.1);
        }

        .story-left-img img {
            width: 165px;
            height: 175px;
            border-radius: 15px;
        }

        .story-right-content {
            margin-left: 25px;
        }

        .story-right-content h3 {
            color: #222222;
            font-size: 18px;
            font-weight: 600;
            letter-spacing: 0%;
            line-height: 150%;
        }

        .story-right-content p {
            color: #222222;
            font-size: 16px;
            font-weight: 400;
            line-height: 160%;
            letter-spacing: 0;
            margin-top: 8px;
        }

        .story-right-content button {
            color: #222222;
            font-size: 16px;
            font-weight: 600;
            line-height: 150%;
            letter-spacing: 5%;
            border: none;
            background: transparent;
            text-align: left;
            border-bottom: 1px solid #222222;
            margin-top: 10px;
            cursor: pointer;
        }

        /* Related stories style end */

        /* Footer section style start */
        .footer-container {
            height: 1320px;
            background: url("./assets/footer-bg.png") no-repeat;
        }

        .footer {
            background: linear-gradient(to bottom, rgba(2, 78, 132, 1) 0%, rgba(2, 78, 132, 0) 100%);
        }

        .newsletter {
            max-width: 712px;
            height: auto;
            margin: 0 auto;
            padding-top: 80px;
            padding-bottom: 40px;
        }

        .newsletter-title {
            color: #FFFFFF;
            font-family: var(--font-marcellus);
            font-weight: 400;
            line-height: 100%;
            letter-spacing: 0;
            text-align: center;
            font-size: 48px;
        }

        .newsletter p {
            color: #FFFFFF;
            font-size: 14px;
            font-weight: 400;
            line-height: 160%;
            letter-spacing: 0;
            text-align: center;
        }

        .email-button-group {
            position: relative;
            width: 100%;
            padding: 15px 0;
        }

        input[type="email"] {
            width: 100%;
            background-color: #FFFFFF;
            border-radius: 100px;
            border: none;
            outline: none;
            padding: 15px 30px;
            font-size: 16px;
            line-height: 150%;
            color: #222222;
        }

        .subscribe-btn {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            padding: 12px 25px;
            border: none;
            border-radius: 100px;
            background: #016DA1;
            font-size: 16px;
            font-weight: 700;
            line-height: 20px;
            letter-spacing: 8%;
            color: #FFFFFF;
            cursor: pointer;

            display: flex;
            align-items: center;
            gap: 10px;
        }

        .subscribe-btn::before {
            content: "";
            display: inline-block;
            width: 50px;
            height: 1px;
            background-color: #FFFFFF;
        }

        .footer-divider {
            max-width: 1268px;
            height: 1px;
            margin: 0 auto;
            background-color: #A1B9E9;
            opacity: 30;
        }

        .footer-items-container {
            max-width: 1268px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 180px;

            padding: 40px 0 24px;
        }

        .footer-items {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 80px;
        }

        .footer-item h3 {
            color: #FFFFFF;
            font-size: 30px;
            font-weight: 500;
            line-height: 30px;
            letter-spacing: 0;
            margin-bottom: 10px;
        }

        .footer-item ul {
            display: grid;
            grid-template-columns: 1fr;
        }

        .footer-item ul li {
            list-style-type: none;
            color: #FFFFFF;
            font-size: 14px;
            line-height: 34px;
            letter-spacing: 0;
            cursor: pointer;
            white-space: nowrap;
        }

        .footer-item:last-child ul {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            column-gap: 40px;
        }

        .footer-contact {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px
        }

        .contact-number {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;

            padding: 5px 25px;
            border: 1px solid #FFFFFF;
            color: #FFFFFF;
            border-radius: 100px;
        }

        .social-icons {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 20px;
            cursor: pointer;
        }

        .footer-logo {
            padding: 40px 0;
            width: 100%;
            height: auto;
        }

        .terms-and-condition {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 15px;
            flex-wrap: wrap;
        }

        .terms-and-condition p {
            color: #FFFFFF;
            font-weight: 500;
            font-size: 14px;
            line-height: 120%;
            letter-spacing: 0;
            cursor: pointer;
        }

        .dot {
            width: 4px;
            height: 4px;
            background: #FFFFFF;
            border-radius: 100%;
        }

        .footer-copywright {
            display: flex;
            align-items: center;
            justify-content: space-between;

            max-width: 1268px;
            margin: 0 auto;
            padding-top: 30px;
        }

        .footer-copywright p {
            color: #FFFFFF;
            font-size: 14px;
            line-height: 160%;
            letter-spacing: 0;
        }

        .country-select {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 10px;
            cursor: pointer;
        }

        .country-select select {
            outline: none;
            border: 1px solid #FFFFFF;
            background: transparent;
            padding: 10px 20px;
            border-radius: 100px;
            color: #FFFFFF;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
        }

        /* Footer section style end */


        /* Responsive style start for Laptop devices */
        @media (max-width: 1440px) and (min-width: 989px) {

            /* header section */
            .header {
                padding: 0 30px;
            }

            .left-col,
            .nav-items {
                gap: 20px;
            }

            /* Related stories section */
            .stories-container {
                grid-template-columns: repeat(2, 1fr);
            }

            .related-stories {
                padding: 50px 30px;
            }

            .stories-title {
                font-size: 48px;
            }

            .story-col {
                padding: 10px 0;
            }

            /* Footer section */
            .footer {
                padding: 0 30px;
            }

            .footer-items-container {
                flex-direction: column;
                align-items: flex-start;
                gap: 50px;
            }

            .footer-item:last-child ul {
                column-gap: 80px;
            }

            /* Main section */
            .main-container {
                padding: 50px 30px;
            }

            .main-right-col {
                display: none;
            }

        }

        /* Responsive style start for Laptop devices */

        /* Responsive style start for Tablet devices */
        @media (max-width: 990px) and (min-width: 479px) {

            /* header section */
            .header {
                padding: 0 30px;
            }

            .nav-items {
                display: none;
            }

            /* Related stories section */
            .stories-container {
                grid-template-columns: repeat(1, 1fr);
            }

            .related-stories {
                padding: 50px 30px;
            }

            .stories-title {
                font-size: 48px;
            }

            .story-col {
                padding: 10px 0;
            }

            /* Footer section */
            .footer {
                padding: 0 30px;
            }

            .newsletter {
                padding-top: 40px;
                padding-bottom: 20px;
            }

            .newsletter-title {
                font-size: 36px;
            }

            /* Footer section */
            .footer {
                padding: 0 30px;
            }

            .footer-items-container {
                flex-direction: column;
                align-items: flex-start;
                gap: 50px;
            }

            /* Main section */
            .main-container {
                padding: 50px 30px;
            }

            .main-right-col {
                display: none;
            }

            .author-info-container {
                flex-direction: column;
                align-items: flex-start;
            }


        }

        /* Responsive style end for Tablet devices */

        /* Responsive style start for Mobile devices */
        @media (max-width: 480px) {

            /* header section */
            .header {
                height: 70px;
                padding: 0 30px;
            }

            .left-col {
                display: none;
            }

            .search-item {
                order: 1;
            }

            .nav-verticale-divider {
                order: 2
            }

            .center-col img {
                max-width: 100%;
            }

            .contact-item {
                display: none;
            }

            .three-dots-item {
                display: inline;
                order: 3
            }

            /* Related stories section */
            .stories-container {
                grid-template-columns: repeat(1, 1fr);
            }

            .related-stories {
                padding: 50px 30px;
            }

            .story-col {
                flex-direction: column;
                padding: 0;
                margin: 10px 0;
            }

            .story-right-content {
                margin-left: 0;
                margin-top: 15px;
            }

            .stories-title {
                font-size: 36px;
            }

            /* Footer section */
            .footer-container {
                height: 1450px;
            }

            .footer-contact {
                flex-direction: column;
            }

            .footer {
                padding: 0 30px;
            }

            .newsletter {
                padding-top: 40px;
                padding-bottom: 20px;
            }

            .newsletter-title {
                font-size: 32px;
            }

            input[type="email"] {
                padding: 10px 25px;
            }

            .subscribe-btn {
                font-size: 14px;
                padding: 7px 20px;

            }

            .subscribe-btn::before {
                display: none;
            }

            .footer-copywright {
                flex-direction: column;
                gap: 20px;
            }

            .country-select {
                width: 100%;
                justify-content: space-between;
            }

            .footer-copywright p {
                text-align: center;
            }

            .footer-items-container {
                flex-direction: column;
                justify-content: space-between;
                gap: 50px;
            }

            .footer-items {
                grid-template-columns: repeat(2, 1fr);
                row-gap: 20px;
            }

            .footer-item:last-child ul {
                grid-template-columns: repeat(1, 1fr);
            }

            .footer-logo {
                max-width: 400px;
            }

            .footer-logo img {
                width: 100%;
            }

            /* Main section */
            .main-container {
                padding: 40px 30px;
            }

            .main-right-col {
                display: none;
            }

            .article-author h2 {
                font-size: 32px;
            }

            .author-info {
                padding: 5px 10px;
                margin: 0 auto;
            }

            .author-info img {
                width: 30px;
                height: 30px;
            }

            .author-info p {
                font-size: 12px;
            }

            .author-info-container {
                flex-direction: column;
                align-items: flex-start;
            }

            .author-article-info {
                flex-direction: column;
                align-items: flex-start;
            }

            .article-info p span {
                font-size: 12px;
            }

            .author-social {
                flex-basis: 100%;
                margin: 0 auto;
                align-items: center;
            }

            .author-divider {
                margin: 24px 0;
            }

            .blog-section {
                padding: 30px;
            }

            .blog-section h2 {
                font-size: 24px;
            }

            .blog-section p:last-child {
                margin-top: 15px;
            }
        }

        /* Responsive style end for Mobile devices */
    </style>

</head>

<body>

    <!-- Header section start -->
    <header class="container-wrapper sticky-header">
        <div class="header-container">
            <div class="header">
                <!-- Left col -->
                <div class="left-col">
                    <a href="#" class="hamburger-icon"><img src="./assets/hamburger.png" alt="Hamburger Icon"></a>
                    <div class="nav-items">
                        <a href="#">Destinations <img src="./assets/down-arrow.png" alt="Down Arrow"></a>
                        <a href="#">Groups & Weddings</a>
                    </div>
                </div>

                <!-- Center col -->
                <div class="center-col">
                    <img src="./assets/logo.png" alt="Logo">
                </div>

                <!-- Right col -->
                <div class="right-col">
                    <div class="contact-item">
                        <img src="./assets/telephone.png" alt="Telephone Icon">
                        <p>+1 (888) 999-9999</p>
                    </div>
                    <div class="vertical-divider nav-verticale-divider"></div>
                    <div class="search-item">
                        <img src="./assets/magnifying-glass.png" alt="Search Icon">
                    </div>
                    <div class="three-dots-item">
                        <img src="./assets/three-dots.png" alt="Three Dots Icon">
                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- Header section end -->

    <!-- Main section start -->
    <main class="container-wrapper">
        <div class="main-container">
            <div class="main-left-col">
                <!-- Author section -->
                <div class="article-author">
                    <h2>Lorem ipsum dolor samet conseceu adiscing</h2>
                    <div class="divider author-divider"></div>

                    <div class="author-info-container">
                        <div class="author-article-info">
                            <div class="author-info">
                                <img src="./assets/avatar.png" alt="Author avatar">
                                <p>AUTHOR: AMAYA</p>
                            </div>
                            <div class="article-info">
                                <p>
                                    <img src="./assets/clock.png" alt="Read minutes">
                                    <span>10 MINUTE READ</span>
                                </p>
                                <p>
                                    <img src="./assets/hototpic.png" alt="Tranding">
                                    <span>TRANDING</span>
                                </p>
                                <p>
                                    <img src="./assets/updated.png" alt="Updated">
                                    <span>UPDATED: 20:04:2024</span>
                                </p>
                                <p>
                                    <img src="./assets/reviewedby.png" alt="Reviewed">
                                    <span>REVIEWED BY: JOHN DOE</span>
                                </p>
                            </div>
                        </div>
                        <div class="author-social">
                            <div class="author-social-icons">
                                <div>
                                    <img src="./assets/twitter-1.png" alt="Twitter">
                                </div>
                                <div class="fb-icon">
                                    <img src="./assets/facebook.png" alt="Facebook">
                                </div>
                                <div>
                                    <img src="./assets/email.png" alt="Email">
                                </div>
                                <div>
                                    <img src="./assets/whatsapp.png" alt="Whatsapp">
                                </div>
                                <div class="active-icon">
                                    <img src="./assets/copylink.png" alt="Copy link">
                                </div>
                            </div>
                            <p>200 SHARES</p>
                        </div>
                    </div>

                    <div class="divider author-divider"></div>
                </div>

                <!-- Blog section -->
                <div class="blog-section">
                    <h2>Vestibulum lectus mauris ultrices eros sceleris uemaere</h2>
                    <img src="./assets/blog-image-1.png" alt="Blog Image">
                    <p>Vestibulum lectus mauris ultrices eros inaaru scelerisque felis imperdiet proin fermentum leo vel
                        orci porta. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit. Purus in mollis
                        nunc sed. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Pellentesque id nibh tortor id
                        aliquet lectus. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper. Nulla
                        pellentesque dignissim enim sit amet venenatis urna cursus eget. Volutpat blandit aliquam etiam
                        erat velima Volutpat odio facilisis mauris sit amet massa vitae tortor condimentum. Vestibulum
                        rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Nulla aliquet enim
                        tortor at auctor urna nunc id. Tortor condimentum lacinia quis vel.
                    </p>

                    <p>
                        Viverra suspendisse potenti nullam ac tortor vitae purus. Tempus imperdiet nulla malesuada
                        pellentesque elit eget gravida cum. Consectetur purus ut faucibus pulvinar elementurna id
                        volutpat lacus laoreet non curabitu Est ullamcorper eget nulla facilisi etiam. Mollis aliquam ut
                        porttitor leo a diam sollicitudin tempor. Eget nunc scelerisque viverra mauris in aliquam sem
                        fringilla ut. Nunc non blandit massa enim nec dui. Molestie nunc non blandit massa Ornare
                        suspendisse sed nisi lacus sed viverra. Sem nulla pharetra diam sit ameleifen nulla posuere
                        sollicitudin aliquam ultrices sagittis.</p>
                </div>

                <div class="blog-section">
                    <h2>Vestibulum lectus mauris ultrices eros sceleris uemaere</h2>
                    <p>Vestibulum lectus mauris ultrices eros inaaru scelerisque felis imperdiet proin fermentum leo vel
                        orci porta. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit. Purus in mollis
                        nunc sed. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Pellentesque id nibh tortor id
                        aliquet lectus. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper. Nulla
                        pellentesque dignissim enim sit amet venenatis urna cursus eget. Volutpat blandit aliquam etiam
                        erat velima Volutpat odio facilisis mauris sit amet massa vitae tortor condimentum. Vestibulum
                        rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Nulla aliquet enim
                        tortor at auctor urna nunc.</p>
                </div>

                <div class="blog-section">
                    <div class="blog-section-image">
                        <div class="image-card">
                            <img src="./assets/blog-image-2.png" alt="Blog Image">
                        </div>
                        <div class="image-card last-image-card">
                            <img src="./assets/blog-image-3.png" alt="Blog Image">
                        </div>
                    </div>
                </div>

                <div class="blog-section">
                    <h2>Donec odio dapibus ultrices acuretium susendisse potent
                        nullam ac tortor vitae purus faucibus.</h2>
                    <ul>
                        <li>Donec ac odio tempor orci dapibus ultrices in iaculis. Pretium viverraac tortoma.</li>
                        <li>Aitae purus faucibus aursus eget nunc scelerisque viverra mauris in aliquam interdum.</li>
                        <li>Velit euismod in pellentesque massa placeramona auris ultrices eros in cursus turravida.
                        </li>
                        <li>Blandit Molestie nunc non blandit massa enim nec dui nunc. Pretium aenean magna.</li>
                        <li>Augue ut lectus arcu bibendum at aauris a diam maecenas loremona sed enim ut.
                        </li>
                        <li>Neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing.</li>
                        <li>Eget est lorem ipsum dolo odio pelle monana ntesue diam volutpat commodo.</li>
                        <li>Cursus risus at ultrices mi tempus imperdie malesuada pellentesn habitasse platea.</li>
                        <li>Oestibulum rhoncus est pellentesque elitamoauet sagittis id consectetu alutpa.</li>
                    </ul>
                </div>

                <div class="divider author-divider"></div>
                <div class="author-info-container">
                    <div class="author-article-info">
                        <div class="author-avatar">
                            <img src="./assets/avatar.png" alt="Author avatar">
                        </div>
                        <div class="author-details">
                            <p>AUTHOR: AMAYA</p>
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod teomona
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud
                                exercitation ullamco laboris nisi ut aliqmodo conseauis aute irure eprehende.</span>
                        </div>

                    </div>
                    <div class="author-social">
                        <div class="author-social-icons">
                            <div>
                                <img src="./assets/twitter-1.png" alt="Twitter">
                            </div>
                            <div class="fb-icon">
                                <img src="./assets/facebook.png" alt="Facebook">
                            </div>
                            <div>
                                <img src="./assets/email.png" alt="Email">
                            </div>
                            <div>
                                <img src="./assets/whatsapp.png" alt="Whatsapp">
                            </div>
                            <div class="active-icon">
                                <img src="./assets/copylink.png" alt="Copy link">
                            </div>
                        </div>
                        <p>200 SHARES</p>
                    </div>
                </div>
                <div class="divider author-divider"></div>

                <!-- Tags -->
                <div class="tags">
                    <div class="tag">Beaches and Destinations</div>
                    <div class="tag">Romantic Getaways</div>
                    <div class="tag">Adventure and Activities</div>
                    <div class="tag">Spa and Wellness</div>
                </div>
            </div>

            <div class="main-right-col">
                <div class="main-stories-container">
                    <div class="story-col">
                        <div class="story-left-img">
                            <img src="./assets/related-story-1.png" alt="Related Story Image">
                        </div>
                        <div class="story-right-content">
                            <h3>Top 10 Beaches in the Caribbean: A Paradise Awaits</h3>
                            <p>Discover the most stunning beaches in the Caribbean that offer pristine sands,
                                crystal-clear
                                waters, and endless...</p>
                            <button>Read more</button>
                        </div>
                    </div>
                    <div class="divider"></div>
                    <div class="story-col">
                        <div class="story-left-img">
                            <img src="./assets/related-story-2.png" alt="Related Story Image">
                        </div>
                        <div class="story-right-content">
                            <h3>The Ultimate Guide to Caribbean Island Hopping</h3>
                            <p>Explore the best islands to visit and how to make the most of your Caribbean
                                island-hopping adventure...</p>
                            <button>Read more</button>
                        </div>
                    </div>
                    <div class="divider"></div>
                    <div class="story-col">
                        <div class="story-left-img">
                            <img src="./assets/related-story-3.png" alt="Related Story Image">
                        </div>
                        <div class="story-right-content">
                            <h3>The Ultimate Guide to Caribbean Island Hopping</h3>
                            <p>Explore the best islands to visit and how to make the most of your Caribbean
                                island-hopping adventure...</p>
                            <button>Read more</button>
                        </div>
                    </div>
                    <div class="divider"></div>
                    <div class="story-col">
                        <div class="story-left-img">
                            <img src="./assets/related-story-4.png" alt="Related Story Image">
                        </div>
                        <div class="story-right-content">
                            <h3>Eco-Friendly Resorts: Sustainable Tourism in the Caribbean</h3>
                            <p>Explore how our resort is committed to sustainable tourism and eco-friendly practices</p>
                            <button>Read more</button>
                        </div>
                    </div>
                    <div class="divider"></div>
                    <div class="story-col">
                        <div class="story-left-img">
                            <img src="./assets/related-story-5.png" alt="Related Story Image">
                        </div>
                        <div class="story-right-content">
                            <h3>Relax and Rejuvenate: Spa and Wellness Retreats in the Caribbean</h3>
                            <p>Discover the luxurious spa and wellness offerings at our resort designed to relax and
                                rejuvenate your body and mind...</p>
                            <button>Read more</button>
                        </div>
                    </div>
                    <div class="divider"></div>
                    <div class="story-col">
                        <div class="story-left-img">
                            <img src="./assets/related-story-6.png" alt="Related Story Image">
                        </div>
                        <div class="story-right-content">
                            <h3>Destination Weddings: Tie the Knot in the Caribbean</h3>
                            <p>Learn why the Caribbean is the perfect destination for your dream wedding, complete with
                                stunning venues and top-notch...</p>
                            <button>Read more</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <!-- Main section start -->

    <!-- Related stories section start -->
    <section class="container-wrapper">
        <div class="related-stories-container">
            <div class="related-stories">
                <h2 class="stories-title">Related Stories</h2>
                <div class="horizontal-divider"></div>

                <div class="stories-container">
                    <div class="story-col">
                        <div class="story-left-img">
                            <img src="./assets/related-story-1.png" alt="Related Story Image">
                        </div>
                        <div class="story-right-content">
                            <h3>Top 10 Beaches in the Caribbean: A Paradise Awaits</h3>
                            <p>Discover the most stunning beaches in the Caribbean that offer pristine sands,
                                crystal-clear
                                waters, and endless...</p>
                            <button>Read more</button>
                        </div>
                    </div>
                    <div class="story-col">
                        <div class="story-left-img">
                            <img src="./assets/related-story-2.png" alt="Related Story Image">
                        </div>
                        <div class="story-right-content">
                            <h3>The Ultimate Guide to Caribbean Island Hopping</h3>
                            <p>Explore the best islands to visit and how to make the most of your Caribbean
                                island-hopping adventure...</p>
                            <button>Read more</button>
                        </div>
                    </div>
                    <div class="story-col">
                        <div class="story-left-img">
                            <img src="./assets/related-story-3.png" alt="Related Story Image">
                        </div>
                        <div class="story-right-content">
                            <h3>The Ultimate Guide to Caribbean Island Hopping</h3>
                            <p>Explore the best islands to visit and how to make the most of your Caribbean
                                island-hopping adventure...</p>
                            <button>Read more</button>
                        </div>
                    </div>
                    <div class="story-col">
                        <div class="story-left-img">
                            <img src="./assets/related-story-4.png" alt="Related Story Image">
                        </div>
                        <div class="story-right-content">
                            <h3>Eco-Friendly Resorts: Sustainable Tourism in the Caribbean</h3>
                            <p>Explore how our resort is committed to sustainable tourism and eco-friendly practices</p>
                            <button>Read more</button>
                        </div>
                    </div>
                    <div class="story-col">
                        <div class="story-left-img">
                            <img src="./assets/related-story-5.png" alt="Related Story Image">
                        </div>
                        <div class="story-right-content">
                            <h3>Relax and Rejuvenate: Spa and Wellness Retreats in the Caribbean</h3>
                            <p>Discover the luxurious spa and wellness offerings at our resort designed to relax and
                                rejuvenate your body and mind...</p>
                            <button>Read more</button>
                        </div>
                    </div>
                    <div class="story-col">
                        <div class="story-left-img">
                            <img src="./assets/related-story-6.png" alt="Related Story Image">
                        </div>
                        <div class="story-right-content">
                            <h3>Destination Weddings: Tie the Knot in the Caribbean</h3>
                            <p>Learn why the Caribbean is the perfect destination for your dream wedding, complete with
                                stunning venues and top-notch...</p>
                            <button>Read more</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>
    <!-- Related stories section end -->

    <!-- Footer section start -->
    <footer class="container-wrapper">
        <div class="footer-container">
            <div class="footer">
                <div class="newsletter">
                    <h2 class="newsletter-title">Subscribe to newsletter</h2>
                    <div class="email-button-group">
                        <input type="email" placeholder="Please enter your email">
                        <button class="subscribe-btn">Subscribe now</button>
                    </div>
                    <p>By subscribing, you agree to our Privacy Policy and Terms of Use.</p>
                </div>

                <div class="footer-divider"></div>

                <div class="footer-items-container">
                    <div class="footer-items">
                        <div class="footer-item">
                            <h3>Europe</h3>
                            <ul>
                                <li>Spain</li>
                                <li>Greece</li>
                                <li>Turkey</li>
                                <li>Cyprus</li>
                                <li>Bulgaria</li>
                                <li>Portugal</li>
                            </ul>
                        </div>
                        <div class="footer-item">
                            <h3>Asian</h3>
                            <ul>
                                <li>Maldives</li>
                                <li>Indonesia</li>
                                <li>Thailand</li>
                                <li>Philippines</li>
                                <li>Vietnam</li>
                            </ul>
                        </div>
                        <div class="footer-item">
                            <h3>Caribbean</h3>
                            <ul>
                                <li>Anguilla</li>
                                <li>Bahamas</li>
                                <li>Cayman Islands</li>
                                <li>St. Lucia</li>
                                <li>Barbados</li>
                                <li>Jamaica</li>
                                <li>Turks and Caicos</li>
                                <li>Aruba</li>
                                <li>Antigua - Renowned</li>
                                <li>Dominican Republic</li>
                            </ul>
                        </div>
                    </div>

                    <div class="footer-contact-area">
                        <div class="footer-contact">
                            <div class="contact-number">
                                <div style="display: flex; gap: 10px; align-items: center;">
                                    <img src="./assets/telephone.png" alt="Phone Icon">
                                    <p>Agent <br> Hotline</p>
                                </div>
                                <div class="vertical-divider"></div>
                                <p>+1 (888) 999-9999</p>
                            </div>
                            <div class="social-icons">
                                <img src="./assets/fb.png" alt="FB Icon">
                                <img src="./assets/twitter.png" alt="Twitter Icon">
                                <img src="./assets/instagram.png" alt="Instagram Icon">
                            </div>
                        </div>

                        <div class="footer-logo">
                            <img src="./assets/footer-logo.png" alt="Footer Logo">
                        </div>

                        <div class="terms-and-condition">
                            <p>Privacy policy</p>
                            <div class="dot"></div>
                            <p>Terms and conditions</p>
                            <div class="dot"></div>
                            <p>Sitemap</p>
                        </div>

                    </div>
                </div>

                <div class="footer-divider"></div>

                <div class="footer-copywright">
                    <div class="country-select">
                        <select name="country-code">
                            <option value="usd">USD</option>
                        </select>

                        <select name="country-name">
                            <option value="united states">United States</option>
                        </select>
                    </div>

                    <p>© 2024 All-inclusive beach resorts. All Rights Reserved</p>
                </div>

            </div>
        </div>
    </footer>
    <!-- Footer section end -->

</body>

</html>
        `
    }
];
