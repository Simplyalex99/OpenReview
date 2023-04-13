class InvalidInputError(Exception):
  code = 400
  name= "Invalid Input Error"
  description =  "Return JSON in the proper format. Refer to API documentation."    
  def __init__(self, description=None,code=None):
    if description is not None:
      self.description= description
    if code is not None:
      self.code=code           
    super().__init__(description)
