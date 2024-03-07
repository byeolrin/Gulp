from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Review
from ..forms.review_form import ReviewForm
from ..models.db import db

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/')
def get_reviews():
    reviews = Review.query.all()
    response = [review.to_dict() for review in reviews]
    return jsonify({ 'reviews': response })

@review_routes.route('/<int:reviewId>')
def get_review_details(reviewId):
    review = Review.query.get(reviewId)

    if not review:
        return jsonify({ 'error': 'Review could not be found. '}), 404
    
    response = review.to_dict()

    return jsonify({ 'review': response })

@review_routes.route('/new', methods=['POST'])
@login_required
def create_new_review():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_review = Review(
            user_id = current_user.id,
            business_id = form.data['businessId'],
            review = form.data['review'],
            rating = form.data['rating']
        )

        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict(), 201
    print(form.errors)
    return form.errors, 400

@review_routes.route('/<int:reviewId>', methods=['PUT'])
@login_required
def edit_review(reviewId):
    review = Review.query.get(reviewId)

    if not review:
        return jsonify({ 'error': "Review couldn't be found" }), 404
    
    if review.user_id != current_user.id:
        return jsonify({ 'error': 'Forbidden' })
    
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review.review = form.review.data
        review.rating = form.rating.data

@review_routes.route('/<int:reviewId>', methods=['DELETE'])
@login_required
def delete_review(reviewId):
    review = Review.query.get(reviewId)

    if not review:
        return jsonify({ 'error': "Reviews couldn't be found" }), 404
    
    if review.user_id != current_user.id:
        return jsonify({ 'error': 'Forbidden'}), 401
    
    db.session.delete(review)
    db.session.commit()

    return jsonify({ 'message': 'Review has been deleted successfully'}), 200