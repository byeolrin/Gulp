from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review1 = Review(
        user_id = 1,
        business_id = 1,
        review = 'My friend told me about this place, and the Korean food was quite good!',
        rating = 5
    )
    review2 = Review(
        user_id = 1,
        business_id = 2,
        review = 'Best Korean steakhouse in New York City',
        rating = 5
    )
    review3 = Review(
        user_id = 2,
        business_id = 3,
        review = 'The food was not too bad. If you are craving hot tofu soup, you should come!',
        rating = 4
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()