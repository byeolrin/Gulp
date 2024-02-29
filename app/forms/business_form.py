from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField, SubmitField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, Length, Regexp, NumberRange
from app.api.aws_pictures import ALLOWED_EXTENSIONS
    

class BusinessForm(FlaskForm):
    business_name = StringField('Name', validators=[DataRequired(), Length(max=50)])
    phone = StringField('Phone Number', validators=[DataRequired(), Regexp('^\d{10}$', message="Please provide a valid phone number")])
    address = StringField('Address', validators=[DataRequired(), Length(max=50)])
    city = StringField('City', validators=[DataRequired(), Length(max=25)])
    state = StringField('State', validators=[DataRequired(), Length(max=20)])
    zipcode = IntegerField('ZIP Code', validators=[DataRequired(), NumberRange(min=10000, max=99999)])
    description = StringField('Description', validators=[DataRequired(), Length(max=2500)])
    latitude = FloatField('Latitude', validators=[DataRequired()])
    longitude = FloatField('Longitude', validators=[DataRequired()])
    price_range = IntegerField('Price Range', validators=[DataRequired(), NumberRange(min=1, max=5)])
    business_url = StringField('URL', validators=[DataRequired()])
    business_image = FileField('Image File', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField('Create New Business')