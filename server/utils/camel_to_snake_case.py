import inflection


def camel_to_snake_case(data):
    """
    Recursively converts dictionary keys from camelCase to snake_case.
    """
    if isinstance(data, dict):
        new_dict = {}
        for key, value in data.items():
            new_key = inflection.underscore(
                key)  # Convert camelCase to snake_case
            new_dict[new_key] = camel_to_snake_case(
                value)  # Recursively apply to values
        return new_dict
    elif isinstance(data, list):
        return [camel_to_snake_case(item)
                for item in data]  # Apply to list elements
    else:
        return data  # Return the value if it's neither a dict nor a list
