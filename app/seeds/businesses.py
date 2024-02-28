from app.models import db, Business, environment, SCHEMA
from sqlalchemy.sql import text

def seed_businesses():
    business1 = Business(
        owner_id = 2,
        business_name = 'Nubiani',
        phone = '917-623-0807',
        address = '315 5th Ave Fl 3',
        city = 'New York',
        state = 'NY',
        zipcode = '10016',
        description = 'NUBIANI - " Sliced Meat directly cooked over a fire" The term "NUBIANI" refers to grilled meat on direct heat that Koreans used to enjoy in the ancient Manchuria region. As nomadic people in ancient times, Koreans were highly skilled in cooking meat using a fire pit, the earliest form of barbeque, and in bringing out the natural flavors of the ingredient with minimal seasoning. Since then, cooking meat on direct heat has developed into a culinary art form over time in Korea. Located in the heart of Manhattan, NUBIANI is now open with a goal of further developing the transcendent Korean culinary culture of grilling meat, and introducing the finest flavors from direct heat cooking to the world.',
        latitude = 40.7471,
        longitude = -73.9854,
        price_range = 3,
        business_url = 'https://www.nubianinyc.com/',
        business_image = 'https://s3-media0.fl.yelpcdn.com/bphoto/X6HVBVgZdZDTh5tLb77mFw/o.jpg'
    )
    business2 = Business(
        owner_id = 2,
        business_name = 'COTE Korean Steakhouse',
        phone = '212-401-7986',
        address = '16 W 22nd St',
        city = 'New York',
        state = 'NY',
        zipcode = '10010',
        description = "COTE, the carnivorous vision of proprietor Simon Kim, blends the dining experience of Korean barbecue together with the hallmarks of a classic American steakhouse. The result is a unique, convivial and interactive atmosphere, accompanied by the highest quality USDA Prime beef, an impeccable 1200+ label wine list, and a suite of classic-but-creative cocktails. Smokeless grills in every table, combined with cuts from our in-house dry aging room, ensure that every morsel of steak is hot, fresh, and caramelized to perfection. COTE is New York City's first Korean Steakhouse.",
        latitude = 40.7415,
        longitude = -73.9912,
        price_range = 4,
        business_url = 'https://www.cotekoreansteakhouse.com/',
        business_image = 'https://assets-global.website-files.com/64dc46f3bd5126f2de6e5a04/65739ed106fcaedf0e2fb0eb_MEET-OUR-MEATweb.webp'
    )
    business3 = Business(
        owner_id = 1,
        business_name = 'BCD Tofu House',
        phone = '212-967-1900',
        address = '5 W 32nd St',
        city = 'New York',
        state = 'NY',
        zipcode = '10001',
        description = 'BCD Tofu House is a popular Korean restaurant chain known for its authentic Korean cuisine, specializing in tofu-based dishes. The name "BCD" stands for "Bukchon Dong," a neighborhood in Seoul, South Korea, renowned for its traditional Korean culture and cuisine.',
        latitude = 40.7477,
        longitude = -73.9860,
        price_range = 2,
        business_url = 'https://www.bcdtofuhouse.com/',
        business_image = 'https://images.squarespace-cdn.com/content/v1/5cc8bc4f93a632622cd1616d/1558025251826-FKQBA9WWWZCTU25E138M/image-asset.jpeg'
    )

    db.session.add(business1)
    db.session.add(business2)
    db.session.add(business3)
    db.session.commit()

def undo_businesses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM businesses"))

    db.session.commit()