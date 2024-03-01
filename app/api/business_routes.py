from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Business
from ..forms.business_form import BusinessForm
from ..models.db import db
from .aws_pictures import upload_file_to_s3, get_unique_filename

business_routes = Blueprint('businesses', __name__)


@business_routes.route('/')
def get_businesses():
    businesses = Business.query.all()
    response = [business.to_dict() for business in businesses]
    return { 'businesses': response }

@business_routes.route('/user/<int:userId>')
@login_required
def get_businesses_from_current_user(userId):
    businesses = Business.query.filter(Business.owner_id == userId).all()
    response = [business.to_dict() for business in businesses]
    return { 'businesses': response }

@business_routes.route('/<int:id>')
def get_business_details(id):
    business = Business.query.get(id)
    response = business.to_dict()

    if not business:
        return {'message': 'Business could not be found.', 'statusCode': 404}
    
    return { 'business': response }

@business_routes.route('/new', methods=['POST'])
@login_required
def create_new_business():
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    print(form.data)

    if form.validate_on_submit():

        # print('FORM VALIDATED')

        image = form.business_image.data
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
 
            return { "message": "Failed to upload file" }
        
        # print('IMAGE UPLOADED')
        
        new_business = Business(
            owner_id = current_user.id,
            business_name = form.data['business_name'],
            phone = form.data['phone'], 
            address = form.data['address'],
            city = form.data['city'],
            state = form.data['state'],
            zipcode = form.data['zipcode'],
            description = form.data['description'],
            latitude = form.data['latitude'],
            longitude = form.data['longitude'],
            price_range = form.data['price_range'],
            business_url = form.data['business_url'],
            business_image = upload['url']
        )

        db.session.add(new_business)
        db.session.commit()
        return new_business.to_dict(), 201
    print(form.errors)
    return form.errors, 400