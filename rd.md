# Roomyo App

It's a real estate and PG booking company. Showing properties and allowing someone to contact the dealer or PG manager.

## Tech Stacks:
    - Next.js, typescript, Tailwind CSS, Strapi (later for Backend for Spaces page and blogs) 


## Frontend:
**Font:** Raleway

## Header
**Top Bar:** Some some Marketing Texts on top bar and Few on right, few on left.
**Title:** left (Title Roomyo)
**Nav:(Aside of Buttons)** Home, Privileges, Spaces About, City (7 Indian Cities with DropDown)
**Buttons: (in the rgiht)** Connect with Us


## Footer
- Pre Footer: Columns
    - Left (Column 1): Title with Address and Email
    - Middle (Column 2 (Row 1,2) Verically arranged): Rent (By Location, By Budget) | Services (Propeties, Paying Guests, Other)
    - Middle (Column 3, aside or after of Column 2): Company (Privacy Policy, Developer, Sitemap, Report)
    - Right (Column 4): Connect with Us (Phone Numbers, Email, Social Icons)
- Footer: Copyright Bar

## Main Pages:
    - Landing: HEro (Already Done)
        - Roomyo Space comes with: Fully Furnished, IHM Trained Resident Managers, Daily Professional Housekeeping, Laundry at Your Doorstep, 3-Tier Security, High-speed Wifi, Healthy Gourmet Meals, App-Enabled Living [In the 6x6 Cards with icons]
        - Featured Roomyos': Showings Relevant cards from Privileges Page
        - How to Get you Roomyo Space (Showing Process with the help of 6 tabs in left and showing content as per tabs in right)
        - What Users Say about Roomyo? (Testimonial already in the template same just with our color and font ui)
        - Book Your Roomyo Space: (Contact Box)
    - Spaces (Its Fuctional page): later on will add strapi backend for the same
        - Showing a Small Form (Location Dropdown, Category (Rent Roomyo, Roomyo Spaces), Sort (Low to High, High to Low, Recents))
        - After Form: Showing Properties with cards (Showing Image, Name, Location, Button (With One Title of Providing and Price)-- Single buttons will show/For Multi Options of Pricing will showing Dropdown Buttons by Select options)
        - Over Image of cards (One Share button)
    - Space Detailed Page: Showing Info About Property
        - Image Gallery (Left) – A main large image with a side panel of multiple selectable images (Amazon-style).
        -Quick Details (Right, Above Pricing Section) – Displays the title, location, room type, pricing, and host details.
        - Pricing Section (Right, Below Quick Details) – Shows different room options and pricing.
        - Main Details (Below Images & Quick Details) – Includes:
                        - Description
                        - Privileges (with icons)
                        - Full Address, Room Type, "View on Map" Button
                        - Host's Complete Contact Details
        Sticky Contact Box (Right Sidebar) – Always visible for users to submit inquiries.
        - Then Show Related Roomyos'
    - Blog Page
    - Other pages just need some contents (will do later)


## Roomyo Privilges

1. Hero Section (Welcome)
UI: Full-width background (image/video) with an overlay.
Content:
Headline: "Luxury Living, Redefined."
Subtext: "Experience comfort, community, and convenience—all in one place."
CTA: “Explore Privileges” (scrolls to next section).

2. Privileges Carousel (Swiper.js / React Slick)
UI: Horizontal slider with images, text, and navigation dots.
Content (Each Slide):

Fully Furnished Rooms – "Move in hassle-free with stylish, ready-to-use interiors."
24/7 High-Speed Wi-Fi – "Seamless connectivity for work and entertainment."
Housekeeping Services – "Enjoy a clean space with our regular maintenance."
Fitness & Wellness – "Stay active with our in-house gym and wellness zones."
Community Events – "Networking, entertainment, and social gatherings every week."
3. Amenities Grid (Tailwind Grid / MUI Cards)
UI: 3x3 grid of cards, each with an icon, title, and hover effect for details.
Content (Examples):

Smart Security – "Biometric access, CCTV, and 24/7 surveillance for safety."
On-Demand Laundry – "Easy, quick, and efficient laundry services."
Shared & Private Workspaces – "Quiet zones for productivity and collaboration."
Cafeteria & Dining – "Healthy, delicious meals just steps away."
Gaming & Recreation – "Common areas for relaxation and fun."
4. Community & Social Life
UI: Split section (image + text) or animated number counter (Framer Motion).
Content:

"More Than Just a Space – A Community."
"From movie nights to weekend getaways, Roomyo brings like-minded people together."
Stat Highlights:
🚀 500+ Residents
🎉 50+ Social Events Yearly
🌍 10+ Nationalities Represented
5. Sticky Contact / Inquiry Form
UI: Floating button expanding into a form (MUI modal or Chakra UI drawer).
Content:

"Want to Know More? Let’s Talk!"
Fields: Name, Email, Message
Button: "Get in Touch"