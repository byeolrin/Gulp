from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name = 'DemoFirst', last_name = 'DemoLast', username='Demo', email='demo@aa.io', password='password'
        )
    gary = User(
        first_name = 'Gary', last_name = 'Cheung', username='gary', email='gary@aa.io', password='password'
        )
    dennis = User(
        first_name = 'Dennis', last_name = 'Ma', username='dennisbtw', email='dennis@aa.io', password='password'
    )
    chris = User(
        first_name = 'Chris', last_name = 'Fealy', username='chris', email='chris@aa.io', password='password'
    )

    db.session.add(demo)
    db.session.add(gary)
    db.session.add(dennis)
    db.session.add(chris)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
