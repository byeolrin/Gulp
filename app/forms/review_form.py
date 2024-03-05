from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length, ValidationError

def validate_rating(form, field):
    if field.data < 1 or field.data > 5:
        raise ValidationError('Rating must be between 1 and 5.')

class ReviewForm(FlaskForm):
    businessId = IntegerField('BusinessId', validators=[DataRequired()])
    review = StringField('Review', validators=[DataRequired(), Length(max=3000)])
    rating = IntegerField('Stars', validators=[DataRequired(), validate_rating])
    submit =SubmitField('Submit Your Review')
