from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Business
from ..forms.business_form import BusinessForm
from ..models.db import db
from .aws_pictures import upload_file_to_s3, get_unique_filename, remove_file_from_s3

business_routes = Blueprint('businesses', __name__)


@business_routes.route('/')
def get_businesses():
    businesses = Business.query.all()
    response = [business.to_dict() for business in businesses]
    return jsonify({ 'businesses': response })

@business_routes.route('/user/<int:userId>')
@login_required
def get_businesses_from_current_user(userId):
    businesses = Business.query.filter(Business.owner_id == userId).all()
    response = [business.to_dict() for business in businesses]
    return jsonify({ 'businesses': response })

@business_routes.route('/<int:businessId>')
def get_business_details(businessId):
    business = Business.query.get(businessId)

    if not business:
        return jsonify({ 'error': 'Business could not be found.' }), 404
    
    response = business.to_dict()
    
    return jsonify({ 'business': response })

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
 
            return jsonify({ "message": "Failed to upload file" })
        
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
    # print(form.errors)
    return form.errors, 400

@business_routes.route('/<int:businessId>', methods=['PUT'])
@login_required
def edit_business(businessId):
    business = Business.query.get(businessId)
    # print('this is the businessId -----------------------------', businessId)
    if not business:
        return jsonify({ 'error': "Business couldn't be found" }), 404
    
    if business.owner_id != current_user.id:
        return jsonify({ 'error': 'Forbidden' }), 401
    
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        business.business_name = form.business_name.data
        business.phone = form.phone.data
        business.address = form.address.data
        business.city = form.city.data
        business.state = form.state.data
        business.zipcode = form.zipcode.data
        business.description = form.description.data
        business.latitude = form.latitude.data
        business.longitude = form.longitude.data
        business.price_range = form.price_range.data
        business.business_url = form.business_url.data
        # business.business_image = form.business_image.data
        
        image = form.business_image.data

        if image:
            remove_file_from_s3(business.business_image)
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            business.business_image = upload['url']

        db.session.commit()
        return business.to_dict(), 200
    print(form.errors)
    return form.errors, 400

@business_routes.route('/<int:businessId>', methods=['DELETE'])
@login_required
def delete_business(businessId):
    business = Business.query.get(businessId)

    if not business:
        return jsonify({ 'error': "Business couldn't be found" }), 404
    
    if business.owner_id != current_user.id:
        return jsonify({ 'error': 'Forbidden ' }), 401
    
    if business.business_image:
        remove_file_from_s3(business.business_image)
    
    db.session.delete(business)
    db.session.commit()

    return jsonify({ 'message': 'Business has been deleted successfully.' }), 200

@business_routes.route('/<int:businessId>/reviews')
@login_required
def get_business_reviews(businessId):
    business = Business.query.get(businessId)

    if not business:
        return jsonify({ 'error': "Business couldn't be found" }), 404
    
    reviews = [review.to_dict() for review in business.reviews]
    return jsonify({ 'reviews': reviews })

@business_routes.route('/<int:businessId>/reviews/<int:userId>')
@login_required
def get_business_user_review(businessId, userId):
    business = Business.query.get(businessId)

    if not business:
        return jsonify({ 'error': "Business couldn't be found" }), 404
    
    user_review = [review.to_dict() for review in business.reviews if review.user_id == userId]
    return jsonify({ 'user_reviews': user_review })
