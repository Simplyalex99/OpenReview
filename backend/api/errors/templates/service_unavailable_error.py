class ServiceUnavailableError(Exception):
  code = 503
  name = "Service Unavailable Error"
  description= "Requested resources is unavailable at the time."
  def __init__(self, description=None,code=None):
    if description is not None:
      self.description= description
    if code is not None:
      self.code=code           
    super().__init__(description)
