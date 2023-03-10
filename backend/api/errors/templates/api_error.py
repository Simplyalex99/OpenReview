class APIError(Exception):
    code = 500
    name = "API Error"
    description=  "API Error. Possibly the API service has changed or is unavailble"       
    def __init__(self, description=None,code=None):
        if description is not None:
            self.description= description
        if code is not None:
            self.code=code           
        super().__init__(description)

