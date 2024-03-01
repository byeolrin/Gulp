from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField, SubmitField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, Length, Regexp, NumberRange, ValidationError
from app.api.aws_pictures import ALLOWED_EXTENSIONS
    
def validate_zipcode(form, field):
    if len(str(field.data)) != 5:
        raise ValidationError('ZIP Code must be 5 digits')

def validate_latitude(form, field):
    if field.data < -90 or field.data > 90:
        raise ValidationError('Latitude must be between -90 and 90')

def validate_longitude(form, field):
    if field.data < -180 or field.data > 180:
        raise ValidationError('Longitude must be between -180 and 180')

class BusinessForm(FlaskForm):
    business_name = StringField('Name', validators=[DataRequired(), Length(max=50)])
    phone = StringField('Phone Number', validators=[DataRequired(), Length(min=10, max=20)])
    address = StringField('Address', validators=[DataRequired(), Length(max=50)])
    city = StringField('City', validators=[DataRequired(), Length(max=25)])
    state = StringField('State', validators=[DataRequired(), Length(max=20)])
    zipcode = IntegerField('ZIP Code', validators=[DataRequired(), validate_zipcode])
    description = StringField('Description', validators=[DataRequired(), Length(max=2500)])
    latitude = FloatField('Latitude', validators=[DataRequired(), validate_latitude])
    longitude = FloatField('Longitude', validators=[DataRequired(), validate_longitude])
    price_range = IntegerField('Price Range', validators=[DataRequired(), NumberRange(min=1, max=4)])
    business_url = StringField('URL', validators=[DataRequired()])
    business_image = FileField('Image File', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField('Create New Business')