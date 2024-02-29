from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Business(db.Model):
    __tablename__ = 'businesses'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    business_name = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(12), nullable=False)
    address = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(25), nullable=False)
    state = db.Column(db.String(20), nullable=False)
    zipcode = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(2500), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    price_range = db.Column(db.Integer, nullable=False)
    business_url = db.Column(db.String, nullable=False)
    business_image = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    owner = db.relationship("User", back_populates='businesses')
    reviews = db.relationship('Review', back_populates='business')

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'business_name': self.business_name,
            'phone': self.phone,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'zipcode': self.zipcode,
            'description': self.description,
            'longitude': self.longitude,
            'latitude': self.latitude,
            'price_range': self.price_range,
            'business_url': self.business_url,
            'business_image': self.business_image
        }
