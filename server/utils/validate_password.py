from password_validator import PasswordValidator

password_schema = PasswordValidator()

password_schema \
    .min(8) \
    .has().no().spaces()
